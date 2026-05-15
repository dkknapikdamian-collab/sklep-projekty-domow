# 05_MANUAL_TESTS — testy ręczne

## Test ręczny po Etapie 1: panel admina / akcje

Cel: sprawdzić, czy widoczne akcje panelu admina działają realnie, a nie tylko wyglądają jak przyciski.

### 1. Panel admina

Wejdź na:

```text
/admin
```

Sprawdź widoczne kafelki:

- `Projekty` prowadzi do `/admin/projekty`.
- `Dodaj projekt` prowadzi do `/admin/projekty/nowy`.
- `Podglad karty` prowadzi do `/admin/projekty/podglad`.
- `Strona glowna` prowadzi do `/admin/strona-glowna`.
- `Debug admina` prowadzi do `/admin/debug`.
- `Ustawienia sklepu` jest celowo nieaktywne / muted na później.

### 2. Lista projektów

Wejdź na:

```text
/admin/projekty
```

Sprawdź:

1. `Dodaj projekt` otwiera formularz nowego projektu.
2. Wyszukiwarka filtruje projekty po nazwie, kodzie, slug albo statusie.
3. Select statusu filtruje `Wszystkie / Aktywne / Drafty / Niekompletne / Bez zdjec / Bez pomieszczen`.
4. `Wyczyść` resetuje filtry, jeśli są aktywne.
5. Przy każdym projekcie `Edytuj` otwiera `/admin/projekty/[id]/edytuj`.
6. `Podglad publiczny` otwiera `/projekty/[slug]` w nowej karcie.
7. `Ustaw draft` wysyła zmianę statusu i wraca na listę z komunikatem sukcesu.
8. `Ustaw active` działa tylko dla projektów gotowych do publikacji; dla niekompletnych ma być zablokowane albo pokazać braki.
9. `Usuń` pokazuje confirm i usuwa dopiero po potwierdzeniu.

### 3. Edycja projektu

Wejdź z listy przez `Edytuj`.

Sprawdź:

1. `Lista projektow` wraca do `/admin/projekty`.
2. `Podglad publiczny` pokazuje się tylko przy projekcie `active` i otwiera publiczną kartę.
3. Zmiana zwykłego pola, np. podtytułu, plus `Zapisz projekt` zapisuje dane.
4. Po zapisie wracasz na listę albo widzisz komunikat zapisu zgodnie z aktualnym redirectem.
5. `Anuluj` wraca na `/admin/projekty?cancelled=1` i pokazuje komunikat anulowania bez zapisu.
6. Select `Status` w formularzu edycji zapisuje status dopiero po kliknięciu `Zapisz projekt`.
7. `Usuń` w strefie usuwania pokazuje confirm i usuwa dopiero po potwierdzeniu.

### 4. Media w edycji

Na projekcie z mediami sprawdź ostrożnie:

1. `Ustaw jako hero` zmienia typ media na hero.
2. `Ustaw jako miniature` zmienia typ media na thumbnail.
3. `Usun media` usuwa wybrane media po wysłaniu akcji.
4. `Usun plik prywatny` usuwa prywatny plik z listy.

## Komendy po Etapie 1

```powershell
npm run verify:admin-buttons-v19
npm run check:project-memory
```

Rekomendowane przed uznaniem etapu za domknięty lokalnie:

```powershell
npm run typecheck
npm run build
```

## Wynik poprawny

- Guard `verify:admin-buttons-v19` przechodzi.
- Guard `check:project-memory` przechodzi.
- Nie ma martwych przycisków w głównych akcjach admina.
- Edycja, zapis, anulowanie, status i usuwanie są ręcznie potwierdzone.

## Wynik błędny

- Kliknięcie `Edytuj`, `Zapisz projekt`, `Anuluj`, `Ustaw draft`, `Ustaw active` albo `Usuń` nic nie robi.
- Komunikat po akcji nie pojawia się albo pojawia się błędnie.
- Guard przechodzi mimo usunięcia realnego handlera lub linku.
