# Admin lokalnie teraz, Supabase później

## Decyzja

Możemy teraz przygotować panel admina lokalnie, ale budujemy go tak, żeby później przepiąć zapis na Supabase bez wyrzucania UI.

## Co robimy teraz

Dodajemy:

```txt
/admin
/admin/projekty
/admin/projekty/nowy
/admin/projekty/podglad
```

## Co działa lokalnie

- widok panelu admina,
- lista projektów z lokalnego `content/projects`,
- ekran dodawania projektu,
- formularz danych,
- sekcje mediów,
- sekcje pomieszczeń,
- sekcje dodatków,
- podgląd karty projektu jako draft.

## Co nie działa jeszcze

- realne logowanie,
- zapis do Supabase,
- upload do Supabase Storage,
- tworzenie zamówień,
- płatności,
- e-maile.

## Dlaczego to nie jest strata czasu

UI panelu admina zostaje.

Później wymieniamy tylko warstwę:

```txt
local files adapter
```

na:

```txt
Supabase adapter
```

## Zasada

Komponenty admina nie powinny znać szczegółów, czy dane idą do pliku, czy do Supabase.

Docelowo:

```txt
components/admin/*       zostają
app/admin/*              zostaje
lib/projects.ts          będzie przełączone na Supabase
lib/supabase/*           dojdzie
server actions           zaczną zapisywać do Supabase
```

## Ważne

Podgląd karty projektu w adminie nie jest publiczną ofertą.

Nie dodajemy fikcyjnych projektów do publicznego katalogu.
