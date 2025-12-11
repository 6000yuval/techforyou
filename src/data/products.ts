import { Product } from '@/types';

// Products imported from WooCommerce CSV + Mock products for testing
export const products: Product[] = [
  // === אוזניות (headphones) ===
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

צבעים זמינים: שחור, שקוף, כסף`,
    price: 49.99,
    images: ['https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400'],
    category_id: 'headphones',
    category_name: 'אוזניות',
    in_stock: true,
    stock_quantity: 50,
    attributes: [
      { name: 'צבע', values: ['שחור', 'שקוף', 'כסף'] },
      { name: 'סוג חיבור', values: ['חוטי'] }
    ]
  },
  {
    id: '2216',
    name: 'אוזניות Bluetooth TWS Pro - ביטול רעשים אקטיבי ANC',
    slug: 'tws-pro-anc-earbuds',
    short_description: 'אוזניות True Wireless עם ביטול רעשים אקטיבי ועד 30 שעות סוללה.',
    description: `אוזניות TWS Pro עם טכנולוגיית ANC מתקדמת.

תכונות:
• ביטול רעשים אקטיבי (ANC)
• עד 8 שעות ניגון + 22 עם הקייס
• Bluetooth 5.3
• מיקרופון כפול לשיחות צלולות
• עמידות IPX5`,
    price: 249.90,
    sale_price: 199.90,
    images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400'],
    category_id: 'headphones',
    category_name: 'אוזניות',
    in_stock: true,
    stock_quantity: 35,
    attributes: [
      { name: 'צבע', values: ['שחור', 'לבן', 'כחול'] },
      { name: 'סוג חיבור', values: ['אלחוטי'] }
    ]
  },
  {
    id: '2217',
    name: 'אוזניות Over-Ear Studio Monitor - צליל מקצועי',
    slug: 'studio-monitor-over-ear',
    short_description: 'אוזניות מוניטור מקצועיות לאולפן ועריכת סאונד.',
    description: `אוזניות Studio Monitor באיכות אולפנית.

מפרט:
• דרייברים 50mm
• תדר: 15Hz-25KHz
• עכבה: 32Ω
• רגישות: 98dB
• כבל נתיק 3 מטר`,
    price: 349.90,
    images: ['https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400'],
    category_id: 'headphones',
    category_name: 'אוזניות',
    in_stock: true,
    stock_quantity: 20,
    attributes: [
      { name: 'צבע', values: ['שחור'] },
      { name: 'סוג חיבור', values: ['חוטי'] }
    ]
  },
  {
    id: '2218',
    name: 'אוזניות ספורט Bluetooth עמידות במים IPX7',
    slug: 'sport-bluetooth-ipx7',
    short_description: 'אוזניות ספורט אלחוטיות עם עמידות מלאה במים.',
    description: `אוזניות ספורט אידיאליות לריצה ושחייה.

תכונות:
• עמידות IPX7 - אפשר לשחות איתן
• וו אוזן מאובטח
• עד 10 שעות סוללה
• טעינה מהירה: 10 דקות = שעתיים`,
    price: 159.90,
    sale_price: 129.90,
    images: ['https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=400'],
    category_id: 'headphones',
    category_name: 'אוזניות',
    in_stock: true,
    stock_quantity: 45,
    attributes: [
      { name: 'צבע', values: ['שחור', 'אדום', 'ירוק'] },
      { name: 'סוג חיבור', values: ['אלחוטי'] }
    ]
  },
  {
    id: '2219',
    name: 'אוזניות On-Ear קלות משקל - נוחות לשעות',
    slug: 'on-ear-lightweight',
    short_description: 'אוזניות On-Ear קלות במיוחד לנוחות מרבית.',
    description: `אוזניות On-Ear קלות ונוחות.

מפרט:
• משקל: 150 גרם בלבד
• כריות רכות ונושמות
• כבל מצופה ניילון 1.5 מטר
• מיקרופון מובנה`,
    price: 89.90,
    images: ['https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=400'],
    category_id: 'headphones',
    category_name: 'אוזניות',
    in_stock: true,
    stock_quantity: 60,
    attributes: [
      { name: 'צבע', values: ['שחור', 'לבן', 'ורוד'] },
      { name: 'סוג חיבור', values: ['חוטי'] }
    ]
  },

  // === מיקרופונים (microphones) ===
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
• סטנד שולחני יציב`,
    price: 149.90,
    sale_price: 129.90,
    images: ['https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400'],
    category_id: 'microphones',
    category_name: 'מיקרופונים',
    in_stock: true,
    stock_quantity: 25,
    attributes: [
      { name: 'צבע', values: ['שחור', 'לבן'] },
      { name: 'סוג חיבור', values: ['USB'] }
    ]
  },
  {
    id: '2220',
    name: 'מיקרופון קונדנסר XLR מקצועי - הקלטות אולפן',
    slug: 'xlr-condenser-studio-mic',
    short_description: 'מיקרופון קונדנסר XLR לאיכות הקלטה מקצועית.',
    description: `מיקרופון קונדנסר באיכות אולפנית.

מפרט:
• חיבור: XLR
• תבנית: Large Diaphragm Cardioid
• תדר: 20Hz-20KHz
• רגישות: -34dB
• דורש פאנטום 48V`,
    price: 399.90,
    images: ['https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400'],
    category_id: 'microphones',
    category_name: 'מיקרופונים',
    in_stock: true,
    stock_quantity: 15,
    attributes: [
      { name: 'צבע', values: ['שחור', 'כסף'] },
      { name: 'סוג חיבור', values: ['XLR'] }
    ]
  },
  {
    id: '2221',
    name: 'מיקרופון דש קליפ Lavalier - ראיונות ווידאו',
    slug: 'lavalier-clip-mic',
    short_description: 'מיקרופון דש קטן וקל לצילומי וידאו וראיונות.',
    description: `מיקרופון Lavalier קומפקטי.

תכונות:
• קליפ דש קל להרכבה
• כבל 2 מטר
• תואם סמארטפונים ומצלמות
• מגיע עם אדפטור TRS/TRRS`,
    price: 69.90,
    images: ['https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400'],
    category_id: 'microphones',
    category_name: 'מיקרופונים',
    in_stock: true,
    stock_quantity: 50,
    attributes: [
      { name: 'צבע', values: ['שחור'] },
      { name: 'סוג חיבור', values: ['3.5mm'] }
    ]
  },
  {
    id: '2222',
    name: 'מיקרופון אלחוטי כפול - הופעות ואירועים',
    slug: 'wireless-dual-mic-system',
    short_description: 'סט מיקרופונים אלחוטיים כפול להופעות ואירועים.',
    description: `סט מיקרופונים אלחוטיים מקצועי.

כולל:
• 2 מיקרופונים אלחוטיים
• מקלט עם 2 ערוצים
• טווח עד 50 מטר
• סוללות נטענות`,
    price: 449.90,
    sale_price: 399.90,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'],
    category_id: 'microphones',
    category_name: 'מיקרופונים',
    in_stock: true,
    stock_quantity: 10,
    attributes: [
      { name: 'צבע', values: ['שחור'] },
      { name: 'סוג חיבור', values: ['אלחוטי'] }
    ]
  },

  // === רמקולים (speakers) ===
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
• עיצוב קומפקטי`,
    price: 79.90,
    images: ['https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400'],
    category_id: 'speakers',
    category_name: 'רמקולים',
    in_stock: true,
    stock_quantity: 55,
    attributes: [
      { name: 'צבע', values: ['שחור', 'לבן'] }
    ]
  },
  {
    id: '2223',
    name: 'רמקול Bluetooth נייד 30W - באס עוצמתי',
    slug: 'bluetooth-speaker-30w-bass',
    short_description: 'רמקול נייד עוצמתי עם באס משודרג וסוללה ל-12 שעות.',
    description: `רמקול Bluetooth עוצמתי.

