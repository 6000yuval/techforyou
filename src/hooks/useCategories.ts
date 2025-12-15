import { Category } from '@/types';

// Static categories - these could be moved to Supabase later
// For now keeping them static as they don't change often
export const categories: Category[] = [
  {
    id: 'headphones',
    name: 'אוזניות',
    slug: 'headphones',
    icon: 'Headphones',
    subcategories: [
      { id: 'in-ear', name: 'בתוך האוזן', slug: 'in-ear', parent_id: 'headphones' },
      { id: 'on-ear', name: 'על האוזן', slug: 'on-ear', parent_id: 'headphones' },
      { id: 'over-ear', name: 'מעל האוזן', slug: 'over-ear', parent_id: 'headphones' },
      { id: 'wired-headphones', name: 'חוטיות', slug: 'wired-headphones', parent_id: 'headphones' },
      { id: 'wireless-headphones', name: 'אלחוטיות', slug: 'wireless-headphones', parent_id: 'headphones' },
      { id: 'gaming-headphones', name: 'גיימינג', slug: 'gaming-headphones', parent_id: 'headphones' },
      { id: 'headphones-with-mic', name: 'עם מיקרופון', slug: 'headphones-with-mic', parent_id: 'headphones' },
    ]
  },
  {
    id: 'microphones',
    name: 'מיקרופונים',
    slug: 'microphones',
    icon: 'Mic',
    subcategories: [
      { id: 'usb-mic', name: 'USB', slug: 'usb-mic', parent_id: 'microphones' },
      { id: 'desktop-mic', name: 'שולחני', slug: 'desktop-mic', parent_id: 'microphones' },
      { id: 'streaming-mic', name: 'גיימינג/סטרימינג', slug: 'streaming-mic', parent_id: 'microphones' },
      { id: 'mic-accessories', name: 'סטנדים/אביזרים', slug: 'mic-accessories', parent_id: 'microphones' },
    ]
  },
  {
    id: 'speakers',
    name: 'רמקולים',
    slug: 'speakers',
    icon: 'Speaker',
    subcategories: [
      { id: 'speakers-2-0', name: '2.0', slug: 'speakers-2-0', parent_id: 'speakers' },
      { id: 'speakers-2-1', name: '2.1', slug: 'speakers-2-1', parent_id: 'speakers' },
      { id: 'soundbar', name: 'סאונדבר שולחני', slug: 'soundbar', parent_id: 'speakers' },
      { id: 'mini-speakers', name: 'מיני רמקולים', slug: 'mini-speakers', parent_id: 'speakers' },
    ]
  },
  {
    id: 'cameras',
    name: 'מצלמות',
    slug: 'cameras',
    icon: 'Camera',
    subcategories: [
      { id: 'hd-cameras', name: 'HD', slug: 'hd-cameras', parent_id: 'cameras' },
      { id: 'fhd-cameras', name: 'FHD', slug: 'fhd-cameras', parent_id: 'cameras' },
      { id: '4k-cameras', name: '4K', slug: '4k-cameras', parent_id: 'cameras' },
      { id: 'camera-lighting', name: 'תאורה', slug: 'camera-lighting', parent_id: 'cameras' },
      { id: 'camera-stands', name: 'חצובות/קליפסים', slug: 'camera-stands', parent_id: 'cameras' },
    ]
  },
  {
    id: 'mice',
    name: 'עכברים',
    slug: 'mice',
    icon: 'Mouse',
    subcategories: [
      { id: 'wired-mice', name: 'חוטיים', slug: 'wired-mice', parent_id: 'mice' },
      { id: 'wireless-mice', name: 'אלחוטיים', slug: 'wireless-mice', parent_id: 'mice' },
      { id: 'gaming-mice', name: 'גיימינג', slug: 'gaming-mice', parent_id: 'mice' },
      { id: 'ergonomic-mice', name: 'ארגונומיים', slug: 'ergonomic-mice', parent_id: 'mice' },
      { id: 'rechargeable-mice', name: 'נטענים', slug: 'rechargeable-mice', parent_id: 'mice' },
    ]
  },
  {
    id: 'keyboards',
    name: 'מקלדות',
    slug: 'keyboards',
    icon: 'Keyboard',
    subcategories: [
      { id: 'wired-keyboards', name: 'חוטיות', slug: 'wired-keyboards', parent_id: 'keyboards' },
      { id: 'wireless-keyboards', name: 'אלחוטיות', slug: 'wireless-keyboards', parent_id: 'keyboards' },
      { id: 'mechanical-keyboards', name: 'מכניות', slug: 'mechanical-keyboards', parent_id: 'keyboards' },
      { id: 'compact-keyboards', name: 'קומפקטיות', slug: 'compact-keyboards', parent_id: 'keyboards' },
      { id: 'gaming-keyboards', name: 'גיימינג', slug: 'gaming-keyboards', parent_id: 'keyboards' },
    ]
  },
  {
    id: 'computer-sets',
    name: 'סטים למחשב',
    slug: 'computer-sets',
    icon: 'Package',
    subcategories: [
      { id: 'keyboard-mouse-sets', name: 'מקלדת+עכבר', slug: 'keyboard-mouse-sets', parent_id: 'computer-sets' },
      { id: 'wireless-sets', name: 'אלחוטיים', slug: 'wireless-sets', parent_id: 'computer-sets' },
      { id: 'gaming-sets', name: 'גיימינג', slug: 'gaming-sets', parent_id: 'computer-sets' },
      { id: 'office-sets', name: 'משרדיים', slug: 'office-sets', parent_id: 'computer-sets' },
    ]
  },
  {
    id: 'cables',
    name: 'כבלים',
    slug: 'cables',
    icon: 'Cable',
    subcategories: [
      { id: 'hdmi-cables', name: 'HDMI', slug: 'hdmi-cables', parent_id: 'cables' },
      { id: 'displayport-cables', name: 'DisplayPort', slug: 'displayport-cables', parent_id: 'cables' },
      { id: 'vga-dvi-cables', name: 'VGA/DVI', slug: 'vga-dvi-cables', parent_id: 'cables' },
      { id: 'usb-c-cables', name: 'USB-C', slug: 'usb-c-cables', parent_id: 'cables' },
      { id: 'usb-a-cables', name: 'USB-A', slug: 'usb-a-cables', parent_id: 'cables' },
      { id: 'audio-cables', name: 'אודיו', slug: 'audio-cables', parent_id: 'cables' },
      { id: 'network-cables', name: 'רשת', slug: 'network-cables', parent_id: 'cables' },
      { id: 'power-cables', name: 'חשמל', slug: 'power-cables', parent_id: 'cables' },
    ]
  },
  {
    id: 'adapters',
    name: 'מתאמים',
    slug: 'adapters',
    icon: 'Plug',
    subcategories: [
      { id: 'usbc-hdmi', name: 'USB-C→HDMI', slug: 'usbc-hdmi', parent_id: 'adapters' },
      { id: 'hdmi-vga', name: 'HDMI→VGA', slug: 'hdmi-vga', parent_id: 'adapters' },
      { id: 'usb-adapters', name: 'USB-A↔C', slug: 'usb-adapters', parent_id: 'adapters' },
      { id: 'network-adapters', name: 'רשת', slug: 'network-adapters', parent_id: 'adapters' },
      { id: 'audio-adapters', name: 'אודיו', slug: 'audio-adapters', parent_id: 'adapters' },
    ]
  },
  {
    id: 'hubs-docking',
    name: 'Hubs ותחנות עגינה',
    slug: 'hubs-docking',
    icon: 'Hub',
    subcategories: [
      { id: 'usb-hubs', name: 'USB Hubs', slug: 'usb-hubs', parent_id: 'hubs-docking' },
      { id: 'usbc-hubs', name: 'USB-C Hubs', slug: 'usbc-hubs', parent_id: 'hubs-docking' },
      { id: 'docking-stations', name: 'Docking Stations', slug: 'docking-stations', parent_id: 'hubs-docking' },
    ]
  },
  {
    id: 'storage',
    name: 'אחסון חיצוני',
    slug: 'storage',
    icon: 'HardDrive',
    subcategories: [
      { id: 'external-ssd', name: 'SSD', slug: 'external-ssd', parent_id: 'storage' },
      { id: 'external-hdd', name: 'HDD', slug: 'external-hdd', parent_id: 'storage' },
      { id: 'flash-drives', name: 'דיסק-און-קי', slug: 'flash-drives', parent_id: 'storage' },
      { id: 'memory-cards', name: 'כרטיסי זיכרון', slug: 'memory-cards', parent_id: 'storage' },
      { id: 'card-readers', name: 'קוראי כרטיסים', slug: 'card-readers', parent_id: 'storage' },
    ]
  },
  {
    id: 'network',
    name: 'רשת',
    slug: 'network',
    icon: 'Wifi',
    subcategories: [
      { id: 'usb-wifi', name: 'USB-WiFi', slug: 'usb-wifi', parent_id: 'network' },
      { id: 'usb-ethernet', name: 'USB→RJ45', slug: 'usb-ethernet', parent_id: 'network' },
      { id: 'ethernet-cables', name: 'כבלי רשת', slug: 'ethernet-cables', parent_id: 'network' },
      { id: 'wifi-extenders', name: 'Extenders', slug: 'wifi-extenders', parent_id: 'network' },
    ]
  },
  {
    id: 'desk-setup',
    name: 'ארגון שולחן וסטאפ',
    slug: 'desk-setup',
    icon: 'Monitor',
    subcategories: [
      { id: 'cable-management', name: 'ניהול כבלים', slug: 'cable-management', parent_id: 'desk-setup' },
      { id: 'mouse-pads', name: 'משטחי עכבר', slug: 'mouse-pads', parent_id: 'desk-setup' },
      { id: 'monitor-stands', name: 'סטנדים', slug: 'monitor-stands', parent_id: 'desk-setup' },
      { id: 'phone-holders', name: 'מחזיקי טלפון', slug: 'phone-holders', parent_id: 'desk-setup' },
      { id: 'desk-lighting', name: 'תאורה', slug: 'desk-lighting', parent_id: 'desk-setup' },
    ]
  },
  {
    id: 'power-charging',
    name: 'חשמל וטעינה',
    slug: 'power-charging',
    icon: 'Battery',
    subcategories: [
      { id: 'usb-chargers', name: 'מטעני USB', slug: 'usb-chargers', parent_id: 'power-charging' },
      { id: 'power-strips', name: 'מפצלי חשמל', slug: 'power-strips', parent_id: 'power-charging' },
      { id: 'surge-protectors', name: 'מגני ברקים', slug: 'surge-protectors', parent_id: 'power-charging' },
      { id: 'plug-adapters', name: 'מתאמי תקע', slug: 'plug-adapters', parent_id: 'power-charging' },
    ]
  },
  {
    id: 'gaming',
    name: 'גיימינג',
    slug: 'gaming',
    icon: 'Gamepad2',
    subcategories: [
      { id: 'gaming-mice-cat', name: 'עכברים', slug: 'gaming-mice-cat', parent_id: 'gaming' },
      { id: 'gaming-keyboards-cat', name: 'מקלדות', slug: 'gaming-keyboards-cat', parent_id: 'gaming' },
      { id: 'gaming-pads', name: 'פדים', slug: 'gaming-pads', parent_id: 'gaming' },
      { id: 'gaming-stands', name: 'סטנדים', slug: 'gaming-stands', parent_id: 'gaming' },
      { id: 'rgb-lighting', name: 'תאורת RGB', slug: 'rgb-lighting', parent_id: 'gaming' },
    ]
  },
];

// Map DB category IDs to frontend category IDs
const categoryIdMapping: Record<string, string> = {
  'external-storage': 'storage',
  'networking': 'network',
  'desk-organization': 'desk-setup',
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  for (const category of categories) {
    if (category.slug === slug) return category;
    if (category.subcategories) {
      const sub = category.subcategories.find(s => s.slug === slug);
      if (sub) return sub;
    }
  }
  return undefined;
};

export const getParentCategory = (slug: string): Category | undefined => {
  for (const category of categories) {
    if (category.subcategories?.some(s => s.slug === slug)) {
      return category;
    }
  }
  return undefined;
};

export const mapDbCategoryId = (dbCategoryId: string): string => {
  return categoryIdMapping[dbCategoryId] || dbCategoryId;
};
