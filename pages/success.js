import { useEffect } from 'react';
import useCart from '../hooks/useCart';

const Success = () => {
    const { clearCart } = useCart();

    useEffect(() => {
        clearCart();
    }, []);

    return (
        <main className="pt-4 pt-lg-5 mt-4 mt-lg-5">
            <div className="container">
                <div className="mb-4">
                    <h1>Payment Successful</h1>
                    <p className="lead text-muted">Thank you for your purchase.</p>
                </div>
            </div>
        </main>
    );
};

export default Success;
