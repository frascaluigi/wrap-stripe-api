import Router from 'koa-router';
import Stripe from 'stripe';

const stripe = Stripe(process.env.STRIPE_KEY);

const routesOrder = new Router({
  prefix: '/order'
});

routesOrder.get('/', async (ctx, next) => {
  console.log("Get All Orders");
});

routesOrder.get('/:orderId', async (ctx, next) => {
  console.log("Get Order by order id")
})

routesOrder.get('/customer/:customerId', async (ctx, next) => {
  console.log("Get all orders by customerId");
  const customerId = ctx.params.customerId;
  const orders = await stripe.orders.list({
    customer: customerId
  });
  ctx.body = orders;
  ctx.status = 200;
})

routesOrder.post('/', async (ctx, next) => {
  const bodyOrder = ctx.request.body;
  const order = await stripe.orders.create(bodyOrder);
  ctx.body = order;
  ctx.status = 200;
});

export default routesOrder;

