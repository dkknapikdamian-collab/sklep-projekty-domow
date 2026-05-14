"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import type { AdminProjectListItem } from "@/lib/admin/projects-admin";
import { AdminProjectsTable } from "./AdminProjectsTable";

const STATUS_FILTER_OPTIONS = [
  { value: "all", label: "Wszystkie" },
  { value: "active", label: "Aktywne" },
  { value: "draft", label: "Drafty" },
  { value: "incomplete", label: "Niekompletne" },
  { value: "no-media", label: "Bez zdjec" },
  { value: "no-rooms", label: "Bez pomieszczen" }
];

function normalize(value: unknown) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function projectMatchesSearch(project: AdminProjectListItem, query: string) {
  if (!query) return true;

  const haystack = [
    project.name,
    project.code,
    project.slug,
    project.status,
    project.canPublish ? "gotowy" : "niekompletny",
    project.mediaCount <= 0 ? "bez zdjec" : "",
    project.projectRoomsCount <= 0 ? "bez pomieszczen" : ""
  ].map(normalize).join(" ");

  return haystack.includes(query);
}

export function AdminProjectsListClient({ projects }: { projects: AdminProjectListItem[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const normalizedSearchTerm = normalize(searchTerm);
  const hasFilters = normalizedSearchTerm.length > 0 || statusFilter !== "all";

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
          const matchesStatus = statusFilter === "all" || project.status === statusFilter;
          const matchesExtendedStatus =
            (statusFilter === "incomplete" && !project.canPublish) ||
            (statusFilter === "no-media" && project.mediaCount <= 0) ||
            (statusFilter === "no-rooms" && project.projectRoomsCount <= 0);
          const matchesSearch = projectMatchesSearch(project, normalizedSearchTerm);

      return (matchesStatus || matchesExtendedStatus) && matchesSearch;
    });
  }, [projects, normalizedSearchTerm, statusFilter]);

  function clearFilters() {
    setSearchTerm("");
    setStatusFilter("all");
  }

  return (
    <>
      <section className="admin-toolbar admin-toolbar-live" data-admin-project-filters="client-state">
        <div className="admin-search">
          <Search size={18} />
          <input
            data-admin-project-search="true"
            aria-label="Szukaj projektu po nazwie, kodzie, slug albo statusie"
            placeholder="Szukaj po nazwie, kodzie, slug albo statusie..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
        <select
          data-admin-project-status-filter="true"
          aria-label="Filtruj projekty po gotowosci i statusie"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          {STATUS_FILTER_OPTIONS.map((option) => (
            <option value={option.value} key={option.value}>{option.label}</option>
          ))}
        </select>
        {hasFilters && (
          <button type="button" className="admin-secondary-button admin-clear-filter-button" onClick={clearFilters}>
            <X size={15} /> Wyczyść
          </button>
        )}
      </section>

      <section className="admin-filter-summary" data-admin-project-filter-summary="true" aria-live="polite">
        <strong>{filteredProjects.length}</strong>
        <span>z {projects.length} projektów</span>
        {hasFilters && <em>Aktywny filtr: {statusFilter === "all" ? "wszystkie" : statusFilter}{normalizedSearchTerm ? ` / ${searchTerm}` : ""}</em>}
      </section>

      {projects.length === 0 ? (
        <section className="admin-empty">
          <h2>Nie ma jeszcze żadnych projektów.</h2>
          <p>Dodaj pierwszy projekt. Najbezpieczniej zacząć od statusu draft, sprawdzić dane i dopiero potem ustawić active.</p>
          <div>
            <Link href="/admin/projekty/nowy" className="admin-primary-button">Dodaj projekt</Link>
            <Link href="/admin/projekty/podglad" className="admin-secondary-button">Zobacz podgląd karty</Link>
          </div>
        </section>
      ) : filteredProjects.length > 0 ? (
        <AdminProjectsTable projects={filteredProjects} />
      ) : (
        <section className="admin-empty admin-filter-empty" data-admin-project-filter-empty="true">
          <h2>Brak projektów dla tych filtrów.</h2>
          <p>Wyszukiwarka działa lokalnie na liście z Supabase i sprawdza nazwę, kod projektu, slug oraz status. Zmień frazę albo wyczyść filtr.</p>
          <div>
            <button type="button" className="admin-secondary-button" onClick={clearFilters}>Wyczyść filtry</button>
          </div>
        </section>
      )}
    </>
  );
}
