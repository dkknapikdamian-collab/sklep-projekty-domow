# 07_NEXT_STEPS - nastepne kroki

## Najbliższy rekomendowany krok po Etapie 8

Wykonać runtime test pełnej ręcznej realizacji: projekt z prywatnymi plikami -> koszyk z dodatkiem PDF na e-mail -> zamówienie -> panel `/admin/zamowienia` -> sprawdzenie listy plików prywatnych, instrukcji wysyłki i checklisty.

## Zasady dalszej pracy

- Publiczne dane projektów powinny dalej iść tylko przez `lib/project-repository.ts`.
- Nie dodawać bezpośrednich publicznych query do `projects` poza repozytorium.
- Utrzymać guard `verify:public-project-detail-sales-v37` przy każdej zmianie karty produktu.
- Utrzymać guard `verify:cart-order-v38` przy każdej zmianie koszyka, wariantów, dodatków, checkoutu albo headerowych liczników.
- Utrzymać guard `verify:admin-orders-v42` przy każdej zmianie panelu zamówień, statusów, plików zamówienia albo realizacji ręcznej.
- Nie mieszać opcjonalnego PDF na e-mail z podstawową dostawą projektu.
- PDF na e-mail ma pozostać dodatkiem realizowanym po potwierdzeniu płatności i realizacji, nie obietnicą natychmiastowej automatycznej wysyłki.
- Pliki prywatne są widoczne dla admina jako operacyjna instrukcja realizacji, nie jako publiczne linki dla klienta.
- Zamówienia obsługiwać ręcznie statusami `new`, `contacted`, `paid_manual`, `sent`, `cancelled`, dopóki nie ma osobnej decyzji o płatnościach, mailach i automatycznej wysyłce.

## Kolejne możliwe etapy

1. Runtime test `/koszyk` -> `/zamowienie` -> `/admin/zamowienia` z realnymi prywatnymi plikami.
2. Zapis checklisty realizacji w bazie dopiero jako osobny etap, jeśli ręczna checklista statyczna okaże się za słaba.
3. Szablony maili ręcznych dla admina: co wkleić klientowi przy płatności, PDF i ZIP.
4. Linki czasowe, automatyczny mailing i płatności dopiero po osobnej decyzji.
