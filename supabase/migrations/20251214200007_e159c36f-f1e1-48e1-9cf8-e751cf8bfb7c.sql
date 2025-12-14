-- ==========================================
-- COMPLETE E-COMMERCE BACKEND FOR SUPABASE
-- ==========================================

-- 1. USER ROLES ENUM AND TABLE
-- ==========================================
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- 2. USER PROFILES TABLE
-- ==========================================
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    first_name TEXT,
    last_name TEXT,
    phone TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name'
  );
  
  -- Assign default user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. ADDRESSES TABLE
-- ==========================================
CREATE TABLE public.addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    label TEXT DEFAULT 'בית',
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT,
    street TEXT NOT NULL,
    apartment TEXT,
    city TEXT NOT NULL,
    postal_code TEXT,
    country TEXT DEFAULT 'ישראל',
    is_default_shipping BOOLEAN DEFAULT false,
    is_default_billing BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;

-- 4. PRODUCT IMAGES TABLE
-- ==========================================
CREATE TABLE public.product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id TEXT NOT NULL,
    url TEXT NOT NULL,
    alt_text TEXT,
    sort_order INTEGER DEFAULT 0,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;

-- 5. PRODUCT VARIANTS TABLE
-- ==========================================
CREATE TABLE public.product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id TEXT NOT NULL,
    sku TEXT UNIQUE,
    name TEXT NOT NULL,
    price DECIMAL(10,2),
    compare_at_price DECIMAL(10,2),
    stock_quantity INTEGER DEFAULT 0,
    attributes JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;

-- 6. INVENTORY TABLE
-- ==========================================
CREATE TABLE public.inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id TEXT NOT NULL,
    variant_id UUID REFERENCES public.product_variants(id) ON DELETE CASCADE,
    quantity INTEGER DEFAULT 0,
    reserved_quantity INTEGER DEFAULT 0,
    low_stock_threshold INTEGER DEFAULT 5,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;

-- 7. CART ITEMS TABLE
-- ==========================================
CREATE TABLE public.cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    session_id TEXT,
    product_id TEXT NOT NULL,
    variant_id UUID REFERENCES public.product_variants(id) ON DELETE SET NULL,
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT cart_user_or_session CHECK (user_id IS NOT NULL OR session_id IS NOT NULL)
);

ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

-- 8. SHIPPING METHODS TABLE
-- ==========================================
CREATE TABLE public.shipping_methods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    name_he TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL DEFAULT 0,
    estimated_days_min INTEGER,
    estimated_days_max INTEGER,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.shipping_methods ENABLE ROW LEVEL SECURITY;

-- 9. COUPONS TABLE
-- ==========================================
CREATE TABLE public.coupons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    description TEXT,
    discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
    discount_value DECIMAL(10,2) NOT NULL,
    minimum_order_amount DECIMAL(10,2) DEFAULT 0,
    max_uses INTEGER,
    current_uses INTEGER DEFAULT 0,
    valid_from TIMESTAMP WITH TIME ZONE DEFAULT now(),
    valid_until TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;

-- 10. ORDERS TABLE
-- ==========================================
CREATE TYPE public.order_status AS ENUM (
    'pending',
    'confirmed',
    'processing',
    'shipped',
    'delivered',
    'cancelled',
    'refunded'
);

CREATE TYPE public.payment_status AS ENUM (
    'pending',
    'paid',
    'failed',
    'refunded',
    'partially_refunded'
);

CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT UNIQUE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    guest_email TEXT,
    status order_status DEFAULT 'pending',
    payment_status payment_status DEFAULT 'pending',
    
    -- Shipping info (denormalized for order history)
    shipping_first_name TEXT NOT NULL,
    shipping_last_name TEXT NOT NULL,
    shipping_phone TEXT,
    shipping_street TEXT NOT NULL,
    shipping_apartment TEXT,
    shipping_city TEXT NOT NULL,
    shipping_postal_code TEXT,
    shipping_country TEXT DEFAULT 'ישראל',
    
    -- Billing info
    billing_first_name TEXT,
    billing_last_name TEXT,
    billing_street TEXT,
    billing_city TEXT,
    billing_postal_code TEXT,
    billing_country TEXT,
    
    -- Pricing
    subtotal DECIMAL(10,2) NOT NULL,
    shipping_cost DECIMAL(10,2) DEFAULT 0,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    total DECIMAL(10,2) NOT NULL,
    
    -- References
    shipping_method_id UUID REFERENCES public.shipping_methods(id),
    coupon_id UUID REFERENCES public.coupons(id),
    coupon_code TEXT,
    
    -- Payment
    payment_method TEXT,
    payment_transaction_id TEXT,
    
    -- Notes
    customer_notes TEXT,
    admin_notes TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    shipped_at TIMESTAMP WITH TIME ZONE,
    delivered_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Generate order number function
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.order_number := 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_order_number
  BEFORE INSERT ON public.orders
  FOR EACH ROW
  WHEN (NEW.order_number IS NULL)
  EXECUTE FUNCTION public.generate_order_number();

