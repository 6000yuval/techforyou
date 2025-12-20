import { useQuery } from '@tanstack/react-query';
import { medusa, getCartId } from '@/integrations/medusa/client';
import type { MedusaShippingOption } from '@/integrations/medusa/types';

export interface ShippingMethod {
  id: string;
  name: string;
  name_he: string;
  description: string | null;
  price: number;
  estimated_days_min: number | null;
  estimated_days_max: number | null;
  is_active: boolean;
  sort_order: number | null;
}

// Hebrew names for shipping providers
const shippingNameMapping: Record<string, string> = {
  'standard': 'משלוח רגיל',
  'express': 'משלוח מהיר',
  'pickup': 'איסוף עצמי',
  'free': 'משלוח חינם',
};

// Transform Medusa shipping option to app format
const transformShippingOption = (option: MedusaShippingOption): ShippingMethod => {
  const nameKey = option.name.toLowerCase();
  const hebrewName = shippingNameMapping[nameKey] || option.name;
  
  // Parse metadata for estimated days if available
  const metadata = option.metadata as Record<string, unknown> | null;
  
  return {
    id: option.id,
    name: option.name,
    name_he: hebrewName,
    description: (metadata?.description as string) || null,
    price: option.amount / 100, // Convert from cents
    estimated_days_min: (metadata?.estimated_days_min as number) || null,
    estimated_days_max: (metadata?.estimated_days_max as number) || null,
    is_active: true,
    sort_order: (metadata?.sort_order as number) || null,
  };
};

export const useShippingMethods = () => {
  return useQuery({
    queryKey: ['shipping-methods'],
    queryFn: async (): Promise<ShippingMethod[]> => {
      const cartId = getCartId();
      
      if (!cartId) {
        // No cart yet, return empty array
        return [];
      }
      
      try {
        const { shipping_options } = await medusa.store.fulfillment.listCartOptions({
          cart_id: cartId,
        });
        
        return (shipping_options as MedusaShippingOption[] || []).map(transformShippingOption);
      } catch (error) {
        console.error('Error fetching shipping options:', error);
        return [];
      }
    },
    staleTime: 1000 * 60, // Cache for 1 minute
  });
};

// Add shipping method to cart
export const useAddShippingMethod = () => {
  return {
    addShippingMethod: async (cartId: string, optionId: string) => {
      const { cart } = await medusa.store.cart.addShippingMethod(cartId, {
        option_id: optionId,
      });
      return cart;
    },
  };
};
