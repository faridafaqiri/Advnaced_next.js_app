import { GetStaticProps } from 'next';
import Image from 'next/image'; // Import Next.js Image component

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
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Products</h1>

      <h2 className="text-2xl font-semibold mt-6">What&apos;s New</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {newProducts.map((product) => (
          <li key={product.id} className="border rounded-lg p-4 shadow-lg">
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="mt-2">{product.description}</p>
            <p className="mt-2 font-bold">Price: ${product.price.toFixed(2)}</p>
            <Image
              src={product.image}
              alt={product.title}
              width={200}
              height={200}
              className="mt-2 max-w-full h-auto rounded"
            />
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mt-6">All Products</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <li key={product.id} className="border rounded-lg p-4 shadow-lg">
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="mt-2">{product.description}</p>
            <p className="mt-2 font-bold">Price: ${product.price.toFixed(2)}</p>
            <Image
              src={product.image}
              alt={product.title}
              width={200}
              height={200}
              className="mt-2 max-w-full h-auto rounded"
            />
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
