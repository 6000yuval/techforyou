import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  const scrollToCategories = () => {
    const element = document.getElementById('categories-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/20 py-16 md:py-24">
      <div className="container">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            איכות ואמינות
            <br />
            <span className="text-primary">בציוד היקפי למחשב</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            כבלים, מתאמים, אוזניות ועוד - הכל במקום אחד.
            <br />
            משלוח מהיר לכל הארץ ואחריות מלאה על כל המוצרים.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="gap-2" onClick={scrollToCategories}>
              לקטלוג המוצרים
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-20 w-48 h-48 bg-accent/30 rounded-full blur-3xl" />
    </section>
  );
};

export default HeroSection;
