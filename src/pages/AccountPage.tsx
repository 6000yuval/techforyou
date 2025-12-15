import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { User, Package, MapPin, Heart, LogOut } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/contexts/AuthContext';
import { useUserOrders } from '@/hooks/useUserOrders';
import { useUserAddresses } from '@/hooks/useUserAddresses';
import { useWishlist } from '@/hooks/useWishlist';
import { useProducts } from '@/hooks/useProducts';
import { format } from 'date-fns';
import { he } from 'date-fns/locale';

const statusLabels: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  pending: { label: 'ממתינה', variant: 'secondary' },
  confirmed: { label: 'אושרה', variant: 'default' },
  processing: { label: 'בטיפול', variant: 'default' },
  shipped: { label: 'נשלחה', variant: 'default' },
  delivered: { label: 'נמסרה', variant: 'default' },
  cancelled: { label: 'בוטלה', variant: 'destructive' },
  refunded: { label: 'הוחזרה', variant: 'destructive' },
};

const AccountPage: React.FC = () => {
  const { user, signOut } = useAuth();
  const { data: orders, isLoading: loadingOrders } = useUserOrders();
  const { addresses, isLoading: loadingAddresses, deleteAddress } = useUserAddresses();
  const { wishlistItems, isLoading: loadingWishlist, removeFromWishlist } = useWishlist();
  const { data: allProducts } = useProducts();
  const [activeTab, setActiveTab] = useState('orders');

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const wishlistProducts = allProducts?.filter(p => 
    wishlistItems.some(w => w.product_id === p.id)
  ) || [];

  return (
    <>
      <Helmet>
        <title>האזור האישי שלי | TechShop</title>
      </Helmet>
      <Layout>
        <div className="container py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">האזור האישי</h1>
              <p className="text-muted-foreground mt-1">{user.email}</p>
            </div>
            <Button variant="outline" onClick={signOut}>
              <LogOut className="h-4 w-4 ml-2" />
              התנתק
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} dir="rtl">
            <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
              <TabsTrigger value="orders" className="gap-2">
                <Package className="h-4 w-4" />
                הזמנות
              </TabsTrigger>
              <TabsTrigger value="addresses" className="gap-2">
                <MapPin className="h-4 w-4" />
                כתובות
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="gap-2">
                <Heart className="h-4 w-4" />
                מועדפים
              </TabsTrigger>
            </TabsList>

            {/* Orders Tab */}
            <TabsContent value="orders" className="mt-6">
              {loadingOrders ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <Skeleton key={i} className="h-32 w-full" />
                  ))}
                </div>
              ) : orders && orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map(order => {
                    const status = statusLabels[order.status] || { label: order.status, variant: 'secondary' as const };
                    return (
                      <Card key={order.id}>
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">הזמנה #{order.order_number}</CardTitle>
                            <Badge variant={status.variant}>{status.label}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(order.created_at), 'dd בMMMM yyyy', { locale: he })}
                          </p>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {order.order_items.slice(0, 3).map(item => (
                              <div key={item.id} className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                  {item.product_title} x{item.quantity}
                                </span>
                                <span>₪{item.total_price.toFixed(2)}</span>
                              </div>
                            ))}
                            {order.order_items.length > 3 && (
                              <p className="text-sm text-muted-foreground">
                                +{order.order_items.length - 3} פריטים נוספים
                              </p>
                            )}
                          </div>
                          <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
                            <span className="font-medium">סה"כ:</span>
                            <span className="font-bold text-lg">₪{order.total.toFixed(2)}</span>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">אין לך הזמנות עדיין</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Addresses Tab */}
            <TabsContent value="addresses" className="mt-6">
              {loadingAddresses ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {[1, 2].map(i => (
                    <Skeleton key={i} className="h-40 w-full" />
                  ))}
                </div>
              ) : addresses.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {addresses.map(address => (
                    <Card key={address.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">{address.label}</CardTitle>
                          <div className="flex gap-1">
                            {address.is_default_shipping && (
                              <Badge variant="secondary">משלוח ברירת מחדל</Badge>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-foreground">
                          {address.first_name} {address.last_name}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {address.street}
                          {address.apartment && `, דירה ${address.apartment}`}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {address.city}
                          {address.postal_code && `, ${address.postal_code}`}
                        </p>
                        {address.phone && (
                          <p className="text-muted-foreground text-sm mt-1">{address.phone}</p>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="mt-2 text-destructive hover:text-destructive"
                          onClick={() => deleteAddress.mutate(address.id)}
                        >
                          מחק
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">אין לך כתובות שמורות</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      כתובות יישמרו אוטומטית לאחר ביצוע הזמנה
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Wishlist Tab */}
            <TabsContent value="wishlist" className="mt-6">
              {loadingWishlist ? (
                <div className="grid md:grid-cols-3 gap-4">
                  {[1, 2, 3].map(i => (
                    <Skeleton key={i} className="h-48 w-full" />
                  ))}
                </div>
              ) : wishlistProducts.length > 0 ? (
                <div className="grid md:grid-cols-3 gap-4">
                  {wishlistProducts.map(product => (
                    <Card key={product.id}>
                      <CardContent className="p-4">
                        <img 
                          src={product.images[0] || '/placeholder.svg'} 
                          alt={product.name}
                          className="w-full h-32 object-contain mb-3"
                        />
                        <h3 className="font-medium text-foreground line-clamp-2 mb-2">
                          {product.name}
                        </h3>
                        <p className="font-bold text-primary">₪{product.price.toFixed(2)}</p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="mt-2 text-destructive hover:text-destructive w-full"
                          onClick={() => removeFromWishlist.mutate(product.id)}
                        >
                          הסר מהמועדפים
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">רשימת המועדפים ריקה</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </Layout>
    </>
  );
};

export default AccountPage;
