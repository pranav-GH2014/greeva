"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function AddressPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
  });

  useEffect(() => {
    const checkAuthAndLoadProfile = async () => {
      // Check for the auth token cookie
      const token = Cookies.get("auth-token");
      if (!token) {
        router.push("/login");
        return;
      }
      setIsLoggedIn(true);

      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (data && !error) {
            // Pre-fill form if data exists
            setFormData({
              firstName: data.first_name || "",
              lastName: data.last_name || "",
              email: user.email || "", // Populate email from auth if available
              phone: data.phone || "",
              addressLine1: data.address_line1 || "",
              addressLine2: data.address_line2 || "",
              city: data.city || "",
              state: data.state || "",
              postalCode: data.postal_code || "",
            });
          }
        }
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };

    checkAuthAndLoadProfile();
  }, [router]);

  if (isLoggedIn === null) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const supabase = createClient();
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        alert("You must be logged in to save an address.");
        setIsSubmitting(false);
        return;
      }
      
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          address_line1: formData.addressLine1,
          address_line2: formData.addressLine2,
          city: formData.city,
          state: formData.state,
          postal_code: formData.postalCode,
          updated_at: new Date().toISOString(),
        });
        
      if (error) {
        console.error("Error saving address:", error);
        alert("There was an error saving your address. Please try again.");
      } else {
        alert("Address saved successfully! Proceeding to payment...");
        // router.push("/checkout/payment");
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
        <div className="mb-8">
          <Link href="/cart" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-800 transition">
            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Cart
          </Link>
        </div>

        <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-8 md:p-12">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-2">Delivery Information</h1>
            <p className="text-gray-500">Please provide your details so we can ship your premium order.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Info */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Contact Details</h2>
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700">First name</label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      autoComplete="given-name"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm border p-3 bg-gray-50 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700">Last name</label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      autoComplete="family-name"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm border p-3 bg-gray-50 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email address</label>
                  <div className="mt-2">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm border p-3 bg-gray-50 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">Phone number</label>
                  <div className="mt-2">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      autoComplete="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm border p-3 bg-gray-50 focus:bg-white transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Address Info */}
            <div className="pt-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Shipping Address</h2>
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                <div className="sm:col-span-2">
                  <label htmlFor="addressLine1" className="block text-sm font-semibold text-gray-700">Address line 1</label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="addressLine1"
                      name="addressLine1"
                      autoComplete="street-address"
                      required
                      value={formData.addressLine1}
                      onChange={handleInputChange}
                      className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm border p-3 bg-gray-50 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="addressLine2" className="block text-sm font-semibold text-gray-700">Address line 2 (Optional)</label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="addressLine2"
                      name="addressLine2"
                      value={formData.addressLine2}
                      onChange={handleInputChange}
                      className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm border p-3 bg-gray-50 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-semibold text-gray-700">City</label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="city"
                      name="city"
                      autoComplete="address-level2"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm border p-3 bg-gray-50 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="state" className="block text-sm font-semibold text-gray-700">State / Province</label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="state"
                      name="state"
                      autoComplete="address-level1"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm border p-3 bg-gray-50 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="postalCode" className="block text-sm font-semibold text-gray-700">Postal code</label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      autoComplete="postal-code"
                      required
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm border p-3 bg-gray-50 focus:bg-white transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

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
                {isSubmitting ? "Saving..." : "Save & Continue"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
