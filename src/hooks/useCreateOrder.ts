import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { CartItem } from '@/types';
interface CreateOrderInput {
  items: CartItem[];
  shippingMethodId: string;
  shippingCost: number;
  subtotal: number;
  total: number;
  shippingDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    postalCode?: string;
  };
  paymentMethod: string;
}

interface OrderResult {
  orderId: string;
  orderNumber: string;
}

export const useCreateOrder = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateOrderInput): Promise<OrderResult> => {
      // Create the order
      const orderData = {
        user_id: user?.id || null,
        guest_email: !user ? input.shippingDetails.email : null,
        status: 'pending' as const,
        payment_status: 'pending' as const,
        subtotal: input.subtotal,
        shipping_cost: input.shippingCost,
        total: input.total,
        shipping_method_id: input.shippingMethodId,
        shipping_first_name: input.shippingDetails.firstName,
        shipping_last_name: input.shippingDetails.lastName,
        shipping_phone: input.shippingDetails.phone,
        shipping_street: input.shippingDetails.street,
        shipping_city: input.shippingDetails.city,
        shipping_postal_code: input.shippingDetails.postalCode || null,
        payment_method: input.paymentMethod,
        order_number: `ORD-${Date.now()}`, // Will be overwritten by trigger
      };

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert(orderData)
        .select('id, order_number')
        .single();

      if (orderError) {
        console.error('Order creation error:', orderError);
        throw new Error('שגיאה ביצירת ההזמנה');
      }

      // Create order items
      const orderItems = input.items.map((item) => {
        const price = item.variation?.sale_price || item.variation?.price ||
          item.product.sale_price || item.product.price;
        
        // Get variant name from attributes if exists
        const variantName = item.variation?.attributes 
          ? Object.values(item.variation.attributes).join(' / ') 
          : null;
        
        return {
          order_id: order.id,
          product_id: item.product.id,
          product_title: item.product.name,
          variant_id: item.variation?.id || null,
          variant_name: variantName,
          quantity: item.quantity,
          unit_price: price,
          total_price: price * item.quantity,
        };
      });

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        console.error('Order items creation error:', itemsError);
        throw new Error('שגיאה בשמירת פריטי ההזמנה');
      }

      return {
        orderId: order.id,
        orderNumber: order.order_number,
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
    },
  });
};
