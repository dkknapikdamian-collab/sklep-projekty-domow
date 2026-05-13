# Storage mediów i plików

## Publiczne media

Publiczne mogą być:

- wizualizacje,
- miniatury,
- rzuty poglądowe,
- elewacje poglądowe,
- przekroje poglądowe.

Przykład:

```txt
/public/projects/DP-AUR-014/hero.webp
/public/projects/DP-AUR-014/gallery-01.webp
/public/projects/DP-AUR-014/floor-plan-ground.webp
/public/projects/DP-AUR-014/elevation-front.webp
```

## Prywatne pliki

Prywatne:

- pełny projekt PDF,
- dokumentacja ZIP,
- kosztorys,
- pliki zakupowe.

Przykład:

```txt
/private/projects/DP-AUR-014/documentation-v1.pdf
/private/projects/DP-AUR-014/full-package-v1.zip
/private/projects/DP-AUR-014/cost-estimate-v1.pdf
```

## Zasady

- Prywatne pliki nie mogą mieć publicznego URL.
- Dostęp tylko po zamówieniu/płatności.
- Preferowany prywatny link z tokenem, limitem czasu i opcjonalnym limitem pobrań.
- PDF jako załącznik tylko jeśli rozmiar na to pozwala.
- Przy błędzie wysyłki status `manual_required`.

## Google / własny serwer

Możliwe warianty:

1. Własny serwer: pełna kontrola, ale trzeba pilnować backupu i bezpieczeństwa.
2. Google Cloud Storage: lepsze do aplikacji niż zwykły Drive, można robić kontrolowane linki.
3. Google Drive: dobry jako magazyn roboczy, ostrożnie z automatycznym udostępnianiem.

Aplikacja musi kontrolować dostęp, niezależnie od tego, gdzie fizycznie leży plik.
