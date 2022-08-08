const Stripe = require('stripe');

const stripeClient = new Stripe(process.env.apiKey);

async function initPaymentIntent(amount) {
    /**
     * A positive integer in pence (or 0 for a free plan)
     * representing how much to charge on a recurring basis.
     * doc: https://stripe.com/docs/api/payment_intents/object#payment_intent_object-amount
     */
    return stripeClient.paymentIntents.create({
        amount: 200,
        currency: 'GBP',
    });
}

const paymentData = async() => {
    const paymentIntent = await initPaymentIntent();

    const payment = {
        totalFees: 200,
        clientSecret: paymentIntent.client_secret,
        paymentReference: paymentIntent.id,
    };

    return payment;
}

module.exports = paymentData;