מפרט:
• הספק: 30W
• Bluetooth 5.0
• סוללה: 12 שעות
• עמידות IPX6
• אפשרות חיבור 2 רמקולים`,
    price: 199.90,
    sale_price: 169.90,
    images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400'],
    category_id: 'speakers',
    category_name: 'רמקולים',
    in_stock: true,
    stock_quantity: 40,
    attributes: [
      { name: 'צבע', values: ['שחור', 'כחול', 'אדום'] }
    ]
  },
  {
    id: '2224',
    name: 'מערכת רמקולים 2.1 עם סאבוופר',
    slug: 'speaker-system-2-1-subwoofer',
    short_description: 'מערכת רמקולים 2.1 עם סאבוופר לבאס עמוק.',
    description: `מערכת 2.1 לחוויה קולנועית.

מפרט:
• הספק כולל: 50W RMS
• סאבוופר 4 אינץ' עץ
• שני רמקולי לווין
• שלט רחוק`,
    price: 299.90,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'],
    category_id: 'speakers',
    category_name: 'רמקולים',
    in_stock: true,
    stock_quantity: 25,
    attributes: [
      { name: 'צבע', values: ['שחור'] }
    ]
  },
  {
    id: '2225',
    name: 'רמקול חכם עם עוזר קולי - WiFi ו-Bluetooth',
    slug: 'smart-speaker-voice-assistant',
    short_description: 'רמקול חכם עם שליטה קולית וחיבור לבית חכם.',
    description: `רמקול חכם לבית המודרני.

