import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { medusa, getCartId, setCartId, clearCartId, getRegionId, setRegionId } from '@/integrations/medusa/client';
import type { MedusaCart, MedusaLineItem } from '@/integrations/medusa/types';

// Ensure we have a region ID
const ensureRegionId = async (): Promise<string> => {
  let regionId = getRegionId();
  if (!regionId) {
    const { regions } = await medusa.store.region.list();
    if (regions && regions.length > 0) {
      regionId = regions[0].id;
      setRegionId(regionId);
    } else {
      throw new Error('No regions configured');
    }
  }
  return regionId;
};

// Create or retrieve cart
const ensureCart = async (): Promise<MedusaCart> => {
  const cartId = getCartId();
  
  if (cartId) {
    try {
      const { cart } = await medusa.store.cart.retrieve(cartId);
      if (cart && !cart.completed_at) {
        return cart as MedusaCart;
      }
    } catch {
      // Cart not found or invalid, create new one
      clearCartId();
    }
  }
  
  // Create new cart
  const regionId = await ensureRegionId();
  const { cart } = await medusa.store.cart.create({
    region_id: regionId,
  });
  
  setCartId(cart.id);
  return cart as MedusaCart;
};

export function useMedusaCart() {
  const queryClient = useQueryClient();

  // Fetch current cart
  const { data: cart, isLoading } = useQuery({
    queryKey: ['medusa-cart'],
    queryFn: async (): Promise<MedusaCart | null> => {
      const cartId = getCartId();
      if (!cartId) return null;
      
      try {
        const { cart } = await medusa.store.cart.retrieve(cartId);
        if (cart?.completed_at) {
          clearCartId();
          return null;
        }
        return cart as MedusaCart;
      } catch {
        clearCartId();
        return null;
      }
    },
  });

  // Add item to cart
  const addToCart = useMutation({
    mutationFn: async ({ variantId, quantity }: { variantId: string; quantity: number }) => {
      const cart = await ensureCart();
      
      const { cart: updatedCart } = await medusa.store.cart.createLineItem(cart.id, {
        variant_id: variantId,
        quantity,
      });
      
      return updatedCart as MedusaCart;
    },
    onSuccess: (updatedCart) => {
      queryClient.setQueryData(['medusa-cart'], updatedCart);
    },
  });

  // Update line item quantity
  const updateQuantity = useMutation({
    mutationFn: async ({ lineItemId, quantity }: { lineItemId: string; quantity: number }) => {
      const cartId = getCartId();
      if (!cartId) throw new Error('No cart found');
      
      if (quantity <= 0) {
        const { cart } = await medusa.store.cart.deleteLineItem(cartId, lineItemId);
        return cart as MedusaCart;
      }
      
      const { cart } = await medusa.store.cart.updateLineItem(cartId, lineItemId, {
        quantity,
      });
      
      return cart as MedusaCart;
    },
    onSuccess: (updatedCart) => {
      queryClient.setQueryData(['medusa-cart'], updatedCart);
    },
  });

  // Remove item from cart
  const removeFromCart = useMutation({
    mutationFn: async (lineItemId: string) => {
      const cartId = getCartId();
      if (!cartId) throw new Error('No cart found');
      
      const { cart } = await medusa.store.cart.deleteLineItem(cartId, lineItemId);
      return cart as MedusaCart;
    },
    onSuccess: (updatedCart) => {
      queryClient.setQueryData(['medusa-cart'], updatedCart);
    },
  });

  // Clear cart (create new one)
  const clearCart = useMutation({
    mutationFn: async () => {
      clearCartId();
      const regionId = await ensureRegionId();
      const { cart } = await medusa.store.cart.create({
        region_id: regionId,
      });
      setCartId(cart.id);
      return cart as MedusaCart;
    },
    onSuccess: (newCart) => {
      queryClient.setQueryData(['medusa-cart'], newCart);
    },
  });

  // Update cart with shipping address
  const updateShippingAddress = useMutation({
    mutationFn: async (address: {
      first_name: string;
      last_name: string;
      address_1: string;
      address_2?: string;
      city: string;
      country_code: string;
      postal_code?: string;
      phone?: string;
    }) => {
      const cartId = getCartId();
      if (!cartId) throw new Error('No cart found');
      
      const { cart } = await medusa.store.cart.update(cartId, {
        shipping_address: address,
      });
      
      return cart as MedusaCart;
    },
    onSuccess: (updatedCart) => {
      queryClient.setQueryData(['medusa-cart'], updatedCart);
    },
  });

  // Set cart email
  const setEmail = useMutation({
    mutationFn: async (email: string) => {
      const cartId = getCartId();
      if (!cartId) throw new Error('No cart found');
      
      const { cart } = await medusa.store.cart.update(cartId, { email });
      return cart as MedusaCart;
    },
    onSuccess: (updatedCart) => {
      queryClient.setQueryData(['medusa-cart'], updatedCart);
    },
  });

  // Calculate totals from cart items
  const items = cart?.items || [];
  const totalItems = items.reduce((sum: number, item: MedusaLineItem) => sum + item.quantity, 0);
  const totalPrice = (cart?.total || 0) / 100; // Convert from cents

  return {
    cart,
    items,
    isLoading,
    totalItems,
    totalPrice,
    subtotal: (cart?.subtotal || 0) / 100,
    shippingTotal: (cart?.shipping_total || 0) / 100,
    discountTotal: (cart?.discount_total || 0) / 100,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    updateShippingAddress,
    setEmail,
  };
}
