-- Etap 39B - Stripe runtime diagnostics
-- Cel: diagnostyka test-mode po realnym webhooku Stripe 39A.
-- Uruchamiaj w Supabase SQL Editor po wykonaniu testowego checkoutu i webhooka Stripe CLI.
-- Ten plik nie modyfikuje trwałych tabel. Używa tylko pg_temp.* funkcji diagnostycznych.

-- 0) Szybki snapshot schematu wymaganych tabel.
select
  c.table_name,
  c.ordinal_position,
  c.column_name,
  c.data_type,
  c.is_nullable
from information_schema.columns c
where c.table_schema = 'public'
  and c.table_name in (
    'order_payments',
    'payment_events',
    'order_fulfillment_access',
    'order_download_events'
  )
order by c.table_name, c.ordinal_position;

-- 1) Snapshot liczby rekordów w tabelach runtime.
select
  t.table_name,
  case when c.table_name is null then 'MISSING' else 'EXISTS' end as table_status
from (values
  ('order_payments'),
  ('payment_events'),
  ('order_fulfillment_access'),
  ('order_download_events')
) as t(table_name)
left join information_schema.tables c
  on c.table_schema = 'public'
 and c.table_name = t.table_name;

-- 2) Funkcja pomocnicza: bezpieczny podgląd ostatnich rekordów jako JSONB.
create or replace function pg_temp.stage39b_recent_rows(_table text, _limit integer default 20)
returns table(table_name text, row_json jsonb)
language plpgsql
as $$
declare
  order_col text;
  sql text;
begin
  if not exists (
    select 1 from information_schema.tables
    where table_schema = 'public' and table_name = _table
  ) then
    return;
  end if;

  select column_name into order_col
  from information_schema.columns
  where table_schema = 'public'
    and table_name = _table
    and column_name in ('created_at', 'inserted_at', 'updated_at', 'id')
  order by case column_name
    when 'created_at' then 1
    when 'inserted_at' then 2
    when 'updated_at' then 3
    when 'id' then 4
    else 99
  end
  limit 1;

  sql := format(
    'select %L::text as table_name, to_jsonb(x) as row_json from (select * from public.%I %s limit %s) x',
    _table,
    _table,
    case when order_col is null then '' else format('order by %I desc', order_col) end,
    _limit
  );

  return query execute sql;
end;
$$;

select * from pg_temp.stage39b_recent_rows('order_payments', 20);
select * from pg_temp.stage39b_recent_rows('payment_events', 20);
select * from pg_temp.stage39b_recent_rows('order_fulfillment_access', 20);
select * from pg_temp.stage39b_recent_rows('order_download_events', 20);

-- 3) Funkcja pomocnicza: znajdź fulfillment/download bez płatności paid/succeeded/completed.
-- Zakłada, że tabele mają kolumnę order_id. Jeśli jej nie mają, wynik SCHEMA_MISSING_ORDER_ID jest FAIL diagnostyczny.
create or replace function pg_temp.stage39b_access_without_paid()
returns table(check_name text, result_status text, row_json jsonb)
language plpgsql
as $$
declare
  pay_status_col text;
  has_pay_order boolean;
  has_fulfillment_order boolean;
  has_download_order boolean;
  sql text;
begin
  select exists (
    select 1 from information_schema.columns
    where table_schema='public' and table_name='order_payments' and column_name='order_id'
  ) into has_pay_order;

  select exists (
    select 1 from information_schema.columns
    where table_schema='public' and table_name='order_fulfillment_access' and column_name='order_id'
  ) into has_fulfillment_order;

  select exists (
    select 1 from information_schema.columns
    where table_schema='public' and table_name='order_download_events' and column_name='order_id'
  ) into has_download_order;

  select column_name into pay_status_col
  from information_schema.columns
  where table_schema='public'
    and table_name='order_payments'
    and column_name in ('payment_status','status','stripe_status','stripe_payment_status','checkout_status')
  order by case column_name
    when 'payment_status' then 1
    when 'status' then 2
    when 'stripe_status' then 3
    when 'stripe_payment_status' then 4
    when 'checkout_status' then 5
    else 99
  end
  limit 1;

  if not has_pay_order or pay_status_col is null then
    return query select 'schema_payment_paid_detection'::text, 'FAIL_SCHEMA_MISSING_ORDER_ID_OR_STATUS'::text,
      jsonb_build_object('has_pay_order', has_pay_order, 'pay_status_col', pay_status_col);
    return;
  end if;

  if not has_fulfillment_order then
    return query select 'schema_fulfillment_order_id'::text, 'FAIL_SCHEMA_MISSING_ORDER_ID'::text, '{}'::jsonb;
  else
    sql := format($fmt$
      select 'fulfillment_without_paid'::text, 'FAIL'::text, to_jsonb(f)
      from public.order_fulfillment_access f
      where not exists (
        select 1
        from public.order_payments p
        where p.order_id::text = f.order_id::text
          and lower(coalesce(p.%I::text,'')) in ('paid','succeeded','complete','completed')
      )
      limit 50
    $fmt$, pay_status_col);
    return query execute sql;
  end if;

  if has_download_order then
    sql := format($fmt$
      select 'download_without_paid'::text, 'FAIL'::text, to_jsonb(d)
      from public.order_download_events d
      where not exists (
        select 1
        from public.order_payments p
        where p.order_id::text = d.order_id::text
          and lower(coalesce(p.%I::text,'')) in ('paid','succeeded','complete','completed')
      )
      limit 50
    $fmt$, pay_status_col);
    return query execute sql;
  else
    return query select 'schema_download_order_id'::text, 'SKIP_NO_ORDER_ID_OR_TABLE'::text, '{}'::jsonb;
  end if;

  return;
end;
$$;

-- Jeżeli poniższe zapytanie zwraca rekordy z result_status = FAIL, 39B NIE przechodzi.
select * from pg_temp.stage39b_access_without_paid();

-- 4) PASS check syntetyczny: wygodny wynik końcowy.
with violations as (
  select * from pg_temp.stage39b_access_without_paid()
)
select
  case
    when exists (select 1 from violations where result_status like 'FAIL%') then 'FAIL'
    else 'PASS_OR_SKIP'
  end as stage39b_no_fulfillment_without_paid_status,
  count(*) filter (where result_status like 'FAIL%') as fail_count,
  count(*) filter (where result_status like 'SKIP%') as skip_count;
