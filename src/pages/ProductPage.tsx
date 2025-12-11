import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ChevronLeft, Minus, Plus, ShoppingCart, Check, Truck, Shield, 
  RotateCcw, CreditCard, Star, Heart, Share2, Package, Clock, Award
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/products/ProductGrid';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  const [selectedImage, setSelectedImage] = useState(0);

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
    toast.success('המוצר נוסף לעגלה בהצלחה! 🛒', {
      description: `${product.name} x${quantity}`,
      action: {
        label: 'לעגלה',
        onClick: () => window.location.href = '/cart'
      }
    });
  };

  const handleAttributeChange = (name: string, value: string) => {
    setSelectedAttributes(prev => ({ ...prev, [name]: value }));
  };

  // Mock rating
  const rating = 4.5;
  const reviewCount = Math.floor(Math.random() * 100) + 20;

  return (
    <>
      <Helmet>
        <title>{product.name} | TechShop</title>
        <meta name="description" content={product.short_description || product.name} />
      </Helmet>

      <Layout>
        <div className="container py-6 lg:py-8">
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
            {/* Image Gallery - Sticky on desktop */}
            <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-secondary/50 to-secondary/20 border border-border group">
                {hasDiscount && (
                  <Badge className="absolute top-4 right-4 z-10 bg-sale text-sale-foreground text-lg px-3 py-1 font-bold">
                    {discountPercent}%- הנחה
                  </Badge>
                )}
                <img
                  src={product.images[selectedImage] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Action buttons */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <Button variant="secondary" size="icon" className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="secondary" size="icon" className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              {/* Thumbnail Gallery */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                        selectedImage === index 
                          ? 'border-primary ring-2 ring-primary/20' 
                          : 'border-border hover:border-primary/50'
                      }`}
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
              {/* Category & Rating */}
              <div className="flex items-center justify-between">
                {product.category_name && (
                  <Badge variant="secondary" className="text-sm">
                    {product.category_name}
                  </Badge>
                )}
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">({reviewCount} ביקורות)</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                {product.name}
              </h1>

              {/* Price Section */}
              <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/20">
                <div className="flex items-end gap-4 mb-2">
                  <span className="text-4xl md:text-5xl font-black text-primary">
                    ₪{currentPrice.toFixed(0)}
                  </span>
                  {hasDiscount && (
                    <div className="flex flex-col">
                      <span className="text-xl text-muted-foreground line-through">
                        ₪{product.price.toFixed(0)}
                      </span>
                      <span className="text-sale font-semibold">
                        חסכת ₪{(product.price - currentPrice).toFixed(0)}
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">כולל מע"מ | משלוח חינם בקנייה מעל ₪200</p>
              </div>

              {/* Short Description */}
              {product.short_description && (
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {product.short_description}
                </p>
              )}

              {/* Attributes Selection */}
              {product.attributes && product.attributes.length > 0 && (
                <div className="space-y-5">
                  {product.attributes.map((attr) => (
                    <div key={attr.name}>
                      <label className="block text-sm font-semibold text-foreground mb-3">
                        {attr.name}: <span className="text-primary">{selectedAttributes[attr.name] || 'בחר אפשרות'}</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {attr.values.map((value) => (
                          <Button
                            key={value}
                            variant={selectedAttributes[attr.name] === value ? 'default' : 'outline'}
                            size="lg"
                            onClick={() => handleAttributeChange(attr.name, value)}
                            className={`min-w-[80px] transition-all duration-300 ${
                              selectedAttributes[attr.name] === value 
                                ? 'ring-2 ring-primary/30' 
                                : 'hover:border-primary'
                            }`}
                          >
                            {value}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <Separator />

              {/* Quantity & Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-semibold text-foreground">כמות:</label>
                  <div className="flex items-center gap-1 bg-secondary/50 rounded-xl p-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="rounded-lg"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-xl font-bold w-14 text-center">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                      className="rounded-lg"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Stock Status */}
                  <div className="flex items-center gap-2 mr-auto">
                    {product.in_stock ? (
                      <>
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <span className="text-green-600 dark:text-green-400 font-medium">במלאי</span>
                      </>
                    ) : (
                      <span className="text-destructive font-medium">אזל מהמלאי</span>
                    )}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <Button
                  size="lg"
                  className="w-full h-14 text-lg font-bold gap-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  onClick={handleAddToCart}
                  disabled={!product.in_stock}
                >
                  <ShoppingCart className="h-6 w-6" />
                  הוספה לעגלה
                  <span className="mr-2 bg-primary-foreground/20 px-3 py-1 rounded-lg">
                    ₪{(currentPrice * quantity).toFixed(0)}
                  </span>
                </Button>

                {/* Buy Now Button */}
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full h-12 text-lg font-semibold gap-2 rounded-xl border-2"
                  onClick={() => {
                    handleAddToCart();
                    window.location.href = '/checkout';
                  }}
                  disabled={!product.in_stock}
                >
                  <CreditCard className="h-5 w-5" />
                  קנייה מהירה
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Card className="bg-secondary/30 border-0">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <Truck className="h-8 w-8 text-primary mb-2" />
                    <span className="text-xs font-medium">משלוח מהיר</span>
                    <span className="text-xs text-muted-foreground">2-5 ימי עסקים</span>
                  </CardContent>
                </Card>
                <Card className="bg-secondary/30 border-0">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <Shield className="h-8 w-8 text-primary mb-2" />
                    <span className="text-xs font-medium">אחריות מלאה</span>
                    <span className="text-xs text-muted-foreground">12 חודשים</span>
                  </CardContent>
                </Card>
                <Card className="bg-secondary/30 border-0">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <RotateCcw className="h-8 w-8 text-primary mb-2" />
                    <span className="text-xs font-medium">החזרה קלה</span>
                    <span className="text-xs text-muted-foreground">14 יום</span>
                  </CardContent>
                </Card>
                <Card className="bg-secondary/30 border-0">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <Award className="h-8 w-8 text-primary mb-2" />
                    <span className="text-xs font-medium">איכות מובטחת</span>
                    <span className="text-xs text-muted-foreground">מוצרים מקוריים</span>
                  </CardContent>
                </Card>
              </div>

              {/* Delivery Info */}
              <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">הזמן עכשיו וקבל עד יום רביעי!</p>
                      <p className="text-sm text-muted-foreground">משלוח חינם לכל הארץ בקנייה מעל ₪200</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Product Details Tabs */}
          <section className="mt-16" dir="rtl">
            <Tabs defaultValue="description" className="w-full" dir="rtl">
              <TabsList className="w-full flex justify-start border-b rounded-none h-auto p-0 bg-transparent">
                <TabsTrigger 
                  value="description" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4 text-lg"
                >
                  תיאור המוצר
                </TabsTrigger>
                <TabsTrigger 
                  value="specs" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4 text-lg"
                >
                  מפרט טכני
                </TabsTrigger>
                <TabsTrigger 
                  value="reviews" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4 text-lg"
                >
                  ביקורות ({reviewCount})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-8 text-right">
                <Card>
                  <CardContent className="p-8">
                    <div className="prose prose-lg max-w-none text-muted-foreground whitespace-pre-line leading-relaxed text-right">
                      {product.description || product.short_description}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="specs" className="mt-8 text-right">
                <Card>
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex justify-between py-3 border-b border-border">
                        <span className="font-medium">קטגוריה</span>
                        <span className="text-muted-foreground">{product.category_name}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-border">
                        <span className="font-medium">מק"ט</span>
                        <span className="text-muted-foreground">{product.id}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-border">
                        <span className="font-medium">זמינות</span>
                        <span className={product.in_stock ? 'text-green-600' : 'text-destructive'}>
                          {product.in_stock ? 'במלאי' : 'אזל'}
                        </span>
                      </div>
                      {product.attributes?.map((attr) => (
                        <div key={attr.name} className="flex justify-between py-3 border-b border-border">
                          <span className="font-medium">{attr.name}</span>
                          <span className="text-muted-foreground">{attr.values.join(', ')}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-8">
                <Card>
                  <CardContent className="p-8 text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-8 w-8 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30'}`} 
                        />
                      ))}
                    </div>
                    <p className="text-3xl font-bold text-foreground mb-2">{rating}/5</p>
                    <p className="text-muted-foreground mb-6">מבוסס על {reviewCount} ביקורות</p>
                    <Button variant="outline" size="lg">
                      כתוב ביקורת
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </section>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">מוצרים דומים</h2>
                <Link to={`/category/${product.category_id}`}>
                  <Button variant="outline">
                    לכל המוצרים
                    <ChevronLeft className="h-4 w-4 mr-2" />
                  </Button>
                </Link>
              </div>
              <ProductGrid products={relatedProducts} />
            </section>
          )}
        </div>
      </Layout>
    </>
  );
};

export default ProductPage;