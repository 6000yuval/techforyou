import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    postalCode: '',
  });
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'שדה חובה';
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

    setIsSubmitting(true);

    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    const orderNumber = `ORD-${Date.now()}`;
    clearCart();
    
    toast.success('ההזמנה בוצעה בהצלחה!', {
      description: `מספר הזמנה: ${orderNumber}`,
    });

    navigate('/order-confirmation', { state: { orderNumber } });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const shippingCost = shippingMethod === 'express' ? 29.90 : 0;
  const finalTotal = totalPrice + shippingCost;

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
                        <Label htmlFor="fullName">שם מלא *</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className={errors.fullName ? 'border-destructive' : ''}
                        />
                        {errors.fullName && (
                          <p className="text-sm text-destructive mt-1">{errors.fullName}</p>
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
                    <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="standard" id="standard" />
                          <Label htmlFor="standard" className="cursor-pointer">
                            <span className="font-medium">משלוח רגיל</span>
                            <span className="block text-sm text-muted-foreground">3-5 ימי עסקים</span>
                          </Label>
                        </div>
                        <span className="font-medium text-success">חינם</span>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="express" id="express" />
                          <Label htmlFor="express" className="cursor-pointer">
                            <span className="font-medium">משלוח אקספרס</span>
                            <span className="block text-sm text-muted-foreground">1-2 ימי עסקים</span>
                          </Label>
                        </div>
                        <span className="font-medium">₪29.90</span>
                      </div>
                    </RadioGroup>
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
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="cursor-pointer">
                          PayPal
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
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'מעבד...' : 'אישור הזמנה'}
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
