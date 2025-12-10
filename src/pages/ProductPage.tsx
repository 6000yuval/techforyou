import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft, Minus, Plus, ShoppingCart, Check, Truck, Shield } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/products/ProductGrid';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { getProductBySlug, products } from '@/data/products';
import { getCategoryBySlug } from '@/data/categories';
import { toast } from 'sonner';

const ProductPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || '');
  const { addItem } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});

  if (!product) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">מוצר לא נמצא</h1>
          <Link to="/">
            <Button>חזרה לדף הבית</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const category = getCategoryBySlug(product.category_id);
  const hasDiscount = product.sale_price && product.sale_price < product.price;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.sale_price! / product.price) * 100)
    : 0;
  const currentPrice = product.sale_price || product.price;

  const relatedProducts = products
    .filter(p => p.category_id === product.category_id && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, quantity, undefined, selectedAttributes);
    toast.success('המוצר נוסף לעגלה', {
      description: `${product.name} x${quantity}`,
    });
  };

  const handleAttributeChange = (name: string, value: string) => {
    setSelectedAttributes(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Helmet>
        <title>{product.name} | TechShop</title>
        <meta name="description" content={product.short_description || product.name} />
      </Helmet>

      <Layout>
        <div className="container py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary transition-colors">
              דף הבית
            </Link>
            <ChevronLeft className="h-4 w-4" />
            {category && (
              <>
                <Link
                  to={`/category/${category.slug}`}
                  className="hover:text-primary transition-colors"
                >
                  {category.name}
                </Link>
                <ChevronLeft className="h-4 w-4" />
              </>
            )}
            <span className="text-foreground line-clamp-1">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-secondary/30 border border-border">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      className="aspect-square rounded-md overflow-hidden border border-border hover:border-primary transition-colors"
                    >
                      <img
                        src={img}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                {hasDiscount && (
                  <Badge className="bg-sale text-sale-foreground mb-2">
                    {discountPercent}% הנחה
                  </Badge>
                )}
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {product.name}
                </h1>
                {product.category_name && (
                  <p className="text-muted-foreground">{product.category_name}</p>
                )}
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-primary">
                  ₪{currentPrice.toFixed(2)}
                </span>
                {hasDiscount && (
                  <span className="text-xl text-muted-foreground line-through">
                    ₪{product.price.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Short Description */}
              {product.short_description && (
                <p className="text-muted-foreground leading-relaxed">
                  {product.short_description}
                </p>
              )}

              <Separator />

              {/* Attributes */}
              {product.attributes && product.attributes.length > 0 && (
                <div className="space-y-4">
                  {product.attributes.map((attr) => (
                    <div key={attr.name}>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {attr.name}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {attr.values.map((value) => (
                          <Button
                            key={value}
                            variant={selectedAttributes[attr.name] === value ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => handleAttributeChange(attr.name, value)}
                          >
                            {value}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  כמות
                </label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                {product.in_stock ? (
                  <>
                    <Check className="h-5 w-5 text-success" />
                    <span className="text-success font-medium">במלאי</span>
                  </>
                ) : (
                  <span className="text-destructive font-medium">אזל מהמלאי</span>
                )}
              </div>

              {/* Add to Cart */}
              <Button
                size="lg"
                className="w-full gap-2"
                onClick={handleAddToCart}
                disabled={!product.in_stock}
              >
                <ShoppingCart className="h-5 w-5" />
                הוספה לעגלה
              </Button>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Truck className="h-5 w-5 text-primary" />
                  <span>משלוח מהיר</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>אחריות יצרן</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          {product.description && (
            <section className="mt-12">
              <h2 className="text-xl font-bold text-foreground mb-4">תיאור המוצר</h2>
              <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-line">
                {product.description}
              </div>
            </section>
          )}

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-12">
              <ProductGrid products={relatedProducts} title="מוצרים דומים" />
            </section>
          )}
        </div>
      </Layout>
    </>
  );
};

export default ProductPage;
