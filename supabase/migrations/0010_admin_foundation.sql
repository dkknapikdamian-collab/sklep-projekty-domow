-- 0010_admin_foundation.sql
-- Supabase foundation for admin auth and projects.
-- Run in Supabase SQL Editor after reviewing.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text not null default 'customer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant select, insert, update, delete on table public.profiles to authenticated;
grant select, insert, update, delete on table public.profiles to service_role;

alter table public.profiles enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
    and role = 'admin'
  );
$$;

grant execute on function public.is_admin() to authenticated;
grant execute on function public.is_admin() to service_role;

drop policy if exists "users can read own profile" on public.profiles;
create policy "users can read own profile"
  on public.profiles
  for select
  to authenticated
  using (id = auth.uid());

drop policy if exists "admins can manage profiles" on public.profiles;
create policy "admins can manage profiles"
  on public.profiles
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  short_code text,
  slug text not null unique,
  name text not null,
  subtitle text,
  description text,
  price_gross numeric not null default 0,
  badge_primary text,
  badge_secondary text,
  status text not null default 'draft',
  type text,
  style text,
  roof text,
  garage text,
  technology text,
  usable_area numeric,
  building_area numeric,
  rooms_count integer,
  bathrooms_count integer,
  floors_count integer,
  building_height numeric,
  min_plot_width numeric,
  min_plot_length numeric,
  features jsonb not null default '[]'::jsonb,
  related_slugs jsonb not null default '[]'::jsonb,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant select on table public.projects to anon;
grant select, insert, update, delete on table public.projects to authenticated;
grant select, insert, update, delete on table public.projects to service_role;

alter table public.projects enable row level security;

drop policy if exists "anon can read active projects" on public.projects;
create policy "anon can read active projects"
  on public.projects
  for select
  to anon
  using (status = 'active');

drop policy if exists "authenticated can read projects" on public.projects;
create policy "authenticated can read projects"
  on public.projects
  for select
  to authenticated
  using (status = 'active' or public.is_admin());

drop policy if exists "admins can manage projects" on public.projects;
create policy "admins can manage projects"
  on public.projects
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create table if not exists public.project_rooms (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  floor text not null,
  number text,
  name text not null,
  area numeric not null default 0,
  dimensions text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

grant select on table public.project_rooms to anon;
grant select, insert, update, delete on table public.project_rooms to authenticated;
grant select, insert, update, delete on table public.project_rooms to service_role;

alter table public.project_rooms enable row level security;

drop policy if exists "anon can read rooms for active projects" on public.project_rooms;
create policy "anon can read rooms for active projects"
  on public.project_rooms
  for select
  to anon
  using (
    exists (
      select 1 from public.projects
      where projects.id = project_rooms.project_id
      and projects.status = 'active'
    )
  );

drop policy if exists "authenticated can read rooms" on public.project_rooms;
create policy "authenticated can read rooms"
  on public.project_rooms
  for select
  to authenticated
  using (
    public.is_admin()
    or exists (
      select 1 from public.projects
      where projects.id = project_rooms.project_id
      and projects.status = 'active'
    )
  );

drop policy if exists "admins can manage rooms" on public.project_rooms;
create policy "admins can manage rooms"
  on public.project_rooms
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create table if not exists public.project_addons (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete cascade,
  code text not null,
  name text not null,
  description text,
  price_gross numeric not null default 0,
  delivery_action text,
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

grant select on table public.project_addons to anon;
grant select, insert, update, delete on table public.project_addons to authenticated;
grant select, insert, update, delete on table public.project_addons to service_role;

alter table public.project_addons enable row level security;

drop policy if exists "anon can read active addons for active projects" on public.project_addons;
create policy "anon can read active addons for active projects"
  on public.project_addons
  for select
  to anon
  using (
    active = true
    and exists (
      select 1 from public.projects
      where projects.id = project_addons.project_id
      and projects.status = 'active'
    )
  );

drop policy if exists "admins can manage addons" on public.project_addons;
create policy "admins can manage addons"
  on public.project_addons
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create table if not exists public.project_media (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  bucket text not null default 'project-media',
  path text not null,
  media_type text not null,
  title text,
  alt text,
  sort_order integer not null default 0,
  public_url text,
  created_at timestamptz not null default now()
);

grant select on table public.project_media to anon;
grant select, insert, update, delete on table public.project_media to authenticated;
grant select, insert, update, delete on table public.project_media to service_role;

alter table public.project_media enable row level security;

drop policy if exists "anon can read media for active projects" on public.project_media;
create policy "anon can read media for active projects"
  on public.project_media
  for select
  to anon
  using (
    exists (
      select 1 from public.projects
      where projects.id = project_media.project_id
      and projects.status = 'active'
    )
  );

drop policy if exists "admins can manage media" on public.project_media;
create policy "admins can manage media"
  on public.project_media
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create table if not exists public.project_files (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  bucket text not null default 'project-private-files',
  path text not null,
  file_type text not null,
  title text,
  version text not null default 'v1',
  created_at timestamptz not null default now()
);

grant select, insert, update, delete on table public.project_files to authenticated;
grant select, insert, update, delete on table public.project_files to service_role;

alter table public.project_files enable row level security;

drop policy if exists "admins can manage private files" on public.project_files;
create policy "admins can manage private files"
  on public.project_files
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

insert into storage.buckets (id, name, public)
values
  ('project-media', 'project-media', true),
  ('project-private-files', 'project-private-files', false)
on conflict (id) do nothing;

drop policy if exists "public can read project media" on storage.objects;
create policy "public can read project media"
  on storage.objects
  for select
  to anon
  using (bucket_id = 'project-media');

drop policy if exists "admins can manage project media" on storage.objects;
create policy "admins can manage project media"
  on storage.objects
  for all
  to authenticated
  using (bucket_id in ('project-media', 'project-private-files') and public.is_admin())
  with check (bucket_id in ('project-media', 'project-private-files') and public.is_admin());
