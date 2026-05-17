-- SQL_LEDGER_ID: 2026-05-17_etap26a_project_files_model
-- Typ: MIGRATION
-- Status: URUCHOMIONE / POTWIERDZONE PRZEZ DAMIANA 2026-05-17
-- Cel: rozszerzenie project_files pod Supabase Storage, publikacje i fulfillment po platnosci.
-- Bezpieczenstwo: ALTER TABLE + bez publicznych polityk; nie tworzy publicznych linkow.

alter table if exists public.project_files
  add column if not exists active boolean not null default true;

alter table if exists public.project_files
  add column if not exists auto_send_after_payment boolean not null default false;

alter table if exists public.project_files
  add column if not exists required_for_publication boolean not null default false;

alter table if exists public.project_files
  add column if not exists sort_order integer not null default 100;

alter table if exists public.project_files
  add column if not exists metadata jsonb not null default '{}'::jsonb;

alter table if exists public.project_files
  add column if not exists updated_at timestamptz not null default now();

update public.project_files
set
  active = coalesce(active, true),
  required_for_publication = case when lower(coalesce(file_type, '')) in ('documentation', 'pdf') then true else coalesce(required_for_publication, false) end,
  auto_send_after_payment = case when lower(coalesce(file_type, '')) in ('documentation', 'pdf', 'pdf_email_package', 'pdf_email', 'floor_plans') then true else coalesce(auto_send_after_payment, false) end,
  sort_order = case lower(coalesce(file_type, '')) when 'documentation' then 10 when 'pdf' then 10 when 'floor_plans' then 20 when 'pdf_email_package' then 30 when 'pdf_email' then 30 when 'full_package' then 40 when 'cost_estimate' then 50 else coalesce(sort_order, 100) end,
  metadata = coalesce(metadata, '{}'::jsonb) || jsonb_build_object('etap26a_project_files_model', true),
  updated_at = now();

create index if not exists project_files_project_active_idx on public.project_files(project_id, active);
create index if not exists project_files_project_required_idx on public.project_files(project_id, required_for_publication) where active = true;
create index if not exists project_files_project_auto_send_idx on public.project_files(project_id, auto_send_after_payment) where active = true;

comment on table public.project_files is 'Etap 26A: prywatne pliki projektow w Supabase Storage. Kanoniczne zrodlo plikow zakupowych i fulfillmentu po platnosci.';
comment on column public.project_files.active is 'Etap 26A: czy plik jest aktywny w publikacji i fulfillment.';
comment on column public.project_files.auto_send_after_payment is 'Etap 26A: czy plik moze byc wydany automatycznie po statusie paid.';
comment on column public.project_files.required_for_publication is 'Etap 26A: czy brak pliku blokuje publikacje projektu.';
