import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { medusa } from '@/integrations/medusa/client';

interface MedusaCustomer {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  created_at: string;
}

interface AuthContextType {
  customer: MedusaCustomer | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshCustomer: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<MedusaCustomer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshCustomer = async () => {
    try {
      const { customer: medusaCustomer } = await medusa.store.customer.retrieve();
      if (medusaCustomer) {
        setCustomer({
          id: medusaCustomer.id,
          email: medusaCustomer.email || '',
          first_name: medusaCustomer.first_name || undefined,
          last_name: medusaCustomer.last_name || undefined,
          phone: medusaCustomer.phone || undefined,
          created_at: medusaCustomer.created_at || new Date().toISOString(),
        });
      } else {
        setCustomer(null);
      }
    } catch (error) {
      // Not authenticated or error
      setCustomer(null);
    }
  };

  useEffect(() => {
    // Check for existing session on mount
    const checkAuth = async () => {
      setIsLoading(true);
      await refreshCustomer();
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // Medusa 2.0 auth flow
      await medusa.auth.login('customer', 'emailpass', {
        email,
        password,
      });
      
      // Fetch customer data after login
      await refreshCustomer();
      
      return { error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { error: error instanceof Error ? error : new Error('שגיאה בהתחברות') };
    }
  };

  const signUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
    try {
      // Register with Medusa 2.0
      await medusa.auth.register('customer', 'emailpass', {
        email,
        password,
      });
      
      // Auto login after registration
      await medusa.auth.login('customer', 'emailpass', {
        email,
        password,
      });
      
      // Update customer profile if names provided
      if (firstName || lastName) {
        try {
          await medusa.store.customer.update({
            first_name: firstName,
            last_name: lastName,
          });
        } catch (e) {
          // Profile update failed but registration succeeded
          console.warn('Could not update customer profile:', e);
        }
      }
      
      await refreshCustomer();
      
      return { error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { error: error instanceof Error ? error : new Error('שגיאה בהרשמה') };
    }
  };

  const signOut = async () => {
    try {
      await medusa.auth.logout();
    } catch (error) {
      console.error('Sign out error:', error);
    }
    setCustomer(null);
  };

  // Note: Admin check is handled by Medusa Admin separately
  // Regular storefront users are never admins
  const isAdmin = false;

  return (
    <AuthContext.Provider 
      value={{ 
        customer, 
        isAuthenticated: !!customer,
        isAdmin, 
        isLoading, 
        signIn, 
        signUp, 
        signOut,
        refreshCustomer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Legacy compatibility - map customer to user-like interface
export function useUser() {
  const { customer, isAuthenticated } = useAuth();
  return {
    user: customer ? {
      id: customer.id,
      email: customer.email,
    } : null,
    isAuthenticated,
  };
}
