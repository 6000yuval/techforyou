import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Admin dashboard is now handled by Medusa Admin
// This page just redirects or shows a message
export default function AdminDashboard() {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // Since admin is handled by Medusa Admin, show info
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>ניהול החנות</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            ניהול מוצרים, הזמנות ולקוחות נעשה דרך פאנל הניהול של Medusa.
          </p>
          <p className="text-sm text-muted-foreground">
            גש אל: <code className="bg-muted px-2 py-1 rounded">http://localhost:9000/app</code>
          </p>
          <p className="text-sm text-muted-foreground">
            או השתמש בכתובת הפרודקשן של Medusa Admin שלך.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
