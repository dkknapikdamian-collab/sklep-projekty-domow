-- 0018_order_manual_payment_instruction.sql
-- Etap 17: instrukcja przelewu dla ręcznej płatności w obsłudze zamówienia.

alter table public.order_fulfillment_checklist
  add column if not exists payment_instruction text;
