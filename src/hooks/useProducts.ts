import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Product } from '@/types';

interface DBProduct {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  category_id: string | null;
  subcategory_id: string | null;
  attributes: Record<string, unknown> | null;
  is_featured: boolean | null;
  is_active: boolean | null;
  created_at: string | null;
}

interface DBProductImage {
  url: string;
  is_primary: boolean | null;
}

interface DBInventory {
  quantity: number | null;
}

interface DBAttribute {
  name: string;
  values: string[];
}

// Transform DB product to frontend Product type
const transformProduct = (
  dbProduct: DBProduct, 
  images: DBProductImage[], 
  inventory: DBInventory | null,
  categoryName?: string
): Product => {
  // Sort images - primary first
  const sortedImages = [...images].sort((a, b) => {
    if (a.is_primary && !b.is_primary) return -1;
    if (!a.is_primary && b.is_primary) return 1;
    return 0;
  });

  // Parse attributes from JSON - DB stores as array of {name, values}
  const rawAttributes = dbProduct.attributes;
  let productAttributes: { name: string; values: string[] }[] = [];
  
  if (Array.isArray(rawAttributes)) {
    productAttributes = (rawAttributes as DBAttribute[]).map(attr => ({
      name: attr.name || '',
      values: Array.isArray(attr.values) ? attr.values : []
    }));
  }

  return {
    id: dbProduct.id,
    name: dbProduct.name,
    slug: dbProduct.slug,
    short_description: dbProduct.short_description || undefined,
    description: dbProduct.description || undefined,
    price: dbProduct.compare_at_price || dbProduct.price,
    sale_price: dbProduct.compare_at_price ? dbProduct.price : undefined,
    images: sortedImages.map(img => img.url),
    category_id: dbProduct.category_id || '',
    category_name: categoryName,
    in_stock: (inventory?.quantity ?? 0) > 0,
    stock_quantity: inventory?.quantity ?? 0,
    attributes: productAttributes,
    created_at: dbProduct.created_at || undefined,
  };
};

// Category name mapping
const categoryNames: Record<string, string> = {
  headphones: 'אוזניות',
  microphones: 'מיקרופונים',
  speakers: 'רמקולים',
  cameras: 'מצלמות',
  mice: 'עכברים',
  keyboards: 'מקלדות',
  'computer-sets': 'סטים למחשב',
  cables: 'כבלים',
  adapters: 'מתאמים',
  'hubs-docking': 'Hubs ותחנות עגינה',
  storage: 'אחסון חיצוני',
  'external-storage': 'אחסון חיצוני',
  network: 'רשת',
  networking: 'רשת',
  'desk-setup': 'ארגון שולחן וסטאפ',
  'desk-organization': 'ארגון שולחן וסטאפ',
  'power-charging': 'חשמל וטעינה',
  gaming: 'גיימינג',
};

// Fetch all products
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      // Fetch products
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true);

      if (productsError) throw productsError;

      // Fetch all images
      const { data: allImages, error: imagesError } = await supabase
        .from('product_images')
        .select('product_id, url, is_primary');

      if (imagesError) throw imagesError;

      // Fetch all inventory
      const { data: allInventory, error: inventoryError } = await supabase
        .from('inventory')
        .select('product_id, quantity');

      if (inventoryError) throw inventoryError;

      // Group images and inventory by product_id
      const imagesByProduct = (allImages || []).reduce((acc, img) => {
        if (!acc[img.product_id]) acc[img.product_id] = [];
        acc[img.product_id].push({ url: img.url, is_primary: img.is_primary });
        return acc;
      }, {} as Record<string, DBProductImage[]>);

      const inventoryByProduct = (allInventory || []).reduce((acc, inv) => {
        acc[inv.product_id] = { quantity: inv.quantity };
        return acc;
      }, {} as Record<string, DBInventory>);

      // Transform products
      return (products || []).map(p => 
        transformProduct(
          p as unknown as DBProduct,
          imagesByProduct[p.id] || [],
          inventoryByProduct[p.id] || null,
          categoryNames[p.category_id || '']
        )
      );
    },
  });
};

// Fetch single product by slug
export const useProduct = (slug: string) => {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      const { data: product, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .maybeSingle();

      if (productError) throw productError;
      if (!product) return null;

      // Fetch images
      const { data: images } = await supabase
        .from('product_images')
        .select('url, is_primary')
        .eq('product_id', product.id);

      // Fetch inventory
      const { data: inventory } = await supabase
        .from('inventory')
        .select('quantity')
        .eq('product_id', product.id)
        .maybeSingle();

      return transformProduct(
        product as unknown as DBProduct,
        (images || []) as DBProductImage[],
        inventory as DBInventory | null,
        categoryNames[product.category_id || '']
      );
    },
    enabled: !!slug,
  });
};

