import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

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
}

export function useCoupon(): UseCouponReturn {
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateCoupon = async (code: string, orderTotal: number): Promise<boolean> => {
    if (!code.trim()) {
      setError('יש להזין קוד קופון');
      return false;
    }

    setIsValidating(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('coupons')
        .select('*')
        .eq('code', code.toUpperCase())
        .eq('is_active', true)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (!data) {
        setError('קופון לא נמצא או לא פעיל');
        setCoupon(null);
        return false;
      }

      // Check validity dates
      if (data.valid_from && new Date(data.valid_from) > new Date()) {
        setError('הקופון עדיין לא בתוקף');
        setCoupon(null);
        return false;
      }

      if (data.valid_until && new Date(data.valid_until) < new Date()) {
        setError('תוקף הקופון פג');
        setCoupon(null);
        return false;
      }

      // Check max uses
      if (data.max_uses && data.current_uses >= data.max_uses) {
        setError('הקופון מוצה');
        setCoupon(null);
        return false;
      }

      // Check minimum order amount
      if (data.minimum_order_amount && orderTotal < data.minimum_order_amount) {
        setError(`מינימום הזמנה לקופון: ₪${data.minimum_order_amount}`);
        setCoupon(null);
        return false;
      }

      setCoupon({
        id: data.id,
        code: data.code,
        discount_type: data.discount_type,
        discount_value: data.discount_value,
        minimum_order_amount: data.minimum_order_amount,
      });
      return true;
    } catch (err) {
      console.error('Coupon validation error:', err);
      setError('שגיאה בבדיקת הקופון');
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  const clearCoupon = () => {
    setCoupon(null);
    setError(null);
  };

  const calculateDiscount = (subtotal: number): number => {
    if (!coupon) return 0;

    if (coupon.discount_type === 'percentage') {
      return (subtotal * coupon.discount_value) / 100;
    } else if (coupon.discount_type === 'fixed') {
      return Math.min(coupon.discount_value, subtotal);
    }
    return 0;
  };

  return {
    coupon,
    isValidating,
    error,
    validateCoupon,
    clearCoupon,
    calculateDiscount,
  };
}
