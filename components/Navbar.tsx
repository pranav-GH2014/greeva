"use client";

import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname(); // This watches for URL changes

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Check for the cookie when the component loads
  useEffect(() => {
    const token = Cookies.get('auth-token');
    setIsLoggedIn(!!token);

    async function checkAdminStatus() {
      if (token) {
        try {
          const supabase = createClient();
          const { data: { user } } = await supabase.auth.getUser();
          setIsAdmin(user?.email === 'admin@greeva.com');
        } catch (error) {
          console.error("Error checking admin status:", error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    }

    checkAdminStatus();
  }, [pathname]);

  const handleLogout = () => {
    // Remove the key and update the UI
    Cookies.remove('auth-token');
    setIsLoggedIn(false);
    setIsAdmin(false);
    
    // Send them back to signup and refresh the gatekeeper
    router.push('/');
    router.refresh();
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 shadow-sm">
      <Link href="/" className="text-2xl font-black tracking-tighter text-black">
        GREEVA
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {/* Public Link */}
        <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-black">About</Link>

        {isLoggedIn ? (
          <>
            {/* Links only visible when logged in */}
            <Link href="/products" className="text-sm font-medium text-gray-600 hover:text-black">Products</Link>
            <Link href="/cart" className="text-sm font-medium text-gray-600 hover:text-black">Cart</Link>
            {isAdmin && (
              <Link href="/admin" className="text-sm font-bold text-[#B8860B] hover:text-black">Admin</Link>
            )}
            <button 
              onClick={handleLogout}
              className="text-sm font-bold text-red-500 hover:text-red-700 bg-red-50 px-4 py-2 rounded-full transition"
            >
              Logout
            </button>
          </>
        ) : (
          /* Links only visible when logged out */
          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="text-sm font-bold text-gray-600 hover:text-black transition"
            >
              Login
            </Link>
            <Link 
              href="/signup" 
              className="text-sm font-bold bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden p-2 text-gray-600 hover:text-black focus:outline-none"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle Navigation"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          {isMobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-[73px] left-0 w-full bg-white border-b border-gray-100 shadow-lg md:hidden z-50 flex flex-col items-center py-6 gap-6 animate-in slide-in-from-top-2 fade-in duration-200">
          <Link href="/about" className="text-lg font-medium text-gray-900 hover:text-black">About</Link>
          
          {isLoggedIn ? (
            <>
              <Link href="/products" className="text-lg font-medium text-gray-900 hover:text-black">Products</Link>
              <Link href="/cart" className="text-lg font-medium text-gray-900 hover:text-black">Cart</Link>
              {isAdmin && (
                <Link href="/admin" className="text-lg font-bold text-[#B8860B] hover:text-black">Admin panel</Link>
              )}
              <button 
                onClick={handleLogout}
                className="text-lg font-bold text-red-500 py-2 w-full max-w-[200px] border border-red-100 rounded-full"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-4 w-full px-6 text-center">
              <Link 
                href="/login" 
                className="text-lg font-bold text-gray-900 py-3 border border-gray-200 rounded-full w-full"
              >
                Login
              </Link>
              <Link 
                href="/signup" 
                className="text-lg font-bold bg-black text-white py-3 rounded-full w-full"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}