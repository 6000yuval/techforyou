import { useMutation, useQueryClient } from '@tanstack/react-query';
import { medusa, getCartId, clearCartId } from '@/integrations/medusa/client';
import type { MedusaOrder } from '@/integrations/medusa/types';

interface CreateOrderInput {
  shippingDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    postalCode?: string;
  };
  shippingMethodId: string;
  items?: unknown[];
  shippingCost?: number;
  subtotal?: number;
  discountAmount?: number;
  couponId?: string;
  couponCode?: string;
  total?: number;
  paymentMethod?: string;
}

interface OrderResult {
  orderId: string;
  orderNumber: string;
}

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateOrderInput): Promise<OrderResult> => {
      const cartId = getCartId();
      if (!cartId) throw new Error('No cart found');

      // 1. Update cart with email and shipping address
      await medusa.store.cart.update(cartId, {
        email: input.shippingDetails.email,
        shipping_address: {
          first_name: input.shippingDetails.firstName,
          last_name: input.shippingDetails.lastName,
          address_1: input.shippingDetails.street,
          city: input.shippingDetails.city,
          country_code: 'il', // Israel
          postal_code: input.shippingDetails.postalCode || '',
          phone: input.shippingDetails.phone,
        },
      });

      // 2. Add shipping method if provided
      if (input.shippingMethodId) {
        await medusa.store.cart.addShippingMethod(cartId, {
          option_id: input.shippingMethodId,
        });
      }

      // 3. Create payment sessions
      await medusa.store.payment.initiatePaymentSession(cartId, {
        provider_id: 'manual', // Use manual payment for now
      });

      // 4. Complete the cart (creates the order)
      const { type, order } = await medusa.store.cart.complete(cartId);
      
      if (type !== 'order' || !order) {
        throw new Error('Failed to create order');
      }

      const medusaOrder = order as MedusaOrder;

      // 5. Clear cart ID (new cart will be created on next add)
      clearCartId();

      return {
        orderId: medusaOrder.id,
        orderNumber: `ORD-${medusaOrder.display_id}`,
      };
    },
    onSuccess: () => {
      // Invalidate cart query to refresh
      queryClient.invalidateQueries({ queryKey: ['medusa-cart'] });
      queryClient.invalidateQueries({ queryKey: ['user-orders'] });
    },
  });
};
