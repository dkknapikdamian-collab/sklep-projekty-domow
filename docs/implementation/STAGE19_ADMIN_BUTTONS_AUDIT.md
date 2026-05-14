# STAGE19_ADMIN_BUTTONS_AUDIT

## Cel
Domknąć audyt realnych przycisków w panelu admina projektów i nie zostawiać atrap.

## Stan po wdrożeniu
- `Edytuj` prowadzi do `/admin/projekty/[id]/edytuj`.
- Zmiana statusu na liście jest prawdziwym formularzem server action `updateProjectStatusAction`.
- Usuwanie projektu używa `deleteProjectAction` i wymaga potwierdzenia `window.confirm`.
- Formularz edycji używa `updateProjectBasicsAction`.
- `Zapisz dane` pokazuje stan pending przez `AdminSubmitButton`.
- `Anuluj` wraca do listy z komunikatem `cancelled=1`, więc użytkownik widzi jasny efekt.
- Lista pokazuje komunikaty po `status=updated`, `deleted=1`, `cancelled=1`.

## Ryzyko
To nie jest jeszcze pełny audyt całego panelu admina, tylko obszaru projektów: lista, edycja, status, usuwanie i feedback formularzy. Jeżeli później dojdą media, warianty albo pliki prywatne w edycji, wymagają osobnego guardu.

## Guard
`scripts/check-admin-buttons-v19.cjs`
