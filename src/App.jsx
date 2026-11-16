import { useState } from 'react';
import { ArrowUpRight, Clock3, MapPin, Phone, MessageCircle, Instagram, Facebook, Star, Leaf } from 'lucide-react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import Checkout from './components/Checkout';
import { menu } from './data/menu';
import { useCart } from './context/CartContext';

function App() {
  const [category,setCategory] = useState('morning');
  const [checkout,setCheckout] = useState(false);
  const {count,subtotal,setOpen} = useCart();
  if (checkout) return <Checkout onBack={()=>{setCheckout(false);setOpen(true)}}/>;
  const products = menu.filter(p=>p.category===category);
  return <>
    <Header/>
    <main>
      <section className="hero section-wrap" id="home">
        <div className="hero-copy"><span className="eyebrow"><span className="eyebrow-dot"/> ALIGARH'S DESI FOOD STOP</span>
          <h1>अलीगढ़ का स्वाद,<br/><em>अब आपके साथ!</em></h1>
          <p>गरमा-गरम कचौड़ी, चटपटी सब्जी और ताज़ा देसी स्वाद। अब अपने पसंदीदा नाश्ते का आनंद घर बैठे लें।</p>
          <div className="hero-actions"><a href="#menu" className="button">Order now <ArrowUpRight size={17}/></a><a href="#menu" className="text-link">Explore menu <span>↗</span></a></div>
          <div className="hero-note"><span className="note-icon"><Leaf size={17}/></span><span><b>Freshly prepared</b><small>Made with desi love, served fresh</small></span></div>
        </div>
        <div className="hero-visual"><div className="hero-photo"><img src="https://pub-8fb728ccc32b4c72a6f05fff3cf3d811.r2.dev/Golden%20Kachori%20Thali%20with%20Rustic%20Sides.png" alt="Crispy Indian kachori served with chutney"/></div><div className="photo-stamp"><span>CRISPY</span><b>&</b><span>DESI</span></div><div className="hero-caption"><span>01 / SIGNATURE TASTE</span><b>Aligarh Kachori</b></div></div>
      </section>
      <section className="trust-strip"><div><Star size={16} fill="currentColor"/> <span>Made fresh to order</span></div><div><Leaf size={16}/> <span>100% Vegetarian</span></div><div><Clock3 size={16}/> <span>Morning to evening cravings</span></div></section>
      <section className="menu-section section-wrap" id="menu"><div className="section-heading"><div><span className="eyebrow">A LITTLE SOMETHING FOR EVERY CRAVING</span><h2>Our <em>Menu</em></h2><p>Freshly made, full of flavour.</p></div><span className="menu-aside">GOOD FOOD. GOOD MOOD.</span></div>
        <div className="menu-tabs"><button className={category==='morning'?'tab active':'tab'} onClick={()=>setCategory('morning')}>Morning special <span>06 items</span></button><button className={category==='evening'?'tab active':'tab'} onClick={()=>setCategory('evening')}>Evening special <span>07 items</span></button></div>
        <div className="product-grid">{products.map(product=><ProductCard key={product.id} product={product}/>)}</div>
      </section>
      <section className="story-section section-wrap" id="about"><div className="story-image"><img src="https://pub-8fb728ccc32b4c72a6f05fff3cf3d811.r2.dev/Golden%20Kachori%20Thali%20with%20Rustic%20Sides.png" alt="Fresh Indian vegetarian food"/></div><div className="story-copy"><span className="eyebrow">A TASTE OF HOME</span><h2>Our story,<br/><em>our taste.</em></h2><p>Kachori Kart brings you the authentic taste of Aligarh. From crispy kachoris and delicious jalebis to fresh momos and wholesome vegetarian meals, every bite brings you closer to the flavours you love.</p><div className="story-sign">Crispy. Fresh. Desi.</div><a href="#menu" className="text-link">Find your favourite <span>↗</span></a></div></section>
      <section className="cta-band"><div><span className="eyebrow">YOUR NEXT BITE IS CALLING</span><h2>Cravings don't wait.<br/><em>Neither should you.</em></h2></div><a href="#menu" className="button button-light">Order something tasty <ArrowUpRight size={17}/></a></section>
      <section className="contact-section section-wrap" id="contact"><div><span className="eyebrow">COME SAY HELLO</span><h2>Let's make<br/><em>you hungry.</em></h2><p>We'd love to serve you something delicious.</p></div><div className="contact-details"><div><MapPin/><span><b>Find us</b><small>Maura, Aligarh, Uttar Pradesh</small></span></div><div><Phone/><span><b>Call us</b><small><a href="tel:7456978178">7456978178</a> · <a href="tel:9560187618">9560187618</a></small></span></div><div><Clock3/><span><b>Opening hours</b><small>Timings to be updated by the business</small></span></div><div className="contact-actions"><a className="button" href="https://wa.me/917456978178?text=Hi%20Kachori%20Kart%2C%20I%20want%20to%20place%20an%20order" target="_blank" rel="noreferrer"><MessageCircle size={17}/> WhatsApp order</a><a className="map-link" href="https://www.google.com/maps/search/?api=1&query=Maura%2C+Aligarh%2C+Uttar+Pradesh" target="_blank" rel="noreferrer">Get directions ↗</a></div></div></section>
    </main>
    <footer className="footer"><div className="footer-top"><a href="#home" className="footer-brand"><img src="/images/kachori-kart-logo.svg" alt="Kachori Kart"/></a><p>अलीगढ़ का स्वाद, अब आपके साथ!<br/><span>Crispy. Fresh. Desi.</span></p><div className="socials"><a href="#" aria-label="Instagram"><Instagram/></a><a href="#" aria-label="Facebook"><Facebook/></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Kachori Kart. All rights reserved.</span><span>Made with desi love in Aligarh.</span></div></footer>
    {count>0 && <button className="mobile-cart-bar" onClick={()=>setOpen(true)}><span><b>{count} items</b><small>₹{subtotal} subtotal</small></span><strong>View cart →</strong></button>}
    <CartDrawer onCheckout={()=>{setOpen(false);setCheckout(true)}}/>
  </>;
}
export default App;