import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface OrderItem {
  id: string;
  product_id: string;
  product_title: string;
  variant_name: string | null;
  quantity: number;
  unit_price: number;
  total_price: number;
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

export function useUserOrders() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['user-orders', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('orders')
        .select(`
          id,
          order_number,
          status,
          payment_status,
          subtotal,
          shipping_cost,
          discount_amount,
          total,
          created_at,
          shipping_first_name,
          shipping_last_name,
          shipping_city,
          order_items (
            id,
            product_id,
            product_title,
            variant_name,
            quantity,
            unit_price,
            total_price
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Order[];
    },
    enabled: !!user,
  });
}
