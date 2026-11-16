import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer({onCheckout}) {
  const {items, open, setOpen, changeQty, remove, subtotal} = useCart();
  if (!open) return null;
  return <div className="drawer-backdrop" onMouseDown={e=>e.target===e.currentTarget&&setOpen(false)}>
    <aside className="cart-drawer">
      <div className="drawer-head"><div><span className="eyebrow">YOUR ORDER</span><h2>Your Cart</h2></div><button className="icon-button" onClick={()=>setOpen(false)}><X/></button></div>
      {items.length===0 ? <div className="empty-cart"><ShoppingBag size={38}/><h3>Your cart is waiting</h3><p>Add something delicious from our menu.</p><button className="button" onClick={()=>setOpen(false)}>Explore menu</button></div> :
      <>
        <div className="cart-items">{items.map(item=><div className="cart-item" key={item.id}>
          <img src={item.image} alt=""/>
          <div className="cart-item-main"><h4>{item.name}</h4><b>₹{item.price*item.qty}</b><div className="qty-control"><button onClick={()=>changeQty(item.id,-1)}><Minus size={13}/></button><span>{item.qty}</span><button onClick={()=>changeQty(item.id,1)}><Plus size={13}/></button></div></div>
          <button className="remove-button" onClick={()=>remove(item.id)} aria-label="Remove"><Trash2 size={16}/></button>
        </div>)}</div>
        <div className="drawer-summary"><div><span>Subtotal</span><b>₹{subtotal}</b></div><small>Delivery charges calculated at checkout.</small><button className="button button-full" onClick={onCheckout}>Continue to checkout <span>→</span></button></div>
      </>}
    </aside>
  </div>;
}