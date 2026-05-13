-- 0012_project_code_generation.sql
-- Automatic project code generation.
-- Final format: DP-YYYY-NNNN, e.g. DP-2026-0001.

create table if not exists public.project_code_counters (
  year integer primary key,
  last_number integer not null default 0,
  updated_at timestamptz not null default now()
);

grant select, insert, update on table public.project_code_counters to authenticated;
grant select, insert, update on table public.project_code_counters to service_role;

alter table public.project_code_counters enable row level security;

drop policy if exists "admins can manage project code counters" on public.project_code_counters;
create policy "admins can manage project code counters"
  on public.project_code_counters
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create or replace function public.next_project_code(code_prefix text default 'DP')
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  current_year integer := extract(year from now())::integer;
  next_number integer;
  clean_prefix text := upper(regexp_replace(coalesce(code_prefix, 'DP'), '[^A-Z0-9]+', '', 'g'));
begin
  if clean_prefix = '' then
    clean_prefix := 'DP';
  end if;

  insert into public.project_code_counters(year, last_number, updated_at)
  values (current_year, 0, now())
  on conflict (year) do nothing;

  update public.project_code_counters
  set last_number = last_number + 1,
      updated_at = now()
  where year = current_year
  returning last_number into next_number;

  return clean_prefix || '-' || current_year::text || '-' || lpad(next_number::text, 4, '0');
end;
$$;

grant execute on function public.next_project_code(text) to authenticated;
grant execute on function public.next_project_code(text) to service_role;
