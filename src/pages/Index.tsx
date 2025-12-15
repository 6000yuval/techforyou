import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import CategoryGrid from '@/components/home/CategoryGrid';
import ProductGrid from '@/components/products/ProductGrid';
import { useFeaturedProducts, useProductsOnSale } from '@/hooks/useProducts';
import { Skeleton } from '@/components/ui/skeleton';

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

const Index: React.FC = () => {
  const { data: featuredProducts, isLoading: featuredLoading } = useFeaturedProducts();
  const { data: saleProducts, isLoading: saleLoading } = useProductsOnSale();

  return (
    <Layout>
      <Helmet>
        <title>חנות ציוד היקפי למחשב | כבלים, מתאמים, אוזניות ועוד</title>
        <meta name="description" content="חנות מקוונת לציוד היקפי למחשב - כבלים, מתאמים, אוזניות, מקלדות, עכברים ועוד. משלוח מהיר לכל הארץ ואחריות מלאה." />
      </Helmet>
      
      <HeroSection />
      
      <CategoryGrid />

      {(saleLoading || (saleProducts && saleProducts.length > 0)) && (
        <section className="py-12 bg-muted/30">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              מבצעים חמים 🔥
            </h2>
            {saleLoading ? (
              <ProductGridSkeleton />
            ) : (
              <ProductGrid products={saleProducts?.slice(0, 8) || []} />
            )}
          </div>
        </section>
      )}

      {(featuredLoading || (featuredProducts && featuredProducts.length > 0)) && (
        <section className="py-12 bg-background">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              מוצרים מומלצים
            </h2>
            {featuredLoading ? (
              <ProductGridSkeleton />
            ) : (
              <ProductGrid products={featuredProducts?.slice(0, 8) || []} />
            )}
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Index;
