import { Product } from '@/types';

/**
 * Determines if a product belongs to a specific subcategory
 * based on its attributes, name, and description
 */
export const productBelongsToSubcategory = (product: Product, subcategoryId: string): boolean => {
  const name = product.name.toLowerCase();
  const description = (product.description || '').toLowerCase();
  const connectionType = product.attributes?.find(a => a.name === 'סוג חיבור')?.values || [];
  
  // Helper to check if any connection type matches
  const hasConnection = (type: string) => connectionType.some(c => c.includes(type));
  
  switch (subcategoryId) {
    // === אוזניות (headphones) subcategories ===
    case 'in-ear':
      return name.includes('in-ear') || name.includes('tws') || 
             name.includes('earbuds') || name.includes('באוזן') ||
             description.includes('in-ear') || description.includes('באוזן');
    case 'on-ear':
      return name.includes('on-ear') || description.includes('on-ear');
    case 'over-ear':
      return name.includes('over-ear') || name.includes('studio monitor') ||
             description.includes('over-ear') || description.includes('מעל האוזן');
    case 'wired-headphones':
      return hasConnection('חוטי') && !hasConnection('אלחוטי') && 
             product.category_id === 'headphones';
    case 'wireless-headphones':
      return hasConnection('אלחוטי') && !hasConnection('חוטי') && 
             product.category_id === 'headphones';
    case 'gaming-headphones':
      return name.includes('גיימינג') && product.category_id === 'headphones';
    case 'headphones-with-mic':
      return (name.includes('מיקרופון') || description.includes('מיקרופון')) && 
             product.category_id === 'headphones';

    // === מיקרופונים (microphones) subcategories ===
    case 'usb-mic':
      return hasConnection('usb') && product.category_id === 'microphones';
    case 'desktop-mic':
      return (name.includes('שולחני') || description.includes('שולחני')) && 
             product.category_id === 'microphones';
    case 'streaming-mic':
      return (name.includes('סטרימינג') || name.includes('גיימינג') || 
              description.includes('סטרימינג')) && product.category_id === 'microphones';
    case 'mic-accessories':
      return (name.includes('סטנד') || name.includes('זרוע') || 
              description.includes('אביזר')) && product.category_id === 'microphones';

    // === רמקולים (speakers) subcategories ===
    case 'speakers-2-0':
      return (name.includes('2.0') || description.includes('2.0')) && 
             product.category_id === 'speakers';
    case 'speakers-2-1':
      return (name.includes('2.1') || description.includes('2.1') || 
              name.includes('סאבוופר')) && product.category_id === 'speakers';
    case 'soundbar':
      return name.includes('סאונדבר') && product.category_id === 'speakers';
    case 'mini-speakers':
      return (name.includes('מיני') || name.includes('נייד') || 
              name.includes('bluetooth')) && product.category_id === 'speakers';

    // === מצלמות (cameras) subcategories ===
    case 'hd-cameras':
      return (name.includes('hd') && !name.includes('fhd') && !name.includes('4k')) && 
             product.category_id === 'cameras';
    case 'fhd-cameras':
      return (name.includes('fhd') || name.includes('1080p')) && 
             product.category_id === 'cameras';
    case '4k-cameras':
      return name.includes('4k') && product.category_id === 'cameras';
    case 'camera-lighting':
      return name.includes('תאורה') && product.category_id === 'cameras';
    case 'camera-stands':
      return (name.includes('חצובה') || name.includes('קליפס') || 
              name.includes('סטנד')) && product.category_id === 'cameras';

    // === עכברים (mice) subcategories ===
    case 'wired-mice':
      return hasConnection('חוטי') && product.category_id === 'mice';
    case 'wireless-mice':
      return hasConnection('אלחוטי') && product.category_id === 'mice';
    case 'gaming-mice':
      return name.includes('גיימינג') && product.category_id === 'mice';
    case 'ergonomic-mice':
      return (name.includes('ארגונומי') || name.includes('אנכי')) && 
             product.category_id === 'mice';
    case 'rechargeable-mice':
      return (description.includes('נטען') || description.includes('נטענת') || 
              description.includes('סוללה')) && product.category_id === 'mice';

    // === מקלדות (keyboards) subcategories ===
    case 'wired-keyboards':
      return hasConnection('חוטי') && product.category_id === 'keyboards';
    case 'wireless-keyboards':
      return (hasConnection('אלחוטי') || hasConnection('bluetooth')) && 
             product.category_id === 'keyboards';
    case 'mechanical-keyboards':
      return name.includes('מכנית') && product.category_id === 'keyboards';
    case 'compact-keyboards':
      return (name.includes('60%') || name.includes('tkl') || name.includes('75%') ||
              name.includes('מיני') || name.includes('קומפקט')) && 
             product.category_id === 'keyboards';
    case 'gaming-keyboards':
      return name.includes('גיימינג') && product.category_id === 'keyboards';

    // === סטים למחשב (computer-sets) subcategories ===
    case 'keyboard-mouse-sets':
      return (name.includes('מקלדת ועכבר') || name.includes('סט מקלדת')) && 
             product.category_id === 'computer-sets';
    case 'wireless-sets':
      return (name.includes('אלחוטי') || hasConnection('אלחוטי')) && 
             product.category_id === 'computer-sets';
    case 'gaming-sets':
      return name.includes('גיימינג') && product.category_id === 'computer-sets';
    case 'office-sets':
      return (name.includes('משרד') || name.includes('משרדי')) && 
             product.category_id === 'computer-sets';

    // === כבלים (cables) subcategories ===
    case 'hdmi-cables':
      return name.includes('hdmi') && product.category_id === 'cables';
    case 'displayport-cables':
      return name.includes('displayport') && product.category_id === 'cables';
    case 'vga-dvi-cables':
      return (name.includes('vga') || name.includes('dvi')) && 
             product.category_id === 'cables';
    case 'usb-c-cables':
      return name.includes('usb-c') && product.category_id === 'cables';
    case 'usb-a-cables':
      return (name.includes('usb-a') || name.includes('usb 3.0') || 
              name.includes('usb 2.0')) && product.category_id === 'cables';
    case 'audio-cables':
      return (name.includes('אודיו') || name.includes('aux') || 
              name.includes('3.5mm') || name.includes('xlr')) && 
             product.category_id === 'cables';
    case 'network-cables':
      return (name.includes('רשת') || name.includes('ethernet') || 
              name.includes('cat')) && product.category_id === 'cables';
    case 'power-cables':
      return name.includes('חשמל') && product.category_id === 'cables';

    // === מתאמים (adapters) subcategories ===
    case 'usbc-hdmi':
      return (name.includes('usb-c') && name.includes('hdmi')) && 
             product.category_id === 'adapters';
    case 'hdmi-vga':
      return (name.includes('hdmi') && name.includes('vga')) && 
             product.category_id === 'adapters';
    case 'usb-adapters':
      return name.includes('usb') && product.category_id === 'adapters';
    case 'network-adapters':
      return (name.includes('רשת') || name.includes('ethernet') || 
              name.includes('rj45')) && product.category_id === 'adapters';
    case 'audio-adapters':
      return (name.includes('אודיו') || name.includes('aux')) && 
             product.category_id === 'adapters';

    // === Hubs ותחנות עגינה (hubs-docking) subcategories ===
    case 'usb-hubs':
      return name.includes('usb hub') && !name.includes('usb-c') && 
             product.category_id === 'hubs-docking';
    case 'usbc-hubs':
      return name.includes('usb-c') && product.category_id === 'hubs-docking';
    case 'docking-stations':
      return (name.includes('docking') || name.includes('עגינה')) && 
             product.category_id === 'hubs-docking';

    // === אחסון חיצוני (storage) subcategories ===
    case 'external-ssd':
      return name.includes('ssd') && product.category_id === 'storage';
    case 'external-hdd':
      return name.includes('hdd') && product.category_id === 'storage';
    case 'flash-drives':
      return (name.includes('דיסק-און-קי') || name.includes('flash') || 
              name.includes('usb drive')) && product.category_id === 'storage';
    case 'memory-cards':
      return (name.includes('כרטיס זיכרון') || name.includes('sd card') || 
              name.includes('microsd')) && product.category_id === 'storage';
    case 'card-readers':
      return name.includes('קורא כרטיסים') && product.category_id === 'storage';

    // === רשת (network) subcategories ===
    case 'usb-wifi':
      return (name.includes('wifi') && name.includes('usb')) && 
             product.category_id === 'network';
    case 'usb-ethernet':
      return (name.includes('ethernet') || name.includes('rj45')) && 
             product.category_id === 'network';
    case 'ethernet-cables':
      return (name.includes('כבל רשת') || name.includes('cat')) && 
             product.category_id === 'network';
    case 'wifi-extenders':
      return name.includes('extender') && product.category_id === 'network';

    // === ארגון שולחן (desk-setup) subcategories ===
    case 'cable-management':
      return (name.includes('ניהול כבלים') || name.includes('cable') || 
              name.includes('ארגון כבלים')) && product.category_id === 'desk-setup';
    case 'mouse-pads':
      return name.includes('משטח') && product.category_id === 'desk-setup';
    case 'monitor-stands':
      return (name.includes('סטנד') || name.includes('זרוע')) && 
             product.category_id === 'desk-setup';
    case 'phone-holders':
      return name.includes('מחזיק טלפון') && product.category_id === 'desk-setup';
    case 'desk-lighting':
      return name.includes('תאורה') && product.category_id === 'desk-setup';

    // === חשמל וטעינה (power-charging) subcategories ===
    case 'usb-chargers':
      return (name.includes('מטען') || name.includes('טעינה')) && 
             product.category_id === 'power-charging';
    case 'power-strips':
      return name.includes('מפצל') && product.category_id === 'power-charging';
    case 'surge-protectors':
      return (name.includes('מגן') || name.includes('ברק')) && 
             product.category_id === 'power-charging';
    case 'plug-adapters':
      return name.includes('מתאם תקע') && product.category_id === 'power-charging';

    // === גיימינג (gaming) subcategories ===
    case 'gaming-mice-cat':
      return name.includes('עכבר') && name.includes('גיימינג') && 
             product.category_id === 'gaming';
    case 'gaming-keyboards-cat':
      return name.includes('מקלדת') && name.includes('גיימינג') && 
             product.category_id === 'gaming';
    case 'gaming-pads':
      return (name.includes('פד') || name.includes('משטח')) && 
             product.category_id === 'gaming';
    case 'gaming-stands':
      return name.includes('סטנד') && product.category_id === 'gaming';
    case 'rgb-lighting':
      return name.includes('rgb') && product.category_id === 'gaming';

    default:
      return false;
  }
};

/**
 * Filters products by subcategory
 */
export const filterProductsBySubcategory = (products: Product[], subcategoryId: string): Product[] => {
  return products.filter(p => productBelongsToSubcategory(p, subcategoryId));
};
