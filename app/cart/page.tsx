// app/cart/page.tsx
"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const router = useRouter();
  const isLoggedIn = false; // Replace this with your actual Auth logic

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/signup');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null; // Prevent flickering while redirecting

  return <div>Your Cart Content</div>;
}