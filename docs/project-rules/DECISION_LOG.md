# Decision log

## V13 — zmiana logiki kodów projektów

### Wcześniejsze ustalenie

Rozważany był format ręczny oparty o skrót nazwy/serii:

```txt
DP-MAL-014
DP-AUR-002
```

### Problem

Użytkownik słusznie wskazał, że nie chce pamiętać skrótów typu `MAL`, `AUR` i ręcznie pilnować kodów.

Dodatkowo kod oparty o typ/nazwę mógłby przeszkadzać, jeśli w przyszłości sklep będzie sprzedawał nie tylko domy, ale też np. hale, garaże, budynki gospodarcze albo inne projekty.

### Nowa decyzja

Obowiązujący format:

```txt
DP-YYYY-NNNN
```

Przykład:

```txt
DP-2026-0001
```

Kod generuje system.

### Konsekwencje

- pole kodu w adminie nie jest ręcznie wymagane,
- kod zapisuje się w `projects.code`,
- licznik zapisuje się w `project_code_counters`,
- typ projektu pozostaje osobnym polem,
- duplikaty mają mieć czytelny komunikat.
