import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const hasDiscount = product.sale_price && product.sale_price < product.price;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.sale_price! / product.price) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success('המוצר נוסף לעגלה', {
      description: product.name,
    });
  };

  return (
    <Link to={`/product/${product.slug}`}>
      <Card className="group h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative aspect-square overflow-hidden bg-secondary/30">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {hasDiscount && (
            <Badge className="absolute top-2 right-2 bg-sale text-sale-foreground">
              {discountPercent}% הנחה
            </Badge>
          )}
          {!product.in_stock && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <Badge variant="secondary" className="text-base">
                אזל מהמלאי
              </Badge>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium text-foreground line-clamp-2 min-h-[2.5rem] mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          {product.category_name && (
            <p className="text-xs text-muted-foreground mb-2">{product.category_name}</p>
          )}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex flex-col">
              {hasDiscount ? (
                <>
                  <span className="text-lg font-bold text-sale">₪{product.sale_price?.toFixed(2)}</span>
                  <span className="text-sm text-muted-foreground line-through">₪{product.price.toFixed(2)}</span>
                </>
              ) : (
                <span className="text-lg font-bold text-foreground">₪{product.price.toFixed(2)}</span>
              )}
            </div>
            <Button
              size="icon"
              variant="secondary"
              onClick={handleAddToCart}
              disabled={!product.in_stock}
              className="shrink-0 hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
