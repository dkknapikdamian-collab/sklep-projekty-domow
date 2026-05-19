-- Etap 42C - email outbox admin view
-- Safe to run after Etap 41A email_outbox table exists.
-- This view does not change the source table. It exposes provider ids kept in metadata by Etap 42B.

create or replace view public.email_outbox_admin_view as
select
  id,
  order_id,
  payment_id,
  email_type,
  status,
  provider,
  recipient_email,
  recipient_name,
  subject,
  idempotency_key,
  attempt_count,
  queued_at,
  sent_at,
  failed_at,
  retry_after,
  last_error,
  metadata ->> 'providerMessageId' as provider_message_id,
  metadata ->> 'resendEmailId' as resend_email_id,
  metadata ->> 'deliveryModel' as delivery_model,
  metadata ->> 'orderReference' as order_reference,
  metadata ->> 'accessUrl' as access_url,
  created_at,
  updated_at
from public.email_outbox;

comment on view public.email_outbox_admin_view is 'Admin-friendly view for transactional email outbox. Etap 42C: supports Resend pre-domain readiness and later production checks.';
