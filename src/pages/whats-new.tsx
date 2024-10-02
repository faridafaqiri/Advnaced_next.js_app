import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';

// Define the type for a product
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string; // Assuming you will provide valid image URLs
  rating: {
    rate: number;
    count: number;
  };
}

const WhatsNew = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products'); // Example API
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data: Product[] = await res.json();
        const selectedProducts = data.sort(() => 0.5 - Math.random()).slice(0, 4);
        setProducts(selectedProducts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">What&apos;s New</h2>
        
        {loading && <p className="text-center">Loading products...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {products.length === 0 && !loading && <p className="text-center">No products available.</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <Image
                src={product.image}
                alt={product.title}
                width={150}
                height={150}
                className="object-cover rounded-lg"
              />
              <p className="mt-2 text-gray-700">${product.price}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WhatsNew;
