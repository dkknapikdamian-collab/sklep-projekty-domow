import Link from "next/link";
import { Heart, ShoppingCart, Search, User, ChevronDown, House, Mail, Phone, HelpCircle, RotateCcw, Truck } from "lucide-react";

export function Header() {
  return (
    <header className="site-header">
      <div className="top-bar">
        <div>
          <span><Phone size={13} /> 22 123 45 67</span>
          <span><Mail size={13} /> biuro@projektydomow.pl</span>
        </div>
        <div>
          <span><Truck size={14} /> Darmowa dostawa od 300 zł</span>
          <span><RotateCcw size={14} /> 30 dni na zwrot</span>
          <span><HelpCircle size={14} /> Pomoc</span>
          <span><User size={14} /> Zaloguj się / Konto</span>
        </div>
      </div>

      <div className="main-nav">
        <Link href="/" className="brand">
          <span className="brand-mark"><House size={28} strokeWidth={1.5} /></span>
          <span>
            <strong>PROJEKTY</strong>
            <strong>DOMÓW</strong>
          </span>
        </Link>

        <nav>
          <Link href="/projekty">PROJEKTY DOMÓW</Link>
          <a>KATEGORIE</a>
          <a>DODATKI</a>
          <a>USŁUGI</a>
          <a>PORADNIK</a>
          <a>O NAS</a>
          <a>KONTAKT</a>
        </nav>

        <div className="search-shell">
          <input placeholder="Szukaj projektu..." />
          <Search size={22} />
        </div>

        <div className="nav-icons">
          <a><Heart size={21} /><span>Ulubione</span><em>0</em></a>
          <Link href="/koszyk"><ShoppingCart size={21} /><span>Koszyk</span><em>0</em></Link>
        </div>
      </div>
    </header>
  );
}
