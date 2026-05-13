import Link from "next/link";
import { Home, Search, ShoppingBag } from "lucide-react";

export function Header() {
  return (
    <header className="site-header">
      <div className="top-strip">
        <span>Projekty domów premium</span>
        <span>Pomoc przy wyborze projektu: +48 000 000 000</span>
      </div>
      <div className="nav-shell">
        <Link href="/" className="brand">
          <span className="brand-mark"><Home size={20} /></span>
          <span>
            <strong>DomyProjekt</strong>
            <small>nowoczesne projekty domów</small>
          </span>
        </Link>
        <nav>
          <Link href="/projekty">Projekty</Link>
          <Link href="/projekty">Domy parterowe</Link>
          <Link href="/projekty">Z garażem</Link>
          <Link href="/admin">Admin demo</Link>
        </nav>
        <div className="nav-actions">
          <Link href="/projekty" className="ghost-icon"><Search size={18} /></Link>
          <Link href="/koszyk" className="cart-pill"><ShoppingBag size={18} /> Koszyk</Link>
        </div>
      </div>
    </header>
  );
}
