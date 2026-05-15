# 03_CURRENT_STAGE - aktualny etap

Ostatnia aktualizacja: 2026-05-15 10:05 Europe/Warsaw

## Aktualny etap

Etap 8: Pliki prywatne i dostawa ręczna

## Status etapu

Zakończony kodowo w paczce wdrożeniowej. Skrypt wdrożeniowy uruchamia wymagane guardy i build przed commitem oraz pushem.

## Cel etapu

Przygotować logiczną obsługę plików po zakupie bez pełnej automatyzacji. Admin ma wiedzieć z panelu zamówienia, jakie prywatne pliki są przypięte do projektu, czy klient zamówił PDF na e-mail i co trzeba wysłać ręcznie po potwierdzeniu płatności.

## Zakres

- `app/admin/zamowienia/page.tsx`
- `lib/admin/orders-admin.ts`
- `lib/admin/order-files.ts`
- `lib/admin/projects-admin.ts`
- `components/admin/AdminProjectMediaManager.tsx`
- `scripts/check-admin-orders-v42.cjs`
- `scripts/check-admin-project-media-v34.cjs`
- `app/admin-v8.css`
- pliki pamięci projektu w `_project/`

## Co zostało zrobione

- Dodano helper `lib/admin/order-files.ts`, który dla pozycji zamówienia znajduje projekt po kodzie albo slugu i pobiera prywatne pliki z `project_files`.
- Panel `/admin/zamowienia` pokazuje teraz prywatne pliki przypięte do projektu: dokumentację PDF, pełną paczkę ZIP i PDF na e-mail.
- Panel pokazuje, czy pozycja/zamówienie zawiera dodatek PDF na e-mail.
- Dodano instrukcję dla admina: najpierw potwierdzić płatność, potem wysłać właściwe pliki prywatne klientowi.
- Dodano checklistę realizacji: płatność potwierdzona, PDF wysłany, ZIP wysłany, zamówienie zamknięte.
- Panel mediów projektu dostał czytelniejszą informację, że pliki prywatne są źródłem ręcznej realizacji zamówień.
- Guard `verify:admin-orders-v42` pilnuje nowych markerów realizacji ręcznej i blokuje dodanie automatycznego signed URL/mailingu/płatności w tym etapie.
- Guard `verify:admin-project-media-v34` pilnuje markerów prywatnych plików jako źródła realizacji ręcznej.

## Czego nie zmieniano

- Nie dodawano generowania linków czasowych.
- Nie dodawano automatycznej wysyłki e-maili.
- Nie dodawano Stripe, PayU ani innych płatności.
- Nie dodawano nowych tabel Supabase.
- Nie zmieniano publicznego checkoutu poza wcześniejszym Etapem 7.
- Nie zmieniano procesu uploadu prywatnych plików poza opisem i metadanymi widocznymi w panelu.

## Checki wymagane po wdrożeniu

```powershell
npm run verify:admin-project-media-v34
npm run verify:project-media-controls-v34
npm run verify:admin-orders-v42
npm run typecheck
npm run build
npm run check:project-memory
```

## Znane problemy / ryzyka

- Checklisty realizacji są instrukcją operacyjną, nie zapisywanym stanem w bazie.
- Panel nie generuje linków do prywatnych plików; admin musi użyć własnego procesu wysyłki.
- Jeżeli projekt nie ma przypiętego pliku `pdf_email_package` albo `full_package`, panel pokaże brak i admin musi uzupełnić pliki w edycji projektu.

## Następny krok

Wykonać runtime test: zamówienie z dodatkiem PDF na e-mail -> `/admin/zamowienia` -> rozwinąć szczegóły -> sprawdzić prywatne pliki, instrukcję wysyłki i checklistę realizacji.
