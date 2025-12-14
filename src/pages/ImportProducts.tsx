import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertCircle, Loader2, ShieldAlert } from 'lucide-react';

export default function ImportProducts() {
  const navigate = useNavigate();
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<{ success: number; errors: string[] }>({ success: 0, errors: [] });
  const [completed, setCompleted] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
          setAuthError('יש להתחבר כדי לגשת לעמוד זה');
          setIsAuthorized(false);
          return;
        }

        const { data: hasAdminRole, error: roleError } = await supabase.rpc('has_role', {
          _user_id: user.id,
          _role: 'admin'
        });

        if (roleError) {
          setAuthError('שגיאה בבדיקת הרשאות');
          setIsAuthorized(false);
          return;
        }

        if (!hasAdminRole) {
          setAuthError('אין לך הרשאות מנהל לגשת לעמוד זה');
          setIsAuthorized(false);
          return;
        }

        setIsAuthorized(true);
      } catch {
        setAuthError('שגיאה בבדיקת הרשאות');
        setIsAuthorized(false);
      }
    };

    checkAuthorization();
  }, []);

  if (isAuthorized === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center" dir="rtl">
        <Card className="p-8 text-center">
          <Loader2 className="animate-spin h-8 w-8 mx-auto mb-4" />
          <p>בודק הרשאות...</p>
        </Card>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center" dir="rtl">
        <Card className="p-8 text-center max-w-md">
          <ShieldAlert className="h-16 w-16 mx-auto mb-4 text-destructive" />
          <h1 className="text-xl font-bold mb-4">גישה נדחתה</h1>
          <p className="text-muted-foreground mb-6">{authError}</p>
          <Button onClick={() => navigate('/')} variant="outline">
            חזור לדף הבית
          </Button>
        </Card>
      </div>
    );
  }

  const importProducts = async () => {
    setImporting(true);
    setProgress(0);
    setResults({ success: 0, errors: [] });
    setCompleted(false);

    const total = products.length;
    let successCount = 0;
    const errors: string[] = [];

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      
      try {
        // Insert product
        const { error: productError } = await supabase
          .from('products')
          .upsert({
            id: product.id,
            name: product.name,
            slug: product.slug,
            description: product.description,
            short_description: product.short_description,
            price: product.price,
            compare_at_price: product.sale_price || null,
            category_id: product.category_id,
            is_active: true,
            is_featured: false,
            attributes: product.attributes || {},
            tags: [],
          }, { onConflict: 'id' });

        if (productError) {
          throw new Error(`Product: ${productError.message}`);
        }

        // Delete existing images for this product first
        await supabase.from('product_images').delete().eq('product_id', product.id);

        // Insert images
        if (product.images && product.images.length > 0) {
          for (let imgIdx = 0; imgIdx < product.images.length; imgIdx++) {
            const imageUrl = product.images[imgIdx];
            if (imageUrl && imageUrl.trim()) {
              const { error: imgError } = await supabase.from('product_images').insert({
                product_id: product.id,
                url: imageUrl,
                alt_text: product.name,
                is_primary: imgIdx === 0,
                sort_order: imgIdx,
              });
              
              if (imgError) {
                console.warn(`Image insert warning for ${product.name}:`, imgError.message);
              }
            }
          }
        }

        // Insert inventory
        await supabase.from('inventory').upsert({
          product_id: product.id,
          quantity: product.stock_quantity || 0,
          reserved_quantity: 0,
          low_stock_threshold: 5,
        }, { onConflict: 'id' });

        successCount++;
      } catch (error) {
        errors.push(`${product.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }

      setProgress(((i + 1) / total) * 100);
      setResults({ success: successCount, errors });
    }

    setCompleted(true);
    setImporting(false);
  };

  return (
    <div className="min-h-screen bg-background p-8" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">ייבוא מוצרים לסופאבייס</h1>
          
          <div className="text-center mb-6">
            <p className="text-muted-foreground mb-2">
              סה"כ מוצרים לייבוא: <strong>{products.length}</strong>
            </p>
            <p className="text-sm text-muted-foreground">
              כולל תמונות ומלאי
            </p>
          </div>

          {!completed && (
            <Button 
              onClick={importProducts} 
              disabled={importing}
              className="w-full mb-6"
              size="lg"
            >
              {importing ? (
                <>
                  <Loader2 className="animate-spin ml-2 h-5 w-5" />
                  מייבא...
                </>
              ) : (
                'התחל ייבוא'
              )}
            </Button>
          )}

          {importing && (
            <div className="space-y-4">
              <Progress value={progress} className="h-3" />
              <p className="text-center text-sm text-muted-foreground">
                {Math.round(progress)}% הושלם
              </p>
            </div>
          )}

          {completed && (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-green-600">
                <CheckCircle className="h-8 w-8" />
                <span className="text-xl font-semibold">הייבוא הושלם!</span>
              </div>
              
              <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg text-center">
                <p className="text-lg">
                  <strong>{results.success}</strong> מוצרים יובאו בהצלחה
                </p>
              </div>

              {results.errors.length > 0 && (
                <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-red-600 mb-2">
                    <AlertCircle className="h-5 w-5" />
                    <span className="font-semibold">{results.errors.length} שגיאות</span>
                  </div>
                  <ul className="text-sm text-red-600 space-y-1 max-h-40 overflow-y-auto">
                    {results.errors.map((error, idx) => (
                      <li key={idx}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              <Button 
                onClick={() => window.location.href = '/'}
                className="w-full"
                variant="outline"
              >
                חזור לאתר
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
