export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  image?: string;
  parent_id?: string | null;
  subcategories?: Category[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  short_description?: string;
  description?: string;
  price: number;
  sale_price?: number;
  images: string[];
  category_id: string;
  category_name?: string;
  in_stock: boolean;
  stock_quantity?: number;
  attributes?: ProductAttribute[];
  variations?: ProductVariation[];
  created_at?: string;
}

export interface ProductAttribute {
  name: string;
  values: string[];
}

export interface ProductVariation {
  id: string;
  product_id: string;
  attributes: Record<string, string>;
  price: number;
  sale_price?: number;
  stock_quantity?: number;
  image?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  variation?: ProductVariation;
  selected_attributes?: Record<string, string>;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  shipping_address: ShippingAddress;
  created_at: string;
}

export interface ShippingAddress {
  full_name: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  postal_code?: string;
}
