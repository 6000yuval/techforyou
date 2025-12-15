import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface WishlistItem {
  id: string;
  product_id: string;
  created_at: string;
}

export function useWishlist() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: wishlistItems = [], isLoading } = useQuery({
    queryKey: ['wishlist', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('wishlists')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as WishlistItem[];
    },
    enabled: !!user,
  });

  const addToWishlist = useMutation({
    mutationFn: async (productId: string) => {
      if (!user) throw new Error('Must be logged in');

      const { error } = await supabase
        .from('wishlists')
        .insert({
          user_id: user.id,
          product_id: productId,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist', user?.id] });
    },
  });

  const removeFromWishlist = useMutation({
    mutationFn: async (productId: string) => {
      if (!user) throw new Error('Must be logged in');

      const { error } = await supabase
        .from('wishlists')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist', user?.id] });
    },
  });

  const isInWishlist = (productId: string): boolean => {
    return wishlistItems.some(item => item.product_id === productId);
  };

  return {
    wishlistItems,
    isLoading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    wishlistCount: wishlistItems.length,
  };
}
