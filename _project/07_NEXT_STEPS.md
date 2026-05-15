# 07_NEXT_STEPS — następne kroki

## Najbliższe kroki po Etapie 1

1. Ręcznie przejść panel admina w przeglądarce i potwierdzić akcje:
   - `Edytuj`,
   - `Zapisz projekt`,
   - `Anuluj`,
   - `Ustaw draft`,
   - `Ustaw active`,
   - `Usuń`.
2. Uruchomić lokalnie minimum:

```powershell
npm run verify:admin-buttons-v19
npm run check:project-memory
```

3. Uruchomić lokalnie przed szerszym wdrożeniem:

```powershell
npm run typecheck
npm run build
```

4. Sprawdzić na realnym projekcie roboczym, czy `active` blokuje publikację niekompletnego projektu i pokazuje braki.
5. Sprawdzić, czy akcje mediów w edycji projektu przez `formAction` nie kolidują z zapisem głównego formularza.
6. Jeżeli ręczny test pokaże problem z widocznością/klikalnością w kolumnie `Akcje`, zrobić osobny etap tylko pod układ tabeli admina, bez mieszania z handlerami.
7. Po potwierdzeniu akcji admina przejść do następnego logicznego etapu: audyt spójności panel admina → publiczny katalog → karta projektu.

## Następny rekomendowany etap

Etap 2: audyt spójności danych po zmianach admina.

Cel Etapu 2:

- sprawdzić, czy zmiana statusu w adminie wpływa na katalog publiczny,
- sprawdzić, czy zapis edycji zmienia dane na publicznej karcie projektu,
- sprawdzić, czy ukryte/archiwalne/draft projekty nie wyciekają do katalogu,
- dodać albo zaostrzyć guardy dla przepływu admin → public.

## Ryzyka do pilnowania

- Guard statyczny nie zastępuje testu runtime z Supabase.
- Usuwanie projektu jest destrukcyjne, więc testować na szkicu/testowym rekordzie.
- Media i pliki prywatne wymagają ostrożnego testu, bo dotykają Storage.
- Nie wprowadzać zmian wizualnych w panelu admina razem z naprawą logiki akcji.
