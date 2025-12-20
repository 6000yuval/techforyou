import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft, SlidersHorizontal } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/products/ProductGrid';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { useCategories, getCategoryBySlug, getParentCategorySync } from '@/hooks/useCategories';
import { useProducts } from '@/hooks/useProducts';
import { productBelongsToSubcategory } from '@/utils/productSubcategoryMatcher';

const ProductGridSkeleton = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {[...Array(8)].map((_, i) => (
      <div key={i} className="space-y-3">
        <Skeleton className="aspect-square rounded-lg" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    ))}
  </div>
);

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: categories = [] } = useCategories();
  const category = getCategoryBySlug(slug || '', categories);
  const parentCategory = getParentCategorySync(slug || '', categories);
  
  const { data: allProducts, isLoading } = useProducts();
  
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [connectionType, setConnectionType] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  // Get all products for this category or subcategory
  const baseCategoryProducts = useMemo(() => {
    if (!allProducts) return [];
    
    // If we're on a subcategory page
    if (parentCategory) {
      return allProducts.filter(p => {
        return p.category_id === parentCategory.id && 
          productBelongsToSubcategory(p, slug || '');
      });
    }
    // If we're on a main category page, show all products from that category
    return allProducts.filter(p => {
      return p.category_id === category?.id;
    });
  }, [allProducts, category, parentCategory, slug]);

  // Extract available connection types from products
  const availableConnectionTypes = useMemo(() => {
    const types = new Set<string>();
    baseCategoryProducts.forEach(p => {
      const connAttr = p.attributes?.find(a => a.name === 'סוג חיבור');
      connAttr?.values.forEach(v => types.add(v));
    });
    return Array.from(types);
  }, [baseCategoryProducts]);

  // Extract available colors from products
  const availableColors = useMemo(() => {
    const colors = new Set<string>();
    baseCategoryProducts.forEach(p => {
      const colorAttr = p.attributes?.find(a => a.name === 'צבע');
      colorAttr?.values.forEach(v => colors.add(v));
    });
    return Array.from(colors);
  }, [baseCategoryProducts]);

  // Apply all filters
  const categoryProducts = useMemo(() => {
    return baseCategoryProducts.filter(p => {
      const price = p.sale_price || p.price;
      if (price < priceRange[0] || price > priceRange[1]) return false;
      if (inStockOnly && !p.in_stock) return false;
      if (onSaleOnly && (!p.sale_price || p.sale_price >= p.price)) return false;
      
      // Connection type filter
      if (connectionType.length > 0) {
        const connAttr = p.attributes?.find(a => a.name === 'סוג חיבור');
        if (!connAttr || !connAttr.values.some(v => connectionType.includes(v))) {
          return false;
        }
      }
      
      // Color filter
      if (selectedColors.length > 0) {
        const colorAttr = p.attributes?.find(a => a.name === 'צבע');
        if (!colorAttr || !colorAttr.values.some(v => selectedColors.includes(v))) {
          return false;
        }
      }
      
      return true;
    });
  }, [baseCategoryProducts, priceRange, inStockOnly, onSaleOnly, connectionType, selectedColors]);

  if (!category) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">קטגוריה לא נמצאה</h1>
          <Link to="/">
            <Button>חזרה לדף הבית</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const displayCategory = parentCategory || category;
  const subcategories = displayCategory.subcategories || [];

  const handleConnectionTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setConnectionType(prev => [...prev, type]);
    } else {
      setConnectionType(prev => prev.filter(t => t !== type));
    }
  };

  const handleColorChange = (color: string, checked: boolean) => {
    if (checked) {
      setSelectedColors(prev => [...prev, color]);
    } else {
      setSelectedColors(prev => prev.filter(c => c !== color));
    }
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h4 className="font-medium text-foreground mb-4">טווח מחירים</h4>
        <Slider
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
          min={0}
          max={500}
          step={10}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>₪{priceRange[0]}</span>
          <span>₪{priceRange[1]}</span>
        </div>
      </div>

      {/* Connection Type Filter */}
      {availableConnectionTypes.length > 0 && (
        <div>
          <h4 className="font-medium text-foreground mb-3">סוג חיבור</h4>
          <div className="space-y-2">
            {availableConnectionTypes.map((type) => (
              <div key={type} className="flex items-center gap-2">
                <Checkbox
                  id={`conn-${type}`}
                  checked={connectionType.includes(type)}
                  onCheckedChange={(checked) => handleConnectionTypeChange(type, checked as boolean)}
                />
                <Label htmlFor={`conn-${type}`} className="cursor-pointer">
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Color Filter */}
      {availableColors.length > 0 && (
        <div>
          <h4 className="font-medium text-foreground mb-3">צבע</h4>
          <div className="space-y-2">
            {availableColors.map((color) => (
              <div key={color} className="flex items-center gap-2">
                <Checkbox
                  id={`color-${color}`}
                  checked={selectedColors.includes(color)}
                  onCheckedChange={(checked) => handleColorChange(color, checked as boolean)}
                />
                <Label htmlFor={`color-${color}`} className="cursor-pointer">
                  {color}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stock Filter */}
      <div className="flex items-center gap-2">
        <Checkbox
          id="inStock"
          checked={inStockOnly}
          onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
        />
        <Label htmlFor="inStock" className="cursor-pointer">
          במלאי בלבד
        </Label>
      </div>

      {/* Sale Filter */}
      <div className="flex items-center gap-2">
        <Checkbox
          id="onSale"
          checked={onSaleOnly}
          onCheckedChange={(checked) => setOnSaleOnly(checked as boolean)}
        />
        <Label htmlFor="onSale" className="cursor-pointer">
          מוצרים במבצע
        </Label>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>{category.name} | TechShop</title>
        <meta
          name="description"
          content={`${category.name} - מבחר גדול של מוצרים איכותיים במחירים מעולים. משלוח מהיר לכל הארץ.`}
        />
      </Helmet>

      <Layout>
        <div className="container py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary transition-colors">
              דף הבית
            </Link>
            <ChevronLeft className="h-4 w-4" />
            {parentCategory && (
              <>
                <Link
                  to={`/category/${parentCategory.slug}`}
                  className="hover:text-primary transition-colors"
                >
                  {parentCategory.name}
                </Link>
                <ChevronLeft className="h-4 w-4" />
              </>
            )}
            <span className="text-foreground">{category.name}</span>
          </nav>

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-foreground">{category.name}</h1>
            {!isLoading && (
              <span className="text-muted-foreground">
                {categoryProducts.length} מוצרים
              </span>
            )}
          </div>

          {/* Subcategories */}
          {subcategories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              <Link to={`/category/${displayCategory.slug}`}>
                <Button
                  variant={!parentCategory ? 'default' : 'outline'}
                  size="sm"
                >
                  הכל
                </Button>
              </Link>
              {subcategories.map((sub) => (
                <Link key={sub.id} to={`/category/${sub.slug}`}>
                  <Button
                    variant={slug === sub.slug ? 'default' : 'outline'}
                    size="sm"
                  >
                    {sub.name}
                  </Button>
                </Link>
              ))}
            </div>
          )}

          <div className="flex gap-8">
            {/* Desktop Filters */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24 bg-card rounded-lg border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4">סינון</h3>
                <FilterContent />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Mobile Filter Button */}
              <div className="lg:hidden mb-4">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <SlidersHorizontal className="h-4 w-4" />
                      סינון
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right">
                    <SheetHeader>
                      <SheetTitle>סינון מוצרים</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {isLoading ? (
                <ProductGridSkeleton />
              ) : (
                <ProductGrid products={categoryProducts} />
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CategoryPage;
