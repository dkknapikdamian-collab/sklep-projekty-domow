<!-- ETAP35A_STRIPE_PROVIDER_DECISION_2026_05_17_START -->
## 2026-05-17 - Etap 35A: Stripe jako provider płatności V1.1

Status: DECYZJA DAMIANA.

Damian potwierdził, że dla automatycznych płatności wybieramy Stripe jako pierwszy provider.

Decyzja dotyczy kierunku implementacji 35B. Nie oznacza jeszcze uruchomienia płatności live, publikacji klientom, automatycznej wysyłki plików ani faktur.
<!-- ETAP35A_STRIPE_PROVIDER_DECISION_2026_05_17_END -->

﻿# 04_DECISIONS - Aktywne decyzje projektu

## Jak czytać ten plik

Tu są wyłącznie aktywne decyzje. Pomysły i kierunki niezatwierdzone trafiają do sekcji „Hipotezy / propozycje”.

## Aktywne decyzje

### 1. Projekt jest aplikacją sklepową, nie statycznym HTML

- Źródło: ustalenia Damiana i obecny kierunek prac.
- Uzasadnienie: sklep wymaga katalogu, koszyka, checkoutu, panelu admina, danych projektów i docelowo storage plików.
- Status: aktywna decyzja.
- Co zmieniłoby decyzję: wyraźna decyzja Damiana o zrobieniu tylko landing page / makiety.

### 2. Preferowany stack to React/Next.js + baza danych + storage + panel admina

- Źródło: ustalenia projektu i aktualna struktura aplikacji.
- Uzasadnienie: potrzebny jest produkt sklepowy, nie ręczne strony HTML.
- Status: aktywna decyzja.
- Co zmieniłoby decyzję: decyzja o migracji technologii z uzasadnieniem kosztu/ryzyka.

### 3. Publiczny katalog pokazuje tylko realne, aktywne/opublikowane projekty

- Źródło: decyzja projektowa Damiana.
- Uzasadnienie: nie wolno sprzedawać fikcyjnych projektów jako realnych ofert.
- Status: aktywna decyzja.
- Co zmieniłoby decyzję: nic bez jasnej zmiany modelu biznesowego i oznaczenia treści jako demo/concept.

### 4. Wygenerowane wizualizacje są referencją, nie treścią produkcyjną

- Źródło: ustalenia projektu.
- Uzasadnienie: wizualny kierunek może inspirować styl, ale nie może udawać gotowej dokumentacji.
- Status: aktywna decyzja.
- Co zmieniłoby decyzję: legalne i techniczne przygotowanie realnego projektu z pełnymi prawami i dokumentacją.

### 5. Zakup jako gość jest ważniejszy niż konto klienta w V1

- Źródło: ustalenia kierunku V1.
- Uzasadnienie: mniejszy tarcie zakupowe, prostszy MVP.
- Status: aktywna decyzja.
- Co zmieniłoby decyzję: konieczność panelu klienta od razu, np. przez wymagania prawne, licencyjne albo obsługę pobrań.

### 6. Logowanie jest głównie dla admina

- Źródło: ustalenia zakresu.
- Uzasadnienie: admin musi zarządzać projektami; klient nie musi mieć konta w V1.
- Status: aktywna decyzja.
- Co zmieniłoby decyzję: decyzja o panelu klienta w V1.

### 7. Każdy projekt ma mieć stały kod

- Źródło: ustalenia projektu, przykład `DP-AUR-014`.
- Uzasadnienie: kod porządkuje katalog, foldery mediów, zamówienia i komunikację z klientem.
- Status: aktywna decyzja.
- Co zmieniłoby decyzję: brak sensownego powodu do zmiany; raczej tylko zmiana formatu kodu.

### 8. Dane projektów mają być dodawane przez panel admina

- Źródło: kierunek aplikacji.
- Uzasadnienie: Damian nie ma ręcznie edytować kodu przy każdym nowym projekcie.
- Status: aktywna decyzja.
- Co zmieniłoby decyzję: tymczasowy import CSV/JSON jako etap przejściowy, ale docelowy admin zostaje.

### 9. Dodatek `Projekt w formacie PDF na e-mail` kosztuje +250 zł

- Źródło: decyzja Damiana z 2026-05-13.
- Uzasadnienie: dodatkowa wygodna forma dostarczenia/archiwizacji PDF na e-mail.
- Status: aktywna decyzja.
- Co zmieniłoby decyzję: zmiana ceny albo modelu dostawy przez Damiana.

### 10. Dodatek PDF e-mail nie może kolidować z bazową dostawą cyfrową

