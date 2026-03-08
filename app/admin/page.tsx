"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { createClient } from "@/utils/supabase/client";

export default function AdminPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Home Decor",
    image: "",
  });

  const categories = ["Home Decor", "Bangles", "Handmade", "Art", "Furniture"];

  useEffect(() => {
    // Check for the auth token cookie
    const token = Cookies.get("auth-token");
    if (!token) {
      router.push("/login?redirect=/admin");
      return;
    }

    async function verifyAdmin() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user?.email === 'admin@greeva.com') {
          setIsLoggedIn(true);
        } else {
          alert("Unauthorized: You must be an administrator to view this page.");
          router.push("/");
        }
      } catch (err) {
        console.error("Auth error:", err);
        router.push("/");
      }
    }

    verifyAdmin();
  }, [router]);

  if (isLoggedIn === null) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    
    try {
      const supabase = createClient();
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user || user.email !== 'admin@greeva.com') {
        alert("Authentication error: You are not authorized.");
        setIsSubmitting(false);
        return;
      }
      
      // Attempt to insert the product
      const { error } = await supabase
        .from('products')
        .insert({
          name: formData.name,
          price: parseFloat(formData.price),
          category: formData.category,
          image: formData.image,
          created_by: user.id
        });
        
      if (error) {
        console.error("Error adding product:", error);
        alert(`Database Error: ${error.message} \n\nDid you run the SQL script in your Supabase admin panel to create the 'products' table?`);
      } else {
        setSuccessMessage(`Product "${formData.name}" added successfully!`);
        // Reset form
        setFormData({
          name: "",
          price: "",
          category: "Home Decor",
          image: "",
        });
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white border border-gray-100 shadow-xl rounded-3xl p-8 md:p-12">
          
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-500">Add a new premium product to your catalog.</p>
          </div>

          {successMessage && (
            <div className="mb-8 bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-xl flex items-center gap-3 animate-in fade-in duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-semibold">{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Product Name</label>
              <div className="mt-2">
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="e.g. Midnight Onyx Vase"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm border p-3 bg-gray-50 focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
              <div>
                <label htmlFor="price" className="block text-sm font-semibold text-gray-700">Price (₹)</label>
                <div className="mt-2">
                  <input
                    type="number"
                    id="price"
                    name="price"
                    min="1"
                    step="1"
                    required
                    placeholder="e.g. 4500"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm border p-3 bg-gray-50 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-semibold text-gray-700">Category</label>
                <div className="mt-2">
                  <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm border p-3 bg-gray-50 focus:bg-white transition-colors"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-semibold text-gray-700 flex justify-between">
                <span>Image URL</span>
                <span className="text-gray-400 font-normal text-xs">For testing: https://picsum.photos/seed/xyz/600</span>
              </label>
              <div className="mt-2">
                <input
                  type="url"
                  id="image"
                  name="image"
                  required
                  placeholder="https://..."
                  value={formData.image}
                  onChange={handleInputChange}
                  className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm border p-3 bg-gray-50 focus:bg-white transition-colors"
                />
              </div>
            </div>
            
            {/* Live Image Preview */}
            {formData.image && (
              <div className="mt-4 border rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center p-4">
                <p className="text-xs text-gray-400 mb-2 absolute top-2 left-4">Image Preview</p>
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  className="max-h-48 object-contain rounded shadow-sm mt-4"
                  onError={(e) => {
                    // Hide broken image links gracefully
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                  onLoad={(e) => {
                    (e.target as HTMLImageElement).style.display = 'block';
                  }}
                />
              </div>
            )}

            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full rounded-full px-8 py-4 text-base font-bold text-white shadow-xl transition-all transform focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${
                  isSubmitting 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-black hover:bg-gray-800 hover:shadow-2xl hover:-translate-y-1"
                }`}
              >
                {isSubmitting ? "Adding Product..." : "Add Product to Database"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