תכונות:
• עוזר קולי מובנה
• WiFi + Bluetooth
• שליטה באפליקציה
• תאימות לבית חכם`,
    price: 249.90,
    images: ['https://images.unsplash.com/photo-1543512214-318c7553f230?w=400'],
    category_id: 'speakers',
    category_name: 'רמקולים',
    in_stock: true,
    stock_quantity: 30,
    attributes: [
      { name: 'צבע', values: ['שחור', 'אפור', 'לבן'] }
    ]
  },

  // === מצלמות (cameras) ===
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
• תיקון תאורה אוטומטי`,
    price: 99.90,
    images: ['https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400'],
    category_id: 'cameras',
    category_name: 'מצלמות',
    in_stock: true,
    stock_quantity: 45,
    attributes: [
      { name: 'צבע', values: ['שחור'] }
    ]
  },
  {
    id: '2226',
    name: 'מצלמת רשת 4K Ultra HD - סטרימינג מקצועי',
    slug: 'webcam-4k-ultra-hd-streaming',
    short_description: 'מצלמת רשת 4K לסטרימינג ופגישות באיכות קולנועית.',
    description: `מצלמת 4K לאיכות תמונה מושלמת.

מפרט:
• רזולוציה: 4K@30fps / 1080P@60fps
• זווית 90 מעלות
• HDR אוטומטי
• מיקרופון כפול`,
    price: 349.90,
    sale_price: 299.90,
    images: ['https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400'],
    category_id: 'cameras',
    category_name: 'מצלמות',
    in_stock: true,
    stock_quantity: 20,
    attributes: [
      { name: 'צבע', values: ['שחור', 'לבן'] }
    ]
  },
  {
    id: '2227',
    name: 'מצלמת אבטחה WiFi - צפייה מהנייד',
    slug: 'wifi-security-camera-mobile',
    short_description: 'מצלמת אבטחה אלחוטית עם צפייה מרחוק באפליקציה.',
    description: `מצלמת אבטחה חכמה.

תכונות:
• רזולוציה: 1080P
• ראיית לילה עד 10 מטר
• זיהוי תנועה והתראות
• שמע דו-כיווני`,
    price: 129.90,
    images: ['https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=400'],
    category_id: 'cameras',
    category_name: 'מצלמות',
    in_stock: true,
    stock_quantity: 60,
    attributes: [
      { name: 'צבע', values: ['לבן', 'שחור'] }
    ]
  },

  // === עכברים (mice) ===
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
• סוללה נטענת עד 60 שעות`,
    price: 129.90,
    sale_price: 99.90,
    images: ['https://images.unsplash.com/photo-1527814050087-3793815479db?w=400'],
    category_id: 'mice',
    category_name: 'עכברים',
    in_stock: true,
    stock_quantity: 40,
    attributes: [
      { name: 'צבע', values: ['שחור', 'לבן'] },
      { name: 'סוג חיבור', values: ['אלחוטי'] }
    ]
  },
  {
    id: '2228',
    name: 'עכבר ארגונומי אנכי - מניעת כאבים',
    slug: 'ergonomic-vertical-mouse',
    short_description: 'עכבר ארגונומי אנכי למניעת כאבי שורש כף היד.',
    description: `עכבר ארגונומי לבריאות היד.

תכונות:
• עיצוב אנכי 57 מעלות
• 6 כפתורים
• DPI: 800/1200/1600
• חוטי או אלחוטי`,
    price: 89.90,
    images: ['https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400'],
    category_id: 'mice',
    category_name: 'עכברים',
    in_stock: true,
    stock_quantity: 35,
    attributes: [
      { name: 'צבע', values: ['שחור', 'אפור'] },
      { name: 'סוג חיבור', values: ['חוטי', 'אלחוטי'] }
    ]
  },
  {
    id: '2229',
    name: 'עכבר משרדי אלחוטי שקט - לחיצות שקטות',
    slug: 'silent-wireless-office-mouse',
    short_description: 'עכבר אלחוטי שקט במיוחד לעבודה במשרד.',
    description: `עכבר שקט לסביבת עבודה.

מפרט:
• לחיצות שקטות 90%
• סוללה עד 18 חודשים
• DPI: 1600
• חיבור 2.4GHz`,
    price: 59.90,
    images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400'],
    category_id: 'mice',
    category_name: 'עכברים',
    in_stock: true,
    stock_quantity: 80,
    attributes: [
      { name: 'צבע', values: ['שחור', 'כסף', 'ורוד'] },
      { name: 'סוג חיבור', values: ['אלחוטי'] }
    ]
  },
  {
    id: '2230',
    name: 'עכבר גיימינג קווי Ultralight - 65 גרם',
    slug: 'ultralight-wired-gaming-mouse',
    short_description: 'עכבר גיימינג קל במיוחד עם חיישן מדויק.',
    description: `עכבר גיימינג Ultralight.

