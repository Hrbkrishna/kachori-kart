# Kachori Kart — React + Vite

Premium responsive food ordering starter for Kachori Kart.

## Run locally
1. Install Node.js 18+.
2. Run `npm install`
3. Run `npm run dev` and open the Vite URL.

## API / Razorpay setup
- Copy `.env.example` to `.env` and add Razorpay credentials.
- Run the API separately with `npm run server` (install `dotenv` first: `npm install dotenv`).
- Configure a Vite proxy for `/api` to `http://localhost:5000` in `vite.config.js` before using the API locally.
- Razorpay order creation and signature verification are scaffolded in `server/index.js`.
- The checkout currently shows a **demo confirmation** when the API is unavailable. This is not a real payment or a production order record.
- Before launch: add a database, server-side menu/price validation, delivery-zone and fee rules, order persistence, Razorpay Checkout JS flow, webhook verification, rate limiting, input sanitization, HTTPS, and admin order management.

## Edit menu
Edit `src/data/menu.js` to change prices, descriptions, images, categories and availability. Replace the sample Unsplash image URLs with your own optimized food photography.

## Brand assets
The official Kachori Kart logo is included at `public/images/kachori-kart-logo.png`.

## Contact details
Business phone numbers and Maura, Aligarh location are set in `src/App.jsx`. Update timings and social profile links before publishing.
