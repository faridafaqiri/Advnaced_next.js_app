import { signIn } from 'next-auth/react';
import Link from 'next/link'; // Assuming Navbar uses Next.js Link
import { useState } from 'react'; // For handling search and menu toggle

const Navbar = () => {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false); // State for the hamburger menu

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic here if needed
  };

  return (
    <nav className="bg-gray-800 p-4 relative">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-white text-lg font-bold mb-2 md:mb-0">
          <Link href="/">E-Commerce</Link>
        </div>

        <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center mb-2 md:mb-0">
          <input
            type="text"
            placeholder="Search products..."
            className="px-4 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded-lg mt-2 md:mt-0 md:ml-2">
            Search
          </button>
        </form>

        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-white focus:outline-none"
        >
          {isOpen ? 'Close' : 'Menu'}
        </button>

        <ul className={`flex-col md:flex md:flex-row md:space-x-4 text-white absolute md:static bg-gray-800 md:bg-transparent transition-all duration-300 ${isOpen ? 'block' : 'hidden'} md:block top-full left-0 w-full md:w-auto z-20`}>
          <li className="p-2 text-center"><Link href="/">Home</Link></li>
          <li className="p-2 text-center"><Link href="/pricing">Pricing</Link></li>
          <li className="p-2 text-center"><Link href="/whats-new">What's New</Link></li>
          <li className="p-2 text-center"><Link href="/contact">Contact</Link></li>
          <li className="p-2 text-center"><Link href="/login">Login</Link></li>
        </ul>
      </div>
    </nav>
  );
};

const LoginPage = () => {
  const handleLogin = () => {
    signIn('google'); // Change 'google' to the provider you are using
  };

  return (
    <div>
      {/* Add Navbar */}
      <Navbar />

      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl mb-4">Login</h1>
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
