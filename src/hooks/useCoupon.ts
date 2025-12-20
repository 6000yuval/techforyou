import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { medusa, getCartId } from '@/integrations/medusa/client';
import type { MedusaCart } from '@/integrations/medusa/types';

interface Coupon {
  id: string;
  code: string;
  discount_type: string;
  discount_value: number;
  minimum_order_amount: number | null;
}

interface UseCouponReturn {
  coupon: Coupon | null;
  isValidating: boolean;
  error: string | null;
  validateCoupon: (code: string, orderTotal: number) => Promise<boolean>;
  clearCoupon: () => void;
  calculateDiscount: (subtotal: number) => number;
  appliedDiscountCode: string | null;
}

export function useCoupon(): UseCouponReturn {
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [appliedDiscountCode, setAppliedDiscountCode] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Apply discount code to cart
  const applyDiscount = useMutation({
    mutationFn: async (code: string) => {
      const cartId = getCartId();
      if (!cartId) throw new Error('No cart found');
      
      const { cart } = await medusa.store.cart.update(cartId, {
        promo_codes: [code],
      });
      
      return cart as MedusaCart;
    },
    onSuccess: (cart) => {
      queryClient.setQueryData(['medusa-cart'], cart);
    },
  });

  // Remove discount code from cart
  const removeDiscount = useMutation({
    mutationFn: async (code: string) => {
      const cartId = getCartId();
      if (!cartId) throw new Error('No cart found');
      
      // Remove the promo code
      const { cart } = await medusa.store.cart.update(cartId, {
        promo_codes: [],
      });
      
      return cart as MedusaCart;
    },
    onSuccess: (cart) => {
      queryClient.setQueryData(['medusa-cart'], cart);
    },
  });

  const validateCoupon = async (code: string, orderTotal: number): Promise<boolean> => {
    if (!code.trim()) {
      setError('יש להזין קוד קופון');
      return false;
    }

    setIsValidating(true);
    setError(null);

    try {
      await applyDiscount.mutateAsync(code.toUpperCase());
      
      // If we get here, the discount was applied successfully
      setCoupon({
        id: code,
        code: code.toUpperCase(),
        discount_type: 'fixed', // Will be calculated by Medusa
        discount_value: 0, // Will be calculated by Medusa
        minimum_order_amount: null,
      });
      setAppliedDiscountCode(code.toUpperCase());
      return true;
    } catch (err) {
      console.error('Coupon validation error:', err);
      setError('קופון לא נמצא או לא פעיל');
      setCoupon(null);
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  const clearCoupon = async () => {
    if (appliedDiscountCode) {
      try {
        await removeDiscount.mutateAsync(appliedDiscountCode);
      } catch (err) {
        console.error('Error removing discount:', err);
      }
    }
    setCoupon(null);
    setAppliedDiscountCode(null);
    setError(null);
  };

  const calculateDiscount = (subtotal: number): number => {
    // Discount is calculated by Medusa and reflected in cart totals
    // This function is kept for API compatibility
    return 0;
  };

  return {
    coupon,
    isValidating,
    error,
    validateCoupon,
    clearCoupon,
    calculateDiscount,
    appliedDiscountCode,
  };
}
