-- 0015_orders_v42_statuses.sql
-- Align manual order handling statuses with admin orders panel V1.

alter table public.orders
  drop constraint if exists orders_status_check;

update public.orders
set status = case status
  when 'pending_contact' then 'contacted'
  when 'paid' then 'paid_manual'
  when 'completed' then 'sent'
  else status
end
where status in ('pending_contact', 'paid', 'completed');

alter table public.orders
  add constraint orders_status_check check (status in ('new', 'contacted', 'paid_manual', 'sent', 'cancelled'));
