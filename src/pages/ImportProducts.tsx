import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { enhancedProducts } from '@/data/enhancedProducts';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function ImportProducts() {
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<{ success: number; errors: string[] }>({ success: 0, errors: [] });
  const [completed, setCompleted] = useState(false);

  const importProducts = async () => {
    setImporting(true);
    setProgress(0);
    setResults({ success: 0, errors: [] });
    setCompleted(false);

    const total = enhancedProducts.length;
    let successCount = 0;
    const errors: string[] = [];

    for (let i = 0; i < enhancedProducts.length; i++) {
      const product = enhancedProducts[i];
      
      try {
        // Create slug from title
        const slug = product.id + '-' + product.title
          .replace(/[^\u0590-\u05FFa-zA-Z0-9\s]/g, '')
          .replace(/\s+/g, '-')
          .toLowerCase()
          .slice(0, 100);

        // Map category names to IDs
        const categoryMap: Record<string, string> = {
          'אוזניות': 'headphones',
          'מיקרופונים': 'microphones',
          'רמקולים': 'speakers',
          'מצלמות': 'cameras',
          'עכברים': 'mice',
          'מקלדות': 'keyboards',
          'סטים למחשב': 'computer-sets',
          'כבלים': 'cables',
          'מתאמים': 'adapters',
          'Hubs ותחנות עגינה': 'hubs-docking',
          'אחסון חיצוני': 'storage',
          'רשת': 'network',
          'ארגון שולחן וסטאפ': 'desk-setup',
          'חשמל וטעינה': 'power-charging',
          'גיימינג': 'gaming',
          'אביזרי מחשב': 'desk-setup',
        };

        const categoryId = categoryMap[product.category] || 'desk-setup';

        // Insert product
        const { error: productError } = await supabase
          .from('products')
          .upsert({
            id: product.id,
            sku: product.sku,
            name: product.title,
            slug: slug,
            description: product.description,
            short_description: product.shortDescription,
            price: product.price,
            compare_at_price: product.compareAtPrice || null,
            category_id: categoryId,
            is_active: true,
            is_featured: false,
            attributes: product.attributes,
            tags: [],
          }, { onConflict: 'id' });

        if (productError) {
          throw new Error(`Product: ${productError.message}`);
        }

        // Insert images
        if (product.images && product.images.length > 0) {
          for (let imgIdx = 0; imgIdx < product.images.length; imgIdx++) {
            const imageUrl = product.images[imgIdx];
            if (imageUrl && imageUrl.trim()) {
              await supabase.from('product_images').upsert({
                product_id: product.id,
                url: imageUrl,
                alt_text: product.title,
                is_primary: imgIdx === 0,
                sort_order: imgIdx,
              }, { onConflict: 'id' });
            }
          }
        }

        // Insert variants
        if (product.variants && product.variants.length > 0) {
          for (const variant of product.variants) {
            await supabase.from('product_variants').upsert({
              id: variant.id,
              product_id: product.id,
              name: variant.name,
              sku: variant.sku,
              price: variant.price,
              attributes: variant.attributes,
              stock_quantity: variant.stockQuantity,
              is_active: variant.stockQuantity > 0,
            }, { onConflict: 'id' });

            // Insert inventory for variant
            await supabase.from('inventory').upsert({
              product_id: product.id,
              variant_id: variant.id,
              quantity: variant.stockQuantity,
              reserved_quantity: 0,
              low_stock_threshold: 5,
            }, { onConflict: 'id' });
          }
        }

        // Insert main inventory
        await supabase.from('inventory').upsert({
          product_id: product.id,
          quantity: product.stockQuantity,
          reserved_quantity: 0,
          low_stock_threshold: 5,
        }, { onConflict: 'id' });

        successCount++;
      } catch (error) {
        errors.push(`${product.title}: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
              סה"כ מוצרים לייבוא: <strong>{enhancedProducts.length}</strong>
            </p>
            <p className="text-sm text-muted-foreground">
              כולל תמונות, וריאציות ומלאי
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