מפרט:
• משקל: 65 גרם בלבד
• חיישן: PMW3389
• DPI: עד 16000
• כפתורים: 6
• כבל פראקורד גמיש`,
    price: 179.90,
    images: ['https://images.unsplash.com/photo-1613141411244-0e4ac259d217?w=400'],
    category_id: 'mice',
    category_name: 'עכברים',
    in_stock: true,
    stock_quantity: 25,
    attributes: [
      { name: 'צבע', values: ['שחור', 'לבן', 'ורוד'] },
      { name: 'סוג חיבור', values: ['חוטי'] }
    ]
  },

  // === מקלדות (keyboards) ===
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

אורות RGB:
• עד 1.6 מיליון שילובי צבעים`,
    price: 299.00,
    images: ['https://images.unsplash.com/photo-1595225476474-87563907a212?w=400'],
    category_id: 'keyboards',
    category_name: 'מקלדות',
    in_stock: true,
    stock_quantity: 15,
    attributes: [
      { name: 'סוויצ\'ים', values: ['Red', 'Blue', 'Brown'] },
      { name: 'סוג חיבור', values: ['חוטי', 'אלחוטי', 'Bluetooth'] }
    ]
  },
  {
    id: '2231',
    name: 'מקלדת מכנית TKL - 87 מקשים עם תאורת RGB',
    slug: 'tkl-mechanical-keyboard-rgb',
    short_description: 'מקלדת מכנית TKL קומפקטית עם RGB.',
    description: `מקלדת TKL מכנית.

מפרט:
• 87 מקשים (ללא NumPad)
• סוויצ\'ים מכניים
• תאורת RGB per-key
• כבל נתיק USB-C`,
    price: 199.90,
    sale_price: 169.90,
    images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400'],
    category_id: 'keyboards',
    category_name: 'מקלדות',
    in_stock: true,
    stock_quantity: 30,
    attributes: [
      { name: 'סוויצ\'ים', values: ['Red', 'Blue', 'Brown'] },
      { name: 'סוג חיבור', values: ['חוטי'] }
    ]
  },
  {
    id: '2232',
    name: 'מקלדת ממברנה משרדית - שקטה ונוחה',
    slug: 'office-membrane-keyboard-quiet',
    short_description: 'מקלדת ממברנה שקטה לעבודה משרדית.',
    description: `מקלדת משרדית נוחה.

תכונות:
• מקשים שקטים
• מנח כפות ידיים
• מקשי מדיה ייעודיים
• תאימות Windows/Mac`,
    price: 69.90,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'],
    category_id: 'keyboards',
    category_name: 'מקלדות',
    in_stock: true,
    stock_quantity: 50,
    attributes: [
      { name: 'צבע', values: ['שחור', 'לבן'] },
      { name: 'סוג חיבור', values: ['חוטי', 'אלחוטי'] }
    ]
  },
  {
    id: '2233',
    name: 'מקלדת מיני 60% מכנית - נוטרית ונוחה',
    slug: 'mini-60-percent-mechanical',
    short_description: 'מקלדת 60% קומפקטית במיוחד.',
    description: `מקלדת 60% למינימליסטים.

מפרט:
• 61 מקשים בלבד
• סוויצ\'ים Hot-Swappable
• RGB תאורת תחתית
• סוללה 2000mAh`,
    price: 249.90,
    images: ['https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400'],
    category_id: 'keyboards',
    category_name: 'מקלדות',
    in_stock: true,
    stock_quantity: 20,
    attributes: [
      { name: 'סוויצ\'ים', values: ['Red', 'Blue', 'Brown', 'Yellow'] },
      { name: 'סוג חיבור', values: ['אלחוטי', 'Bluetooth'] }
    ]
  },

  // === סטים למחשב (computer-sets) ===
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

עכבר:
• 3 כפתורים + גלגלת
• DPI: 1600`,
    price: 129.90,
    sale_price: 99.90,
    images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400'],
    category_id: 'computer-sets',
    category_name: 'סטים למחשב',
    in_stock: true,
    stock_quantity: 40,
    attributes: [
      { name: 'צבע', values: ['שחור', 'לבן'] }
    ]
  },
  {
    id: '2234',
    name: 'סט גיימינג מלא - מקלדת, עכבר, אוזניות ומשטח',
    slug: 'full-gaming-set-4-in-1',
    short_description: 'סט גיימינג מושלם עם כל הציוד הדרוש.',
    description: `סט גיימינג 4 ב-1.

כולל:
• מקלדת מכנית RGB
• עכבר גיימינג 7200 DPI
• אוזניות עם מיקרופון
• משטח עכבר XL`,
    price: 399.90,
    sale_price: 349.90,
    images: ['https://images.unsplash.com/photo-1593152167544-085d3b9c4938?w=400'],
    category_id: 'computer-sets',
    category_name: 'סטים למחשב',
    in_stock: true,
    stock_quantity: 15,
    attributes: [
      { name: 'צבע', values: ['שחור'] }
    ]
  },

  // === כבלים (cables) ===
  {
    id: '2165',
    name: 'כבל HDMI 2.1 - 8K 60Hz / 4K 120Hz - 2 מטר',
    slug: 'hdmi-cable-8k-2m',
    short_description: 'כבל HDMI 2.1 באיכות פרימיום לתמיכה ב-8K ו-4K.',
    description: `כבל HDMI 2.1 באיכות גבוהה.

מפרט:
• תמיכה ב-8K@60Hz ו-4K@120Hz
• רוחב פס: 48Gbps
• תמיכה ב-HDR, eARC
• אורך: 2 מטר`,
    price: 59.90,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'],
    category_id: 'cables',
    category_name: 'כבלים',
    in_stock: true,
    stock_quantity: 100,
    attributes: [
      { name: 'אורך', values: ['1 מטר', '2 מטר', '3 מטר', '5 מטר'] }
    ]
  },
  {
    id: '2235',
    name: 'כבל USB-C ל-USB-C 100W - טעינה וסנכרון מהיר',
    slug: 'usbc-to-usbc-100w-cable',
    short_description: 'כבל USB-C חזק לטעינה מהירה 100W ו-USB 3.2.',
    description: `כבל USB-C במהירות גבוהה.

