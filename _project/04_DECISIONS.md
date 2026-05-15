# 04_DECISIONS - decyzje projektowe

| Data | Decyzja | Powod | Skutek | Status |
|---|---|---|---|---|
| 2026-05-14 | Repo jest zrodlem prawdy dla projektu. | Czat i pojedyncze sesje AI gubia kontekst. | Wazne ustalenia maja trafiac do repo. | Aktywna |
| 2026-05-14 | `AGENTS.md` i `_project/` sa obowiazkowa pamiecia projektu. | Kolejni agenci musza startowac z tych samych zasad. | Przed praca trzeba czytac pliki pamieci projektu. | Aktywna |
| 2026-05-14 | Kazdy wiekszy etap musi aktualizowac pamiec projektu. | Bez tego dokumentacja szybko stanie sie martwa. | Aktualizowac aktualny etap, testy, guardy, changelog, Obsidian i run report. | Aktywna |
| 2026-05-14 | Aktywne projekty w katalogu maja byc realne, nie fikcyjne. | README wskazuje produkcyjny format bez fikcyjnych aktywnych projektow. | Dane demonstracyjne nie moga udawac realnej oferty. | Aktywna |
| 2026-05-15 | Projekt przyjmuje globalny workflow Damiana dla pamieci projektu. | Ten sam standard ma obowiazywac w roznych repozytoriach. | `AGENTS.md`, `_project/10_PROJECT_TIMELINE.md`, `_project/history/` i guard pamieci projektu musza byc utrzymywane. | Aktywna |
| 2026-05-15 | Checkout V1 ma brzmiec polprodukcyjnie, nie testowo. | Sklep nie moze wygladac jak zabawka, ale nie wolno udawac automatycznych platnosci ani automatycznej dostawy plikow. | Komunikacja checkoutu mowi o zamowieniu projektu, recznym potwierdzeniu dostepnosci, platnosci i realizacji oraz jasno opisuje PDF na e-mail. | Aktywna |

| 2026-05-15 | Pliki prywatne w Etapie 8 są tylko instrukcją do ręcznej realizacji. | Sklep ma obsłużyć sprzedaż V1 bez udawania automatycznych linków, maili i płatności. | Panel zamówień pokazuje przypięte pliki prywatne, PDF na e-mail i checklistę realizacji, ale nie wysyła nic automatycznie. | Aktywna |
| 2026-05-15 | Operacje destrukcyjne admina muszą mieć twarde potwierdzenie kodem projektu. | Delete usuwa rekord i próbuje usuwać pliki ze Storage, więc sam confirm jest za słaby. | Formularz usuwania wymaga kodu projektu i walidacji po stronie server action. | Aktywna |

| 2026-05-15 | Domyślna ścieżka usuwania projektów to archived-first. | Fizyczne delete jest zbyt ryzykowne jako codzienna akcja admina. | Panel ma używać `Archiwizuj`, a `Usuń trwale` zostaje tylko jako awaryjna operacja po statusie `archived` albo `draft` i po wpisaniu kodu projektu. | Aktywna |

| 2026-05-15 | Ryzykowne operacje admina muszą zostawiać audit log. | Przy archiwizacji, trwałym delete, update projektu i zmianie statusu zamówienia trzeba mieć ślad kto/co/kiedy zrobił. | Dodano tabelę `admin_audit_log`, helper `writeAdminAuditLog` i guard `verify:admin-audit-log-v44`. | Aktywna |
