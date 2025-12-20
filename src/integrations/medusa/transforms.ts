// Transform Medusa types to app types
import type { Product, Category, ProductAttribute, ProductVariation } from '@/types';
import type { MedusaProduct, MedusaCategory, MedusaVariant } from './types';

/**
 * Transform Medusa product to app Product type
 */
export const transformMedusaProduct = (medusaProduct: MedusaProduct): Product => {
  // Get the first variant's pricing
  const firstVariant = medusaProduct.variants?.[0];
  const calculatedPrice = firstVariant?.calculated_price;
  
  // Get price in ILS (stored in agorot/cents, so divide by 100)
  const price = calculatedPrice 
    ? calculatedPrice.original_amount / 100 
    : (firstVariant?.prices?.[0]?.amount ?? 0) / 100;
  
  const salePrice = calculatedPrice && calculatedPrice.calculated_amount < calculatedPrice.original_amount
    ? calculatedPrice.calculated_amount / 100
    : undefined;

  // Get images
  const images = medusaProduct.images?.map(img => img.url) || [];
  if (medusaProduct.thumbnail && !images.includes(medusaProduct.thumbnail)) {
    images.unshift(medusaProduct.thumbnail);
  }

  // Transform options to attributes
  const attributes: ProductAttribute[] = medusaProduct.options?.map(option => ({
    name: option.title,
    values: option.values?.map(v => v.value) || [],
  })) || [];

  // Transform variants to variations
  const variations: ProductVariation[] = medusaProduct.variants?.map(variant => {
    const variantCalculatedPrice = variant.calculated_price;
    const variantPrice = variantCalculatedPrice 
      ? variantCalculatedPrice.original_amount / 100
      : (variant.prices?.[0]?.amount ?? 0) / 100;
    
    const variantSalePrice = variantCalculatedPrice && 
      variantCalculatedPrice.calculated_amount < variantCalculatedPrice.original_amount
      ? variantCalculatedPrice.calculated_amount / 100
      : undefined;

    // Build attributes map from variant options
    const variantAttributes: Record<string, string> = {};
    variant.options?.forEach(opt => {
      const option = medusaProduct.options?.find(o => o.id === opt.option_id);
      if (option) {
        variantAttributes[option.title] = opt.value;
      }
    });

    return {
      id: variant.id,
      product_id: medusaProduct.id,
      attributes: variantAttributes,
      price: variantPrice,
      sale_price: variantSalePrice,
      stock_quantity: variant.inventory_quantity,
    };
  }) || [];

  // Get category info
  const primaryCategory = medusaProduct.categories?.[0];

  // Check stock across all variants
  const totalStock = medusaProduct.variants?.reduce(
    (sum, v) => sum + (v.inventory_quantity || 0), 
    0
  ) || 0;

  return {
    id: medusaProduct.id,
    name: medusaProduct.title,
    slug: medusaProduct.handle,
    short_description: medusaProduct.subtitle || undefined,
    description: medusaProduct.description || undefined,
    price,
    sale_price: salePrice,
    images,
    category_id: primaryCategory?.handle || '',
    category_name: primaryCategory?.name,
    in_stock: totalStock > 0,
    stock_quantity: totalStock,
    attributes,
    variations,
    created_at: medusaProduct.created_at,
  };
};

/**
 * Transform Medusa category to app Category type
 */
export const transformMedusaCategory = (medusaCategory: MedusaCategory): Category => {
  return {
    id: medusaCategory.handle,
    name: medusaCategory.name,
    slug: medusaCategory.handle,
    parent_id: medusaCategory.parent_category?.handle || null,
    subcategories: medusaCategory.category_children?.map(transformMedusaCategory),
  };
};

/**
 * Transform Medusa variant to app ProductVariation type
 */
export const transformMedusaVariant = (
  variant: MedusaVariant, 
  productOptions: MedusaProduct['options']
): ProductVariation => {
  const calculatedPrice = variant.calculated_price;
  const price = calculatedPrice 
    ? calculatedPrice.original_amount / 100
    : (variant.prices?.[0]?.amount ?? 0) / 100;
  
  const salePrice = calculatedPrice && 
    calculatedPrice.calculated_amount < calculatedPrice.original_amount
    ? calculatedPrice.calculated_amount / 100
    : undefined;

  const attributes: Record<string, string> = {};
  variant.options?.forEach(opt => {
    const option = productOptions?.find(o => o.id === opt.option_id);
    if (option) {
      attributes[option.title] = opt.value;
    }
  });

  return {
    id: variant.id,
    product_id: '', // Will be set by caller
    attributes,
    price,
    sale_price: salePrice,
    stock_quantity: variant.inventory_quantity,
  };
};
