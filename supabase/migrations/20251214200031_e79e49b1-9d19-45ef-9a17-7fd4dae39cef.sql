-- Fix RLS policies for existing tables (Categories, Products, etc.)
-- and fix function search paths

-- 1. ADD RLS POLICIES FOR EXISTING TABLES
-- ==========================================

-- Categories - public read, admin write
CREATE POLICY "Anyone can view categories"
ON public."Categories" FOR SELECT
USING (true);

CREATE POLICY "Admins can manage categories"
ON public."Categories" FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Products - public read, admin write
CREATE POLICY "Anyone can view products"
ON public."Products" FOR SELECT
USING (true);

CREATE POLICY "Admins can manage products"
ON public."Products" FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- products categories - public read, admin write
CREATE POLICY "Anyone can view product categories"
ON public."products categories" FOR SELECT
USING (true);

CREATE POLICY "Admins can manage product categories"
ON public."products categories" FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- products subcategories - public read, admin write
CREATE POLICY "Anyone can view product subcategories"
ON public."products subcategories" FOR SELECT
USING (true);

CREATE POLICY "Admins can manage product subcategories"
ON public."products subcategories" FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- subcategories - public read, admin write
CREATE POLICY "Anyone can view subcategories"
ON public.subcategories FOR SELECT
USING (true);

CREATE POLICY "Admins can manage subcategories"
ON public.subcategories FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- 2. FIX FUNCTION SEARCH PATHS
-- ==========================================

-- Fix generate_order_number function
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.order_number := 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
  RETURN NEW;
END;
$$;

-- Fix update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;