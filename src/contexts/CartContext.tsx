import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { medusa, getCartId, setCartId, clearCartId, getRegionId, setRegionId } from '@/integrations/medusa/client';
import { Product, ProductVariation } from '@/types';

interface MedusaLineItem {
  id: string;
  title: string;
  subtitle?: string | null;
  thumbnail?: string | null;
  quantity: number;
  unit_price: number;
  total: number;
  variant_id?: string | null;
  product_id?: string | null;
  variant?: {
    id: string;
    title?: string;
    product?: {
      id: string;
      title?: string;
      handle?: string;
      thumbnail?: string | null;
    };
  };
}

interface CartItem {
  id: string;
  lineItemId: string;
  product: Product;
  quantity: number;
  variation?: ProductVariation;
  selected_attributes?: Record<string, string>;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, variation?: ProductVariation, attributes?: Record<string, string>) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  totalPrice: number;
  cartId: string | null;
  isLoading: boolean;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartId, setCartIdState] = useState<string | null>(getCartId());
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  // Transform Medusa line items to our CartItem format
  const transformLineItems = (lineItems: MedusaLineItem[]): CartItem[] => {
    return lineItems.map(item => ({
      id: item.id,
      lineItemId: item.id,
      product: {
        id: item.product_id || item.variant?.product?.id || item.id,
        name: item.title || item.variant?.product?.title || 'Product',
        slug: item.variant?.product?.handle || item.id,
        price: item.unit_price / 100, // Convert from cents
        images: item.thumbnail ? [item.thumbnail] : 
                item.variant?.product?.thumbnail ? [item.variant.product.thumbnail] : [],
        category_id: '',
        in_stock: true,
      },
      quantity: item.quantity,
      variation: item.variant_id ? {
        id: item.variant_id,
        product_id: item.product_id || '',
        attributes: {},
        price: item.unit_price / 100,
      } : undefined,
    }));
  };

  // Initialize or get region
  const ensureRegion = async (): Promise<string> => {
    let regionId = getRegionId();
    if (!regionId) {
      try {
        const { regions } = await medusa.store.region.list();
        if (regions && regions.length > 0) {
          // Prefer Israel region, fallback to first
          const israelRegion = regions.find(r => 
            r.name?.toLowerCase().includes('israel') || 
            r.countries?.some(c => c.iso_2 === 'il' || c.iso_2 === 'IL')
          );
          regionId = israelRegion?.id || regions[0].id;
          setRegionId(regionId);
        }
      } catch (error) {
        console.error('Failed to fetch regions:', error);
      }
    }
    return regionId || '';
  };

  // Create or get cart
  const ensureCart = async (): Promise<string | null> => {
    let id = getCartId();
    
    if (id) {
      // Verify cart still exists
      try {
        await medusa.store.cart.retrieve(id);
        return id;
      } catch {
        // Cart no longer exists, create new one
        clearCartId();
        id = null;
      }
    }
    
    if (!id) {
      try {
        const regionId = await ensureRegion();
        const { cart } = await medusa.store.cart.create({
          region_id: regionId,
        });
        if (cart) {
          id = cart.id;
          setCartId(id);
          setCartIdState(id);
        }
      } catch (error) {
        console.error('Failed to create cart:', error);
        return null;
      }
    }
    
    return id;
  };

  // Refresh cart from Medusa
  const refreshCart = useCallback(async () => {
    const id = getCartId();
    if (!id) {
      setItems([]);
      setTotalPrice(0);
      return;
    }

    try {
      const { cart } = await medusa.store.cart.retrieve(id);
      if (cart) {
        const lineItems = (cart.items || []) as unknown as MedusaLineItem[];
        setItems(transformLineItems(lineItems));
        setTotalPrice((cart.total || 0) / 100);
      }
    } catch (error) {
      console.error('Failed to refresh cart:', error);
      // Cart might be invalid, clear it
      clearCartId();
      setCartIdState(null);
      setItems([]);
      setTotalPrice(0);
    }
  }, []);

  // Load cart on mount
  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const addItem = async (
    product: Product,
    quantity = 1,
    variation?: ProductVariation,
    _attributes?: Record<string, string>
  ) => {
    setIsLoading(true);
    try {
      const id = await ensureCart();
      if (!id) throw new Error('Could not create cart');

      // Medusa requires a variant_id, use variation.id or product.id
      const variantId = variation?.id || product.id;
      
      await medusa.store.cart.createLineItem(id, {
        variant_id: variantId,
        quantity,
      });
      
      await refreshCart();
    } catch (error) {
      console.error('Failed to add item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeItem = async (itemId: string) => {
    const id = getCartId();
    if (!id) return;

    setIsLoading(true);
    try {
      await medusa.store.cart.deleteLineItem(id, itemId);
      await refreshCart();
    } catch (error) {
      console.error('Failed to remove item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    const id = getCartId();
    if (!id) return;

    if (quantity < 1) {
      await removeItem(itemId);
      return;
    }

    setIsLoading(true);
    try {
      await medusa.store.cart.updateLineItem(id, itemId, {
        quantity,
      });
      await refreshCart();
    } catch (error) {
      console.error('Failed to update quantity:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    const id = getCartId();
    if (!id) return;

    setIsLoading(true);
    try {
      // Delete all line items
      for (const item of items) {
        await medusa.store.cart.deleteLineItem(id, item.lineItemId);
      }
      await refreshCart();
    } catch (error) {
      console.error('Failed to clear cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        cartId,
        isLoading,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
