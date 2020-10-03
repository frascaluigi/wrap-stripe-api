import Koa from 'koa';
import bodyParser from 'koa-body-parser';
import routesAccount from './stripeApi/account.js';
import routesPayment from './stripeApi/payment.js';
import routesCustomer from './stripeApi/customer.js';
import routesOrder from './stripeApi/order.js';

const app = new Koa();

const PORT_ACCOUNT_USER = 3001;


// logger
app.use(async (ctx, next) => {
  console.log("1. logger");
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`3. ${ctx.method} ${ctx.url} - ${rt}`);
});

app.use(async (ctx, next) => {
  console.log("2. response time");
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(bodyParser());
app.use(routesAccount.routes());
app.use(routesCustomer.routes());
app.use(routesOrder.routes());
app.use(routesPayment.routes());

app.use(async ctx => {
  console.log("all other routes ...");
  ctx.body = 'Hello World';
  ctx.status = 200;
});

app.listen(PORT_ACCOUNT_USER, () => {
  console.log(`Start Stripe Api Account.. api-key: ${JSON.stringify(process.env.STRIPE_KEY)}`);
});