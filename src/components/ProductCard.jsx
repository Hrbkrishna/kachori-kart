import { Plus, Leaf } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({product}) {
  const {add, setOpen} = useCart();
  return <article className={`product-card ${product.featured?'featured-card':''}`}>
    <div className="product-image-wrap">
      <img src={product.image} alt={product.name} loading="lazy" />
      {product.badge && <span className="product-badge">{product.badge}</span>}
      <span className="veg-mark"><Leaf size={12}/></span>
    </div>
    <div className="product-info">
      <div className="product-title-row"><h3>{product.name}</h3><strong>₹{product.price}</strong></div>
      <p>{product.description}</p>
      <button className="add-button" onClick={()=>{add(product);setOpen(true)}}><Plus size={16}/> Add to cart</button>
    </div>
  </article>;
}