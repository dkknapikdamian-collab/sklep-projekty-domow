# Stage 18 — admin project management

## Cel

Naprawić martwy przycisk edycji i dodać podstawowe zarządzanie projektami z listy.

## Problem

Na liście projektów był przycisk:

```txt
Edycja później
```

Nie wykonywał realnej akcji.

## Wdrożenie

Dodano:

```txt
/admin/projekty/[id]/edytuj
```

Dodano akcje:

```txt
updateProjectStatusAction
deleteProjectAction
updateProjectBasicsAction
```

Dodano komponent tabeli:

```txt
components/admin/AdminProjectsTable.tsx
```

## Zakres edycji V18

Edycja podstawowa:

- nazwa
- slug
- status
- cena
- podtytuł
- opis
- badge
- parametry techniczne
- cechy
- podobne projekty

## Status z listy

Na `/admin/projekty` można zmienić status:

```txt
draft
active
hidden
archived
```

## Usuwanie

Projekt można usunąć z listy albo z ekranu edycji.

System próbuje usunąć też pliki ze Storage na podstawie rekordów:

```txt
project_media
project_files
```

## Kolejny etap

Pełna edycja mediów, rzutów, wariantów, dodatków i pomieszczeń powinna być osobnym etapem, żeby nie zrobić ciężkiego formularza-potwora.