מפרט:
• טעינה: עד 100W PD
• נתונים: USB 3.2 עד 10Gbps
• וידאו: תמיכה ב-4K`,
    price: 49.90,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'],
    category_id: 'cables',
    category_name: 'כבלים',
    in_stock: true,
    stock_quantity: 150,
    attributes: [
      { name: 'אורך', values: ['0.5 מטר', '1 מטר', '2 מטר'] }
    ]
  },
  {
    id: '2236',
    name: 'כבל DisplayPort 1.4 - 4K@144Hz / 8K@60Hz',
    slug: 'displayport-1-4-cable',
    short_description: 'כבל DisplayPort 1.4 לגיימינג ועריכה.',
    description: `כבל DisplayPort גיימינג.

מפרט:
• 4K@144Hz או 8K@60Hz
• רוחב פס: 32.4Gbps
• תמיכה ב-HDR10`,
    price: 69.90,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'],
    category_id: 'cables',
    category_name: 'כבלים',
    in_stock: true,
    stock_quantity: 60,
    attributes: [
      { name: 'אורך', values: ['1 מטר', '2 מטר', '3 מטר'] }
    ]
  },
  {
    id: '2237',
    name: 'כבל אתרנט CAT8 - 40Gbps לרשת מהירה',
    slug: 'ethernet-cat8-cable',
    short_description: 'כבל רשת CAT8 למהירות מקסימלית.',
    description: `כבל CAT8 לגיימרים.

מפרט:
• מהירות: עד 40Gbps
• תדר: 2000MHz
• מוגן RJ45`,
    price: 39.90,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'],
    category_id: 'cables',
    category_name: 'כבלים',
    in_stock: true,
    stock_quantity: 90,
    attributes: [
      { name: 'אורך', values: ['1 מטר', '2 מטר', '5 מטר', '10 מטר'] }
    ]
  },
  {
    id: '2238',
    name: 'כבל Lightning ל-USB-C - טעינה מהירה לאייפון',
    slug: 'lightning-to-usbc-cable',
    short_description: 'כבל Lightning MFi לטעינה מהירה של מכשירי Apple.',
    description: `כבל Lightning מאושר MFi.

תכונות:
• טעינה מהירה PD
• סנכרון נתונים
• ציפוי ניילון עמיד`,
    price: 59.90,
    sale_price: 49.90,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'],
    category_id: 'cables',
    category_name: 'כבלים',
    in_stock: true,
    stock_quantity: 80,
    attributes: [
      { name: 'אורך', values: ['1 מטר', '2 מטר'] },
      { name: 'צבע', values: ['לבן', 'שחור'] }
    ]
  },

  // === מתאמים (adapters) ===
  {
    id: '2170',
    name: 'מתאם USB-C ל-HDMI 4K - תואם Mac/Windows',
    slug: 'usbc-to-hdmi-adapter-4k',
    short_description: 'מתאם USB-C ל-HDMI באיכות 4K לחיבור מסכים ומקרנים.',
    description: `מתאם USB-C ל-HDMI באיכות 4K@60Hz.

תכונות:
• רזולוציה: עד 4K@60Hz
• תאימות רחבה: Mac, Windows, iPad Pro
• Plug and Play`,
    price: 49.90,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'],
    category_id: 'adapters',
    category_name: 'מתאמים',
    in_stock: true,
    stock_quantity: 60,
    attributes: []
  },
  {
    id: '2239',
    name: 'מתאם USB-C ל-USB-A 3.0 - כפול',
    slug: 'usbc-to-usba-dual-adapter',
    short_description: 'מתאם USB-C לשני יציאות USB-A 3.0.',
    description: `מתאם USB-C קומפקטי.

מפרט:
• 2 יציאות USB-A 3.0
• מהירות עד 5Gbps
• תאימות מלאה`,
    price: 29.90,
    images: ['https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400'],
    category_id: 'adapters',
    category_name: 'מתאמים',
    in_stock: true,
    stock_quantity: 100,
    attributes: []
  },
  {
    id: '2240',
    name: 'מתאם DisplayPort ל-HDMI - 4K@60Hz',
    slug: 'displayport-to-hdmi-adapter',
    short_description: 'מתאם DP ל-HDMI לחיבור מסכים ישנים.',
    description: `מתאם DisplayPort ל-HDMI.

מפרט:
• תמיכה ב-4K@60Hz
• תאימות HDCP 2.2
• עיצוב קומפקטי`,
    price: 39.90,
    images: ['https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400'],
    category_id: 'adapters',
    category_name: 'מתאמים',
    in_stock: true,
    stock_quantity: 70,
    attributes: []
  },
  {
    id: '2241',
    name: 'מתאם אוזניות USB-C ל-3.5mm עם DAC',
    slug: 'usbc-to-35mm-dac-adapter',
    short_description: 'מתאם אודיו עם DAC לאיכות צליל משופרת.',
    description: `מתאם אודיו עם DAC.

תכונות:
• DAC Hi-Res 32bit/384kHz
• תמיכה במיקרופון
• תאימות אנדרואיד/iOS`,
    price: 59.90,
    images: ['https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400'],
    category_id: 'adapters',
    category_name: 'מתאמים',
    in_stock: true,
    stock_quantity: 45,
    attributes: []
  },

  // === Hubs ותחנות עגינה (hubs-docking) ===
  {
    id: '2175',
    name: 'Hub USB-C 7 ב-1 - HDMI, USB 3.0, SD, PD 100W',
    slug: 'usbc-hub-7-in-1',
    short_description: 'Hub USB-C מתקדם עם 7 חיבורים כולל HDMI 4K ו-Power Delivery.',
    description: `Hub USB-C מקצועי 7 ב-1.

