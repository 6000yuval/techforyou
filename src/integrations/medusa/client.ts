import Medusa from "@medusajs/js-sdk";

// Medusa backend URL - configurable via environment variables
// In development: http://localhost:9000
// In production: your Medusa server URL (e.g., https://api.your-store.com)
const MEDUSA_BACKEND_URL = import.meta.env.VITE_MEDUSA_BACKEND_URL || "http://localhost:9000";
const MEDUSA_PUBLISHABLE_KEY = import.meta.env.VITE_MEDUSA_PUBLISHABLE_KEY || "";

export const medusa = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  debug: import.meta.env.DEV,
  publishableKey: MEDUSA_PUBLISHABLE_KEY,
});

// Cart ID management - stored in localStorage
const CART_ID_KEY = "medusa_cart_id";

export const getCartId = (): string | null => {
  return localStorage.getItem(CART_ID_KEY);
};

export const setCartId = (cartId: string): void => {
  localStorage.setItem(CART_ID_KEY, cartId);
};

export const clearCartId = (): void => {
  localStorage.removeItem(CART_ID_KEY);
};

// Region ID management - Israel region
const REGION_ID_KEY = "medusa_region_id";

export const getRegionId = (): string | null => {
  return localStorage.getItem(REGION_ID_KEY);
};

export const setRegionId = (regionId: string): void => {
  localStorage.setItem(REGION_ID_KEY, regionId);
};

export { MEDUSA_BACKEND_URL };
