import Link from "next/link";
import { Heart, ShoppingCart, Search, User, ChevronDown, House } from "lucide-react";

export function Header() {
  return (
    <header className="dp-header">
      <div className="dp-header-inner">
        <Link href="/" className="dp-logo">
          <div className="dp-logo-mark"><House size={26} strokeWidth={1.6} /></div>
          <div>
            <strong>DOMPROJEKT</strong>
            <span>PROJEKTY DOMÓW</span>
          </div>
        </Link>

        <nav className="dp-nav">
          <Link href="/projekty">PROJEKTY <ChevronDown size={13} /></Link>
          <a>USŁUGI <ChevronDown size={13} /></a>
          <a>JAK KUPIĆ?</a>
          <a>O NAS</a>
          <a>KONTAKT</a>
        </nav>

        <div className="dp-actions">
          <a><Heart size={21} /> <span>ULUBIONE</span></a>
          <Link href="/koszyk" className="cart-action"><ShoppingCart size={21} /> <span>KOSZYK</span><em>0</em></Link>
          <a><Search size={21} /></a>
          <a className="mobile-user"><User size={21} /></a>
        </div>
      </div>
    </header>
  );
}
