import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());

const razorpay = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
  ? new Razorpay({key_id:process.env.RAZORPAY_KEY_ID,key_secret:process.env.RAZORPAY_KEY_SECRET})
  : null;

// Demo order endpoint. Persist orders to a database before production use.
app.post('/api/orders', async (req,res) => {
  const {customer,items,subtotal,delivery,total,orderType,payment} = req.body || {};
  if (!customer?.name || !/^[6-9]\d{9}$/.test(customer.phone || '') || !Array.isArray(items) || !items.length) {
    return res.status(400).json({error:'Invalid order details'});
  }
  const orderId = `KK${Date.now()}`;
  // IMPORTANT: Recalculate item prices and totals from trusted server-side menu data in production.
  if (payment === 'upi') {
    if (!razorpay) return res.status(503).json({error:'Razorpay is not configured'});
    const order = await razorpay.orders.create({amount:Math.round(Number(total)*100),currency:'INR',receipt:orderId});
    return res.json({orderId,razorpayOrder:order,keyId:process.env.RAZORPAY_KEY_ID});
  }
  // Cash order is only a demo until a database and order-management workflow are connected.
  return res.status(201).json({orderId,status:'received',orderType,subtotal,delivery,total});
});

app.post('/api/payments/verify', (req,res) => {
  const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body || {};
  if (!process.env.RAZORPAY_KEY_SECRET) return res.status(503).json({error:'Razorpay is not configured'});
  const expected = crypto.createHmac('sha256',process.env.RAZORPAY_KEY_SECRET).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest('hex');
  const a = Buffer.from(expected); const b = Buffer.from(razorpay_signature || '');
  if (a.length !== b.length || !crypto.timingSafeEqual(a,b)) return res.status(400).json({verified:false});
  // Mark the matching database order as paid here, only after verifying the signature.
  return res.json({verified:true});
});

app.listen(process.env.PORT || 5000,()=>console.log(`Kachori Kart API running on ${process.env.PORT || 5000}`));