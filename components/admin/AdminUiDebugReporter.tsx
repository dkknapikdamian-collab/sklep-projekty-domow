"use client";

import { useEffect, useMemo, useState } from "react";
import { Bug, Download, MousePointer2, Trash2, X } from "lucide-react";

const STORAGE_KEY = "sklep-projekty-domow:admin-ui-debug-reports:v28";
const MAX_TEXT = 180;

type ElementSnapshot = {
  tag: string;
  id: string;
  className: string;
  name: string;
  type: string;
  role: string;
  ariaLabel: string;
  href: string;
  text: string;
  selector: string;
  dataAttrs: Record<string, string>;
};

type RectSnapshot = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type DebugReport = {
  id: string;
  createdAt: string;
  route: string;
  viewport: string;
  note: string;
  element: ElementSnapshot;
  rect: RectSnapshot;
};

type PendingReport = Omit<DebugReport, "note">;

function safeText(value: string | null | undefined, max = MAX_TEXT) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, max);
}

function escapeSelector(value: string) {
  if (typeof CSS !== "undefined" && typeof CSS.escape === "function") return CSS.escape(value);
  return value.replace(/[^a-zA-Z0-9_-]/g, "\\$&");
}

function buildSelector(element: HTMLElement) {
  if (element.id) return `${element.tagName.toLowerCase()}#${escapeSelector(element.id)}`;

  const parts: string[] = [];
  let current: HTMLElement | null = element;

  while (current && current !== document.body && parts.length < 4) {
    const tag = current.tagName.toLowerCase();
    const dataId = current.getAttribute("data-testid") || current.getAttribute("data-debug-id") || current.getAttribute("data-admin-header-v24");
    if (dataId) {
      parts.unshift(`${tag}[data-testid=\"${safeText(dataId, 64)}\"]`);
      break;
    }

    const className = String(current.className || "")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((item) => `.${escapeSelector(item)}`)
      .join("");

    parts.unshift(`${tag}${className}`);
    current = current.parentElement;
  }

  return parts.join(" > ") || element.tagName.toLowerCase();
}

function snapshotElement(element: HTMLElement): ElementSnapshot {
  const dataAttrs: Record<string, string> = {};
  for (const attr of Array.from(element.attributes || [])) {
    if (attr.name.startsWith("data-")) dataAttrs[attr.name] = safeText(attr.value, 120);
  }

  return {
    tag: element.tagName.toLowerCase(),
    id: element.id || "",
    className: String(element.className || ""),
    name: element.getAttribute("name") || "",
    type: element.getAttribute("type") || "",
    role: element.getAttribute("role") || "",
    ariaLabel: element.getAttribute("aria-label") || "",
    href: element instanceof HTMLAnchorElement ? element.href : element.getAttribute("href") || "",
    text: safeText(element.innerText || element.textContent || ""),
    selector: buildSelector(element),
    dataAttrs
  };
}

function snapshotRect(element: HTMLElement): RectSnapshot {
  const rect = element.getBoundingClientRect();
  return {
    x: Math.round(rect.left),
    y: Math.round(rect.top),
    width: Math.round(rect.width),
    height: Math.round(rect.height)
  };
}

