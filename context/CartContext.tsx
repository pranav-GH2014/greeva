"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient } from '@/utils/supabase/client';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  buyNow: (item: Omit<CartItem, 'quantity'>) => Promise<void>;
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage or Supabase on mount
  useEffect(() => {
    const fetchCart = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // Fetch from Supabase
        const { data, error } = await supabase
          .from('cart_items')
          .select('product_id, product_name, price, quantity, image, color')
          .eq('user_id', user.id);

        if (data && !error) {
          // Map DB columns to our CartItem type
          const dbCart = data.map(dbItem => ({
            id: dbItem.product_id,
            name: dbItem.product_name,
            price: dbItem.price,
            quantity: dbItem.quantity,
            image: dbItem.image,
            color: dbItem.color,
          }));
          setCartItems(dbCart);
          setIsLoaded(true);
          return;
        }
      }

      // Fallback to local storage if not logged in or fetch failed
      const savedCart = localStorage.getItem('greeva-cart');
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart));
        } catch (e) {
          console.error("Failed to parse cart from local storage");
        }
      }
      setIsLoaded(true);
    };

    fetchCart();
  }, []);

  // Save to local storage when cart changes (as a backup and for guests)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('greeva-cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  const addToCart = async (item: Omit<CartItem, 'quantity'>) => {
    // Optimistic UI update
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1, color: "Standard" }]; // Default color for now
    });

    // Supabase Sync
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const currentItem = cartItems.find(i => i.id === item.id);
      const newQuantity = currentItem ? currentItem.quantity + 1 : 1;
      
      await supabase.from('cart_items').upsert({
        user_id: user.id,
        product_id: item.id,
        product_name: item.name,
        price: item.price,
        quantity: newQuantity,
        image: item.image,
        color: "Standard"
      });
    }
  };

  const buyNow = async (item: Omit<CartItem, 'quantity'>) => {
    // 1. Clear cart optimistically & locally
    setCartItems([{ ...item, quantity: 1, color: "Standard" }]);

    // 2. Clear & Add in Supabase
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      // Clear their old cart
      await supabase.from('cart_items').delete().match({ user_id: user.id });
      // Insert the new item
      await supabase.from('cart_items').insert({
        user_id: user.id,
        product_id: item.id,
        product_name: item.name,
        price: item.price,
        quantity: 1,
        image: item.image,
        color: "Standard"
      });
    } else {
      // Save local storage for guest
      localStorage.setItem('greeva-cart', JSON.stringify([{ ...item, quantity: 1, color: "Standard" }]));
    }
  };

  const updateQuantity = async (id: string, delta: number) => {
    // Optimistic UI update
    let updatedQuantity = 1;
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        updatedQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: updatedQuantity };
      }
      return item;
    }));

    // Supabase Sync
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      // Find the item to get its other properties for upsert
      const itemToUpdate = cartItems.find(i => i.id === id);
      if (itemToUpdate) {
        await supabase.from('cart_items').upsert({
          user_id: user.id,
          product_id: itemToUpdate.id,
          product_name: itemToUpdate.name,
          price: itemToUpdate.price,
          quantity: updatedQuantity,
          image: itemToUpdate.image,
          color: itemToUpdate.color
        });
      }
    }
  };

  const removeItem = async (id: string) => {
    // Optimistic UI update
    setCartItems(prev => prev.filter(item => item.id !== id));

    // Supabase Sync
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from('cart_items')
        .delete()
        .match({ user_id: user.id, product_id: id });
    }
  };

  const clearCart = async () => {
    // Optimistic UI update
    setCartItems([]);

    // Supabase Sync
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from('cart_items')
        .delete()
        .match({ user_id: user.id });
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, buyNow, updateQuantity, removeItem, clearCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
