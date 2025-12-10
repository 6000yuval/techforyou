import { Product } from '@/types';

// Products imported from WooCommerce CSV
export const products: Product[] = [
  {
    id: '2144',
    name: 'אוזניות KZ EDX PRO דינאמיות – באס עוצמתי, מבטלות רעשים, ספורט',
    slug: 'kz-edx-pro-headphones',
    short_description: 'אוזניות דינאמיות Hi-Fi עם באס עוצמתי וביטול רעשים. מתאימות לספורט עם אחריות יצרן.',
    description: `אוזניות KZ EDX PRO דינאמיות מיועדות למי שמחפש חוויה שמעתית משובחת בשילוב עם איכות בנייה גבוהה.

תכונות עיקריות:
• סוג אוזניות: אוזניות In-Ear Monitor דינאמיות עם סאונד Hi-Fi
• התאמה לספורט: עיצוב יצוק ונוח המתאים לפעילות ספורט
• טכנולוגיה לביטול רעשים: איזולציה אקוסטית מתקדמת
• איכות סאונד: באס עמוק ועוצמתי, צלילים צלולים
• אורך כבל: 1.2 מטר

צבעים זמינים: שחור, שקוף, כסף

כלול באריזה:
• אוזניות KZ EDX PRO
• סט אביזרי אוזן בגדלים שונים (S/M/L)
• יחידת שליטה עם מיקרופון מובנה
• תיק נשיאה`,
    price: 49.99,
    images: ['https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400'],
    category_id: 'headphones',
    category_name: 'אוזניות',
    in_stock: true,
    stock_quantity: 50,
    attributes: [
      { name: 'צבע', values: ['שחור', 'שקוף', 'כסף'] }
    ]
  },
  {
    id: '2149',
    name: 'מגבר WiFi Pro של שיאומי - מרחיב טווח רשת אלחוטית 300M',
    slug: 'xiaomi-wifi-pro-extender',
    short_description: 'מגבר WiFi Pro להרחבת טווח הרשת האלחוטית בבית או במשרד.',
    description: `מגבר WiFi Pro של שיאומי הוא הפתרון המושלם להרחבת טווח הרשת האלחוטית.

תכונות עיקריות:
• מהירות גבוהה: עד 300M לגלישה וסטרימינג
• 2 אנטנות חיצוניות: כיסוי מיטבי ואיתות מושלם
• התקנה קלה: Plug and Play
• מצב שינה חכם לחיסכון בחשמל

מה כלול באריזה:
• מגבר WiFi Pro שיאומי
• מדריך התקנה בעברית ואנגלית
• אחריות יצרן מלאה`,
    price: 89.99,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'],
    category_id: 'network',
    category_name: 'בית חכם',
    in_stock: true,
    stock_quantity: 30
  },
  {
    id: '2151',
    name: 'נגן MP3 בלוטות׳ עם מסך LCD - נגן מוסיקה דיגיטלי באיכות גבוהה',
    slug: 'bluetooth-mp3-player-lcd',
    short_description: 'נגן מוסיקה דיגיטלי מתקדם עם מסך LCD צבעוני, חיבור Bluetooth ותמיכה בכרטיסי TF.',
    description: `נגן MP3 בלוטות׳ עם מסך LCD הוא הפתרון המושלם לאוהבי מוסיקה איכותית.

תכונות עיקריות:
• מסך TFT LCD צבעוני באיכות גבוהה
• טכנולוגיית Bluetooth מתקדמת
• תמיכה בקבצי MP3 ו-MP4
• איכות צליל Lossless
• תמיכה בכרטיסי זיכרון TF עד 128GB
• סוללה עמידה עד 50 שעות

מה כלול באריזה:
• נגן MP3 בלוטות׳
• כבל USB לטעינה
• אוזניות איכותיות
• מדריך התקנה`,
    price: 149.90,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'],
    category_id: 'gadgets',
    category_name: 'גאדג\'טים',
    in_stock: true,
    stock_quantity: 25
  },
  {
    id: '2154',
    name: 'מקלדת מכנית Ajazz AK820 Pro גיימינג - בלוטות׳ 5.1 וחוטית',
    slug: 'ajazz-ak820-pro-keyboard',
    short_description: 'מקלדת גיימינג מכנית 75% Tri-Mode עם בלוטות׳ 5.1, 2.4G ו-USB-C, Gasket, RGB.',
    description: `מקלדת מכנית Ajazz AK820 Pro היא מקלדת גיימינג מתקדמת בתצורת 75%.

תכונות גיימינג:
• מבנה Gasket לתחושת הקלדה רכה ושקטה
• תאימות מלאה ל-Windows ו-Mac
• Anti-Ghosting מלא בכל המקשים

חיבור:
• Bluetooth 5.1 יציב וחסכוני
• USB-C חוטי
• אלחוטי 2.4GHz (בדגם Pro)

אורות RGB:
• עד 1.6 מיליון שילובי צבעים
• כ-20 פרופילי תאורה מוכנים מראש`,
    price: 299.00,
    images: ['https://images.unsplash.com/photo-1595225476474-87563907a212?w=400'],
    category_id: 'keyboards',
    category_name: 'מקלדות',
    in_stock: true,
    stock_quantity: 15,
    attributes: [
      { name: 'סוויצ\'ים', values: ['Gift', 'Flying Fish'] }
    ]
  },
  {
    id: '2160',
    name: 'עכבר גיימינג אלחוטי RGB - 7 כפתורים מתכווננים',
    slug: 'gaming-mouse-rgb-wireless',
    short_description: 'עכבר גיימינג אלחוטי עם תאורת RGB ו-7 כפתורים מתכווננים.',
    description: `עכבר גיימינג אלחוטי מקצועי עם תאורת RGB דינאמית.

תכונות:
• 7 כפתורים מתכווננים
• DPI מתכוונן עד 16000
• תאורת RGB עם 16.8 מיליון צבעים
• סוללה נטענת עד 60 שעות
• חיבור אלחוטי 2.4GHz ו-Bluetooth`,
    price: 129.90,
    sale_price: 99.90,
    images: ['https://images.unsplash.com/photo-1527814050087-3793815479db?w=400'],
    category_id: 'mice',
    category_name: 'עכברים',
    in_stock: true,
    stock_quantity: 40,
    attributes: [
      { name: 'צבע', values: ['שחור', 'לבן'] }
    ]
  },
  {
    id: '2165',
    name: 'כבל HDMI 2.1 - 8K 60Hz / 4K 120Hz - 2 מטר',
    slug: 'hdmi-cable-8k-2m',
    short_description: 'כבל HDMI 2.1 באיכות פרימיום לתמיכה ב-8K ו-4K.',
    description: `כבל HDMI 2.1 באיכות גבוהה לחוויה ויזואלית מושלמת.

מפרט טכני:
• תמיכה ב-8K@60Hz ו-4K@120Hz
• רוחב פס: 48Gbps
• תמיכה ב-HDR, eARC
• אורך: 2 מטר
• מחברים מצופי זהב`,
    price: 59.90,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'],
    category_id: 'cables',
    category_name: 'כבלים',
    in_stock: true,
    stock_quantity: 100
  },
  {
    id: '2170',
    name: 'מתאם USB-C ל-HDMI 4K - תואם Mac/Windows',
    slug: 'usbc-to-hdmi-adapter-4k',
    short_description: 'מתאם USB-C ל-HDMI באיכות 4K לחיבור מסכים ומקרנים.',
    description: `מתאם USB-C ל-HDMI באיכות 4K@60Hz.

תכונות:
• רזולוציה: עד 4K@60Hz
• תאימות רחבה: Mac, Windows, iPad Pro
• Plug and Play - ללא צורך בדרייברים
• עיצוב קומפקטי ונייד`,
    price: 49.90,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'],
    category_id: 'adapters',
    category_name: 'מתאמים',
    in_stock: true,
    stock_quantity: 60
  },
  {
    id: '2175',
    name: 'Hub USB-C 7 ב-1 - HDMI, USB 3.0, SD, PD 100W',
    slug: 'usbc-hub-7-in-1',
    short_description: 'Hub USB-C מתקדם עם 7 חיבורים כולל HDMI 4K ו-Power Delivery.',
    description: `Hub USB-C מקצועי 7 ב-1 לפרודוקטיביות מקסימלית.

חיבורים:
• HDMI 4K@30Hz
• 2x USB 3.0
• USB-C PD 100W
• SD Card Reader
• MicroSD Card Reader
• USB-C Data

תאימות: MacBook, iPad Pro, Windows, Android`,
    price: 149.90,
    sale_price: 119.90,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'],
    category_id: 'hubs-docking',
    category_name: 'Hubs ותחנות עגינה',
    in_stock: true,
    stock_quantity: 35
  },
  {
    id: '2180',
    name: 'מצלמת רשת FHD 1080P עם מיקרופון מובנה',
    slug: 'webcam-fhd-1080p-mic',
    short_description: 'מצלמת רשת באיכות Full HD עם מיקרופון מובנה לשיחות וידאו.',
    description: `מצלמת רשת מקצועית באיכות 1080P.

תכונות:
• רזולוציה: 1920x1080 @ 30fps
• מיקרופון סטריאו מובנה
• פוקוס אוטומטי
• תיקון תאורה אוטומטי
• קליפס אוניברסלי למסכים
• תאימות: Windows, Mac, Linux`,
    price: 99.90,
    images: ['https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400'],
    category_id: 'cameras',
    category_name: 'מצלמות',
    in_stock: true,
    stock_quantity: 45
  },
  {
    id: '2185',
    name: 'רמקולים למחשב 2.0 - סאונד סטריאו עוצמתי',
    slug: 'pc-speakers-2-0-stereo',
    short_description: 'רמקולים למחשב באיכות סאונד מעולה לעבודה ובידור.',
    description: `רמקולים למחשב 2.0 עם סאונד סטריאו איכותי.

מפרט:
• הספק: 6W RMS
• תדר: 80Hz-20KHz
• חיבור: USB + AUX 3.5mm
• כפתור ווליום
• נוריות LED כחולות
• עיצוב קומפקטי`,
    price: 79.90,
    images: ['https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400'],
    category_id: 'speakers',
    category_name: 'רמקולים',
    in_stock: true,
    stock_quantity: 55
  },
  {
    id: '2190',
    name: 'סט מקלדת ועכבר אלחוטיים - משרדי/ביתי',
    slug: 'wireless-keyboard-mouse-set',
    short_description: 'סט מקלדת ועכבר אלחוטיים לעבודה נוחה במשרד ובבית.',
    description: `סט מקלדת ועכבר אלחוטי מקצועי.

מקלדת:
• חיבור אלחוטי 2.4GHz
• מקשים שקטים
• מקשי מדיה ייעודיים
• סוללות AA (כלולות)

עכבר:
• 3 כפתורים + גלגלת
• DPI: 1600
• סוללה AA (כלולה)

מקלט USB Nano משותף`,
    price: 129.90,
    sale_price: 99.90,
    images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400'],
    category_id: 'computer-sets',
    category_name: 'סטים למחשב',
    in_stock: true,
    stock_quantity: 40
  },
  {
    id: '2195',
    name: 'משטח עכבר גיימינג XXL - 90x40 ס"מ עם תאורת RGB',
    slug: 'gaming-mousepad-xxl-rgb',
    short_description: 'משטח עכבר גדול במיוחד עם תאורת RGB לגיימינג.',
    description: `משטח עכבר גיימינג XXL עם תאורת RGB.

מפרט:
• מידות: 90x40 ס"מ
• עובי: 4 מ"מ
• משטח בד איכותי
• בסיס גומי אנטי-סליפ
• תאורת RGB עם 14 מצבים
• חיבור USB`,
    price: 89.90,
    images: ['https://images.unsplash.com/photo-1527814050087-3793815479db?w=400'],
    category_id: 'desk-setup',
    category_name: 'ארגון שולחן',
    in_stock: true,
    stock_quantity: 30
  },
  {
    id: '2200',
    name: 'מטען USB כפול 20W - טעינה מהירה QC 3.0',
    slug: 'dual-usb-charger-20w-qc',
    short_description: 'מטען קיר USB כפול עם טעינה מהירה QC 3.0.',
    description: `מטען USB כפול עם טעינה מהירה.

מפרט:
• יציאות: 2x USB-A
• הספק כולל: 20W
• תמיכה ב-QC 3.0
• הגנה מפני טעינת יתר
• קומפקטי וקל לנסיעות`,
    price: 39.90,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'],
    category_id: 'power-charging',
    category_name: 'חשמל וטעינה',
    in_stock: true,
    stock_quantity: 80
  },
  {
    id: '2205',
    name: 'דיסק-און-קי USB 3.0 - 64GB מהירות גבוהה',
    slug: 'usb-flash-drive-64gb',
    short_description: 'דיסק-און-קי USB 3.0 מהיר עם נפח 64GB.',
    description: `דיסק-און-קי USB 3.0 מהיר ואמין.

מפרט:
• נפח: 64GB
• USB 3.0 (תואם לאחור ל-2.0)
• מהירות קריאה: עד 150MB/s
• מהירות כתיבה: עד 50MB/s
• עיצוב מתכתי עמיד`,
    price: 34.90,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'],
    category_id: 'storage',
    category_name: 'אחסון חיצוני',
    in_stock: true,
    stock_quantity: 120
  },
  {
    id: '2210',
    name: 'מיקרופון USB שולחני - סטרימינג ופודקאסט',
    slug: 'usb-desktop-microphone-streaming',
    short_description: 'מיקרופון USB מקצועי לסטרימינג, פודקאסט ושיחות.',
    description: `מיקרופון USB שולחני באיכות מקצועית.

מפרט:
• חיבור: USB Plug & Play
• תבנית קליטה: Cardioid
• תדר: 20Hz-20KHz
• כפתור Mute מובנה
• סטנד שולחני יציב
• תאימות: Windows, Mac, PS4/5`,
    price: 149.90,
    sale_price: 129.90,
    images: ['https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400'],
    category_id: 'microphones',
    category_name: 'מיקרופונים',
    in_stock: true,
    stock_quantity: 25
  },
  {
    id: '2215',
    name: 'אוזניות גיימינג Over-Ear עם מיקרופון - 7.1 סראונד',
    slug: 'gaming-headset-over-ear-7-1',
    short_description: 'אוזניות גיימינג מקיפות עם סראונד 7.1 ומיקרופון מתכוונן.',
    description: `אוזניות גיימינג מקצועיות עם סאונד סראונד.

תכונות:
• סראונד וירטואלי 7.1
• דרייברים 50mm
• מיקרופון גמיש עם ביטול רעשים
• כריות אוזן נוחות מדמוי עור
• תאורת RGB
• תאימות: PC, PS4/5, Xbox, Switch`,
    price: 179.90,
    images: ['https://images.unsplash.com/photo-1599669454699-248893623440?w=400'],
    category_id: 'gaming',
    category_name: 'גיימינג',
    in_stock: true,
    stock_quantity: 35
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(p => p.category_id === categoryId);
};

export const getFeaturedProducts = (): Product[] => {
  return products.slice(0, 8);
};

export const getProductsOnSale = (): Product[] => {
  return products.filter(p => p.sale_price && p.sale_price < p.price);
};
