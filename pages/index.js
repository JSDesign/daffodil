import Link from 'next/link';
import fs from 'fs';
import matter from 'gray-matter';
import useCart from '../hooks/useCart';

const renderProduct = (product, addItemToCart) => {
    const handleClick = () => {
        addItemToCart(product);
    };

    return (
        <div className="col-md-6 col-lg-4" key={ product.id }>
            <div className="card mb-5">
                <img src="https://dummyimage.com/600x400/999/fff" className="card-img-top" alt="This is a placeholder image" />
                <div className="card-body product d-flex flex-column justify-content-between">
                    <span>
                        <Link href={ product.slug }><a><h2>{ product.name }</h2></a></Link>
                        <p className="lead text-muted mb-4 mb-xl-5">{ product.description }</p>
                    </span>
                    <div className="d-flex justify-content-between mb-2">
                        <button onClick={handleClick} className="btn btn-primary">Add to Cart</button>
                        <p className="h2 mb-0">${ product.price / 100 }</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const HomePage = (props) => {
    const { cart, addItemToCart } = useCart();

    return (
        <main className="pt-4 pt-lg-5 mt-4 mt-lg-5">
            <div className="container">
                <div className="row">
                    { props.products.map((product) => renderProduct(product, addItemToCart)) }
                </div>
            </div>
        </main>
    );
};

export const getStaticProps =  async () => {
    const directory = `${process.cwd()}/content`;
    const filenames = fs.readdirSync(directory);

    const products = filenames.map((filename) => {
        // Read file from filesystem (fs)
        const fileContent = fs.readFileSync(`${directory}/${filename}`).toString();
        // Extract "frontmatter" from each file (the bit between the two lines of dashes ---)
        const { data } = matter(fileContent);
        // Construct a slug and return product data
        const slug = `/products/${filename.replace('.md', '')}`;
        const product = {
            ...data,
            slug
        };
        return product;
    });

    return {
        props: {
            products
        }
    }
};

export default HomePage;
