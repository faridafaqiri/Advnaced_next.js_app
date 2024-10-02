import { signIn } from 'next-auth/react';
import Link from 'next/link'; // Assuming Navbar uses Next.js Link
import { useState } from 'react'; // For handling search and menu toggle
import Navbar from '../components/Navbar'; // Adjust the import based on your folder structure
import Footer from '../components/Footer'; // Assuming you have a Footer component

const LoginPage = () => {
  const handleLogin = () => {
    signIn('google');
  };

  return (
    <div>
      <Navbar />

      <main className="container mx-auto p-4 flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl mb-4">Login</h1>
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login with Google
        </button>
        <p className="mt-4">
          Don't have an account?{' '}
          <Link href="/signup" className="text-blue-500">
            Sign Up
          </Link>
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default LoginPage;
