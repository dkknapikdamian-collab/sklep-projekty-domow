-- 0014_orders_v1.sql
-- Test-order checkout V1. No automatic payment capture or private-file delivery.

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'new',
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  invoice_data jsonb,
  notes text,
  consents jsonb not null default '{}'::jsonb,
  total_gross numeric not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint orders_status_check check (status in ('new', 'pending_contact', 'paid', 'cancelled', 'completed'))
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  project_code text not null,
  project_slug text not null,
  project_name text not null,
  variant_name text not null,
  base_price_gross numeric not null default 0,
  variant_price_gross numeric not null default 0,
  item_total_gross numeric not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.order_item_addons (
  id uuid primary key default gen_random_uuid(),
  order_item_id uuid not null references public.order_items(id) on delete cascade,
  addon_code text not null,
  addon_name text not null,
  price_gross numeric not null default 0,
  delivery_action text,
  created_at timestamptz not null default now()
);

grant select, insert, update on table public.orders to service_role;
grant select, insert, update on table public.order_items to service_role;
grant select, insert, update on table public.order_item_addons to service_role;

alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.order_item_addons enable row level security;