-- 11. ORDER ITEMS TABLE
-- ==========================================
CREATE TABLE public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
    product_id TEXT NOT NULL,
    variant_id UUID REFERENCES public.product_variants(id) ON DELETE SET NULL,
    
    -- Denormalized product info (snapshot at order time)
    product_title TEXT NOT NULL,
    variant_name TEXT,
    sku TEXT,
    
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- 12. WISHLISTS TABLE
-- ==========================================
CREATE TABLE public.wishlists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    product_id TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, product_id)
);

ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;

-- 13. PRODUCT REVIEWS TABLE
-- ==========================================
CREATE TABLE public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id TEXT NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title TEXT,
    content TEXT,
    is_verified_purchase BOOLEAN DEFAULT false,
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- ROW LEVEL SECURITY POLICIES
-- ==========================================

-- User Roles Policies
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Profiles Policies
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
ON public.profiles FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Addresses Policies
CREATE POLICY "Users can manage their own addresses"
ON public.addresses FOR ALL
USING (auth.uid() = user_id);

-- Product Images Policies (public read)
CREATE POLICY "Anyone can view product images"
ON public.product_images FOR SELECT
USING (true);

CREATE POLICY "Admins can manage product images"
ON public.product_images FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Product Variants Policies (public read)
CREATE POLICY "Anyone can view active variants"
ON public.product_variants FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage variants"
ON public.product_variants FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Inventory Policies
CREATE POLICY "Anyone can view inventory"
ON public.inventory FOR SELECT
USING (true);

CREATE POLICY "Admins can manage inventory"
ON public.inventory FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Cart Items Policies
CREATE POLICY "Users can manage their cart"
ON public.cart_items FOR ALL
USING (auth.uid() = user_id OR session_id IS NOT NULL);

-- Shipping Methods Policies (public read)
CREATE POLICY "Anyone can view active shipping methods"
ON public.shipping_methods FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage shipping methods"
ON public.shipping_methods FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Coupons Policies
CREATE POLICY "Anyone can view active coupons"
ON public.coupons FOR SELECT
USING (is_active = true AND (valid_until IS NULL OR valid_until > now()));

CREATE POLICY "Admins can manage coupons"
ON public.coupons FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Orders Policies
CREATE POLICY "Users can view their own orders"
ON public.orders FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create orders"
ON public.orders FOR INSERT
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Admins can manage all orders"
ON public.orders FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Order Items Policies
CREATE POLICY "Users can view their order items"
ON public.order_items FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.orders
    WHERE orders.id = order_items.order_id
    AND orders.user_id = auth.uid()
  )
);

CREATE POLICY "Admins can manage order items"
ON public.order_items FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Wishlists Policies
CREATE POLICY "Users can manage their wishlist"
ON public.wishlists FOR ALL
USING (auth.uid() = user_id);

-- Reviews Policies
CREATE POLICY "Anyone can view approved reviews"
ON public.reviews FOR SELECT
USING (is_approved = true);

CREATE POLICY "Users can create reviews"
ON public.reviews FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews"
ON public.reviews FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all reviews"
ON public.reviews FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- ==========================================
-- UPDATE TRIGGERS
-- ==========================================

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_addresses_updated_at
  BEFORE UPDATE ON public.addresses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_product_variants_updated_at
  BEFORE UPDATE ON public.product_variants
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cart_items_updated_at
  BEFORE UPDATE ON public.cart_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON public.reviews
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ==========================================
-- INSERT DEFAULT SHIPPING METHODS
-- ==========================================

INSERT INTO public.shipping_methods (name, name_he, description, price, estimated_days_min, estimated_days_max, sort_order) VALUES
('Standard Shipping', 'משלוח רגיל', 'משלוח עד 5 ימי עסקים', 25.00, 3, 5, 1),
('Express Shipping', 'משלוח מהיר', 'משלוח עד 2 ימי עסקים', 45.00, 1, 2, 2),
('Pickup', 'איסוף עצמי', 'איסוף מנקודת החלוקה', 0.00, 1, 1, 3);