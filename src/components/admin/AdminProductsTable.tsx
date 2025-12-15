import { useState } from 'react';
import { useAdminProducts, useUpdateProduct, useDeleteProduct } from '@/hooks/useAdminProducts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Pencil, Trash2, Save, X } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function AdminProductsTable() {
  const { data: products, isLoading, error } = useAdminProducts();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ price: number; name: string }>({ price: 0, name: '' });

  const handleToggleActive = async (productId: string, currentActive: boolean) => {
    try {
      await updateProduct.mutateAsync({
        productId,
        updates: { is_active: !currentActive },
      });
      toast.success(currentActive ? 'המוצר הוסתר' : 'המוצר הופעל');
    } catch {
      toast.error('שגיאה בעדכון המוצר');
    }
  };

  const handleStartEdit = (product: { id: string; price: number; name: string }) => {
    setEditingId(product.id);
    setEditValues({ price: product.price, name: product.name });
  };

  const handleSaveEdit = async (productId: string) => {
    try {
      await updateProduct.mutateAsync({
        productId,
        updates: { price: editValues.price, name: editValues.name },
      });
      setEditingId(null);
      toast.success('המוצר עודכן');
    } catch {
      toast.error('שגיאה בעדכון המוצר');
    }
  };

  const handleDelete = async (productId: string) => {
    try {
      await deleteProduct.mutateAsync(productId);
      toast.success('המוצר נמחק');
    } catch {
      toast.error('שגיאה במחיקת המוצר');
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>מוצרים</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-destructive">שגיאה בטעינת מוצרים</p>
        </CardContent>
      </Card>
    );
  }

  if (!products?.length) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground text-center py-8">אין מוצרים עדיין</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>מוצרים ({products.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>תמונה</TableHead>
                <TableHead>שם המוצר</TableHead>
                <TableHead>מחיר</TableHead>
                <TableHead>מלאי</TableHead>
                <TableHead>פעיל</TableHead>
                <TableHead>פעולות</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => {
                const primaryImage = product.product_images?.find((img: { is_primary: boolean }) => img.is_primary)?.url 
                  || product.product_images?.[0]?.url;
                const inventory = product.inventory?.[0];
                const stockQty = (inventory?.quantity || 0) - (inventory?.reserved_quantity || 0);
                const isEditing = editingId === product.id;

                return (
                  <TableRow key={product.id}>
                    <TableCell>
                      {primaryImage ? (
                        <img
                          src={primaryImage}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">אין</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <Input
                          value={editValues.name}
                          onChange={(e) => setEditValues(prev => ({ ...prev, name: e.target.value }))}
                          className="max-w-[200px]"
                        />
                      ) : (
                        <span className="font-medium line-clamp-2">{product.name}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <Input
                          type="number"
                          value={editValues.price}
                          onChange={(e) => setEditValues(prev => ({ ...prev, price: Number(e.target.value) }))}
                          className="w-24"
                        />
                      ) : (
                        <span className="font-semibold">₪{product.price}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={stockQty > 0 ? 'default' : 'destructive'}>
                        {stockQty > 0 ? `${stockQty} יח'` : 'אזל'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={product.is_active ?? true}
                        onCheckedChange={() => handleToggleActive(product.id, product.is_active ?? true)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {isEditing ? (
                          <>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleSaveEdit(product.id)}
                            >
                              <Save className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => setEditingId(null)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleStartEdit(product)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="icon" variant="ghost" className="text-destructive">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>מחיקת מוצר</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    האם אתה בטוח שברצונך למחוק את המוצר "{product.name}"?
                                    פעולה זו לא ניתנת לביטול.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>ביטול</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(product.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    מחק
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