חיבורים:
• HDMI 4K@30Hz
• 2x USB 3.0
• USB-C PD 100W
• SD + MicroSD`,
    price: 149.90,
    sale_price: 119.90,
    images: ['https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400'],
    category_id: 'hubs-docking',
    category_name: 'Hubs ותחנות עגינה',
    in_stock: true,
    stock_quantity: 35,
    attributes: [
      { name: 'צבע', values: ['כסף', 'אפור'] }
    ]
  },
  {
    id: '2242',
    name: 'תחנת עגינה USB-C 12 ב-1 - מסך כפול',
    slug: 'usbc-docking-station-12-in-1',
    short_description: 'תחנת עגינה מקצועית לתמיכה ב-2 מסכים.',
    description: `תחנת עגינה מתקדמת.

חיבורים:
• 2x HDMI 4K
• 3x USB 3.0 + 2x USB 2.0
• USB-C PD 100W
• Ethernet Gigabit
• SD + MicroSD
• Jack 3.5mm`,
    price: 349.90,
    images: ['https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400'],
    category_id: 'hubs-docking',
    category_name: 'Hubs ותחנות עגינה',
    in_stock: true,
    stock_quantity: 20,
    attributes: [
      { name: 'צבע', values: ['כסף', 'שחור'] }
    ]
  },
  {
    id: '2243',
    name: 'Hub USB 3.0 - 4 יציאות עם מתג',
    slug: 'usb3-hub-4-port-switch',
    short_description: 'Hub USB 3.0 פשוט עם 4 יציאות ומתגים.',
    description: `Hub USB 3.0 עם מתגים.

מפרט:
• 4 יציאות USB 3.0
• מתג לכל יציאה
• נוריות חיווי
• הזנה חיצונית אופציונלית`,
    price: 49.90,
    images: ['https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400'],
    category_id: 'hubs-docking',
    category_name: 'Hubs ותחנות עגינה',
    in_stock: true,
    stock_quantity: 55,
    attributes: [
      { name: 'צבע', values: ['שחור', 'לבן'] }
    ]
  },

  // === אחסון חיצוני (storage) ===
  {
    id: '2205',
    name: 'דיסק-און-קי USB 3.0 - 64GB מהירות גבוהה',
    slug: 'usb-flash-drive-64gb',
    short_description: 'דיסק-און-קי USB 3.0 מהיר עם נפח 64GB.',
    description: `דיסק-און-קי USB 3.0 מהיר ואמין.

מפרט:
• נפח: 64GB
• USB 3.0
• מהירות קריאה: עד 150MB/s`,
    price: 34.90,
    images: ['https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400'],
    category_id: 'storage',
    category_name: 'אחסון חיצוני',
    in_stock: true,
    stock_quantity: 120,
    attributes: [
      { name: 'נפח', values: ['32GB', '64GB', '128GB', '256GB'] }
    ]
  },
  {
    id: '2244',
    name: 'SSD חיצוני נייד 1TB - USB-C מהיר',
    slug: 'portable-ssd-1tb-usbc',
    short_description: 'SSD חיצוני קומפקטי ומהיר במיוחד.',
    description: `SSD חיצוני נייד.

מפרט:
• נפח: 1TB
• מהירות: עד 1050MB/s
• חיבור USB-C 3.2
• עמידות לנפילות`,
    price: 449.90,
    sale_price: 399.90,
    images: ['https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400'],
    category_id: 'storage',
    category_name: 'אחסון חיצוני',
    in_stock: true,
    stock_quantity: 25,
    attributes: [
      { name: 'נפח', values: ['500GB', '1TB', '2TB'] }
    ]
  },
  {
    id: '2245',
    name: 'כרטיס זיכרון MicroSD 256GB - למצלמות ודרונים',
    slug: 'microsd-card-256gb',
    short_description: 'כרטיס MicroSD מהיר לצילום 4K.',
    description: `כרטיס MicroSD מקצועי.

מפרט:
• נפח: 256GB
• Class 10, U3, V30
• קריאה: 170MB/s
• כתיבה: 90MB/s`,
    price: 129.90,
    images: ['https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400'],
    category_id: 'storage',
    category_name: 'אחסון חיצוני',
    in_stock: true,
    stock_quantity: 70,
    attributes: [
      { name: 'נפח', values: ['64GB', '128GB', '256GB', '512GB'] }
    ]
  },

  // === רשת (network) ===
  {
    id: '2149',
    name: 'מגבר WiFi Pro של שיאומי - מרחיב טווח רשת אלחוטית 300M',
    slug: 'xiaomi-wifi-pro-extender',
    short_description: 'מגבר WiFi Pro להרחבת טווח הרשת האלחוטית.',
    description: `מגבר WiFi Pro של שיאומי.

