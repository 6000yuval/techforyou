import { useQuery } from '@tanstack/react-query';
import { medusa } from '@/integrations/medusa/client';
import { transformMedusaCategory } from '@/integrations/medusa/transforms';
import type { Category } from '@/types';
import type { MedusaCategory } from '@/integrations/medusa/types';

// Fetch all categories from Medusa
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async (): Promise<Category[]> => {
      const { product_categories } = await medusa.store.category.list({
        include_descendants_tree: true,
      });

      // Filter to only top-level categories (no parent)
      const topLevelCategories = (product_categories || [])
        .filter((cat: MedusaCategory) => !cat.parent_category_id)
        .map(transformMedusaCategory);

      return topLevelCategories;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};

// Get category by slug
export const useCategoryBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['category', slug],
    queryFn: async (): Promise<Category | null> => {
      const { product_categories } = await medusa.store.category.list({
        handle: slug,
        include_descendants_tree: true,
      });

      if (!product_categories || product_categories.length === 0) {
        return null;
      }

      return transformMedusaCategory(product_categories[0] as MedusaCategory);
    },
    enabled: !!slug,
  });
};

// Get parent category of a subcategory
export const useParentCategory = (slug: string) => {
  const { data: categories } = useCategories();
  
  if (!categories) return null;
  
  for (const category of categories) {
    if (category.subcategories?.some(s => s.slug === slug)) {
      return category;
    }
  }
  return null;
};

// Static category icon mapping (for UI display)
export const categoryIcons: Record<string, string> = {
  headphones: 'Headphones',
  microphones: 'Mic',
  speakers: 'Speaker',
  cameras: 'Camera',
  mice: 'Mouse',
  keyboards: 'Keyboard',
  'computer-sets': 'Package',
  cables: 'Cable',
  adapters: 'Plug',
  'hubs-docking': 'Hub',
  storage: 'HardDrive',
  network: 'Wifi',
  'desk-setup': 'Monitor',
  'power-charging': 'Battery',
  gaming: 'Gamepad2',
};

// Get icon for a category
export const getCategoryIcon = (slug: string): string => {
  return categoryIcons[slug] || 'Package';
};

// Get category by slug (sync helper using cached data)
export const getCategoryBySlug = (slug: string, categories: Category[]): Category | undefined => {
  for (const category of categories) {
    if (category.slug === slug) return category;
    if (category.subcategories) {
      const sub = category.subcategories.find(s => s.slug === slug);
      if (sub) return sub;
    }
  }
  return undefined;
};

// Get parent category of a subcategory
export const getParentCategorySync = (slug: string, categories: Category[]): Category | undefined => {
  for (const category of categories) {
    if (category.subcategories?.some(s => s.slug === slug)) {
      return category;
    }
  }
  return undefined;
};
