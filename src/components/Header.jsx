import { ShoppingBag, Menu as MenuIcon, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Header() {
  const {count, setOpen} = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = [['Home','#home'],['Menu','#menu'],['About','#about'],['Contact','#contact']];
  return <header className="header">
    <a className="brand" href="#home"><img src="/images/kachori-kart-logo.svg" alt="Kachori Kart logo" /></a>
    <nav className={mobileOpen ? 'nav nav-open' : 'nav'}>{links.map(([label,href])=><a key={label} href={href} onClick={()=>setMobileOpen(false)}>{label}</a>)}</nav>
    <div className="header-actions">
      <button className="cart-icon" aria-label="Open cart" onClick={()=>setOpen(true)}><ShoppingBag size={19}/><span>{count}</span></button>
      <a className="button button-small" href="#menu">Order Now <span>↗</span></a>
      <button className="mobile-menu" aria-label="Toggle menu" onClick={()=>setMobileOpen(v=>!v)}>{mobileOpen?<X/>:<MenuIcon/>}</button>
    </div>
  </header>;
}