# 2026-05-17 - Etap 26D / 39A no-reply email i realne platnosci priorytet

## Scan-first confirmation

Tryb: decyzja i plan do wdrozenia, bez zmian w kodzie aplikacji w tej paczce.

## Decyzja Damiana

- No-reply email po platnosci.
- Dwa maile: potwierdzenie platnosci oraz dostep do plikow.
- PDF na e-mail tylko dla klienta, ktory kupil dodatek.
- Bez dodatku PDF wysylac/dawac dostep tylko do bazowych plikow projektu, w szczegolnosci rzutow pomieszczen.
- Realne platnosci online sa priorytetem.

## Rekomendacja AI

Najpierw domknac realne platnosci online i webhook `paid`, potem email outbox z fake providerem, a dopiero potem real provider email z domena, SPF/DKIM/DMARC i no-reply.

## Testy

Kod: bez zmian.
Test automatyczny: nie dotyczy tej paczki decyzyjnej.
Test reczny: DO WYKONANIA po wdrozeniu 39A/26D.

## Obsidian

Paczka aktualizuje roadmapę Obsidiana i tworzy szczegolowa notatke decyzji.

