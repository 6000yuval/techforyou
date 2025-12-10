import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/products/ProductGrid';
import { products } from '@/data/products';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    
    const lowerQuery = query.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.short_description?.toLowerCase().includes(lowerQuery) ||
      p.description?.toLowerCase().includes(lowerQuery) ||
      p.category_name?.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

  return (
    <>
      <Helmet>
        <title>חיפוש: {query} | TechShop</title>
      </Helmet>
      <Layout>
        <div className="container py-8">
          <div className="flex items-center gap-3 mb-8">
            <Search className="h-6 w-6 text-muted-foreground" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                תוצאות חיפוש: "{query}"
              </h1>
              <p className="text-muted-foreground">
                נמצאו {searchResults.length} תוצאות
              </p>
            </div>
          </div>

          {searchResults.length > 0 ? (
            <ProductGrid products={searchResults} />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                לא נמצאו מוצרים התואמים לחיפוש שלך
              </p>
              <Link to="/" className="text-primary hover:underline">
                חזרה לדף הבית
              </Link>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default SearchPage;
