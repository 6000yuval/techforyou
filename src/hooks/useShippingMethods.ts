import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

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

export const useShippingMethods = () => {
  return useQuery({
    queryKey: ['shipping-methods'],
    queryFn: async (): Promise<ShippingMethod[]> => {
      const { data, error } = await supabase
        .from('shipping_methods')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      return data || [];
    },
  });
};
