import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('kk-cart') || '[]'); } catch { return []; }
  });
  const [open, setOpen] = useState(false);
  useEffect(() => localStorage.setItem('kk-cart', JSON.stringify(items)), [items]);

  const add = (product) => setItems(current => {
    const found = current.find(item => item.id === product.id);
    return found ? current.map(item => item.id === product.id ? {...item, qty:item.qty+1} : item) : [...current, {...product, qty:1}];
  });
  const changeQty = (id, delta) => setItems(current => current.map(item => item.id === id ? {...item, qty:item.qty+delta} : item).filter(item => item.qty > 0));
  const remove = id => setItems(current => current.filter(item => item.id !== id));
  const clear = () => setItems([]);
  const count = items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const value = useMemo(() => ({items, add, changeQty, remove, clear, count, subtotal, open, setOpen}), [items, count, subtotal, open]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}