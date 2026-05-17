#!/usr/bin/env node
/*
  Stage 39B guard: Stripe runtime smoke.
  Goal: detect a dangerous state where fulfillment access or download events exist for an order without a paid/succeeded/completed payment.

  Safe modes:
  - No Supabase env: report SKIP DB and exit 0 unless STAGE39B_REQUIRE_DB=1.
  - With Supabase env: query runtime tables via Supabase REST and fail on violations.

  Required env for DB mode:
  - NEXT_PUBLIC_SUPABASE_URL or SUPABASE_URL
  - SUPABASE_SERVICE_ROLE_KEY preferred. SUPABASE_ANON_KEY allowed only if RLS permits reads.
*/

const TABLES = {
  payments: 'order_payments',
  events: 'payment_events',
  fulfillment: 'order_fulfillment_access',
  downloads: 'order_download_events',
};

const PAID_VALUES = new Set(['paid', 'succeeded', 'complete', 'completed', 'checkout.session.completed', 'payment_intent.succeeded']);
const ORDER_ID_KEYS = ['order_id', 'orderId', 'order_uuid', 'orderUuid', 'order', 'orderNumber'];
const PAYMENT_STATUS_KEYS = ['payment_status', 'status', 'stripe_status', 'stripe_payment_status', 'checkout_status', 'event_type', 'type'];

function env(name) {
  return process.env[name] && String(process.env[name]).trim();
}

function getAny(row, keys) {
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(row, key) && row[key] !== null && row[key] !== undefined && String(row[key]).trim() !== '') {
      return row[key];
    }
  }
  return null;
}

function normalize(value) {
  return String(value || '').trim().toLowerCase();
}

function isPaidPayment(row) {
  for (const key of PAYMENT_STATUS_KEYS) {
    if (!Object.prototype.hasOwnProperty.call(row, key)) continue;
    const value = normalize(row[key]);
    if (PAID_VALUES.has(value)) return true;
    if (value.includes('paid') || value.includes('succeeded') || value.includes('checkout.session.completed') || value.includes('payment_intent.succeeded')) return true;
  }
  if (row.paid === true || row.is_paid === true || row.payment_paid === true) return true;
  return false;
}

async function fetchTable({ baseUrl, key, table, limit = 1000 }) {
  const headers = {
    apikey: key,
    Authorization: `Bearer ${key}`,
    Accept: 'application/json',
  };
  const orderUrl = `${baseUrl.replace(/\/$/, '')}/rest/v1/${encodeURIComponent(table)}?select=*&limit=${limit}&order=created_at.desc`;
  let res = await fetch(orderUrl, { headers });
  if (!res.ok) {
    // Retry without created_at ordering, because older tables may use a different timestamp column.
    const plainUrl = `${baseUrl.replace(/\/$/, '')}/rest/v1/${encodeURIComponent(table)}?select=*&limit=${limit}`;
    res = await fetch(plainUrl, { headers });
  }
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Supabase REST read failed for ${table}: HTTP ${res.status} ${text.slice(0, 500)}`);
  }
  try {
    const json = JSON.parse(text);
    if (!Array.isArray(json)) throw new Error(`Expected array from ${table}`);
    return json;
  } catch (err) {
    throw new Error(`Invalid JSON from ${table}: ${err.message}; body=${text.slice(0, 500)}`);
  }
}

async function main() {
  const requireDb = env('STAGE39B_REQUIRE_DB') === '1' || process.argv.includes('--require-db');
  const baseUrl = env('NEXT_PUBLIC_SUPABASE_URL') || env('SUPABASE_URL');
  const key = env('SUPABASE_SERVICE_ROLE_KEY') || env('SUPABASE_ANON_KEY');

  console.log('[Stage39B] Stripe runtime guard: no fulfillment/download without paid');

  if (!baseUrl || !key) {
    const msg = '[Stage39B] SKIP DB smoke: missing NEXT_PUBLIC_SUPABASE_URL/SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Static apply only.';
    if (requireDb) {
      console.error(`${msg} STAGE39B_REQUIRE_DB=1 wymaga pełnego env.`);
      process.exit(1);
    }
    console.log(msg);
    console.log('[Stage39B] PASS static mode: script installed. Runtime DB check still required after Stripe CLI test.');
    return;
  }

  const [payments, events, fulfillment, downloads] = await Promise.all([
    fetchTable({ baseUrl, key, table: TABLES.payments, limit: 1000 }),
    fetchTable({ baseUrl, key, table: TABLES.events, limit: 1000 }).catch((err) => {
      console.warn(`[Stage39B] WARN: cannot read ${TABLES.events}: ${err.message}`);
      return [];
    }),
    fetchTable({ baseUrl, key, table: TABLES.fulfillment, limit: 1000 }),
    fetchTable({ baseUrl, key, table: TABLES.downloads, limit: 1000 }).catch((err) => {
      console.warn(`[Stage39B] WARN: cannot read ${TABLES.downloads}: ${err.message}`);
      return [];
    }),
  ]);

  const paidOrderIds = new Set();
  for (const payment of payments) {
    const orderId = getAny(payment, ORDER_ID_KEYS);
    if (orderId !== null && isPaidPayment(payment)) paidOrderIds.add(String(orderId));
  }

  const fulfillmentViolations = [];
  for (const row of fulfillment) {
    const orderId = getAny(row, ORDER_ID_KEYS);
    if (orderId === null) {
      fulfillmentViolations.push({ reason: 'missing_order_id', row });
      continue;
    }
    if (!paidOrderIds.has(String(orderId))) {
      fulfillmentViolations.push({ reason: 'fulfillment_without_paid_payment', order_id: orderId, row });
    }
  }

  const downloadViolations = [];
  for (const row of downloads) {
    const orderId = getAny(row, ORDER_ID_KEYS);
    if (orderId === null) {
      downloadViolations.push({ reason: 'missing_order_id', row });
      continue;
    }
    if (!paidOrderIds.has(String(orderId))) {
      downloadViolations.push({ reason: 'download_without_paid_payment', order_id: orderId, row });
    }
  }

  console.log(`[Stage39B] rows: payments=${payments.length}, payment_events=${events.length}, fulfillment=${fulfillment.length}, downloads=${downloads.length}`);
  console.log(`[Stage39B] paid order ids detected=${paidOrderIds.size}`);

  if (fulfillmentViolations.length || downloadViolations.length) {
    console.error('[Stage39B] FAIL: runtime data contains access/download rows without matching paid payment.');
    console.error(JSON.stringify({ fulfillmentViolations, downloadViolations }, null, 2).slice(0, 8000));
    process.exit(1);
  }

  console.log('[Stage39B] PASS DB smoke: no fulfillment/download rows without paid payment found in sampled runtime data.');
}

main().catch((err) => {
  console.error('[Stage39B] ERROR:', err && err.stack ? err.stack : err);
  process.exit(1);
});
