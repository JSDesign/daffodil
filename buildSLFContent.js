// Stuff here gets run on the Magical Netflify Not-server
// Remember, this Magical Netlify Not-server does not live within the next/react part of the app
const fs = require('fs');
const matter = require('gray-matter');

const getProducts = () => {
    const directory = `${process.cwd()}/content`;
    const filenames = fs.readdirSync(directory);

    const products = filenames.map((filename) => {
        // Read file from filesystem (fs)
        const fileContent = fs.readFileSync(`${directory}/${filename}`).toString();
        // Extract "frontmatter" from each file (the bit between the two lines of dashes ---)
        const { data } = matter(fileContent);

        return data;
    });

    return products;
};

const filepath = `${process.cwd()}/functions/products.json`;
const productsData = getProducts();
fs.writeFileSync(filepath, JSON.stringify(productsData));
