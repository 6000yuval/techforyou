import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Address {
  id: string;
  first_name: string;
  last_name: string;
  street: string;
  apartment: string | null;
  city: string;
  postal_code: string | null;
  country: string;
  phone: string | null;
  label: string;
  is_default_shipping: boolean;
  is_default_billing: boolean;
}

interface AddressInput {
  first_name: string;
  last_name: string;
  street: string;
  apartment?: string;
  city: string;
  postal_code?: string;
  phone?: string;
  label?: string;
  is_default_shipping?: boolean;
  is_default_billing?: boolean;
}

export function useUserAddresses() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: addresses = [], isLoading } = useQuery({
    queryKey: ['user-addresses', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', user.id)
        .order('is_default_shipping', { ascending: false });

      if (error) throw error;
      return data as Address[];
    },
    enabled: !!user,
  });

  const addAddress = useMutation({
    mutationFn: async (address: AddressInput) => {
      if (!user) throw new Error('Must be logged in');

      const { error } = await supabase
        .from('addresses')
        .insert({
          user_id: user.id,
          ...address,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-addresses', user?.id] });
    },
  });

  const updateAddress = useMutation({
    mutationFn: async ({ id, ...address }: AddressInput & { id: string }) => {
      const { error } = await supabase
        .from('addresses')
        .update(address)
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-addresses', user?.id] });
    },
  });

  const deleteAddress = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('addresses')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-addresses', user?.id] });
    },
  });

  const setDefaultAddress = useMutation({
    mutationFn: async ({ id, type }: { id: string; type: 'shipping' | 'billing' }) => {
      if (!user) throw new Error('Must be logged in');

      // First, unset all defaults of this type
      const column = type === 'shipping' ? 'is_default_shipping' : 'is_default_billing';
      await supabase
        .from('addresses')
        .update({ [column]: false })
        .eq('user_id', user.id);

      // Then set the new default
      const { error } = await supabase
        .from('addresses')
        .update({ [column]: true })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-addresses', user?.id] });
    },
  });

  return {
    addresses,
    isLoading,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
  };
}
