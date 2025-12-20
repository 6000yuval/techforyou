import { useQuery } from '@tanstack/react-query';
import { medusa, getRegionId, setRegionId, isDemoMode } from '@/integrations/medusa/client';
import { transformMedusaProduct } from '@/integrations/medusa/transforms';
import { products as mockProducts } from '@/data/products';
import type { Product } from '@/types';
import type { MedusaProduct } from '@/integrations/medusa/types';

// Helper to ensure we have a region ID
const ensureRegionId = async (): Promise<string> => {
  let regionId = getRegionId();
  if (!regionId) {
    // Fetch regions and use the first one (should be Israel)
    const { regions } = await medusa.store.region.list();
    if (regions && regions.length > 0) {
      regionId = regions[0].id;
      setRegionId(regionId);
    } else {
      throw new Error('No regions configured in Medusa');
    }
  }
  return regionId;
};

// Fetch all products
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async (): Promise<Product[]> => {
      // Demo mode - return mock data
      if (isDemoMode) {
        return mockProducts;
      }

      const regionId = await ensureRegionId();
      
      const { products } = await medusa.store.product.list({
        region_id: regionId,
        fields: '+variants.calculated_price,+variants.inventory_quantity',
        limit: 100,
      });

      return (products as MedusaProduct[] || []).map(transformMedusaProduct);
    },
  });
};

// Fetch single product by slug (handle)
export const useProduct = (slug: string) => {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async (): Promise<Product | null> => {
      // Demo mode - return mock data
      if (isDemoMode) {
        return mockProducts.find(p => p.slug === slug) || null;
      }

      const regionId = await ensureRegionId();
      
      const { products } = await medusa.store.product.list({
        handle: slug,
        region_id: regionId,
        fields: '+variants.calculated_price,+variants.inventory_quantity',
      });

      if (!products || products.length === 0) return null;
      return transformMedusaProduct(products[0] as MedusaProduct);
    },
    enabled: !!slug,
  });
};

// Fetch products by category
export const useProductsByCategory = (categoryHandle: string) => {
  return useQuery({
    queryKey: ['products', 'category', categoryHandle],
    queryFn: async (): Promise<Product[]> => {
      // Demo mode - return mock data filtered by category
      if (isDemoMode) {
        return mockProducts.filter(p => p.category_id === categoryHandle);
      }

      const regionId = await ensureRegionId();
      
      // First get the category ID from handle
      const { product_categories } = await medusa.store.category.list({
        handle: categoryHandle,
      });
      
      if (!product_categories || product_categories.length === 0) {
        return [];
      }
      
      const categoryId = product_categories[0].id;
      
      const { products } = await medusa.store.product.list({
        category_id: [categoryId],
        region_id: regionId,
        fields: '+variants.calculated_price,+variants.inventory_quantity',
        limit: 100,
      });

      return (products as MedusaProduct[] || []).map(transformMedusaProduct);
    },
    enabled: !!categoryHandle,
  });
};

// Fetch featured products (using collection or tag)
export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: async (): Promise<Product[]> => {
      // Demo mode - return first 8 products
      if (isDemoMode) {
        return mockProducts.slice(0, 8);
      }

      const regionId = await ensureRegionId();
      
      // Try to get products from "featured" collection
      try {
        const { collections } = await medusa.store.collection.list({
          handle: 'featured',
        });
        
        if (collections && collections.length > 0) {
          const { products } = await medusa.store.product.list({
            collection_id: [collections[0].id],
            region_id: regionId,
            fields: '+variants.calculated_price,+variants.inventory_quantity',
            limit: 8,
          });
          return (products as MedusaProduct[] || []).map(transformMedusaProduct);
        }
      } catch {
        // Collection doesn't exist, fall back to regular products
      }
      
      // Fallback: return first 8 products
      const { products } = await medusa.store.product.list({
        region_id: regionId,
        fields: '+variants.calculated_price,+variants.inventory_quantity',
        limit: 8,
      });

      return (products as MedusaProduct[] || []).map(transformMedusaProduct);
    },
  });
};

// Fetch products on sale
export const useProductsOnSale = () => {
  return useQuery({
    queryKey: ['products', 'on-sale'],
    queryFn: async (): Promise<Product[]> => {
      // Demo mode - return products with sale_price
      if (isDemoMode) {
        return mockProducts.filter(p => p.sale_price && p.sale_price < p.price).slice(0, 8);
      }

      const regionId = await ensureRegionId();
      
      // Try to get products from "sale" collection
      try {
        const { collections } = await medusa.store.collection.list({
          handle: 'sale',
        });
        
        if (collections && collections.length > 0) {
          const { products } = await medusa.store.product.list({
            collection_id: [collections[0].id],
            region_id: regionId,
            fields: '+variants.calculated_price,+variants.inventory_quantity',
            limit: 8,
          });
          return (products as MedusaProduct[] || []).map(transformMedusaProduct);
        }
      } catch {
        // Collection doesn't exist
      }
      
      // Fallback: get all products and filter those with calculated discounts
      const { products } = await medusa.store.product.list({
        region_id: regionId,
        fields: '+variants.calculated_price,+variants.inventory_quantity',
        limit: 50,
      });

      const saleProducts = (products as MedusaProduct[] || [])
        .filter(p => {
          const variant = p.variants?.[0];
          const calc = variant?.calculated_price;
          return calc && calc.calculated_amount < calc.original_amount;
        })
        .slice(0, 8)
        .map(transformMedusaProduct);

      return saleProducts;
    },
  });
};

// Search products
export const useSearchProducts = (query: string) => {
  return useQuery({
    queryKey: ['products', 'search', query],
    queryFn: async (): Promise<Product[]> => {
      if (!query.trim()) return [];

      // Demo mode - search in mock data
      if (isDemoMode) {
        const lowerQuery = query.toLowerCase();
        return mockProducts.filter(p => 
          p.name.toLowerCase().includes(lowerQuery) ||
          p.description?.toLowerCase().includes(lowerQuery) ||
          p.short_description?.toLowerCase().includes(lowerQuery)
        );
      }

      const regionId = await ensureRegionId();
      
      const { products } = await medusa.store.product.list({
        q: query,
        region_id: regionId,
        fields: '+variants.calculated_price,+variants.inventory_quantity',
        limit: 50,
      });

      return (products as MedusaProduct[] || []).map(transformMedusaProduct);
    },
    enabled: !!query.trim(),
  });
};