import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Define a TypeScript interface for products
interface Product {
  id: number;
  title: string; // Changed from 'name' to 'title' to match the API
  price: number; // Changed to number for better formatting
  image: string; // Added image property
}

const WhatsNewPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        setError(`Failed to fetch products: ${(error as Error).message}`);
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewProducts();
  }, []);

  return (
    <>
      <Navbar />
      <main className="container mx-auto mt-8">
        <h1 className="text-4xl font-bold mb-8">Pricing...</h1>
        <p className="text-lg">Discover the latest products and exciting offers at our store!</p>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded shadow flex items-center">
              <img src={product.image} alt={product.title} className="w-16 h-16 mr-4" />
              <div>
                <h2 className="text-xl font-semibold">{product.title}</h2>
                <p className="text-lg">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default WhatsNewPage;
