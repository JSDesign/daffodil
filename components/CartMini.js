// import Cart from "../context/Cart";
import useCart from '../hooks/useCart';
import { useRouter } from 'next/router';

const CartMini = () => {
    const { cart, isOpen, openCart, closeCart, total } = useCart();
    const router = useRouter();

    const handleClick = (e) => {
        e.stopPropagation();
        closeCart();
    };

    const beginCheckout = (e) => {
        e.stopPropagation();
        closeCart();
        router.push('/checkout');
    };

    return (
        <div className={`shadow-lg p-2 cart-mini ${(isOpen ? "is-open" : "is-closed")}`}>
            <div className="d-flex justify-content-between">
                <h3 className="pt-1 ps-2 mb-0">Cart</h3>
                <button onClick={handleClick} className="btn btn-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </button>
            </div>
            {cart.length > 0 ? (
                <div className="p-4">
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
                    <div className="d-grid gap-2">
                        <button onClick={beginCheckout} className="btn btn-primary">Begin Checkout</button>
                    </div>
                </div>
            ) : (
                <div className="p-4">
                    <p>Cart is empty.</p>
                </div>
            )}
        </div>
    );
};

export default CartMini;
