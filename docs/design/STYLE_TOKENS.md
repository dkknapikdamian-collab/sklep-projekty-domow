# Style tokens

Kierunek tokenów. Finalne wartości można doprecyzować podczas kodowania na podstawie referencji wizualnych.

```css
:root {
  --bg-main: #0f1417;
  --bg-panel: #171d21;
  --bg-card: #1d2429;
  --bg-card-soft: #222a30;
  --bg-elevated: #252d33;

  --border-soft: rgba(255, 255, 255, 0.10);
  --border-medium: rgba(255, 255, 255, 0.16);

  --text-main: #f4f1ea;
  --text-muted: #a8adb2;
  --text-soft: #7f878e;

  --accent-gold: #d6ad63;
  --accent-gold-soft: #f0d9ad;
  --accent-gold-dark: #9e7938;

  --success: #65b27a;
  --danger: #d66a6a;
  --warning: #d6ad63;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 18px;
  --radius-xl: 24px;

  --shadow-card: 0 18px 40px rgba(0,0,0,0.28);
  --shadow-soft: 0 10px 24px rgba(0,0,0,0.20);

  --container: 1200px;
  --container-wide: 1360px;
}
```

## Zasady

- Nie tworzyć nowych kolorów bez potrzeby.
- Każdy komponent korzysta z tokenów.
- CTA główne ma używać akcentu złoto-beżowego.
- Tła mają zostać ciemne.
- Inputy mają być czytelne, ale dopasowane do ciemnego stylu.
