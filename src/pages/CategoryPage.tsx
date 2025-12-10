import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft, SlidersHorizontal, X } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/products/ProductGrid';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { getCategoryBySlug, getParentCategory, categories } from '@/data/categories';
import { products } from '@/data/products';

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = getCategoryBySlug(slug || '');
  const parentCategory = getParentCategory(slug || '');
  
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);

  const categoryProducts = useMemo(() => {
    let filtered = products.filter(p => {
      if (parentCategory) {
        // It's a subcategory - for now show all parent category products
        return p.category_id === parentCategory.id;
      }
      return p.category_id === category?.id;
    });

    // Apply filters
    filtered = filtered.filter(p => {
      const price = p.sale_price || p.price;
      if (price < priceRange[0] || price > priceRange[1]) return false;
      if (inStockOnly && !p.in_stock) return false;
      if (onSaleOnly && (!p.sale_price || p.sale_price >= p.price)) return false;
      return true;
    });

    return filtered;
  }, [category, parentCategory, priceRange, inStockOnly, onSaleOnly]);

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
            <span className="text-muted-foreground">
              {categoryProducts.length} מוצרים
            </span>
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

              <ProductGrid products={categoryProducts} />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CategoryPage;
