import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar'; // Make sure path is correct

const SignUpPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (email && password) {
        setSuccess(true);
        setError('');
      } else {
        throw new Error('Please provide valid email and password.');
      }
    } catch (err) {
      setError((err as Error).message || 'Something went wrong!');
      setSuccess(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl mb-4">Sign Up</h1>
        <form onSubmit={handleSignUp} className="flex flex-col">
          <input
            type="email"
            placeholder="Email"
            className="border p-2 mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 mb-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">Sign-up successful! You can now log in.</p>}
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Sign Up
          </button>
        </form>
        <p className="mt-4">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
