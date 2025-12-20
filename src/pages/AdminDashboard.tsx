import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

// Admin dashboard is now handled by Medusa Admin
export default function AdminDashboard() {
  const { isAuthenticated, isLoading } = useAuth();

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

  const medusaAdminUrl = import.meta.env.VITE_MEDUSA_ADMIN_URL || 'http://localhost:9000/app';

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4" dir="rtl">
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>ניהול החנות</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            ניהול מוצרים, הזמנות ולקוחות נעשה דרך פאנל הניהול של Medusa.
          </p>
          
          <Button asChild className="w-full">
            <a href={medusaAdminUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="ml-2 h-4 w-4" />
              פתח פאנל ניהול Medusa
            </a>
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            {medusaAdminUrl}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
