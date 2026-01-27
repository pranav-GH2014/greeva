"use client";

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // 1. Remove the "key" from the browser
    Cookies.remove('auth-token');

    // 2. Refresh the page or redirect to force the middleware to check again
    router.push('/signup');
    router.refresh(); 
  };

  return (
    <button 
      onClick={handleLogout}
      className="text-sm font-medium text-red-600 hover:text-red-800 transition"
    >
      Logout
    </button>
  );
}