-- SQL_LEDGER_ID: 2026-05-17_etap34_seed_admin_test_project
-- Type: TEST_DATA_SEED
-- Project: Sklep projekty domow
-- Stage: Etap 34 admin UX stability + project testowy
-- Purpose: dodać/odtworzyć projekt testowy z ładnymi zdjęciami do klików runtime admina.
-- Run location: Supabase SQL Editor.
-- Safe: MUTATES TEST DATA ONLY. NIE URUCHAMIAC na produkcji publicznej bez decyzji Damiana.
-- Status po paczce: DO_URUCHOMIENIA przez Damiana.
-- Public safety: projekt ma status draft, nie active.
-- V4 fix: kolumny projects.features i projects.related_slugs są jsonb, więc seed używa JSONB, nie text[].

do $$
declare
  v_project_id uuid;
begin
  select id into v_project_id
  from public.projects
  where slug = 'admin-test-house-aurora-v34'
  limit 1;

  if v_project_id is null then
    v_project_id := gen_random_uuid();

    insert into public.projects (
      id,
      code,
      short_code,
      slug,
      name,
      subtitle,
      description,
      status,
      price_gross,
      usable_area,
      building_area,
      rooms_count,
      bathrooms_count,
      floors_count,
      building_height,
      min_plot_width,
      min_plot_length,
      type,
      style,
      roof,
      garage,
      technology,
      features,
      related_slugs,
      badge_primary,
      badge_secondary,
      created_at,
      updated_at
    ) values (
      v_project_id,
      'DP-TEST-034',
      'TEST-034',
      'admin-test-house-aurora-v34',
      'Dom Aurora Test',
      'Projekt testowy admina z ładnymi zdjęciami - nie publikować jako realnej oferty.',
      'Projekt testowy do sprawdzania panelu admina, mediów, plików prywatnych, zamówień i audit logu. Nie jest realną ofertą sprzedażową.',
      'draft',
      3490,
      126.4,
      96.2,
      5,
      2,
      1,
      7.2,
      22,
      28,
      'parterowy',
      'nowoczesny',
      'dwuspadowy',
      'bez garażu',
      'murowana',
      '["projekt testowy","duże przeszklenia","nowoczesna stodoła","audit runtime"]'::jsonb,
      '[]'::jsonb,
      'TEST ADMIN',
      'NIE PUBLIKOWAĆ',
      now(),
      now()
    );
  else
    update public.projects set
      code = 'DP-TEST-034',
      short_code = 'TEST-034',
      name = 'Dom Aurora Test',
      subtitle = 'Projekt testowy admina z ładnymi zdjęciami - nie publikować jako realnej oferty.',
      description = 'Projekt testowy do sprawdzania panelu admina, mediów, plików prywatnych, zamówień i audit logu. Nie jest realną ofertą sprzedażową.',
      status = 'draft',
      price_gross = 3490,
      usable_area = 126.4,
      building_area = 96.2,
      rooms_count = 5,
      bathrooms_count = 2,
      floors_count = 1,
      building_height = 7.2,
      min_plot_width = 22,
      min_plot_length = 28,
      type = 'parterowy',
      style = 'nowoczesny',
      roof = 'dwuspadowy',
      garage = 'bez garażu',
      technology = 'murowana',
      features = '["projekt testowy","duże przeszklenia","nowoczesna stodoła","audit runtime"]'::jsonb,
      related_slugs = '[]'::jsonb,
      badge_primary = 'TEST ADMIN',
      badge_secondary = 'NIE PUBLIKOWAĆ',
      updated_at = now()
    where id = v_project_id;
  end if;

  delete from public.project_rooms where project_id = v_project_id;
  insert into public.project_rooms (project_id, floor, number, name, area, dimensions, sort_order) values
    (v_project_id, 'Parter', '1.01', 'Salon z jadalnią', 34.8, '7.1 x 4.9 m', 10),
    (v_project_id, 'Parter', '1.02', 'Kuchnia', 10.6, '3.8 x 2.8 m', 20),
    (v_project_id, 'Parter', '1.03', 'Sypialnia główna', 15.2, '4.1 x 3.7 m', 30),
    (v_project_id, 'Parter', '1.04', 'Pokój', 11.4, '3.6 x 3.2 m', 40),
    (v_project_id, 'Parter', '1.05', 'Pokój / gabinet', 10.9, '3.5 x 3.1 m', 50),
    (v_project_id, 'Parter', '1.06', 'Łazienka', 6.2, '2.8 x 2.2 m', 60),
    (v_project_id, 'Parter', '1.07', 'Pomieszczenie techniczne', 5.8, '2.9 x 2.0 m', 70);

  delete from public.project_variants where project_id = v_project_id;
  insert into public.project_variants (project_id, name, price_gross, sort_order, active) values
    (v_project_id, 'Wersja podstawowa PDF', 3490, 10, true),
    (v_project_id, 'Wersja PDF + kosztorys testowy', 3990, 20, true);

  delete from public.project_addons where project_id = v_project_id;
  insert into public.project_addons (project_id, code, name, description, price_gross, delivery_action, sort_order) values
    (v_project_id, 'PDF_EMAIL_TEST', 'Projekt w formacie PDF na e-mail - test', 'Test dodatku +250 zł dla flow koszyka i zamówień.', 250, 'manual_email', 10);

  delete from public.project_media where project_id = v_project_id;
  insert into public.project_media (project_id, bucket, path, media_type, title, alt, sort_order, public_url) values
    (v_project_id, 'project-media', 'DP-TEST-034/hero.jpg', 'hero', 'Hero - nowoczesny dom testowy', 'Nowoczesny dom testowy z dużymi przeszkleniami', 1, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=82'),
    (v_project_id, 'project-media', 'DP-TEST-034/thumbnail.jpg', 'thumbnail', 'Miniatura - Dom Aurora Test', 'Miniatura projektu testowego', 2, 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=82'),
    (v_project_id, 'project-media', 'DP-TEST-034/gallery-01.jpg', 'gallery', 'Galeria 1', 'Salon z dużymi przeszkleniami', 10, 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=82'),
    (v_project_id, 'project-media', 'DP-TEST-034/gallery-02.jpg', 'gallery', 'Galeria 2', 'Nowoczesna elewacja domu', 11, 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=82'),
    (v_project_id, 'project-media', 'DP-TEST-034/floor-plan-ground.jpg', 'floor_plan', 'Rzut parteru - placeholder testowy', 'Rzut parteru testowy', 100, 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=82'),
    (v_project_id, 'project-media', 'DP-TEST-034/elevation-front.jpg', 'elevation', 'Elewacja frontowa - placeholder testowy', 'Elewacja frontowa testowa', 200, 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1600&q=82');

  delete from public.project_files where project_id = v_project_id;
  insert into public.project_files (project_id, bucket, path, file_type, title, version) values
    (v_project_id, 'project-private-files', 'DP-TEST-034/documentation-v1.pdf', 'documentation', 'Dokumentacja PDF - test', 'v1'),
    (v_project_id, 'project-private-files', 'DP-TEST-034/full-package-v1.zip', 'full_package', 'Pełna paczka ZIP - test', 'v1'),
    (v_project_id, 'project-private-files', 'DP-TEST-034/pdf-email-package-v1.pdf', 'pdf_email_package', 'PDF na e-mail - test', 'v1');
end $$;

select id, code, slug, name, status
from public.projects
where slug = 'admin-test-house-aurora-v34';
