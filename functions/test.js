exports.handler = async (event, context) => {
    return {
        statusCode: 200,
        body: `Public Key: ${process.env.STRIPE_PUBLIC_KEY}`
    };
};
