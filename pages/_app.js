// import 'bootstrap/scss/bootstrap.scss';
import '../scss/global.scss';
import Navbar from '../components/Navbar';
import CartProvider from '../context/Cart';
import CartMini from '../components/CartMini';

const MyApp = ({ Component, pageProps })  => {
    return (
        <CartProvider>
            <Navbar />
            <Component {...pageProps} />
            <CartMini />
        </CartProvider>
    )
};

export default MyApp;
