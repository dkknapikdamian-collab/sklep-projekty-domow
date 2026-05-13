# Stage 15 — admin selects and project features

## Cel

Poprawić używalność list wyboru w panelu admina oraz zastąpić pole tekstowe cech projektu wybieralnym pickerem.

## Zmiany

### Selecty

- poprawiony kontrast tła i tekstu
- opcje dropdown mają ciemne tło i jasny tekst
- `Dodaj ręcznie` nie jest już tylko chwilowym wpisem
- własne opcje zapisują się w localStorage
- własne opcje są widoczne na liście
- własne opcje można usunąć krzyżykiem

### Cechy projektu

Dodany komponent:

```txt
components/admin/FeaturePicker.tsx
```

Źródło opcji:

```txt
components/admin/admin-feature-options.ts
```

Cechy są grupowane tematycznie i zapisują się do backendu jako newline-separated text w polu `features`, więc backend nie wymaga zmiany.

## Ograniczenie V15

Własne opcje są lokalne dla przeglądarki admina.

Docelowo warto dodać Supabase dictionaries, jeśli będzie więcej adminów albo chcesz mieć słowniki wspólne między urządzeniami.
