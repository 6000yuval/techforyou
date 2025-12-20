// This hook is deprecated - cart is now managed by Medusa via CartContext
// Keeping for backwards compatibility but it's essentially a no-op

import { useAuth } from '@/contexts/AuthContext';

interface ServerCartItem {
  id: string;
  product_id: string;
  variant_id: string | null;
  quantity: number;
  created_at: string;
}

export function useServerCart() {
  const { customer } = useAuth();

  // Return empty state - cart is now managed by Medusa in CartContext
  return {
    serverItems: [] as ServerCartItem[],
    isLoading: false,
    addToCart: {
      mutate: () => {},
      mutateAsync: async () => {},
    },
    updateQuantity: {
      mutate: () => {},
      mutateAsync: async () => {},
    },
    removeFromCart: {
      mutate: () => {},
      mutateAsync: async () => {},
    },
    clearServerCart: {
      mutate: () => {},
      mutateAsync: async () => {},
    },
  };
}
