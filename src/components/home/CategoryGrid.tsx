import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Headphones, Mic, Speaker, Camera, Mouse, Keyboard, 
  Package, Cable, Plug, HardDrive, Wifi, Monitor, 
  Battery, Gamepad2, Server
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { categories } from '@/data/categories';

const iconMap: Record<string, React.ElementType> = {
  Headphones,
  Mic,
  Speaker,
  Camera,
  Mouse,
  Keyboard,
  Package,
  Cable,
  Plug,
  Hub: Server,
  HardDrive,
  Wifi,
  Monitor,
  Battery,
  Gamepad2,
};

const CategoryGrid: React.FC = () => {
  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
          קטגוריות מובילות
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {categories.slice(0, 12).map((category) => {
            const IconComponent = category.icon ? iconMap[category.icon] : Package;
            
            return (
              <Link key={category.id} to={`/category/${category.slug}`}>
                <Card className="group h-full hover:shadow-md hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                      {IconComponent && (
                        <IconComponent className="h-6 w-6 text-primary" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {category.name}
                    </span>
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