תכונות:
• מהירות: עד 300M
• 2 אנטנות חיצוניות
• התקנה קלה`,
    price: 89.90,
    images: ['https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400'],
    category_id: 'network',
    category_name: 'רשת',
    in_stock: true,
    stock_quantity: 30,
    attributes: []
  },
  {
    id: '2246',
    name: 'ראוטר WiFi 6 - AX3000 דואל באנד',
    slug: 'wifi6-router-ax3000',
    short_description: 'ראוטר WiFi 6 מהיר לבית חכם.',
    description: `ראוטר WiFi 6 מתקדם.

מפרט:
• WiFi 6 (802.11ax)
• מהירות: עד 3000Mbps
• 4 אנטנות חיצוניות
• 4 יציאות Gigabit`,
    price: 349.90,
    images: ['https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400'],
    category_id: 'network',
    category_name: 'רשת',
    in_stock: true,
    stock_quantity: 15,
    attributes: []
  },
  {
    id: '2247',
    name: 'מתאם WiFi USB - AC1300 דואל באנד',
    slug: 'usb-wifi-adapter-ac1300',
    short_description: 'מתאם WiFi USB למחשבים ללא אלחוט.',
    description: `מתאם WiFi מהיר.

מפרט:
• AC1300 (867+400Mbps)
• אנטנה חיצונית
• תאימות Windows/Mac/Linux`,
    price: 89.90,
    images: ['https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400'],
    category_id: 'network',
    category_name: 'רשת',
    in_stock: true,
    stock_quantity: 40,
    attributes: []
  },

  // === ארגון שולחן וסטאפ (desk-setup) ===
  {
    id: '2195',
    name: 'משטח עכבר גיימינג XXL - 90x40 ס"מ עם תאורת RGB',
    slug: 'gaming-mousepad-xxl-rgb',
    short_description: 'משטח עכבר גדול במיוחד עם תאורת RGB.',
    description: `משטח עכבר גיימינג XXL.

מפרט:
• מידות: 90x40 ס"מ
• עובי: 4 מ"מ
• תאורת RGB עם 14 מצבים`,
    price: 89.90,
    images: ['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400'],
    category_id: 'desk-setup',
    category_name: 'ארגון שולחן',
    in_stock: true,
    stock_quantity: 30,
    attributes: [
      { name: 'צבע', values: ['שחור'] }
    ]
  },
  {
    id: '2248',
    name: 'זרוע מסך כפולה - 17-32 אינץ\'',
    slug: 'dual-monitor-arm-17-32',
    short_description: 'זרוע לשני מסכים עד 32 אינץ\'.',
    description: `זרוע מסך כפולה.

מפרט:
• תמיכה: 17-32 אינץ'
• משקל: עד 9 ק"ג לזרוע
• VESA: 75x75/100x100
• ניהול כבלים מובנה`,
    price: 249.90,
    images: ['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400'],
    category_id: 'desk-setup',
    category_name: 'ארגון שולחן',
    in_stock: true,
    stock_quantity: 20,
    attributes: [
      { name: 'צבע', values: ['שחור', 'לבן'] }
    ]
  },
  {
    id: '2249',
    name: 'מעמד לפטופ מתכוונן - אלומיניום',
    slug: 'laptop-stand-aluminum-adjustable',
    short_description: 'מעמד לפטופ ארגונומי מאלומיניום.',
    description: `מעמד לפטופ מקצועי.

