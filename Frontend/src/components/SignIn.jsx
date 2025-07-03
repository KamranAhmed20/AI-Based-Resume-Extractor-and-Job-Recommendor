import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const SignIn = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Invalid email or password.');
    } else {
      setUser(data.user);
      navigate('/upload'); // Redirect to your dashboard or upload page
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500">{error}</p>}

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Forgot Password link */}
          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-indigo-400 hover:text-indigo-200">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-sm text-center">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-indigo-400 hover:text-indigo-200">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
