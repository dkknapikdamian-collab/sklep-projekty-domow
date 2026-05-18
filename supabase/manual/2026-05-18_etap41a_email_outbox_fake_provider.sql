-- Etap 41A / 26D - email_outbox fake-provider
-- Run in Supabase SQL editor before runtime test.
-- No secrets here. No real email provider here.

create table if not exists public.email_outbox (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  payment_id uuid references public.order_payments(id) on delete set null,
  email_type text not null check (email_type in ('payment_confirmation', 'project_files_access')),
  status text not null check (status in ('queued', 'sent', 'failed', 'retry_pending', 'skipped')),
  provider text not null default 'fake_noop',
  recipient_email text not null,
  recipient_name text,
  subject text not null,
  body_text text not null,
  body_html text,
  idempotency_key text not null unique,
  metadata jsonb not null default '{}'::jsonb,
  attempt_count integer not null default 0,
  queued_at timestamptz,
  sent_at timestamptz,
  failed_at timestamptz,
  retry_after timestamptz,
  last_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists email_outbox_order_id_idx on public.email_outbox(order_id);
create index if not exists email_outbox_payment_id_idx on public.email_outbox(payment_id);
create index if not exists email_outbox_status_idx on public.email_outbox(status);
create index if not exists email_outbox_email_type_idx on public.email_outbox(email_type);

comment on table public.email_outbox is 'Transactional email outbox. Etap 41A fake-provider only: no real email send.';
comment on column public.email_outbox.idempotency_key is 'Unique idempotency key: order_id + payment_id + email_type.';