תכונות:
• גובה מתכוונן
• אלומיניום איכותי
• קירור משופר
• מתאים ל-10-17 אינץ'`,
    price: 149.90,
    sale_price: 129.90,
    images: ['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400'],
    category_id: 'desk-setup',
    category_name: 'ארגון שולחן',
    in_stock: true,
    stock_quantity: 35,
    attributes: [
      { name: 'צבע', values: ['כסף', 'אפור', 'שחור'] }
    ]
  },
  {
    id: '2250',
    name: 'מארגן שולחן עם טעינה אלחוטית',
    slug: 'desk-organizer-wireless-charging',
    short_description: 'מארגן שולחן עם משטח טעינה אלחוטית מובנה.',
    description: `מארגן שולחן חכם.

כולל:
• טעינה אלחוטית 15W
• מגירות לאחסון
• מעמד לטלפון
• מקום לעטים`,
    price: 179.90,
    images: ['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400'],
    category_id: 'desk-setup',
    category_name: 'ארגון שולחן',
    in_stock: true,
    stock_quantity: 25,
    attributes: [
      { name: 'צבע', values: ['לבן', 'שחור', 'עץ'] }
    ]
  },

  // === חשמל וטעינה (power-charging) ===
  {
    id: '2200',
    name: 'מטען USB כפול 20W - טעינה מהירה QC 3.0',
    slug: 'dual-usb-charger-20w-qc',
    short_description: 'מטען קיר USB כפול עם טעינה מהירה.',
    description: `מטען USB כפול מהיר.

מפרט:
• יציאות: 2x USB-A
• הספק: 20W
• תמיכה ב-QC 3.0`,
    price: 39.90,
    images: ['https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400'],
    category_id: 'power-charging',
    category_name: 'חשמל וטעינה',
    in_stock: true,
    stock_quantity: 80,
    attributes: [
      { name: 'צבע', values: ['לבן', 'שחור'] }
    ]
  },
  {
    id: '2251',
    name: 'מטען GaN 65W - USB-C + USB-A',
    slug: 'gan-charger-65w-usbc-usba',
    short_description: 'מטען GaN קומפקטי וחזק לטעינת לפטופ.',
    description: `מטען GaN מתקדם.

מפרט:
• הספק: 65W כולל
• USB-C PD: 65W
• USB-A QC: 18W
• טכנולוגיית GaN`,
    price: 149.90,
    images: ['https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400'],
    category_id: 'power-charging',
    category_name: 'חשמל וטעינה',
    in_stock: true,
    stock_quantity: 45,
    attributes: [
      { name: 'צבע', values: ['לבן', 'שחור'] }
    ]
  },
  {
    id: '2252',
    name: 'סוללת גיבוי 20000mAh - טעינה מהירה 22.5W',
    slug: 'power-bank-20000mah-fast',
    short_description: 'סוללת גיבוי גדולה עם טעינה מהירה.',
    description: `סוללת גיבוי 20000mAh.

מפרט:
• קיבולת: 20000mAh
• פלט: 22.5W מקסימום
• 2x USB-A + USB-C
• תצוגת LED`,
    price: 119.90,
    sale_price: 99.90,
    images: ['https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400'],
    category_id: 'power-charging',
    category_name: 'חשמל וטעינה',
    in_stock: true,
    stock_quantity: 50,
    attributes: [
      { name: 'צבע', values: ['שחור', 'לבן', 'כחול'] }
    ]
  },
  {
    id: '2253',
    name: 'מטען אלחוטי 3 ב-1 - iPhone, Watch, AirPods',
    slug: 'wireless-charger-3-in-1',
    short_description: 'תחנת טעינה אלחוטית לכל מכשירי Apple.',
    description: `מטען אלחוטי 3 ב-1.

תומך:
• iPhone: 15W MagSafe
• Apple Watch: 5W
• AirPods: 5W`,
    price: 199.90,
    images: ['https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400'],
    category_id: 'power-charging',
    category_name: 'חשמל וטעינה',
    in_stock: true,
    stock_quantity: 30,
    attributes: [
      { name: 'צבע', values: ['לבן', 'שחור'] }
    ]
  },

  // === גיימינג (gaming) ===
  {
    id: '2215',
    name: 'אוזניות גיימינג Over-Ear עם מיקרופון - 7.1 סראונד',
    slug: 'gaming-headset-over-ear-7-1',
    short_description: 'אוזניות גיימינג מקיפות עם סראונד 7.1.',
    description: `אוזניות גיימינג מקצועיות.

תכונות:
• סראונד וירטואלי 7.1
• דרייברים 50mm
• מיקרופון עם ביטול רעשים
• תאורת RGB`,
    price: 179.90,
    images: ['https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400'],
    category_id: 'gaming',
    category_name: 'גיימינג',
    in_stock: true,
    stock_quantity: 35,
    attributes: [
      { name: 'צבע', values: ['שחור', 'לבן', 'ירוק'] }
    ]
  },
  {
    id: '2254',
    name: 'בקר גיימינג אלחוטי - תואם PC/PS/Android',
    slug: 'wireless-gaming-controller',
    short_description: 'בקר גיימינג אלחוטי תואם לכל הפלטפורמות.',
    description: `בקר גיימינג אוניברסלי.

תכונות:
• חיבור: Bluetooth + 2.4GHz
• רטט כפול
• ג\'וירו מובנה
• סוללה עד 20 שעות`,
    price: 149.90,
    sale_price: 129.90,
    images: ['https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=400'],
    category_id: 'gaming',
    category_name: 'גיימינג',
    in_stock: true,
    stock_quantity: 40,
    attributes: [
      { name: 'צבע', values: ['שחור', 'לבן', 'אדום'] }
    ]
  },
  {
    id: '2255',
    name: 'מאוורר קירור לפטופ גיימינג - 5 מאווררים RGB',
    slug: 'laptop-cooling-pad-5-fans-rgb',
    short_description: 'מעמד קירור עם 5 מאווררים לגיימינג.',
    description: `מעמד קירור גיימינג.

מפרט:
• 5 מאווררים שקטים
• תאורת RGB
• גובה מתכוונן
• 2 יציאות USB`,
    price: 129.90,
    images: ['https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400'],
    category_id: 'gaming',
    category_name: 'גיימינג',
    in_stock: true,
    stock_quantity: 25,
    attributes: [
      { name: 'צבע', values: ['שחור'] }
    ]
  },
  {
    id: '2256',
    name: 'כסא גיימינג ארגונומי - תמיכת גב מלאה',
    slug: 'ergonomic-gaming-chair',
    short_description: 'כסא גיימינג נוח עם תמיכה מלאה.',
    description: `כסא גיימינג מקצועי.

תכונות:
• תמיכת גב מתכווננת
• כרית צוואר + מותן
• ידיות 4D
• בסיס אלומיניום`,
    price: 799.90,
    sale_price: 699.90,
    images: ['https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400'],
    category_id: 'gaming',
    category_name: 'גיימינג',
    in_stock: true,
    stock_quantity: 10,
    attributes: [
      { name: 'צבע', values: ['שחור', 'שחור-אדום', 'שחור-כחול'] }
    ]
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