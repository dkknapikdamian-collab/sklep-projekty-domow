-- SQL_LEDGER_ID: 2026-05-17_etap33_admin_audit_runtime_verification
-- Type: READ_ONLY_VERIFICATION
-- Project: Sklep projekty domow
-- Stage: Etap 33 runtime test admina i audit
-- Purpose: potwierdzic, ze realne klikniecia admina zapisaly wpisy w public.admin_audit_log.
-- Run location: Supabase SQL Editor.
-- Safe: SELECT only, no schema/data mutation.
-- Expected result: all required groups have result = PASS.

with audit_window as (
  select
    created_at,
    action,
    entity_type,
    entity_id,
    metadata
  from public.admin_audit_log
  where created_at >= now() - interval '24 hours'
), required_groups as (
  select * from (values
    ('dodanie projektu', array['project_create']::text[]),
    ('publikacja projektu', array['project_status_update']::text[]),
    ('archiwizacja projektu', array['project_archive']::text[]),
    ('usuniecie projektu', array['project_hard_delete']::text[]),
    ('media projektu', array['project_media_delete','project_media_type_update']::text[]),
    ('pliki prywatne', array['project_private_file_delete']::text[]),
    ('zamowienia', array['order_status_update']::text[]),
    ('checklisty zamowien', array['order_fulfillment_checklist_update']::text[])
  ) as r(group_name, actions)
), matched as (
  select
    r.group_name,
    r.actions,
    count(a.*) as entries,
    max(a.created_at) as last_seen
  from required_groups r
  left join audit_window a on a.action = any(r.actions)
    and (
      r.group_name <> 'publikacja projektu'
      or lower(coalesce(a.metadata::text, '')) like '%active%'
      or lower(coalesce(a.metadata::text, '')) like '%published%'
    )
  group by r.group_name, r.actions
)
select
  group_name,
  case when entries > 0 then 'PASS' else 'FAIL' end as result,
  entries,
  last_seen,
  actions
from matched
order by group_name;

-- Szczegoly wpisow z okna testowego:
select
  created_at,
  action,
  entity_type,
  entity_id,
  metadata
from audit_window
order by created_at desc
limit 100;
