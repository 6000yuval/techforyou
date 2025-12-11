import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { categories } from '@/data/categories';

// Category images mapping
const categoryImages: Record<string, string> = {
  headphones: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
  microphones: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=300&h=300&fit=crop',
  speakers: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=300&h=300&fit=crop',
  cameras: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=300&h=300&fit=crop',
  mice: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=300&fit=crop',
  keyboards: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=300&h=300&fit=crop',
  'computer-sets': 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop',
  cables: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
  adapters: 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=300&h=300&fit=crop',
  'hubs-docking': 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=300&h=300&fit=crop',
  storage: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=300&h=300&fit=crop',
  network: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=300&h=300&fit=crop',
  'desk-setup': 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=300&h=300&fit=crop',
  'power-charging': 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=300&fit=crop',
  gaming: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=300&h=300&fit=crop',
};

const CategoryGrid: React.FC = () => {
  return (
    <section className="py-12 bg-background">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
          קטגוריות מובילות
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.slice(0, 15).map((category) => {
            const imageUrl = categoryImages[category.slug] || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop';
            
            return (
              <Link key={category.id} to={`/category/${category.slug}`}>
                <Card className="group h-full overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-0">
                    <div className="aspect-square overflow-hidden bg-secondary/20 relative">
                      <img
                        src={imageUrl}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <span className="text-sm md:text-base font-semibold text-white drop-shadow-lg">
                          {category.name}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;