// pages/products.tsx

import { GetStaticProps } from 'next';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface Props {
  products: Product[];
  newProducts: Product[];
  error?: string;
}

const ProductsPage: React.FC<Props> = ({ products, newProducts, error }) => {
  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      <h2>What's New</h2>
      <ul>
        {newProducts.map(product => (
          <li key={product.id}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <img src={product.image} alt={product.title} style={{ maxWidth: '200px' }} />
          </li>
        ))}
      </ul>
      <h2>All Products</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <img src={product.image} alt={product.title} style={{ maxWidth: '200px' }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const products = await res.json();

    // Assuming the last 3 products are "new"
    const newProducts = products.slice(-3);

    return {
      props: {
        products,
        newProducts,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        products: [],
        newProducts: [],
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
      },
    };
  }
};

export default ProductsPage;
