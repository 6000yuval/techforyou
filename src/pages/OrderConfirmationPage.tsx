import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const OrderConfirmationPage: React.FC = () => {
  const location = useLocation();
  const orderNumber = location.state?.orderNumber;

  if (!orderNumber) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Helmet>
        <title>הזמנה התקבלה | TechShop</title>
      </Helmet>
      <Layout>
        <div className="container py-16">
          <Card className="max-w-lg mx-auto text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
              
              <h1 className="text-2xl font-bold text-foreground mb-2">
                תודה על ההזמנה!
              </h1>
              <p className="text-muted-foreground mb-6">
                ההזמנה שלך התקבלה בהצלחה ונמצאת בטיפול.
              </p>

              <div className="bg-secondary/50 rounded-lg p-4 mb-6">
                <p className="text-sm text-muted-foreground mb-1">מספר הזמנה:</p>
                <p className="text-lg font-mono font-bold text-foreground">{orderNumber}</p>
              </div>

              <div className="flex items-center justify-center gap-2 text-muted-foreground mb-8">
                <Package className="h-5 w-5" />
                <span>אישור הזמנה נשלח לאימייל שלך</span>
              </div>

              <Link to="/">
                <Button size="lg" className="gap-2">
                  <ArrowRight className="h-4 w-4" />
                  חזרה לחנות
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </Layout>
    </>
  );
};

export default OrderConfirmationPage;
