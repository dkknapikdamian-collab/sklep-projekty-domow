# 09_CONTEXT_FOR_OBSIDIAN - indeks projektu

## Projekt

`sklep-projekty-domow`

## Aktualny etap

Etap 9: Minimum bezpieczeństwa admina i operacji destrukcyjnych.

## Ostatnia ważna zmiana

2026-05-15 10:35 Europe/Warsaw: usuwanie projektu w panelu admina zostało zabezpieczone wymogiem wpisania kodu projektu oraz walidacją po stronie server action. Naprawiono też zaległe błędy typecheck po Etapie 8 dotyczące `AdminProjectFileItem.bucket` i nullable `supabase` w `lib/admin/order-files.ts`.

## Najważniejsze ustalenia

- fizyczne delete nadal istnieje, ale nie powinno dać się go odpalić jednym szybkim kliknięciem,
- projekt `active` pokazuje dodatkowe ostrzeżenie,
- zwykłe testy nie mogą usuwać realnych projektów produkcyjnych,
- archived-first zostaje sensownym kolejnym etapem bezpieczeństwa.

## Pliki techniczne ważne dla Etapu 9

- `../components/admin/AdminProjectDeleteForm.tsx`
- `../app/admin/projekty/actions.ts`
- `../scripts/check-admin-buttons-v19.cjs`
- `../lib/admin/projects-admin.ts`
- `../lib/admin/order-files.ts`

## Uwaga

Obsidian jest tylko indeksem/dashboardem. Źródłem prawdy pozostaje repo.
