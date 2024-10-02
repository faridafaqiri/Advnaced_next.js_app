import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LoginPage = () => {
  const handleLogin = () => {
    signIn('google');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="container mx-auto p-4 flex flex-col items-center justify-center flex-grow">
        <h1 className="text-3xl font-bold mb-6">Login</h1>
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Login with Google
        </button>
        <p className="mt-4 text-gray-700">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-blue-500 underline hover:text-blue-600">
            Sign Up
          </Link>
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default LoginPage;