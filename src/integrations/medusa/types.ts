// Medusa 2.0 Store API Types

export interface MedusaProduct {
  id: string;
  title: string;
  handle: string;
  subtitle: string | null;
  description: string | null;
  thumbnail: string | null;
  images: MedusaImage[];
  variants: MedusaVariant[];
  options: MedusaOption[];
  categories: MedusaCategory[];
  collection_id: string | null;
  collection: MedusaCollection | null;
  tags: MedusaTag[];
  status: string;
  metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export interface MedusaImage {
  id: string;
  url: string;
  metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export interface MedusaVariant {
  id: string;
  title: string;
  sku: string | null;
  barcode: string | null;
  ean: string | null;
  upc: string | null;
  inventory_quantity: number;
  allow_backorder: boolean;
  manage_inventory: boolean;
  prices: MedusaPrice[];
  options: MedusaOptionValue[];
  calculated_price?: {
    calculated_amount: number;
    original_amount: number;
    currency_code: string;
  };
  metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export interface MedusaPrice {
  id: string;
  currency_code: string;
  amount: number;
  min_quantity: number | null;
  max_quantity: number | null;
}

export interface MedusaOption {
  id: string;
  title: string;
  values: MedusaOptionValue[];
}

export interface MedusaOptionValue {
  id: string;
  value: string;
  option_id: string;
}

export interface MedusaCategory {
  id: string;
  name: string;
  handle: string;
  description: string | null;
  parent_category_id: string | null;
  parent_category: MedusaCategory | null;
  category_children: MedusaCategory[];
  metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export interface MedusaCollection {
  id: string;
  title: string;
  handle: string;
  metadata: Record<string, unknown> | null;
}

export interface MedusaTag {
  id: string;
  value: string;
}

export interface MedusaCart {
  id: string;
  email: string | null;
  items: MedusaLineItem[];
  region_id: string;
  region: MedusaRegion | null;
  shipping_address: MedusaAddress | null;
  billing_address: MedusaAddress | null;
  shipping_methods: MedusaShippingMethod[];
  payment_session: MedusaPaymentSession | null;
  subtotal: number;
  discount_total: number;
  shipping_total: number;
  tax_total: number;
  total: number;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface MedusaLineItem {
  id: string;
  cart_id: string;
  variant_id: string;
  variant: MedusaVariant;
  product: MedusaProduct;
  quantity: number;
  unit_price: number;
  subtotal: number;
  total: number;
  thumbnail: string | null;
  title: string;
  description: string | null;
  metadata: Record<string, unknown> | null;
}

export interface MedusaRegion {
  id: string;
  name: string;
  currency_code: string;
  countries: MedusaCountry[];
}

export interface MedusaCountry {
  id: string;
  iso_2: string;
  iso_3: string;
  name: string;
  display_name: string;
}

export interface MedusaAddress {
  id?: string;
  first_name: string;
  last_name: string;
  company: string | null;
  address_1: string;
  address_2: string | null;
  city: string;
  country_code: string;
  province: string | null;
  postal_code: string | null;
  phone: string | null;
}

export interface MedusaShippingMethod {
  id: string;
  shipping_option_id: string;
  shipping_option: MedusaShippingOption;
  price: number;
}

export interface MedusaShippingOption {
  id: string;
  name: string;
  price_type: string;
  amount: number;
  region_id: string;
  provider_id: string;
  is_return: boolean;
  metadata: Record<string, unknown> | null;
}

export interface MedusaPaymentSession {
  id: string;
  provider_id: string;
  status: string;
  amount: number;
}

export interface MedusaCustomer {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  has_account: boolean;
  metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export interface MedusaOrder {
  id: string;
  display_id: number;
  status: string;
  fulfillment_status: string;
  payment_status: string;
  email: string;
  items: MedusaLineItem[];
  shipping_address: MedusaAddress | null;
  billing_address: MedusaAddress | null;
  shipping_methods: MedusaShippingMethod[];
  subtotal: number;
  discount_total: number;
  shipping_total: number;
  tax_total: number;
  total: number;
  created_at: string;
  updated_at: string;
}
