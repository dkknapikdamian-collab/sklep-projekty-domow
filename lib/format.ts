export function money(value: number) {
  return `${value.toLocaleString("pl-PL")} zł`;
}

export function area(value: number) {
  return `${value.toLocaleString("pl-PL")} m²`;
}

export function meters(value?: number) {
  if (value === undefined || value === null) return "—";
  return `${value.toLocaleString("pl-PL")} m`;
}
