# 03_CURRENT_STAGE - aktualny etap

Ostatnia aktualizacja: 2026-05-15 16:15 Europe/Warsaw

## Aktualny etap

Etap 10: Responsywny, pełnoszeroki layout listy projektów w panelu admina

## Status etapu

Przygotowany w paczce wdrożeniowej. Do potwierdzenia lokalnie przez guardy, build i ręczny test w przeglądarce.

## Cel etapu

Naprawić rozjechaną listę projektów w `/admin/projekty` bez zmiany logiki panelu admina.

## Co zostało zrobione

- Lista projektów dostała osobny pełnoszeroki shell `admin-projects-shell`, zamiast ciasnego kontenera katalogowego.
- Tabela projektów używa szerokości ekranu i ma własny poziomy overflow tylko wtedy, gdy ekran jest za wąski.
- Komórki tabeli są jednowierszowe, z `ellipsis` i `title` dla pełnej treści.
- Nazwa projektu i slug są pokazane w jednej linii.
- Statusy, gotowość, link publiczny, data i akcje nie rozpychają wierszy w pionie.
- Akcje w tabeli są zwarte i w jednej linii; strefa `Usuń projekt` pozostaje zamknięta jako kompaktowy element.
- Widok mobilny nadal używa kart zamiast tabeli.
- Guard `verify:admin-project-list-compact-v41` został zaostrzony pod pełnoszeroki layout i blokadę powrotu do zawijania.

## Czego nie zmieniano

- Nie zmieniano server actions.
- Nie zmieniano routingu.
- Nie zmieniano publicznych stron.
- Nie zmieniano modelu usuwania ani statusów.
- Nie zmieniano danych Supabase.

## Checki wymagane

```powershell
npm run verify:admin-project-list-compact-v41
npm run verify:admin-buttons-v19
npm run typecheck
npm run build
npm run check:project-memory
```

## Następny krok

Po wdrożeniu sprawdzić ręcznie `/admin/projekty` przy szerokości desktopowej: tabela powinna używać prawie całego ekranu, wiersze mają być niskie, a teksty w tabeli mają zostać w jednej linii.
