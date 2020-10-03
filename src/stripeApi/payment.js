import Router from 'koa-router';
import Stripe from 'stripe';

const stripe = Stripe(process.env.STRIPE_KEY);

const routesPayment = new Router({
  prefix: '/payment'
});

routesPayment.get('/', async (ctx, next) => {
  console.log('GET payments');
  ctx.status = 200;
});

routesPayment.get('/:id', async (ctx, next) => {
  const id = ctx.params.id;
  ctx.status = 200;
});

routesPayment.post('/', async (ctx, next) => {
  console.log("CREATE paymentIntent...");
  // {
  //   payment_method_types: ['card'],
  //   amount: 1000,
  //   currency: 'eur',
  //   application_fee_amount: 10
  //   // customer: 'cus_I5lV1yqpG7H1dR'
  // }, {
  //   stripeAccount: 'acct_1HY7NqH4kWrDM2Mo',
  // }
  const bodyOrder = ctx.request.body;
  const paymentIntent = await stripe.paymentIntents.create(bodyOrder);
  ctx.body = paymentIntent;
  ctx.status = 200;
});

export default routesPayment;


