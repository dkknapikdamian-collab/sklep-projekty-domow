-- SQL_LEDGER_ID: 2026-05-17_etap36_post_payment_fulfillment
-- Typ: MIGRATION
-- Status: DO_URUCHOMIENIA
-- Cel: fundament fulfillmentu po płatności: payment rows, eventy płatności, tokenowany dostęp do plików, logi wydań/linków.
-- Bezpieczeństwo: tabele mają RLS bez polityk publicznych; aplikacja korzysta z server-side service role.

create extension if not exists pgcrypto;

create table if not exists public.order_payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  provider text not null default 'stripe',
  status text not null default 'not_started',
  amount_gross numeric,
  currency text not null default 'pln',
  stripe_checkout_session_id text unique,
  stripe_payment_intent_id text,
  idempotency_key text unique,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  paid_at timestamptz,
  failed_at timestamptz
);

create index if not exists order_payments_order_id_idx on public.order_payments(order_id);
create index if not exists order_payments_status_idx on public.order_payments(status);
create index if not exists order_payments_provider_idx on public.order_payments(provider);

create table if not exists public.payment_events (
  id uuid primary key default gen_random_uuid(),
  provider text not null default 'stripe',
  stripe_event_id text unique,
  event_type text not null,
  order_id uuid references public.orders(id) on delete set null,
  payment_id uuid references public.order_payments(id) on delete set null,
  payload jsonb not null default '{}'::jsonb,
  processed_at timestamptz,
  processing_result text,
  created_at timestamptz not null default now()
);

create index if not exists payment_events_order_id_idx on public.payment_events(order_id);
create index if not exists payment_events_payment_id_idx on public.payment_events(payment_id);
create index if not exists payment_events_event_type_idx on public.payment_events(event_type);

create table if not exists public.order_fulfillment_access (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  payment_id uuid references public.order_payments(id) on delete set null,
  status text not null default 'blocked_until_paid',
  access_token_hash text unique,
  expires_at timestamptz,
  generated_at timestamptz,
  sent_at timestamptz,
  email_status text,
  delivery_email text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists order_fulfillment_access_order_payment_uidx
  on public.order_fulfillment_access(order_id, payment_id);
create index if not exists order_fulfillment_access_order_id_idx on public.order_fulfillment_access(order_id);
create index if not exists order_fulfillment_access_status_idx on public.order_fulfillment_access(status);
create index if not exists order_fulfillment_access_expires_at_idx on public.order_fulfillment_access(expires_at);

create table if not exists public.order_download_events (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  payment_id uuid references public.order_payments(id) on delete set null,
  fulfillment_access_id uuid references public.order_fulfillment_access(id) on delete set null,
  project_file_id uuid references public.project_files(id) on delete set null,
  event_type text not null,
  file_bucket text,
  file_path text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists order_download_events_order_id_idx on public.order_download_events(order_id);
create index if not exists order_download_events_payment_id_idx on public.order_download_events(payment_id);
create index if not exists order_download_events_access_id_idx on public.order_download_events(fulfillment_access_id);
create index if not exists order_download_events_file_id_idx on public.order_download_events(project_file_id);
create index if not exists order_download_events_event_type_idx on public.order_download_events(event_type);

alter table public.order_payments enable row level security;
alter table public.payment_events enable row level security;
alter table public.order_fulfillment_access enable row level security;
alter table public.order_download_events enable row level security;

comment on table public.order_fulfillment_access is 'Etap 36: tokenowany dostęp do prywatnych plików po webhook-confirmed paid payment. Brak publicznych linków.';
comment on table public.order_download_events is 'Etap 36: logi wygenerowania panelu/linków plików po płatności.';
