import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container mx-auto mt-8 flex-grow">
        <h1 className="text-4xl font-bold text-center">Welcome to Our E-Commerce Store</h1>
        <p className="text-center mt-4">
          Explore the latest products and exciting offers. Shop now for the best deals!
        </p>
        <div className="mt-8 flex justify-center">
          <Image 
            src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" // New image from fakestoreapi
            alt="Leather bag"
            width={200}
            height={150}
            className="rounded shadow-lg"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
