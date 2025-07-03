import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';  // Import Link
import { supabase } from "../lib/supabase";
import toast, { Toaster } from 'react-hot-toast';

function SignUp({ setUser }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });

  const [message, setMessage] = useState('');  // To show confirmation message
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            firstName: form.firstName,
            lastName: form.lastName
          }
        }
      });

      if (error) throw error;

      // Do NOT setUser here, because user shouldn't be signed in yet
      setMessage('A confirmation email has been sent to your email address. Please check your inbox.');

      // Redirect to sign-in page after 3 seconds
      setTimeout(() => {
        navigate('/signin');
      }, 3000);

    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Toaster position="top-center" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/50 rounded-xl p-8"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>

          {/* Show message if exists, else show the form */}
          {message ? (
            <p className="text-green-400 text-center text-lg">{message}</p>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">First Name</label>
                  <input
                    name="firstName"
                    type="text"
                    value={form.firstName}
                    onChange={handleChange}
                    className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Last Name</label>
                  <input
                    name="lastName"
                    type="text"
                    value={form.lastName}
                    onChange={handleChange}
                    className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
                  <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Sign Up
                </button>
              </form>

              {/* Link to Sign In page */}
              <p className="mt-6 text-center text-gray-400">
                Already have an account?{' '}
                <Link to="/signin" className="text-indigo-500 hover:underline">
                  Sign In
                </Link>
              </p>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default SignUp;
