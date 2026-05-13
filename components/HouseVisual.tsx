export function HouseVisual({ variant = "large" }: { variant?: "large" | "card" }) {
  return (
    <div className={`house-visual ${variant}`}>
      <div className="sun-disc" />
      <div className="house-shape">
        <div className="roof-line" />
        <div className="wall-block">
          <span />
          <span />
          <span />
        </div>
        <div className="garage-block" />
      </div>
      <div className="ground-line" />
    </div>
  );
}
