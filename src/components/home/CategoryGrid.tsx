import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { categories } from '@/data/categories';

// Category images mapping - accurate images for each category
const categoryImages: Record<string, string> = {
  headphones: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', // אוזניות
  microphones: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&h=400&fit=crop', // מיקרופונים
  speakers: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop', // רמקולים
  cameras: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop', // מצלמות
  mice: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop', // עכברים
  keyboards: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop', // מקלדות
  'computer-sets': 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=400&fit=crop', // סטים למחשב
  cables: 'https://images.unsplash.com/photo-1601944179066-29786cb9d32a?w=400&h=400&fit=crop', // כבלים
  adapters: 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=400&h=400&fit=crop', // מתאמים
  'hubs-docking': 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=400&fit=crop', // Hubs ותחנות עגינה
  storage: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=400&h=400&fit=crop', // אחסון חיצוני - SSD/HDD
  network: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=400&fit=crop', // רשת - רשת ונתבים
  'desk-setup': 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=400&fit=crop', // ארגון שולחן
  'power-charging': 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&h=400&fit=crop', // חשמל וטעינה - מטענים
  gaming: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=400&fit=crop', // גיימינג - בקרים וציוד גיימינג
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