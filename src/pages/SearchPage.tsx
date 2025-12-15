import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/products/ProductGrid';
import { useSearchProducts } from '@/hooks/useProducts';
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

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { data: searchResults, isLoading } = useSearchProducts(query);

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
              {!isLoading && (
                <p className="text-muted-foreground">
                  נמצאו {searchResults?.length || 0} תוצאות
                </p>
              )}
            </div>
          </div>

          {isLoading ? (
            <ProductGridSkeleton />
          ) : searchResults && searchResults.length > 0 ? (
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
