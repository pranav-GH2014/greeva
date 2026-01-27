"use client";

import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for the cookie when the component loads
  useEffect(() => {
    const token = Cookies.get('auth-token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    // Remove the key and update the UI
    Cookies.remove('auth-token');
    setIsLoggedIn(false);
    
    // Send them back to signup and refresh the gatekeeper
    router.push('/signup');
    router.refresh();
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 shadow-sm">
      <Link href="/" className="text-2xl font-black tracking-tighter text-black">
        GREEVA
      </Link>

      <div className="flex items-center gap-8">
        {/* Public Link */}
        <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-black">About</Link>

        {isLoggedIn ? (
          <>
            {/* Links only visible when logged in */}
            <Link href="/products" className="text-sm font-medium text-gray-600 hover:text-black">Products</Link>
            <Link href="/cart" className="text-sm font-medium text-gray-600 hover:text-black">Cart</Link>
            <button 
              onClick={handleLogout}
              className="text-sm font-bold text-red-500 hover:text-red-700 bg-red-50 px-4 py-2 rounded-full transition"
            >
              Logout
            </button>
          </>
        ) : (
          /* Link only visible when logged out */
          <Link 
            href="/signup" 
            className="text-sm font-bold bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
          >
            Sign Up
          </Link>
        )}
      </div>
    </nav>
  );
}