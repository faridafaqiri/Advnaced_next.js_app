import { GetStaticPaths, GetStaticProps } from 'next';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Image from 'next/image'; // Import the Next.js Image component

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

interface ProductPageProps {
  product: Product;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();

  const paths = products.map((product: Product) => ({
    params: { id: product.id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`https://fakestoreapi.com/products/${params?.id}`);
  const product = await res.json();

  return {
    props: {
      product,
    },
  };
};

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  return (
    <>
      <Navbar />
      <main className="container mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Image
            src={product.image}
            alt={product.title}
            width={500} // Specify the width for the image
            height={500} // Specify the height for the image
            className="w-full h-auto object-cover rounded-lg" // Use className for Tailwind CSS styles
          />
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
            <p className="text-lg mb-4">{product.description}</p>
            <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductPage;
