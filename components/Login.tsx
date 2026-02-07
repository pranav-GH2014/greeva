"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    // In a real app, you would verify these credentials with your database/API
    if (formData.email && formData.password) {
      // 1. Set the key
      Cookies.set('auth-token', 'logged_in_token', { expires: 7 });
      
      // 2. Sync and Redirect
      router.refresh(); 
      router.push('/products');
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Welcome Back</h2>
        
        {error && <p className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-black"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-black"
            onChange={handleChange}
          />
          <button className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
            Login
          </button>
        </form>
        
        <p className="mt-4 text-center text-sm text-gray-600">
          New to Greeva? <a href="/signup" className="text-blue-600 hover:underline">Create an account</a>
        </p>
      </div>
    </section>
  );
}