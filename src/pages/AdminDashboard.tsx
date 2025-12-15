import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ShoppingCart, Users, TrendingUp } from 'lucide-react';
import AdminOrdersTable from '@/components/admin/AdminOrdersTable';
import AdminProductsTable from '@/components/admin/AdminProductsTable';
import { useAdminOrders } from '@/hooks/useAdminOrders';
import { useAdminProducts } from '@/hooks/useAdminProducts';

export default function AdminDashboard() {
  const { user, isAdmin, isLoading } = useAuth();
  const { data: orders } = useAdminOrders();
  const { data: products } = useAdminProducts();
  const [activeTab, setActiveTab] = useState('orders');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">אין הרשאה</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">אין לך הרשאות אדמין לצפות בדף זה.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const pendingOrders = orders?.filter(o => o.status === 'pending').length || 0;
  const totalProducts = products?.length || 0;
  const totalRevenue = orders?.reduce((sum, o) => sum + Number(o.total), 0) || 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">דשבורד אדמין</h1>
          <p className="text-muted-foreground">ניהול הזמנות ומוצרים</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <ShoppingCart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">הזמנות ממתינות</p>
                  <p className="text-2xl font-bold">{pendingOrders}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-accent">
                  <Package className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">סה"כ מוצרים</p>
                  <p className="text-2xl font-bold">{totalProducts}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-success/10">
                  <TrendingUp className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">סה"כ הכנסות</p>
                  <p className="text-2xl font-bold">₪{totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-secondary">
                  <Users className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">סה"כ הזמנות</p>
                  <p className="text-2xl font-bold">{orders?.length || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="orders">הזמנות</TabsTrigger>
            <TabsTrigger value="products">מוצרים</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <AdminOrdersTable />
          </TabsContent>

          <TabsContent value="products">
            <AdminProductsTable />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
