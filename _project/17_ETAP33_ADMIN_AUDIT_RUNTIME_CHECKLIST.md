# Etap 33 - runtime checklist admin audit

Status: TEST RĘCZNY CZĘŚCIOWO POTWIERDZONY PRZEZ DAMIANA / ETAP NIEZAMKNIĘTY.

## Kryterium

Wpisy audit muszą realnie być w Supabase w `public.admin_audit_log`.

## Wynik SQL Damiana

### PASS

- dodanie projektu - `project_create`
- publikacja projektu - `project_status_update`
- archiwizacja projektu - `project_archive`
- usunięcie projektu - `project_hard_delete`

### FAIL / DO WYKONANIA

- media projektu - `project_media_delete` albo `project_media_type_update`
- pliki prywatne - `project_private_file_delete`
- zamówienia - `order_status_update`
- checklisty zamówień - `order_fulfillment_checklist_update`

## Następne kliknięcia

1. Media projektu:
   - zmień typ mediów albo usuń media testowe.

2. Pliki prywatne:
   - usuń prywatny plik testowy z projektu.

3. Zamówienia:
   - zmień status zamówienia w adminie.

4. Checklisty zamówień:
   - zmień checklistę realizacji zamówienia.

## SQL proof

Uruchom w Supabase SQL Editor:

`supabase/manual/2026-05-17_etap33_admin_audit_runtime_verification.sql`

## Status końcowy

Etap 33 można zamknąć dopiero przy 8 PASS / 0 FAIL.
