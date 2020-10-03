import Router from 'koa-router';
import Stripe from 'stripe';

const stripe = Stripe(process.env.STRIPE_KEY);

const routesCustomer = new Router({
    prefix: '/customer'
});

routesCustomer.get('/', async (ctx, next) => {
    console.log("GET all customers");
    const customers = await stripe.customers.list();
    ctx.body = customers;
    ctx.status = 200;
});

routesCustomer.get('/:customerId/customer_balance_transactions', async (ctx, next) => {
    console.log("GET all customer balance transactions");
    const customerId = ctx.params.customerId;
    const balanceTransactions = await stripe.customers.listBalanceTransactions(customerId);
    ctx.body = balanceTransactions;
    ctx.status = 200;
});

routesCustomer.delete('/:customerId', async (ctx, next) => {
    const customerId = ctx.params.customerId;
    const deleted = await stripe.customers.del(customerId);
    console.log("deleted: ", JSON.stringify(deleted, null, 4));
    ctx.status = 204;
})

export default routesCustomer;
