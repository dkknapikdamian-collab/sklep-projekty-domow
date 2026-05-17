# ETAP26B - private files UX

## Cel

Domknąć admin UX prywatnych plików projektu po Etapie 26A.

## Zakres V13

- Prywatny upload `floorPlansPrivateFile`.
- Typ pliku `floor_plans`.
- Etykieta `Rzuty pomieszczeń PDF`.
- Aktywuj/dezaktywuj prywatny plik bez usuwania ze storage.
- Audit `project_private_file_status_update`.
- `floor_plans` w checklistach zamówień.
- Brak Google Drive i brak publicznych linków w prywatnych plikach.

## Test ręczny

1. Wejść w edycję projektu.
2. Dodać PDF rzutów pomieszczeń.
3. Zapisać projekt.
4. Potwierdzić widoczność `floor_plans` w panelu prywatnych plików.
5. Dezaktywować plik.
6. Aktywować plik.
7. Sprawdzić `/admin/audit`.
