import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import CategoryGrid from '@/components/home/CategoryGrid';
import ProductGrid from '@/components/products/ProductGrid';
import { getFeaturedProducts, getProductsOnSale } from '@/data/products';

const Index: React.FC = () => {
  const featuredProducts = getFeaturedProducts();
  const saleProducts = getProductsOnSale();

  return (
    <Layout>
      <Helmet>
        <title>חנות ציוד היקפי למחשב | כבלים, מתאמים, אוזניות ועוד</title>
        <meta name="description" content="חנות מקוונת לציוד היקפי למחשב - כבלים, מתאמים, אוזניות, מקלדות, עכברים ועוד. משלוח מהיר לכל הארץ ואחריות מלאה." />
      </Helmet>
      
      <HeroSection />
      
      <section className="py-12 bg-background">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            קטגוריות מובילות
          </h2>
          <CategoryGrid />
        </div>
      </section>

      {saleProducts.length > 0 && (
        <section className="py-12 bg-muted/30">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              מבצעים חמים 🔥
            </h2>
            <ProductGrid products={saleProducts.slice(0, 8)} />
          </div>
        </section>
      )}

      {featuredProducts.length > 0 && (
        <section className="py-12 bg-background">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              מוצרים מומלצים
            </h2>
            <ProductGrid products={featuredProducts.slice(0, 8)} />
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Index;
