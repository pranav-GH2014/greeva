"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const { cartItems, updateQuantity, removeItem } = useCart();

  useEffect(() => {
    // Check for the auth token cookie
    const token = Cookies.get('auth-token');
    if (!token) {
      router.push('/login');
    } else {
      setIsLoggedIn(true);
    }
  }, [router]);

  if (isLoggedIn === null) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 500 : 0;
  const tax = subtotal * 0.18; // 18% GST example
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-8 tracking-tighter">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link 
              href="/products" 
              className="inline-flex items-center justify-center rounded-full bg-black px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Your Items</h2>
                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item.id} className="py-6 flex sm:py-8 first:pt-0 last:pb-0">
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl object-cover object-center border border-gray-100 shadow-sm"
                        />
                      </div>

                      <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-lg font-bold text-gray-900">
                                <Link href="#">{item.name}</Link>
                              </h3>
                            </div>
                            <div className="mt-1 flex text-sm">
                              <p className="text-gray-500">{item.color}</p>
                            </div>
                            <p className="mt-2 text-lg font-medium text-gray-900">₹{item.price.toLocaleString('en-IN')}</p>
                          </div>

                          <div className="mt-4 sm:mt-0 sm:pr-9 flex items-center justify-between sm:justify-start gap-4">
                            <label htmlFor={`quantity-${item.id}`} className="sr-only">
                              Quantity, {item.name}
                            </label>
                            <div className="flex items-center border border-gray-300 rounded-full bg-white">
                              <button 
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black transition"
                              >
                                -
                              </button>
                              <span className="w-8 text-center text-sm font-medium text-gray-900">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black transition"
                              >
                                +
                              </button>
                            </div>

                            <div className="absolute top-0 right-0 sm:relative sm:top-auto sm:right-auto sm:ml-4">
                              <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                className="-m-2 p-2 inline-flex text-gray-400 hover:text-red-500 transition"
                              >
                                <span className="sr-only">Remove</span>
                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                  <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4">
              <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 sm:p-8 sticky top-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                <dl className="space-y-4 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <dt>Subtotal</dt>
                    <dd className="font-medium text-gray-900">₹{subtotal.toLocaleString('en-IN')}</dd>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-4">
                    <dt className="flex items-center">Shipping estimate</dt>
                    <dd className="font-medium text-gray-900">₹{shipping.toLocaleString('en-IN')}</dd>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-4">
                    <dt className="flex items-center">Tax estimate (18%)</dt>
                    <dd className="font-medium text-gray-900">₹{tax.toLocaleString('en-IN')}</dd>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-4">
                    <dt className="text-base font-bold text-gray-900">Order Total</dt>
                    <dd className="text-base font-bold text-gray-900">₹{total.toLocaleString('en-IN')}</dd>
                  </div>
                </dl>

                <div className="mt-8 space-y-4">
                  <button
                    type="button"
                    className="w-full rounded-full bg-black text-white px-8 py-4 text-sm font-bold shadow-sm transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                    onClick={() => router.push('/address')}
                  >
                    Proceed to Checkout
                  </button>
                </div>
                
                <div className="mt-6 text-center text-sm text-gray-500">
                  <p>
                    or{' '}
                    <Link href="/products" className="font-medium text-black hover:text-gray-800">
                      Continue Shopping<span aria-hidden="true"> &rarr;</span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}