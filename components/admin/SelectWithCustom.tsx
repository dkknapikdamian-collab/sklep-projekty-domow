"use client";

import { useMemo, useState } from "react";
import type { AdminOption } from "./admin-project-options";

type SelectWithCustomProps = {
  name: string;
  label: string;
  options: AdminOption[];
  defaultValue?: string;
  placeholder?: string;
  help?: string;
};

const CUSTOM_VALUE = "__custom__";

export function SelectWithCustom({
  name,
  label,
  options,
  defaultValue = "",
  placeholder = "Wybierz z listy",
  help
}: SelectWithCustomProps) {
  const hasDefaultInOptions = useMemo(
    () => options.some((option) => option.value === defaultValue),
    [defaultValue, options]
  );

  const [selected, setSelected] = useState(hasDefaultInOptions ? defaultValue : defaultValue ? CUSTOM_VALUE : "");
  const [customValue, setCustomValue] = useState(hasDefaultInOptions ? "" : defaultValue);

  const finalValue = selected === CUSTOM_VALUE ? customValue : selected;

  return (
    <label>
      {label}
      <input type="hidden" name={name} value={finalValue} />
      <select value={selected} onChange={(event) => setSelected(event.target.value)}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option value={option.value} key={`${name}-${option.value || "empty"}`}>
            {option.label}
          </option>
        ))}
        <option value={CUSTOM_VALUE}>Dodaj ręcznie</option>
      </select>
      {selected === CUSTOM_VALUE && (
        <input
          className="admin-custom-value-input"
          value={customValue}
          onChange={(event) => setCustomValue(event.target.value)}
          placeholder="Wpisz własną wartość"
        />
      )}
      {help && <small className="admin-field-help">{help}</small>}
    </label>
  );
}
