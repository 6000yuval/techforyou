import { useQuery } from '@tanstack/react-query';
import { medusa } from '@/integrations/medusa/client';
import { useAuth } from '@/contexts/AuthContext';
import type { MedusaOrder, MedusaLineItem } from '@/integrations/medusa/types';

interface OrderItem {
  id: string;
  product_id: string;
  product_title: string;
  variant_name: string | null;
  quantity: number;
  unit_price: number;
  total_price: number;
  thumbnail: string | null;
}

interface Order {
  id: string;
  order_number: string;
  status: string;
  payment_status: string;
  subtotal: number;
  shipping_cost: number;
  discount_amount: number;
  total: number;
  created_at: string;
  shipping_first_name: string;
  shipping_last_name: string;
  shipping_city: string;
  order_items: OrderItem[];
}

// Transform Medusa order to app format
const transformOrder = (medusaOrder: MedusaOrder): Order => {
  return {
    id: medusaOrder.id,
    order_number: `ORD-${medusaOrder.display_id}`,
    status: medusaOrder.status,
    payment_status: medusaOrder.payment_status,
    subtotal: medusaOrder.subtotal / 100,
    shipping_cost: medusaOrder.shipping_total / 100,
    discount_amount: medusaOrder.discount_total / 100,
    total: medusaOrder.total / 100,
    created_at: medusaOrder.created_at,
    shipping_first_name: medusaOrder.shipping_address?.first_name || '',
    shipping_last_name: medusaOrder.shipping_address?.last_name || '',
    shipping_city: medusaOrder.shipping_address?.city || '',
    order_items: medusaOrder.items.map((item: MedusaLineItem) => ({
      id: item.id,
      product_id: item.product?.id || '',
      product_title: item.title,
      variant_name: item.variant?.title || null,
      quantity: item.quantity,
      unit_price: item.unit_price / 100,
      total_price: item.total / 100,
      thumbnail: item.thumbnail,
    })),
  };
};

export function useUserOrders() {
  const { customer, isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ['user-orders', customer?.id],
    queryFn: async (): Promise<Order[]> => {
      if (!isAuthenticated) return [];

      try {
        const { orders } = await medusa.store.order.list();
        return (orders as MedusaOrder[] || []).map(transformOrder);
      } catch (error) {
        console.error('Error fetching orders:', error);
        return [];
      }
    },
    enabled: isAuthenticated,
  });
}

// Get single order by ID
export function useOrder(orderId: string) {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: async (): Promise<Order | null> => {
      if (!orderId) return null;

      try {
        const { order } = await medusa.store.order.retrieve(orderId);
        return transformOrder(order as MedusaOrder);
      } catch (error) {
        console.error('Error fetching order:', error);
        return null;
      }
    },
    enabled: !!orderId,
  });
}
