// Functions here get run on the Magical Not-server
// Of course, this Magical Not-server does not live within the next/react part of the app
const fs = require('fs');
const matter = require('gray-matter');

const directory = `${process.cwd()}/content`;
const filenames = fs.readdirSync(directory);

const getProducts = () => {
    const products = filenames.map((filename) => {
        // Read file from filesystem (fs)
        const fileContent = fs.readFileSync(`${directory}/${filename}`).toString();
        // Extract "frontmatter" from each file (the bit between the two lines of dashes ---)
        const { data } = matter(fileContent);

        return data;
    });

    return products;
};

exports.handler = async (event, context) => {
    // Build payload
    // User's products from their cart
    const { cart } = JSON.parse(event.body);

    process.env.STRIPE_PUBLIC_KEY;

    // All available products
    const products = getProducts();
    // Match the user's products with actual products with actual prices
    const theSafestCart = cart.map(({ id, qty }) => {
        const product = products.find(p => p.id === id);
        return {
            ... product,
            qty
        }
    });
    console.log(theSafestCart);
    // Talk to Stripe
    // Return result/status to client
    return {
        statusCode: 200,
        body: "Charged successfully!"
    };
};