// Fetch products by category
export const useProductsByCategory = (categoryId: string) => {
  return useQuery({
    queryKey: ['products', 'category', categoryId],
    queryFn: async () => {
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('*')
        .eq('category_id', categoryId)
        .eq('is_active', true);

      if (productsError) throw productsError;

      // Fetch images for these products
      const productIds = (products || []).map(p => p.id);
      
      const { data: allImages } = await supabase
        .from('product_images')
        .select('product_id, url, is_primary')
        .in('product_id', productIds);

      const { data: allInventory } = await supabase
        .from('inventory')
        .select('product_id, quantity')
        .in('product_id', productIds);

      // Group by product_id
      const imagesByProduct = (allImages || []).reduce((acc, img) => {
        if (!acc[img.product_id]) acc[img.product_id] = [];
        acc[img.product_id].push({ url: img.url, is_primary: img.is_primary });
        return acc;
      }, {} as Record<string, DBProductImage[]>);

      const inventoryByProduct = (allInventory || []).reduce((acc, inv) => {
        acc[inv.product_id] = { quantity: inv.quantity };
        return acc;
      }, {} as Record<string, DBInventory>);

      return (products || []).map(p => 
        transformProduct(
          p as unknown as DBProduct,
          imagesByProduct[p.id] || [],
          inventoryByProduct[p.id] || null,
          categoryNames[categoryId]
        )
      );
    },
    enabled: !!categoryId,
  });
};

// Fetch featured products
export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: async () => {
      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .eq('is_featured', true)
        .limit(8);

      if (error) throw error;

      const productIds = (products || []).map(p => p.id);
      
      const { data: allImages } = await supabase
        .from('product_images')
        .select('product_id, url, is_primary')
        .in('product_id', productIds);

      const { data: allInventory } = await supabase
        .from('inventory')
        .select('product_id, quantity')
        .in('product_id', productIds);

      const imagesByProduct = (allImages || []).reduce((acc, img) => {
        if (!acc[img.product_id]) acc[img.product_id] = [];
        acc[img.product_id].push({ url: img.url, is_primary: img.is_primary });
        return acc;
      }, {} as Record<string, DBProductImage[]>);

      const inventoryByProduct = (allInventory || []).reduce((acc, inv) => {
        acc[inv.product_id] = { quantity: inv.quantity };
        return acc;
      }, {} as Record<string, DBInventory>);

      return (products || []).map(p => 
        transformProduct(
          p as unknown as DBProduct,
          imagesByProduct[p.id] || [],
          inventoryByProduct[p.id] || null,
          categoryNames[p.category_id || '']
        )
      );
    },
  });
};

// Fetch products on sale
export const useProductsOnSale = () => {
  return useQuery({
    queryKey: ['products', 'on-sale'],
    queryFn: async () => {
      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .not('compare_at_price', 'is', null)
        .limit(8);

      if (error) throw error;

      const productIds = (products || []).map(p => p.id);
      
      const { data: allImages } = await supabase
        .from('product_images')
        .select('product_id, url, is_primary')
        .in('product_id', productIds);

      const { data: allInventory } = await supabase
        .from('inventory')
        .select('product_id, quantity')
        .in('product_id', productIds);

      const imagesByProduct = (allImages || []).reduce((acc, img) => {
        if (!acc[img.product_id]) acc[img.product_id] = [];
        acc[img.product_id].push({ url: img.url, is_primary: img.is_primary });
        return acc;
      }, {} as Record<string, DBProductImage[]>);

      const inventoryByProduct = (allInventory || []).reduce((acc, inv) => {
        acc[inv.product_id] = { quantity: inv.quantity };
        return acc;
      }, {} as Record<string, DBInventory>);

      return (products || []).map(p => 
        transformProduct(
          p as unknown as DBProduct,
          imagesByProduct[p.id] || [],
          inventoryByProduct[p.id] || null,
          categoryNames[p.category_id || '']
        )
      );
    },
  });
};

// Search products
export const useSearchProducts = (query: string) => {
  return useQuery({
    queryKey: ['products', 'search', query],
    queryFn: async () => {
      if (!query.trim()) return [];

      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .or(`name.ilike.%${query}%,short_description.ilike.%${query}%,description.ilike.%${query}%`);

      if (error) throw error;

      const productIds = (products || []).map(p => p.id);
      
      const { data: allImages } = await supabase
        .from('product_images')
        .select('product_id, url, is_primary')
        .in('product_id', productIds);

      const { data: allInventory } = await supabase
        .from('inventory')
        .select('product_id, quantity')
        .in('product_id', productIds);

      const imagesByProduct = (allImages || []).reduce((acc, img) => {
        if (!acc[img.product_id]) acc[img.product_id] = [];
        acc[img.product_id].push({ url: img.url, is_primary: img.is_primary });
        return acc;
      }, {} as Record<string, DBProductImage[]>);

      const inventoryByProduct = (allInventory || []).reduce((acc, inv) => {
        acc[inv.product_id] = { quantity: inv.quantity };
        return acc;
      }, {} as Record<string, DBInventory>);

      return (products || []).map(p => 
        transformProduct(
          p as unknown as DBProduct,
          imagesByProduct[p.id] || [],
          inventoryByProduct[p.id] || null,
          categoryNames[p.category_id || '']
        )
      );
    },
    enabled: !!query.trim(),
  });
};
