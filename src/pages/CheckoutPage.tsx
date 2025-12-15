import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft, Package } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useCart } from '@/contexts/CartContext';
import { useShippingMethods } from '@/hooks/useShippingMethods';
import { useCreateOrder } from '@/hooks/useCreateOrder';
import { toast } from 'sonner';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { data: shippingMethods, isLoading: loadingShipping } = useShippingMethods();
  const createOrder = useCreateOrder();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    postalCode: '',
  });
  const [selectedShippingId, setSelectedShippingId] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Set default shipping method when loaded
  useEffect(() => {
    if (shippingMethods && shippingMethods.length > 0 && !selectedShippingId) {
      setSelectedShippingId(shippingMethods[0].id);
    }
  }, [shippingMethods, selectedShippingId]);

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">העגלה ריקה</h1>
          <Link to="/">
            <Button>חזרה לחנות</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const selectedShipping = shippingMethods?.find(m => m.id === selectedShippingId);
  const shippingCost = selectedShipping?.price || 0;
  const finalTotal = totalPrice + shippingCost;

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'שדה חובה';
    if (!formData.lastName.trim()) newErrors.lastName = 'שדה חובה';
    if (!formData.email.trim()) {
      newErrors.email = 'שדה חובה';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'כתובת אימייל לא תקינה';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'שדה חובה';
    } else if (!/^0\d{9}$/.test(formData.phone.replace(/-/g, ''))) {
      newErrors.phone = 'מספר טלפון לא תקין';
    }
    if (!formData.street.trim()) newErrors.street = 'שדה חובה';
    if (!formData.city.trim()) newErrors.city = 'שדה חובה';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('יש למלא את כל השדות הנדרשים');
      return;
    }

    if (!selectedShippingId) {
      toast.error('יש לבחור שיטת משלוח');
      return;
    }

    try {
      const result = await createOrder.mutateAsync({
        items,
        shippingMethodId: selectedShippingId,
        shippingCost,
        subtotal: totalPrice,
        total: finalTotal,
        shippingDetails: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          street: formData.street,
          city: formData.city,
          postalCode: formData.postalCode,
        },
        paymentMethod,
      });

      clearCart();
      
      toast.success('ההזמנה בוצעה בהצלחה!', {
        description: `מספר הזמנה: ${result.orderNumber}`,
      });

      navigate('/order-confirmation', { state: { orderNumber: result.orderNumber } });
    } catch (error) {
      console.error('Order error:', error);
      toast.error('שגיאה ביצירת ההזמנה. אנא נסה שנית.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <>
      <Helmet>
        <title>השלמת הזמנה | TechShop</title>
      </Helmet>
      <Layout>
        <div className="container py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/cart" className="hover:text-primary transition-colors">
              עגלת קניות
            </Link>
            <ChevronLeft className="h-4 w-4" />
            <span className="text-foreground">השלמת הזמנה</span>
          </nav>

          <h1 className="text-3xl font-bold text-foreground mb-8">השלמת הזמנה</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Shipping Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>פרטי משלוח</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">שם פרטי *</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={errors.firstName ? 'border-destructive' : ''}
                        />
                        {errors.firstName && (
                          <p className="text-sm text-destructive mt-1">{errors.firstName}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="lastName">שם משפחה *</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={errors.lastName ? 'border-destructive' : ''}
                        />
                        {errors.lastName && (
                          <p className="text-sm text-destructive mt-1">{errors.lastName}</p>
                        )}
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">אימייל *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={errors.email ? 'border-destructive' : ''}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive mt-1">{errors.email}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="phone">טלפון *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="050-0000000"
                          className={errors.phone ? 'border-destructive' : ''}
                        />
                        {errors.phone && (
                          <p className="text-sm text-destructive mt-1">{errors.phone}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="street">כתובת *</Label>
                      <Input
                        id="street"
                        name="street"
                        value={formData.street}
                        onChange={handleInputChange}
                        placeholder="רחוב ומספר בית"
                        className={errors.street ? 'border-destructive' : ''}
                      />
                      {errors.street && (
                        <p className="text-sm text-destructive mt-1">{errors.street}</p>
                      )}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">עיר *</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className={errors.city ? 'border-destructive' : ''}
                        />
                        {errors.city && (
                          <p className="text-sm text-destructive mt-1">{errors.city}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="postalCode">מיקוד</Label>
                        <Input
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Shipping Method */}
                <Card>
                  <CardHeader>
                    <CardTitle>שיטת משלוח</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loadingShipping ? (
                      <div className="space-y-3">
                        <Skeleton className="h-20 w-full" />
                      </div>
                    ) : shippingMethods && shippingMethods.length > 0 ? (
                      <RadioGroup value={selectedShippingId} onValueChange={setSelectedShippingId}>
                        {shippingMethods.map((method) => (
                          <div key={method.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                            <div className="flex items-center gap-3">
                              <RadioGroupItem value={method.id} id={method.id} />
                              <Label htmlFor={method.id} className="cursor-pointer">
                                <div className="flex items-center gap-2">
                                  <Package className="h-4 w-4 text-muted-foreground" />
                                  <span className="font-medium">{method.name_he}</span>
                                </div>
                                <span className="block text-sm text-muted-foreground">
                                  {method.estimated_days_min && method.estimated_days_max 
                                    ? `${method.estimated_days_min}-${method.estimated_days_max} ימי עסקים`
                                    : method.description}
                                </span>
                              </Label>
                            </div>
                            <span className="font-medium">
                              {method.price > 0 ? `₪${method.price.toFixed(2)}` : 'חינם'}
                            </span>
                          </div>
                        ))}
                      </RadioGroup>
                    ) : (
                      <p className="text-muted-foreground">אין שיטות משלוח זמינות</p>
                    )}
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle>שיטת תשלום</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center gap-3 p-4 border border-border rounded-lg">
                        <RadioGroupItem value="credit" id="credit" />
                        <Label htmlFor="credit" className="cursor-pointer">
                          כרטיס אשראי
                        </Label>
                      </div>
                      <div className="flex items-center gap-3 p-4 border border-border rounded-lg">
                        <RadioGroupItem value="bit" id="bit" />
                        <Label htmlFor="bit" className="cursor-pointer">
                          ביט / תשלום בנקאי
                        </Label>
                      </div>
                    </RadioGroup>
                    <p className="text-sm text-muted-foreground mt-4">
                      * זהו דף Checkout לדוגמה. לא יתבצע חיוב אמיתי.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>סיכום הזמנה</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      {items.map((item) => {
                        const price = item.variation?.sale_price || item.variation?.price ||
                          item.product.sale_price || item.product.price;
                        return (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-muted-foreground line-clamp-1 flex-1">
                              {item.product.name} x{item.quantity}
                            </span>
                            <span className="font-medium mr-2">
                              ₪{(price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-2">
                      <div className="flex justify-between text-muted-foreground">
                        <span>סה"כ מוצרים</span>
                        <span>₪{totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>משלוח</span>
                        <span>{shippingCost > 0 ? `₪${shippingCost.toFixed(2)}` : 'חינם'}</span>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex justify-between text-lg font-bold text-foreground mb-6">
                      <span>סה"כ לתשלום</span>
                      <span>₪{finalTotal.toFixed(2)}</span>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={createOrder.isPending}
                    >
                      {createOrder.isPending ? 'מעבד...' : 'אישור הזמנה'}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default CheckoutPage;
