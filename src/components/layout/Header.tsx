import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, ChevronDown, Settings, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { categories } from '@/data/categories';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const { totalItems } = useCart();
  const { customer, isAuthenticated, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="container">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-xl md:text-2xl font-bold text-primary">TechShop</h1>
          </Link>

          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="חיפוש מוצרים..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-4 pl-10 bg-secondary/50"
              />
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="absolute left-1 top-1/2 -translate-y-1/2 h-8 w-8"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Mobile Search Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* Admin / Auth */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-1">
                <Link to="/account">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="ghost" size="icon">
                      <Settings className="h-5 w-5" />
                    </Button>
                  </Link>
                )}
                <Button variant="ghost" size="icon" onClick={signOut}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Link to="/auth" className="hidden md:block">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link to="/" className="text-lg font-medium hover:text-primary transition-colors">
                    דף הבית
                  </Link>
                  {isAuthenticated && (
                    <Link to="/account" className="text-lg font-medium hover:text-primary transition-colors">
                      האזור שלי
                    </Link>
                  )}
                  {!isAuthenticated && (
                    <Link to="/auth" className="text-lg font-medium hover:text-primary transition-colors">
                      התחברות
                    </Link>
                  )}
                  {categories.slice(0, 10).map((category) => (
                    <Link
                      key={category.id}
                      to={`/category/${category.slug}`}
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <form onSubmit={handleSearch} className="md:hidden pb-4">
            <div className="relative">
              <Input
                type="search"
                placeholder="חיפוש מוצרים..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-4 pl-10"
                autoFocus
              />
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="absolute left-1 top-1/2 -translate-y-1/2 h-8 w-8"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>
        )}

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 h-12 overflow-x-auto">
          <div
            className="relative"
            onMouseEnter={() => setIsCategoriesOpen(true)}
            onMouseLeave={() => setIsCategoriesOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
              קטגוריות
              <ChevronDown className={cn("h-4 w-4 transition-transform", isCategoriesOpen && "rotate-180")} />
            </button>

            {isCategoriesOpen && (
              <div className="absolute top-full right-0 bg-card border border-border rounded-lg shadow-lg p-4 min-w-[600px] grid grid-cols-3 gap-4 animate-fade-in">
                {categories.map((category) => (
                  <div key={category.id}>
                    <Link
                      to={`/category/${category.slug}`}
                      className="font-semibold text-foreground hover:text-primary transition-colors"
                    >
                      {category.name}
                    </Link>
                    {category.subcategories && (
                      <ul className="mt-2 space-y-1">
                        {category.subcategories.slice(0, 4).map((sub) => (
                          <li key={sub.id}>
                            <Link
                              to={`/category/${sub.slug}`}
                              className="text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {categories.slice(0, 8).map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors whitespace-nowrap"
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
