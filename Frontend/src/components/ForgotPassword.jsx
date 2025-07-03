import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';  // Make sure the path is correct
import toast, { Toaster } from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      toast.error(error.message);
    } else {
      setMessage(`Password reset link has been sent to ${email}. Please check your inbox (and spam folder).`);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <Toaster position="top-center" />
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        {message && (
          <div className="mb-4 text-green-400 text-sm text-center">
            {message}
          </div>
        )}
        <form onSubmit={handleReset} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Enter your email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Send Reset Link
          </button>
        </form>

        <p className="mt-6 text-sm text-center">
          <Link to="/signin" className="text-indigo-400 hover:text-indigo-200">
            Back to Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
