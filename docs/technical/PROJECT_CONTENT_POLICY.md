# Polityka treści projektów

## Twarda zasada

W produkcji nie publikujemy:

- fikcyjnych projektów,
- losowych opisów,
- zdjęć wygenerowanych tylko jako placeholder,
- rzutów udających prawdziwą dokumentację,
- cen wymyślonych jako realna oferta.

## Dozwolone

Dozwolone jako referencja dla developera:

```txt
docs/design/references/
```

Dozwolone jako realna oferta dopiero po dodaniu przez użytkownika/admina:

```txt
public/projects/[PROJECT_CODE]/
data/projects.ts albo baza danych
```

## Projekt pojawia się na stronie tylko gdy

- ma kod projektu,
- ma slug,
- ma nazwę,
- ma realny opis,
- ma realną cenę,
- ma realne zdjęcia/rzuty,
- ma parametry,
- ma status `active`.

## Statusy

```ts
status: "draft" | "active" | "hidden" | "archived"
```

Publicznie pokazujemy wyłącznie:

```txt
active
```

## Dlaczego

Sklep z projektami domów musi być wiarygodny.  
Fikcyjne projekty i opisy „z powietrza” mogą zniszczyć zaufanie klienta i wprowadzać ryzyko prawne.
