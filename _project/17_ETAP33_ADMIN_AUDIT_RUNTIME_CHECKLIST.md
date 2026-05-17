# Etap 33 - runtime test admina i audit

Status: TEST RĘCZNY DO WYKONANIA.
Priorytet: 4.
Data przygotowania: 2026-05-17 Europe/Warsaw.

## Cel

Potwierdzić, że realne operacje admina tworzą realne wpisy w Supabase w tabeli `public.admin_audit_log`, a `/admin/audit` pokazuje te wpisy.

## Warunek startu

- Pracuj na projekcie testowym przeznaczonym do usunięcia.
- Nie używaj realnego projektu sprzedażowego do hard delete.
- Przed destrukcyjnym testem sprawdź kod projektu i nazwę.

## Co kliknąć

1. dodanie projektu.
   - Oczekiwany audit action: `project_create`.
2. publikacja.
   - Oczekiwany audit action: `project_status_update` z metadata zawierającym `active` albo odpowiednik publikacji.
3. archiwizacja.
   - Oczekiwany audit action: `project_archive`.
4. usunięcie.
   - Oczekiwany audit action: `project_hard_delete`.
   - Uwaga: tylko na projekcie testowym.
5. media.
   - Oczekiwany audit action: `project_media_delete` albo `project_media_type_update`.
6. pliki prywatne.
   - Oczekiwany audit action: `project_private_file_delete`.
7. zamówienia.
   - Oczekiwany audit action: `order_status_update`.
8. checklisty.
   - Oczekiwany audit action: `order_fulfillment_checklist_update`.
9. `/admin/audit`.
   - Oczekiwane: wpisy są widoczne w UI i zgadzają się z Supabase `admin_audit_log`.

## Jak sprawdzić Supabase

### Opcja A - Node runtime proof

Skrypt V2 wczytuje `.env.local` automatycznie, jeśli ma `NEXT_PUBLIC_SUPABASE_URL` i `SUPABASE_SERVICE_ROLE_KEY` albo równoważny service key.

```powershell
cd "C:\Users\malim\Desktop\biznesy_ai\strony\strona z projektami"
$env:ADMIN_AUDIT_RUNTIME_SINCE_HOURS="24"
npm run audit:admin-runtime-v54
```

Wynik wymagany: wszystkie grupy `PASS`.

### Opcja B - SQL Editor

Skopiuj SQL do schowka:

```powershell
cd "C:\Users\malim\Desktop\biznesy_ai\strony\strona z projektami"
Get-Content ".\supabase\manual\2026-05-17_etap33_admin_audit_runtime_verification.sql" -Raw | Set-Clipboard
```

Wklej w Supabase SQL Editor i uruchom.

Wynik wymagany: wszystkie grupy `PASS`.

## Status zamknięcia

Etap 33 można oznaczyć jako zamknięty dopiero gdy:

- wpisy są realnie w Supabase,
- `/admin/audit` pokazuje wpisy,
- wynik Node/SQL ma wszystkie wymagane grupy `PASS`,
- Damian potwierdzi test ręczny.

## Aktualny status testu

BRAK POTWIERDZONEGO TESTU RĘCZNEGO.
