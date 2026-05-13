# Sklep z projektami domów — production shell V4

To jest produkcyjny shell sklepu z projektami domów.

## Najważniejsza zmiana V4

Nie publikujemy żadnych fikcyjnych projektów, opisów ani zdjęć jako oferty.

Wygenerowane wcześniej obrazy są tylko referencją wizualną i są zapisane w:

```txt
docs/design/references/
```

Nie są używane jako realne zdjęcia projektów w katalogu.

## Jak działają projekty

Katalog pokazuje tylko projekty dodane w źródle danych ze statusem:

```txt
active
```

Na start:

```ts
export const projects: Project[] = [];
```

Czyli produkcyjnie katalog jest pusty, dopóki nie dodasz prawdziwego projektu.

## Jak dodać projekt na tym etapie

Do czasu wdrożenia panelu admina dodajesz projekt ręcznie:

1. Dodaj folder mediów:

```txt
public/projects/DP-AUR-014/
```

2. Dodaj pliki o stałych nazwach:

```txt
hero.jpg
thumbnail.jpg
gallery-01.jpg
gallery-02.jpg
floor-plan-ground.jpg
floor-plan-roof.jpg
section-aa.jpg
elevation-front.jpg
```

3. Dodaj rekord projektu w:

```txt
data/projects.ts
```

4. Ustaw:

```txt
status: "active"
```

Wtedy projekt pojawi się w katalogu i pod adresem:

```txt
/projekty/[slug]
```

## Uruchomienie

```powershell
npm install
npm run dev
```

## Weryfikacja

```powershell
npm run verify
```

## Kolejny etap

Następny etap produkcyjny:
- panel admina do dodawania projektów,
- storage mediów,
- koszyk,
- checkout,
- zapis zamówienia,
- płatności,
- e-mail z PDF/linkiem.
