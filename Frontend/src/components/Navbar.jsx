import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="bg-black/50 backdrop-blur-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-indigo-500">Job Rec Sys.</span>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/features">Features</NavLink>
            <NavLink to="/upload">Upload CV</NavLink>

            {user ? (
              <>
                <span className="text-gray-300">
                  Welcome, {user.user_metadata?.firstName || user.email.split('@')[0]}!
                </span>
                <button
                  onClick={handleSignOut}
                  className="ml-4 bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700 transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700 transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="ml-2 px-4 py-2 border border-indigo-600 rounded hover:bg-indigo-700 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="text-gray-300 hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium"
    >
      {children}
    </Link>
  );
}

export default Navbar;
