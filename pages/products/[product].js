import fs from 'fs';
import matter from 'gray-matter';
import marked from 'marked';

const Product = ({ product: { data, content } }) => {
    const html = marked(content);

    return (
        <main className="pt-4 pt-lg-5 mt-4 mt-lg-5">
            <div className="container">
                <div className="row align-items-center justify-content-between mb-4">
                    <div className="col-lg-auto">
                        <h1>{ data.name }</h1>
                        <p className="lead text-muted">{ data.description }</p>
                    </div>
                    <div className="col-lg-auto">
                        <p className="lead">${ data.price / 100 }</p>
                    </div>
                </div>
                <div className="row align-items-center justify-content-between">
                    <div className="col-lg-4">
                        <p dangerouslySetInnerHTML={{ __html: html }} className="h3" />
                    </div>
                    <div className="col-lg-auto">
                        <img src="https://dummyimage.com/600x600/999/fff" className="rounded-circle" alt="This is a placeholder image" />
                    </div>
                </div>
            </div>
        </main>
    );
};

export const getStaticPaths = () => {
    // Product pages to generate
    const directory = `${process.cwd()}/content`;
    const filenames = fs.readdirSync(directory);

    const paths = filenames.map((filename) => {
        return {
            params: {
                product: filename.replace('.md', '')
            }
        };
    });

    return {
        paths,
        // Here we can set a specific fallback 404 page
        // Like "Product Not Found", rather than default 404 page of "Page Not Found"
        fallback: false
    };
};

export const getStaticProps = async (context) => {
    const productName = context.params.product;
    const filepath = `${process.cwd()}/content/${productName}.md`;
    const fileContent = fs.readFileSync(filepath).toString();
    const { data, content } = matter(fileContent);

    return {
        props: {
            product: {
                data,
                content
            }
        }
    };
};

export default Product;
