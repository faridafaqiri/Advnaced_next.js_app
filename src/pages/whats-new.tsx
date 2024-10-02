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

  useEffect(() => {
    const fetchProducts = async () => {
      // Assuming you have a different API that provides images
      const res = await fetch('https://fakestoreapi.com/products'); // Example API
      const data: Product[] = await res.json();
      const selectedProducts = data.sort(() => 0.5 - Math.random()).slice(0, 4);
      setProducts(selectedProducts);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">What's New</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border p-4">
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <Image
                src={product.image}
                alt={product.title}
                width={200}
                height={200}
                className="object-cover"
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
