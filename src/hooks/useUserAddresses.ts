import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { medusa } from '@/integrations/medusa/client';
import { useAuth } from '@/contexts/AuthContext';
import type { MedusaAddress } from '@/integrations/medusa/types';

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

// Transform Medusa address to app format
const transformAddress = (addr: MedusaAddress, index: number): Address => {
  return {
    id: addr.id || `addr-${index}`,
    first_name: addr.first_name,
    last_name: addr.last_name,
    street: addr.address_1,
    apartment: addr.address_2 || null,
    city: addr.city,
    postal_code: addr.postal_code || null,
    country: addr.country_code || 'IL',
    phone: addr.phone || null,
    label: addr.company || 'כתובת',
    is_default_shipping: index === 0, // First address is default
    is_default_billing: index === 0,
  };
};

export function useUserAddresses() {
  const { customer, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const { data: addresses = [], isLoading } = useQuery({
    queryKey: ['user-addresses', customer?.id],
    queryFn: async (): Promise<Address[]> => {
      if (!isAuthenticated) return [];

      try {
        const { customer: cust } = await medusa.store.customer.retrieve();
        if (!cust) return [];
        
        const { addresses: medusaAddresses } = await medusa.store.customer.listAddress();
        return (medusaAddresses || []).map((addr: MedusaAddress, index: number) => 
          transformAddress(addr, index)
        );
      } catch (error) {
        console.error('Error fetching addresses:', error);
        return [];
      }
    },
    enabled: isAuthenticated,
  });

  const addAddress = useMutation({
    mutationFn: async (address: AddressInput) => {
      if (!isAuthenticated) throw new Error('Must be logged in');

      await medusa.store.customer.createAddress({
        first_name: address.first_name,
        last_name: address.last_name,
        address_1: address.street,
        address_2: address.apartment || undefined,
        city: address.city,
        country_code: 'il',
        postal_code: address.postal_code || undefined,
        phone: address.phone || undefined,
        company: address.label || undefined,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-addresses', customer?.id] });
    },
  });

  const updateAddress = useMutation({
    mutationFn: async ({ id, ...address }: AddressInput & { id: string }) => {
      await medusa.store.customer.updateAddress(id, {
        first_name: address.first_name,
        last_name: address.last_name,
        address_1: address.street,
        address_2: address.apartment || undefined,
        city: address.city,
        postal_code: address.postal_code || undefined,
        phone: address.phone || undefined,
        company: address.label || undefined,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-addresses', customer?.id] });
    },
  });

  const deleteAddress = useMutation({
    mutationFn: async (id: string) => {
      await medusa.store.customer.deleteAddress(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-addresses', customer?.id] });
    },
  });

  const setDefaultAddress = useMutation({
    mutationFn: async ({ id, type }: { id: string; type: 'shipping' | 'billing' }) => {
      console.log(`Setting ${type} default address to ${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-addresses', customer?.id] });
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
