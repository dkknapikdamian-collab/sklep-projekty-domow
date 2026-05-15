-- 0017_order_fulfillment_checklist.sql
-- Etap 15B: utrwalona checklista ręcznej realizacji zamówienia.

create table if not exists public.order_fulfillment_checklist (
  order_id uuid primary key references public.orders(id) on delete cascade,
  payment_confirmed boolean not null default false,
  pdf_sent boolean not null default false,
  zip_sent boolean not null default false,
  order_closed boolean not null default false,
  internal_note text,
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists order_fulfillment_checklist_updated_at_idx
  on public.order_fulfillment_checklist (updated_at desc);
