import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';

const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <>
        <Helmet>
          <title>עגלת קניות | TechShop</title>
        </Helmet>
        <Layout>
          <div className="container py-16 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">העגלה ריקה</h1>
            <p className="text-muted-foreground mb-6">לא הוספת עדיין מוצרים לעגלה</p>
            <Link to="/">
              <Button size="lg" className="gap-2">
                <ArrowRight className="h-4 w-4" />
                המשך בקניות
              </Button>
            </Link>
          </div>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>עגלת קניות | TechShop</title>
      </Helmet>
      <Layout>
        <div className="container py-8">
          <h1 className="text-3xl font-bold text-foreground mb-8">עגלת קניות</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => {
                const price = item.variation?.sale_price || item.variation?.price ||
                  item.product.sale_price || item.product.price;
                const lineTotal = price * item.quantity;

                return (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <Link to={`/product/${item.product.slug}`} className="shrink-0">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-24 h-24 object-cover rounded-md"
                          />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <Link
                            to={`/product/${item.product.slug}`}
                            className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2"
                          >
                            {item.product.name}
                          </Link>
                          {item.selected_attributes && Object.keys(item.selected_attributes).length > 0 && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {Object.entries(item.selected_attributes)
                                .map(([key, value]) => `${key}: ${value}`)
                                .join(' | ')}
                            </p>
                          )}
                          <p className="text-lg font-semibold text-primary mt-2">
                            ₪{price.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex flex-col items-end justify-between">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="font-semibold text-foreground">
                            ₪{lineTotal.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              <div className="flex justify-between items-center pt-4">
                <Link to="/">
                  <Button variant="outline" className="gap-2">
                    <ArrowRight className="h-4 w-4" />
                    המשך בקניות
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="text-destructive hover:text-destructive"
                  onClick={clearCart}
                >
                  ריקון העגלה
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-foreground mb-4">סיכום הזמנה</h2>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-muted-foreground">
                      <span>סה"כ מוצרים ({items.length})</span>
                      <span>₪{totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>משלוח</span>
                      <span>חינם</span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between text-lg font-bold text-foreground mb-6">
                    <span>סה"כ לתשלום</span>
                    <span>₪{totalPrice.toFixed(2)}</span>
                  </div>

                  <Link to="/checkout" className="block">
                    <Button size="lg" className="w-full">
                      המשך לתשלום
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CartPage;