- Źródło: interpretacja zatwierdzona jako rekomendowany kierunek.
- Uzasadnienie: klient nie może odnieść wrażenia, że płaci 250 zł za coś, co jest podstawą zakupu, jeśli bazowa oferta obejmuje dokumentację cyfrową.
- Status: aktywna decyzja operacyjna.
- Co zmieniłoby decyzję: inny model produktu opisany jawnie w regulaminie/ofercie.

### 11. Każda istotna zmiana projektu ma aktualizować repo i Obsidiana

- Źródło: globalne zasady pracy Damiana.
- Uzasadnienie: czat nie jest źródłem prawdy; projekt ma mieć pamięć w plikach.
- Status: aktywna decyzja.
- Co zmieniłoby decyzję: brak.

## Hipotezy / propozycje, nie decyzje

### HIPOTEZA / PROPOZYCJA - Etap po pamięci: stabilizacja pełnej ścieżki zakupu

Najrozsądniej po tym etapie przejść przez ścieżkę:

`aktywny projekt -> katalog -> karta projektu -> koszyk -> checkout -> zamówienie -> admin widzi zamówienie`

To jest propozycja kolejności prac, nie decyzja o wdrożeniu w tym commitcie.

### HIPOTEZA / PROPOZYCJA - najpierw zamówienie/formularz, płatność online później

Jeśli płatności produkcyjne spowolnią projekt, można rozważyć V1 z zamówieniem i ręczną obsługą płatności, a płatności online wdrożyć później.

Nie wdrażać bez decyzji Damiana.

## Decyzje porzucone / nieaktywne

- Czysty HTML jako produkcyjny sklep: porzucone.
- Fikcyjne projekty jako realne oferty: zakazane.
- Panel klienta jako konieczny element V1: odłożone do V2/później.

<!-- SKLEP_FULL_MEMORY_OBSIDIAN_REPO_V6_2026_05_15 START -->

## Product and operational decisions confirmed in memory - 2026-05-15 22:12:34

- Production store, not static HTML.
- Browsing without login.
- Guest checkout allowed.
- Admin login is primary login use case.
- Private order/download link can replace customer account.
- Stable project code required.
- Production catalog only real active/published projects.
- Fictional data only dev/seed/demo, never real offer.
- Add-on Projekt w formacie PDF na e-mail costs +250 zl and is an extra email PDF package/copy.
- Repo is the source of truth for code/project memory; Obsidian is dashboard/index.

<!-- SKLEP_FULL_MEMORY_OBSIDIAN_REPO_V6_2026_05_15 END -->


## Guard wording fix - 2026-05-15

- DECYZJA: projekt jest prowadzony jako aplikacja sklepowa do sprzedaży projektów domów, a nie jako statyczna strona HTML.

## Guard wording fix - komplet fraz V6 - 2026-05-15

- DECYZJA: Katalog produkcyjny może pokazywać tylko realne projekty dodane przez admina i aktywnie opublikowane; dane fikcyjne mogą być wyłącznie demo/dev/seed.

<!-- ETAP28_STAGE53_DEMO_SAMPLE_CLEANUP_DECISION -->
## 2026-05-16 - Etap 28 / STAGE53: demo/sample nie jest oferta

DECYZJA:
- Sample project moze istniec tylko jako narzedzie testowe admina.
- Sample nie moze byc domyslnie active.
- Publiczny katalog ma blokowac demo/sample niezaleznie od statusu.
<!-- ETAP28_STAGE53_DEMO_SAMPLE_CLEANUP_DECISION -->

<!-- ETAP42A_RESEND_PROVIDER_DECISION_START -->
## Etap 42A - decyzja Resend i model dostępu przez link

Status: DECYZJA ZAPISANA / DO WDROŻENIA W ETAPIE 42B.
Data: 2026-05-18.

### Decyzje Damiana

- Resend jest wybranym providerem e-mail V1.1.
- Automatyczne e-maile mają iść po webhook-confirmed paid.
- Pliki projektu, rzuty i paczki ZIP nie idą jako załączniki.
- E-mail zawiera potwierdzenie i bezpieczny link do panelu pobrania.
- Ręczne szablony w adminie zostają jako fallback, nie główny flow.

### Sekrety / konfiguracja

- EMAIL_PROVIDER=resend
- RESEND_API_KEY
- EMAIL_FROM
- EMAIL_REPLY_TO

Sekrety tylko w Cloudflare, bez commitowania do repo.

### Guard

- npm run verify:resend-provider-decision-v42a

### Następny krok

Etap 42B - realna integracja Resend z email_outbox.
<!-- ETAP42A_RESEND_PROVIDER_DECISION_END -->
