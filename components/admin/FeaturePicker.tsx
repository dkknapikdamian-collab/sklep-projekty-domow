"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, X } from "lucide-react";
import { featureGroups } from "./admin-feature-options";

const CUSTOM_FEATURES_KEY = "admin-project-custom-features";

function uniqueValues(values: string[]) {
  const seen = new Set<string>();
  return values
    .map((value) => value.trim())
    .filter((value) => {
      if (!value || seen.has(value)) return false;
      seen.add(value);
      return true;
    });
}

export function FeaturePicker({ name = "features" }: { name?: string }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [customFeatures, setCustomFeatures] = useState<string[]>([]);
  const [manualFeature, setManualFeature] = useState("");
  const [groupSelections, setGroupSelections] = useState<Record<string, string>>({});

  const allPresetFeatures = useMemo(
    () => uniqueValues(featureGroups.flatMap((group) => group.options)),
    []
  );

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CUSTOM_FEATURES_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        setCustomFeatures(uniqueValues(parsed.filter((item): item is string => typeof item === "string")));
      }
    } catch {
      // Ignore invalid local storage.
    }
  }, []);

  function saveCustomFeatures(values: string[]) {
    const next = uniqueValues(values);
    setCustomFeatures(next);
    try {
      window.localStorage.setItem(CUSTOM_FEATURES_KEY, JSON.stringify(next));
    } catch {
      // Ignore local storage write errors.
    }
  }

  function addFeature(value: string) {
    const clean = value.trim();
    if (!clean) return;
    setSelected((current) => uniqueValues([...current, clean]));
  }

  function removeFeature(value: string) {
    setSelected((current) => current.filter((item) => item !== value));
  }

  function addManualFeature() {
    const clean = manualFeature.trim();
    if (!clean) return;
    addFeature(clean);
    if (!allPresetFeatures.includes(clean)) saveCustomFeatures([...customFeatures, clean]);
    setManualFeature("");
  }

  function removeCustomFeature(value: string) {
    saveCustomFeatures(customFeatures.filter((item) => item !== value));
    removeFeature(value);
  }

  return (
    <div className="feature-picker">
      <input type="hidden" name={name} value={selected.join("
")} />

      <div className="feature-picker-grid">
        {featureGroups.map((group) => (
          <div className="feature-group" key={group.label}>
            <strong>{group.label}</strong>
            <div className="feature-group-row">
              <select
                value={groupSelections[group.label] || ""}
                onChange={(event) => setGroupSelections((current) => ({ ...current, [group.label]: event.target.value }))}
              >
                <option value="">Wybierz cechę</option>
                {group.options.map((option) => <option value={option} key={option}>{option}</option>)}
              </select>
              <button
                type="button"
                onClick={() => {
                  addFeature(groupSelections[group.label] || "");
                  setGroupSelections((current) => ({ ...current, [group.label]: "" }));
                }}
              >
                <Plus size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="manual-feature-row">
        <input value={manualFeature} onChange={(event) => setManualFeature(event.target.value)} placeholder="Dodaj własną cechę projektu" />
        <button type="button" onClick={addManualFeature}>Dodaj ręcznie</button>
      </div>

      {customFeatures.length > 0 && (
        <div className="custom-feature-bank">
          <span>Własne cechy:</span>
          {customFeatures.map((feature) => (
            <button type="button" key={feature} onClick={() => addFeature(feature)}>
              {feature}
              <span onClick={(event) => { event.stopPropagation(); removeCustomFeature(feature); }}>
                <X size={12} />
              </span>
            </button>
          ))}
        </div>
      )}

      {selected.length > 0 ? (
        <div className="selected-feature-chips">
          {selected.map((feature) => (
            <span key={feature}>
              {feature}
              <button type="button" onClick={() => removeFeature(feature)} aria-label={`Usuń ${feature}`}>
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <p className="admin-field-help">Wybierz cechy z grup albo dodaj własną. Pojawią się w zakładce OPIS PROJEKTU.</p>
      )}
    </div>
  );
}
