"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation'; // For redirecting
import Cookies from 'js-cookie'; // For setting the "key"

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // 1. "Give the user the key"
    // In a real app, you'd get this token from your backend API
    Cookies.set('auth-token', 'user_logged_in_successfully', { expires: 5 / 1440 }); 

    // 2. Send them to the protected products page
    router.push('/products');
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Join Greeva</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ... your existing inputs ... */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full p-3 rounded-lg border border-gray-200 text-black"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full p-3 rounded-lg border border-gray-200 text-black"
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            className="w-full p-3 rounded-lg border border-gray-200 text-black"
            onChange={handleChange}
          />
          <button className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
            Create Account
          </button>
        </form>
      </div>
    </section>
  );
}