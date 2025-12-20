import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';

// Wishlist is stored locally for now
// Medusa 2.0 doesn't have built-in wishlist functionality
// This can be extended with a custom Medusa module later

const WISHLIST_KEY = 'medusa_wishlist';

interface WishlistItem {
  id: string;
  product_id: string;
  created_at: string;
}

const getStoredWishlist = (userId?: string): WishlistItem[] => {
  const key = userId ? `${WISHLIST_KEY}_${userId}` : WISHLIST_KEY;
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
};

const setStoredWishlist = (items: WishlistItem[], userId?: string) => {
  const key = userId ? `${WISHLIST_KEY}_${userId}` : WISHLIST_KEY;
  localStorage.setItem(key, JSON.stringify(items));
};

export function useWishlist() {
  const { customer } = useAuth();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load wishlist on mount and when customer changes
  useEffect(() => {
    const items = getStoredWishlist(customer?.id);
    setWishlistItems(items);
    setIsLoading(false);
  }, [customer?.id]);

  const addToWishlist = useCallback(async (productId: string) => {
    const newItem: WishlistItem = {
      id: `wish-${productId}-${Date.now()}`,
      product_id: productId,
      created_at: new Date().toISOString(),
    };
    
    const updated = [...wishlistItems, newItem];
    setWishlistItems(updated);
    setStoredWishlist(updated, customer?.id);
  }, [wishlistItems, customer?.id]);

  const removeFromWishlist = useCallback(async (productId: string) => {
    const updated = wishlistItems.filter(item => item.product_id !== productId);
    setWishlistItems(updated);
    setStoredWishlist(updated, customer?.id);
  }, [wishlistItems, customer?.id]);

  const isInWishlist = useCallback((productId: string): boolean => {
    return wishlistItems.some(item => item.product_id === productId);
  }, [wishlistItems]);

  const toggleWishlist = useCallback(async (productId: string) => {
    if (isInWishlist(productId)) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(productId);
    }
  }, [isInWishlist, addToWishlist, removeFromWishlist]);

  return {
    wishlistItems,
    isLoading,
    addToWishlist: { mutate: addToWishlist, mutateAsync: addToWishlist },
    removeFromWishlist: { mutate: removeFromWishlist, mutateAsync: removeFromWishlist },
    toggleWishlist,
    isInWishlist,
    wishlistCount: wishlistItems.length,
  };
}
