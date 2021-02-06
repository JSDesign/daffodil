// Functions here get run on the Magical Netflify Not-server
// Remember, this Magical Netlify Not-server does not live within the next/react part of the app
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const products = require('./products.json'); // All available products, for comparison later bec bad actors

exports.handler = async (event, context) => {
    // Build payload
    // User's products from their cart
    const { cart } = JSON.parse(event.body);

    // Match the user's products with actual products and actual prices, to deter fake prices coming from black hat users
    const theSafestCart = cart.map(({ id, qty }) => {
        const product = products.find(p => p.id === id);
        return {
            ... product,
            qty
        }
    });
    console.log(theSafestCart);

    // Talk to Stripe
    // Create a line items array, formatted in the way Stripe is expecting
    const lineItems = theSafestCart.map((product) => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: product.name
            },
            unit_amount: product.price
        },
        quantity: product.qty
    }));
    // Create a new Stripe checkout session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${process.env.URL}/success`,
        cancel_url: `${process.env.URL}/cancelled`
    });

    // Return result/status to client
    return {
        statusCode: 200,
        body: JSON.stringify({ id: session.id })
    };
};
