require('dotenv').config();
const express = require('express');
const Stripe = require('stripe');

const app = express();
app.use(express.json());
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.get('/health', (req, res) => res.json({status: 'OK', price: 'price_1T7VhpBk95yQtnPlhiKDQJFh'}));

app.post('/create-checkout', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: 'price_1T7VhpBk95yQtnPlhiKDQJFh', quantity: 1 }],
      success_url: 'https://boostnegocios-abc123.vercel.app/success',
      cancel_url: 'https://boostnegocios-abc123.vercel.app'
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(3001, () => console.log('🚀 API localhost:3001 - Stripe LIVE'));
