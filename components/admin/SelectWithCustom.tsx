"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
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

function storageKey(name: string) {
  return `admin-select-custom-options:${name}`;
}

function uniqueOptions(options: AdminOption[]) {
  const seen = new Set<string>();
  return options.filter((option) => {
    if (seen.has(option.value)) return false;
    seen.add(option.value);
    return true;
  });
}

export function SelectWithCustom({
  name,
  label,
  options,
  defaultValue = "",
  placeholder = "Wybierz z listy",
  help
}: SelectWithCustomProps) {
  const [customOptions, setCustomOptions] = useState<AdminOption[]>([]);
  const allOptions = useMemo(() => uniqueOptions([...options, ...customOptions]), [options, customOptions]);

  const hasDefaultInOptions = useMemo(
    () => allOptions.some((option) => option.value === defaultValue),
    [defaultValue, allOptions]
  );

  const [selected, setSelected] = useState(hasDefaultInOptions ? defaultValue : defaultValue ? CUSTOM_VALUE : "");
  const [customValue, setCustomValue] = useState(hasDefaultInOptions ? "" : defaultValue);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey(name));
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return;

      const restored = parsed
        .filter((value): value is string => typeof value === "string" && value.trim().length > 0)
        .map((value) => ({ label: value, value }));

      setCustomOptions(uniqueOptions(restored));
    } catch {
      // Ignore invalid local storage.
    }
  }, [name]);

  function saveCustomOptions(nextOptions: AdminOption[]) {
    setCustomOptions(nextOptions);
    try {
      window.localStorage.setItem(storageKey(name), JSON.stringify(nextOptions.map((option) => option.value)));
    } catch {
      // Ignore local storage write errors.
    }
  }

  function addCustomOption() {
    const value = customValue.trim();
    if (!value) return;

    const nextOptions = uniqueOptions([...customOptions, { label: value, value }]);
    saveCustomOptions(nextOptions);
    setSelected(value);
    setCustomValue("");
  }

  function removeCustomOption(value: string) {
    const nextOptions = customOptions.filter((option) => option.value !== value);
    saveCustomOptions(nextOptions);
    if (selected === value) setSelected("");
  }

  const finalValue = selected === CUSTOM_VALUE ? customValue : selected;

  return (
    <label>
      {label}
      <input type="hidden" name={name} value={finalValue} />
      <select value={selected} onChange={(event) => setSelected(event.target.value)}>
        <option value="">{placeholder}</option>
        {allOptions.map((option) => (
          <option value={option.value} key={`${name}-${option.value || "empty"}`}>
            {option.label}
          </option>
        ))}
        <option value={CUSTOM_VALUE}>Dodaj ręcznie</option>
      </select>

      {selected === CUSTOM_VALUE && (
        <div className="admin-custom-option-row">
          <input
            className="admin-custom-value-input"
            value={customValue}
            onChange={(event) => setCustomValue(event.target.value)}
            placeholder="Wpisz własną wartość"
          />
          <button type="button" onClick={addCustomOption}>Dodaj</button>
        </div>
      )}

      {customOptions.length > 0 && (
        <div className="admin-custom-option-chips">
          {customOptions.map((option) => (
            <span key={`${name}-custom-${option.value}`}>
              {option.label}
              <button type="button" aria-label={`Usuń ${option.label}`} onClick={() => removeCustomOption(option.value)}>
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}

      {help && <small className="admin-field-help">{help}</small>}
    </label>
  );
}
