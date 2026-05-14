import { Search } from "lucide-react";
import type { Project } from "@/types/project";
import { buildCatalogOptions } from "@/lib/public-catalog-filters";

export function HomeProjectSearch({ projects }: { projects: Project[] }) {
  const options = buildCatalogOptions(projects);

  return (
    <form className="home-search home-search-live" action="/projekty" method="get" data-public-hero-search="query-params">
      <label>
        Styl domu
        <select name="style" defaultValue="">
          <option value="">Wszystkie style</option>
          {options.styles.map((style: string) => <option value={style} key={style}>{style}</option>)}
        </select>
      </label>

      <label>
        Powierzchnia (m²)
        <span className="catalog-range-inline">
          <input name="areaFrom" placeholder="od" inputMode="decimal" />
          <input name="areaTo" placeholder="do" inputMode="decimal" />
        </span>
      </label>

      <label>
        Liczba pokoi
        <select name="rooms" defaultValue="">
          <option value="">Wszystkie</option>
          {options.rooms.map((rooms: string) => <option value={rooms} key={rooms}>{rooms}</option>)}
        </select>
      </label>

      <label>
        Garaż
        <select name="garage" defaultValue="">
          <option value="">Dowolnie</option>
          {options.garages.map((garage: string) => <option value={garage} key={garage}>{garage}</option>)}
        </select>
      </label>

      <label>
        Kondygnacje
        <select name="floors" defaultValue="">
          <option value="">Dowolnie</option>
          {options.floors.map((floors: string) => <option value={floors} key={floors}>{floors}</option>)}
        </select>
      </label>

      <button type="submit"><Search size={22} /> Szukaj projektów</button>
    </form>
  );
}
