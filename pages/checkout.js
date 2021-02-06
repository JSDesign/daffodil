import useCart from '../hooks/useCart';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js'

const Checkout = () => {
    const { cart, total } = useCart();
    const processPayment = async () => {
        const url = '/.netlify/functions/charge-card';
        const newCart = cart.map(({ id, qty }) => ({
            id,
            qty
        }));

        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
        const { data } = await axios.post(url, { cart: newCart });
        await stripe.redirectToCheckout({ sessionId: data.id });
    };

    return (
        <main className="pt-4 pt-lg-5 mt-4 mt-lg-5">
            <div className="container">
                <div className="mb-4">
                    <h1>Checkout</h1>
                    <p className="lead text-muted">Please review your cart. You may process your payment whenever you are ready.</p>
                </div>
                {cart.length > 0 ? (
                    <>
                        <ul className="list-group mb-4">
                            {cart.map((item) => {
                                return (
                                    <li key={ item.id } className="list-group-item">
                                        <span className="d-block mb-2 me-2">{ item.name }</span>
                                        <span className="small text-muted d-flex justify-content-between">
                                            <span>{ item.qty }x</span>
                                            <span>${ (item.price / 100) * item.qty }</span>
                                        </span>
                                    </li>
                                );
                            })}
                            <li className="list-group-item d-flex justify-content-between py-3">
                                <span>Total</span>
                                <span>${total / 100}</span>
                            </li>
                        </ul>
                        <div className="text-end"><button onClick={processPayment} className="btn btn-primary">Process Payment</button></div>
                    </>
                ) : (
                    <p>You do not appear to have any items in your cart.</p>
                )}
            </div>
        </main>
    );
};

export default Checkout;
