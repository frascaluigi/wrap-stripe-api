import Router from 'koa-router';
import Stripe from 'stripe';

const stripe = Stripe(process.env.STRIPE_KEY);

const routesAccount = new Router({
  prefix: '/account'
});

routesAccount.get('/', async (ctx, next) => {
  console.log('GET all accounts');
  const accounts = await stripe.accounts.list();
  ctx.body = accounts;
  ctx.status = 200;
});

routesAccount.get('/:id', async (ctx, next) => {
  const id = ctx.params.id;
  const account = await stripe.accounts.retrieve(id);
  ctx.body = account;
  ctx.status = 200;
});

routesAccount.post('/', async (ctx, next) => {
  console.log("CREATE account");
  const bodyAccount = ctx.request.body;
  const account = await stripe.accounts.create(bodyAccount);
  ctx.body = account;
  ctx.status = 200;
});

export default routesAccount;