function loadReports(): DebugReport[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveReports(reports: DebugReport[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(reports, null, 2));
}

function toMarkdown(reports: DebugReport[]) {
  const lines = [
    "# Raport debug UI admina sklepu",
    "",
    `Wygenerowano: ${new Date().toISOString()}`,
    `Liczba zgłoszeń: ${reports.length}`,
    ""
  ];

  reports.forEach((report, index) => {
    lines.push(`## ${index + 1}. ${report.element.text || report.element.selector || report.element.tag}`);
    lines.push("");
    lines.push(`- Data: ${report.createdAt}`);
    lines.push(`- Trasa: ${report.route}`);
    lines.push(`- Viewport: ${report.viewport}`);
    lines.push(`- Element: \`${report.element.selector}\``);
    lines.push(`- Tag: \`${report.element.tag}\``);
    if (report.element.id) lines.push(`- ID: \`${report.element.id}\``);
    if (report.element.className) lines.push(`- Klasy: \`${report.element.className}\``);
    if (report.element.href) lines.push(`- Link: ${report.element.href}`);
    lines.push(`- Pozycja: x=${report.rect.x}, y=${report.rect.y}, w=${report.rect.width}, h=${report.rect.height}`);
    lines.push("");
    lines.push("Opis problemu:");
    lines.push("");
    lines.push(report.note || "(brak opisu)");
    lines.push("");
  });

  return lines.join("\n");
}

function downloadText(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function AdminUiDebugReporter() {
  const [enabled, setEnabled] = useState(false);
  const [reports, setReports] = useState<DebugReport[]>([]);
  const [pending, setPending] = useState<PendingReport | null>(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    setReports(loadReports());
  }, []);

  useEffect(() => {
    saveReports(reports);
  }, [reports]);

  useEffect(() => {
    if (!enabled) return;

    const handler = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      if (target.closest("[data-admin-ui-debug-panel='true']")) return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      const element = target.closest("button,a,input,select,textarea,label,[role='button'],[data-debug-target]") as HTMLElement | null || target;
      const nextPending: PendingReport = {
        id: `debug-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        createdAt: new Date().toISOString(),
        route: `${window.location.pathname}${window.location.search}`,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        element: snapshotElement(element),
        rect: snapshotRect(element)
      };

      setPending(nextPending);
      setNote("");
    };

    document.addEventListener("click", handler, true);
    document.documentElement.classList.add("admin-ui-debug-active-v28");

    return () => {
      document.removeEventListener("click", handler, true);
      document.documentElement.classList.remove("admin-ui-debug-active-v28");
    };
  }, [enabled]);

  const selectedLabel = useMemo(() => {
    if (!pending) return "";
    return pending.element.text || pending.element.ariaLabel || pending.element.name || pending.element.selector;
  }, [pending]);

  const savePending = () => {
    if (!pending) return;
    const nextReport: DebugReport = {
      ...pending,
      note: note.trim() || "Brak opisu, element oznaczony do sprawdzenia."
    };
    setReports((items) => [nextReport, ...items]);
    setPending(null);
    setNote("");
  };

  const exportAndClear = () => {
    if (!reports.length) return;
    const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
    downloadText(`admin-ui-debug-${stamp}.md`, toMarkdown(reports), "text/markdown;charset=utf-8");
    setReports([]);
    saveReports([]);
  };

  return (
    <div className="admin-ui-debug-panel-v28" data-admin-ui-debug-panel="true">
      <div className="admin-ui-debug-dock-v28">
        <button
          type="button"
          className={enabled ? "admin-ui-debug-main-v28 active" : "admin-ui-debug-main-v28"}
          onClick={() => setEnabled((value) => !value)}
          title="Włącz tryb klikania elementów i zapisywania uwag"
        >
          <Bug size={16} />
          <span>{enabled ? "Debug aktywny" : "Debug"}</span>
          {reports.length > 0 ? <strong>{reports.length}</strong> : null}
        </button>

        {enabled ? (
          <span className="admin-ui-debug-hint-v28"><MousePointer2 size={14} /> Kliknij element, opisz problem, Enter zapisuje.</span>
        ) : null}

        {reports.length > 0 ? (
          <button type="button" className="admin-ui-debug-export-v28" onClick={exportAndClear}>
            <Download size={15} /> Pobierz raport i wyczysc
          </button>
        ) : null}
      </div>

      {pending ? (
        <div className="admin-ui-debug-modal-v28" role="dialog" aria-modal="true">
          <div className="admin-ui-debug-card-v28">
            <div className="admin-ui-debug-card-head-v28">
              <div>
                <span>ZGLOSZENIE UI</span>
                <h2>{selectedLabel || "Wybrany element"}</h2>
                <code>{pending.element.selector}</code>
              </div>
              <button type="button" onClick={() => setPending(null)} aria-label="Zamknij debug">
                <X size={18} />
              </button>
            </div>

            <textarea
              autoFocus
              value={note}
              onChange={(event) => setNote(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  savePending();
                }
                if (event.key === "Escape") {
                  event.preventDefault();
                  setPending(null);
                }
              }}
              placeholder="Opisz problem, np. przycisk nie działa, zły kolor, brakuje komunikatu... Enter zapisuje. Shift+Enter robi nową linię."
            />

            <div className="admin-ui-debug-actions-v28">
              <button type="button" className="admin-ui-debug-save-v28" onClick={savePending}>Zapisz zgłoszenie</button>
              <button type="button" onClick={() => setPending(null)}>Anuluj</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
