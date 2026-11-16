import { useState } from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Checkout({onBack}) {
  const {items, subtotal, clear} = useCart();
  const [orderType,setOrderType] = useState('delivery');
  const [payment,setPayment] = useState('cod');
  const [form,setForm] = useState({name:'',phone:'',address:'',landmark:'',pincode:''});
  const [done,setDone] = useState(null);
  const delivery = orderType==='delivery' ? 20 : 0;
  const update = e => setForm({...form,[e.target.name]:e.target.value});
  const submit = async e => {
    e.preventDefault();
    if (!items.length) return;
    const order = {customer:form, orderType, payment, items, subtotal, delivery, total:subtotal+delivery};
    // Production: POST this payload to your backend, create a Razorpay order server-side,
    // then verify the payment signature on the server before confirming the order.
    try {
      const response = await fetch('/api/orders', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(order)});
      if (response.ok) {
        const data = await response.json();
        setDone(data.orderId || `KK${Date.now().toString().slice(-8)}`);
        clear();
      } else throw new Error('API unavailable');
    } catch {
      // Demo fallback only. Do not treat this as a verified online payment.
      setDone(`DEMO-${Date.now().toString().slice(-8)}`);
      clear();
    }
  };
  if (done) return <main className="checkout-page"><div className="success-card"><CheckCircle2 size={54}/><span className="eyebrow">ORDER RECEIVED</span><h1>Thank you!</h1><p>Your demo order has been placed.</p><div className="order-id">Order ID <b>{done}</b></div><p className="muted">For production, connect the backend and enable payment verification before accepting live orders.</p><button className="button" onClick={()=>window.location.href='/'}>Back to home</button></div></main>;
  return <main className="checkout-page"><button className="back-link" onClick={onBack}><ArrowLeft size={17}/> Back to cart</button><div className="checkout-layout">
    <form className="checkout-form" onSubmit={submit}><span className="eyebrow">ALMOST THERE</span><h1>Checkout</h1>
      <h3>Your details</h3>
      <div className="form-grid"><label>Full name<input name="name" value={form.name} onChange={update} required placeholder="Your name"/></label><label>Mobile number<input name="phone" value={form.phone} onChange={update} required pattern="[6-9][0-9]{9}" maxLength="10" placeholder="10-digit mobile number"/></label>
      <label className="wide">Delivery address<input name="address" value={form.address} onChange={update} required={orderType==='delivery'} placeholder="House no., street, area"/></label><label>Landmark<input name="landmark" value={form.landmark} onChange={update} placeholder="Nearby landmark"/></label><label>Pincode<input name="pincode" value={form.pincode} onChange={update} required={orderType==='delivery'} pattern="[0-9]{6}" maxLength="6" placeholder="6-digit pincode"/></label></div>
      <h3>Order type</h3><div className="choice-row"><button type="button" className={orderType==='delivery'?'choice active':'choice'} onClick={()=>setOrderType('delivery')}>Home delivery</button><button type="button" className={orderType==='pickup'?'choice active':'choice'} onClick={()=>setOrderType('pickup')}>Self pickup</button></div>
      <h3>Payment method</h3><div className="payment-options"><label><input type="radio" checked={payment==='cod'} onChange={()=>setPayment('cod')}/> Cash on delivery / pickup</label><label><input type="radio" checked={payment==='upi'} onChange={()=>setPayment('upi')}/> UPI / Razorpay (backend setup required)</label></div>
      <button className="button button-full" type="submit">Place demo order · ₹{subtotal+delivery}</button>
    </form>
    <aside className="checkout-summary"><h3>Order summary</h3>{items.map(i=><div className="summary-line" key={i.id}><span>{i.name} × {i.qty}</span><b>₹{i.price*i.qty}</b></div>)}<div className="summary-line"><span>Subtotal</span><b>₹{subtotal}</b></div><div className="summary-line"><span>Delivery</span><b>{delivery?'₹'+delivery:'Free'}</b></div><div className="summary-total"><span>Total</span><b>₹{subtotal+delivery}</b></div></aside>
  </div></main>;
}