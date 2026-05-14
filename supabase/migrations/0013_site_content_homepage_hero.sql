-- 0013_site_content_homepage_hero.sql
-- Adds editable homepage hero content and storage bucket for public site media.

create table if not exists public.site_content (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  title text,
  subtitle text,
  body text,
  cta_label text,
  cta_href text,
  image_bucket text,
  image_path text,
  image_public_url text,
  alt text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant select on table public.site_content to anon;
grant select, insert, update, delete on table public.site_content to authenticated;
grant select, insert, update, delete on table public.site_content to service_role;

alter table public.site_content enable row level security;

drop policy if exists "anon can read active site content" on public.site_content;
create policy "anon can read active site content"
  on public.site_content
  for select
  to anon
  using (is_active = true);

drop policy if exists "authenticated can read active site content" on public.site_content;
create policy "authenticated can read active site content"
  on public.site_content
  for select
  to authenticated
  using (public.is_admin() or is_active = true);

drop policy if exists "admins can manage site content" on public.site_content;
create policy "admins can manage site content"
  on public.site_content
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

insert into storage.buckets (id, name, public)
values ('site-media', 'site-media', true)
on conflict (id) do nothing;

drop policy if exists "public can read site media" on storage.objects;
create policy "public can read site media"
  on storage.objects
  for select
  to anon
  using (bucket_id = 'site-media');

drop policy if exists "admins can manage site media" on storage.objects;
create policy "admins can manage site media"
  on storage.objects
  for all
  to authenticated
  using (bucket_id = 'site-media' and public.is_admin())
  with check (bucket_id = 'site-media' and public.is_admin());
