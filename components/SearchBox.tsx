"use client";

import { useMemo, useState } from "react";
import { projects } from "@/data/projects";
import { filterProjects } from "@/lib/search";
import { ProjectCard } from "./ProjectCard";

export function SearchBox() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => filterProjects(projects, query), [query]);

  return (
    <section className="search-demo">
      <div className="section-heading inline">
        <span>Wyszukiwarka demo</span>
        <h2>Szukaj po nazwie, kodzie, metrażu i działce</h2>
      </div>
      <div className="search-panel">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="np. dom 100m2, działka 20x30, garaz 2, DP-AUR-014"
        />
        <span>{results.length} wyników</span>
      </div>
      <div className="project-grid compact">
        {results.map((project) => (
          <ProjectCard key={project.code} project={project} />
        ))}
      </div>
    </section>
  );
}
