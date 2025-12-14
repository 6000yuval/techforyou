// Enhanced Products Data - Hebrew Optimized for Sales & SEO
// These products are ready to be imported to Supabase

export interface EnhancedProduct {
  id: string;
  sku: string;
  title: string;
  shortDescription: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  subcategory?: string;
  images: string[];
  variants?: ProductVariant[];
  attributes?: Record<string, string>;
  inStock: boolean;
  stockQuantity: number;
}

export interface ProductVariant {
  id: string;
  sku: string;
  name: string;
  price: number;
  attributes: Record<string, string>;
  stockQuantity: number;
  image?: string;
}

export const enhancedProducts: EnhancedProduct[] = [
  // ===============================
  // אוזניות
  // ===============================
  {
    id: "2144",
    sku: "KZ-EDX-PRO",
    title: "אוזניות KZ EDX PRO - סאונד Hi-Fi מקצועי עם באס עוצמתי",
    shortDescription: "אוזניות In-Ear מקצועיות עם דרייברים דינמיים 10mm, באס עמוק וביטול רעשים פסיבי. חוויית שמע סטודיו בכל מקום.",
    description: `<div class="product-description rtl">
<h2>אוזניות KZ EDX PRO - הבחירה של מקצוענים</h2>
<p>חוויית שמע שלא תשכחו! אוזניות KZ EDX PRO מביאות לכם איכות סטודיו בעיצוב נוח ומחיר משתלם.</p>

<div class="features-grid">
<div class="feature">
<h3>🎵 באס עוצמתי ומדויק</h3>
<p>דרייברים דינמיים 10mm לצלילים עמוקים ועשירים</p>
</div>
<div class="feature">
<h3>🔇 ביטול רעשים פסיבי</h3>
<p>איזולציה אקוסטית מושלמת מהסביבה</p>
</div>
<div class="feature">
<h3>😌 נוחות לשעות ארוכות</h3>
<p>עיצוב ארגונומי עם 3 גדלי קצפיות סיליקון</p>
</div>
<div class="feature">
<h3>🔌 כבל נתיק</h3>
<p>קל להחלפה ושדרוג</p>
</div>
</div>

<h3>📦 מה באריזה?</h3>
<ul>
<li>אוזניות KZ EDX PRO</li>
<li>3 זוגות קצפיות (S/M/L)</li>
<li>כבל עם מיקרופון מובנה</li>
<li>נרתיק נשיאה מהודר</li>
</ul>

<div class="warranty-badge">
<span>✅ אחריות שנה מלאה</span>
<span>🚚 משלוח חינם מעל ₪199</span>
</div>
</div>`,
    price: 49.99,
    category: "אוזניות",
    subcategory: "אוזניות In-Ear",
    images: [],
    inStock: true,
    stockQuantity: 50,
    attributes: {
      "סוג": "In-Ear Monitor",
      "דרייבר": "דינמי 10mm",
      "עכבה": "16Ω",
      "רגישות": "112dB",
      "אורך כבל": "1.2 מטר"
    }
  },
  {
    id: "2159",
    sku: "XIAOMI-BONE-S10",
    title: "אוזניות הולכת עצם Xiaomi Mijia S10 - עמידות במים IPX8 לשחייה וספורט",
    shortDescription: "אוזניות ספורט אלחוטיות עם טכנולוגיית הולכת עצם מתקדמת, Bluetooth 5.4, זיכרון מובנה 32GB ועמידות במים IPX8. מושלמות לשחייה, ריצה ורכיבה.",
    description: `<div class="product-description rtl">
<h2>Xiaomi Mijia Bone Conduction S10 - החירות לשמוע הכל</h2>
<p>הטכנולוגיה המתקדמת ביותר לספורטאים! אוזניות שמשאירות את האוזניים פתוחות לסביבה בזמן שאתם נהנים ממוזיקה באיכות גבוהה.</p>

<div class="highlight-box">
<h3>💪 למה טכנולוגיית הולכת עצם?</h3>
<ul>
<li><strong>בטיחות מקסימלית</strong> - שומעים את הסביבה בזמן פעילות</li>
<li><strong>נוחות ללא תחרות</strong> - לא נכנסות לתוך האוזן</li>
<li><strong>היגיינה מושלמת</strong> - אידיאלי לאימונים אינטנסיביים</li>
<li><strong>ללא לחץ על עצב האוזן</strong> - מתאים לשימוש ממושך</li>
</ul>
</div>

<div class="features-grid">
<div class="feature waterproof">
<h3>🏊 עמידות IPX8 - לשחייה אמיתית</h3>
<ul>
<li>עמידות בעומק עד 20 מטר</li>
<li>מצב MP3 עם 32GB זיכרון מובנה</li>
<li>אין צורך בטלפון בבריכה!</li>
</ul>
</div>
<div class="feature battery">
<h3>🔋 סוללה עוצמתית</h3>
<ul>
<li>עד 8 שעות השמעה רציפה</li>
<li>טעינה מהירה USB-C</li>
<li>Bluetooth 5.4 יציב וחסכוני</li>
</ul>
</div>
</div>

<h3>🎨 צבעים זמינים</h3>
<p class="color-options">שחור | לבן | אדום | ירוק</p>

<div class="warranty-badge">
<span>✅ אחריות יבואן רשמי</span>
<span>🚚 משלוח מהיר</span>
</div>
</div>`,
    price: 138.83,
    compareAtPrice: 179.00,
    category: "אוזניות",
    subcategory: "אוזניות ספורט",
    images: [
      "https://techforyou.co.il/wp-content/uploads/https://ae01.alicdn.com/kf/S5f5311e5f4c14ff19587dd5efe14992fW/Xiaomi-Mijia-Bone-Conduction-IPX8-Bluetooth-5-4.jpg",
      "https://techforyou.co.il/wp-content/uploads/https://ae01.alicdn.com/kf/S3baf4ae69fb949e3b5bd49a78125e514b/Xiaomi-Mijia-Bone-Conduction-IPX8-Bluetooth-5-4.jpg",
      "https://techforyou.co.il/wp-content/uploads/https://ae01.alicdn.com/kf/S13da158845a5438785927a3dcae0623fE/Xiaomi-Mijia-Bone-Conduction-IPX8-Bluetooth-5-4.jpg"
    ],
    variants: [
      { id: "2189", sku: "XIAOMI-BONE-CABLE", name: "כבל טעינה", price: 35.35, attributes: { "צבע": "שחור" }, stockQuantity: 0 },
      { id: "2190", sku: "XIAOMI-BONE-WHITE", name: "לבן", price: 138.83, attributes: { "צבע": "לבן" }, stockQuantity: 2, image: "https://techforyou.co.il/wp-content/uploads/https://ae01.alicdn.com/kf/S1d7e15189ed54f56b06908e80686c46fu/Xiaomi-Mijia-Bone-Conduction-IPX8-Bluetooth-5-4.jpg" },
      { id: "2191", sku: "XIAOMI-BONE-GREEN", name: "ירוק", price: 138.83, attributes: { "צבע": "ירוק" }, stockQuantity: 0, image: "https://techforyou.co.il/wp-content/uploads/https://ae01.alicdn.com/kf/S907b22e44f8e409d88aa0e61db095d5fx/Xiaomi-Mijia-Bone-Conduction-IPX8-Bluetooth-5-4.jpg" },
      { id: "2192", sku: "XIAOMI-BONE-BLACK", name: "שחור", price: 138.83, attributes: { "צבע": "שחור" }, stockQuantity: 9, image: "https://techforyou.co.il/wp-content/uploads/https://ae01.alicdn.com/kf/Sc8275bec4f274a25af33b48791a3c457s/Xiaomi-Mijia-Bone-Conduction-IPX8-Bluetooth-5-4.jpg" },
      { id: "2193", sku: "XIAOMI-BONE-RED", name: "אדום", price: 138.83, attributes: { "צבע": "אדום" }, stockQuantity: 2, image: "https://techforyou.co.il/wp-content/uploads/https://ae01.alicdn.com/kf/S9480d804f7f64c0c8de53f60ce137cd2y/Xiaomi-Mijia-Bone-Conduction-IPX8-Bluetooth-5-4.jpg" }
    ],
    inStock: true,
    stockQuantity: 13,
    attributes: {
      "טכנולוגיה": "הולכת עצם (Bone Conduction)",
      "בלוטות'": "5.4",
      "עמידות במים": "IPX8 (עד 20 מטר)",
      "זיכרון מובנה": "32GB",
      "סוללה": "עד 8 שעות"
    }
  },

  // ===============================
  // רשת ובית חכם
  // ===============================
  {
    id: "2149",
    sku: "XIAOMI-WIFI-PRO",
    title: "מגבר WiFi שיאומי Pro - הרחבת טווח רשת 300Mbps עם 2 אנטנות",
    shortDescription: "מרחיב טווח אלחוטי מבית Xiaomi (Mi) עם 2 אנטנות חיצוניות חזקות, מהירות 300Mbps והתקנת Plug & Play. פתרון מושלם לכיסוי WiFi בכל הבית והמשרד.",
    description: `<div class="product-description rtl">
<h2>מגבר WiFi שיאומי Pro - אינטרנט מהיר בכל פינה</h2>
<p>נמאס לכם מנקודות מתות ברשת? מגבר ה-WiFi של שיאומי יפתור את הבעיה תוך דקות!</p>

<div class="features-grid">
<div class="feature">
<h3>📶 ביצועים מרשימים</h3>
<ul>
<li><strong>מהירות 300Mbps</strong> - מספיק לסטרימינג HD ומשחקים</li>
<li><strong>2 אנטנות חיצוניות</strong> - כיסוי מקסימלי</li>
<li><strong>טווח הרחבה עד 100 מ"ר</strong> - כל הבית מכוסה</li>
</ul>
</div>
<div class="feature">
<h3>⚡ התקנה פשוטה בשלושה שלבים</h3>
<ol>
<li>חברו לשקע חשמל</li>
<li>לחצו על כפתור WPS</li>
<li>מוכן לשימוש!</li>
</ol>
</div>
</div>

<div class="highlight-box">
<h3>💡 תכונות חכמות</h3>
<ul>
<li>מצב שינה חכם לחיסכון בחשמל</li>
<li>תואם לכל סוגי הנתבים</li>
<li>עיצוב קומפקטי ואלגנטי</li>
<li>נורית LED לזיהוי עוצמת אות</li>
</ul>
</div>

<h3>📦 מה באריזה?</h3>
<ul>
<li>מגבר WiFi Pro שיאומי</li>
<li>מדריך התקנה בעברית</li>
<li>אחריות יצרן</li>
</ul>

<div class="warranty-badge">
<span>✅ אחריות שנה מלאה</span>
<span>🔌 Plug & Play</span>
</div>
</div>`,
    price: 89.99,
    category: "רשת",
    subcategory: "מרחיבי טווח",
    images: [],
    inStock: true,
    stockQuantity: 25,
    attributes: {
      "תדר": "2.4GHz",
      "מהירות": "300Mbps",
      "אנטנות": "2 חיצוניות",
      "תקן": "802.11 b/g/n",
      "מותג": "Xiaomi (Mi)"
    }
  },

  // ===============================
  // כבלים ומתאמים
  // ===============================
  {
    id: "2303",
    sku: "HDMI-WIRELESS-50M",
    title: "משדר HDMI אלחוטי 50 מטר - סטרימינג 1080P ללא כבלים",
    shortDescription: "ערכת משדר ומקלט HDMI אלחוטית מקצועית עם טווח עד 50 מטר, תמיכה מלאה ב-1080P@60Hz והשהיה מינימלית. פתרון מושלם לפרויקטורים, חדרי ישיבות וסלונים.",
    description: `<div class="product-description rtl">
<h2>משדר HDMI אלחוטי VIKEFON - חופש ממגבלות הכבלים</h2>
<p>שדרו וידאו באיכות גבוהה עד 50 מטר ללא כבלים! פתרון מושלם לחדרי ישיבות, סלונים וחללי עבודה.</p>

<div class="features-grid">
<div class="feature">
<h3>📺 איכות תמונה מושלמת</h3>
<ul>
<li><strong>1080P@60Hz</strong> - וידאו חלק וברור</li>
<li><strong>טווח 50 מטר</strong> - גם דרך קירות</li>
<li><strong>השהיה מינימלית</strong> - מתאים גם לגיימינג</li>
</ul>
</div>
<div class="feature">
<h3>🔌 התקנה קלה</h3>
<ol>
<li>חברו TX למקור (מחשב/קונסולה)</li>
<li>חברו RX לטלוויזיה/פרויקטור</li>
<li>מתחבר אוטומטית!</li>
</ol>
</div>
</div>

<div class="use-cases">
<h3>💼 שימושים מגוונים</h3>
<div class="use-case-grid">
<div class="use-case">🏢 חדרי ישיבות ומצגות</div>
<div class="use-case">📺 סטרימינג לטלוויזיה</div>
<div class="use-case">🎬 חיבור פרויקטור</div>
<div class="use-case">🎮 משחקים על מסך גדול</div>
</div>
</div>

<h3>📦 תכולת האריזה</h3>
<ul>
<li>משדר TX</li>
<li>מקלט RX</li>
<li>2 כבלי USB לחשמל</li>
<li>מדריך הפעלה</li>
</ul>

<div class="warranty-badge">
<span>✅ אחריות שנה</span>
<span>📡 CE/FCC/RoHS</span>
</div>
</div>`,
    price: 218.41,
    category: "כבלים",
    subcategory: "מתאמי HDMI",
    images: [
      "https://techforyou.co.il/wp-content/uploads/2025/10/Sc5c33c4ed06e4aad863e72640fd816f6g.webp",
      "https://techforyou.co.il/wp-content/uploads/2025/10/Sfd5703866a6446b5be56eb56a39c7a6aX.webp",
      "https://techforyou.co.il/wp-content/uploads/2025/10/S44a88e5df5514fe2ab97cae80f0fd8bbo.webp"
    ],
    variants: [
      { id: "2308", sku: "HDMI-TX-RX", name: "משדר + מקלט", price: 218.41, attributes: { "סוג": "RX and TX" }, stockQuantity: 44 },
      { id: "2313", sku: "HDMI-RX-ONLY", name: "מקלט בלבד", price: 107.00, attributes: { "סוג": "ONLY RX" }, stockQuantity: 13 },
      { id: "2319", sku: "HDMI-TX-ONLY", name: "משדר בלבד", price: 152.52, attributes: { "סוג": "ONLY TX" }, stockQuantity: 11 }
    ],
    inStock: true,
    stockQuantity: 68,
    attributes: {
      "רזולוציה": "1080P@60Hz",
      "טווח": "50 מטר",
      "חיבור A": "HDMI",
      "חיבור B": "HDMI",
      "מותג": "VIKEFON"
    }
  },
  {
    id: "2306",
    sku: "USB-C-HUB-8IN1",
    title: "מפצל USB-C 8 ב-1 - Hub מקצועי עם קורא כרטיסים ויציאת אודיו",
    shortDescription: "תחנת עגינה USB-C קומפקטית עם 4 יציאות USB 3.0 מהירות, USB-C PD לטעינה, קורא כרטיסי SD/TF ויציאת אודיו. תואם MacBook, Windows וכל מכשיר USB-C.",
    description: `<div class="product-description rtl">
<h2>מפצל USB-C 8 ב-1 - הכל מיציאה אחת</h2>
<p>הפכו את ה-USB-C היחיד שלכם למרכז קישוריות מלא! מושלם ללפטופים מודרניים עם יציאות מוגבלות.</p>

<div class="ports-showcase">
<h3>🔌 8 יציאות בהתקן אחד קומפקטי</h3>
<div class="port-grid">
<div class="port"><strong>4× USB 3.0</strong> - העברה מהירה 5Gbps</div>
<div class="port"><strong>1× USB-C PD</strong> - טעינה עד 100W</div>
<div class="port"><strong>קורא SD</strong> - לצלמים</div>
<div class="port"><strong>קורא TF/MicroSD</strong></div>
<div class="port"><strong>יציאת אודיו 3.5mm</strong></div>
</div>
</div>

<div class="compatibility">
<h3>💻 תאימות מלאה</h3>
<ul>
<li>MacBook Pro / Air (כל הדורות)</li>
<li>iPad Pro עם USB-C</li>
<li>לפטופים Windows עם USB-C</li>
<li>סמארטפונים תומכי OTG</li>
<li>Surface, Dell XPS, ThinkPad</li>
</ul>
</div>

<div class="features-grid">
<div class="feature">
<h3>⚡ ביצועים</h3>
<ul>
<li>העברת קבצים מהירה</li>
<li>טעינה Pass-Through</li>
<li>חיבור מספר התקנים במקביל</li>
</ul>
</div>
<div class="feature">
<h3>✨ עיצוב</h3>
<ul>
<li>אלומיניום פרימיום</li>
<li>קל ונייד</li>
<li>כבל קצר ועמיד</li>
</ul>
</div>
</div>

<div class="warranty-badge">
<span>✅ אחריות שנה</span>
<span>🎨 צבע: אפור</span>
</div>
</div>`,
    price: 24.55,
    category: "מתאמים",
    subcategory: "Hubs USB",
    images: [
      "https://techforyou.co.il/wp-content/uploads/2025/10/S60c531e40a2849f188b38fca3ab7e79dw.webp",
      "https://techforyou.co.il/wp-content/uploads/2025/10/S080c875ecfdc43adb70b1bd80b457009P.webp"
    ],
    inStock: true,
    stockQuantity: 16,
    attributes: {
      "יציאות": "8",
      "חיבור": "USB-C",
      "USB סטנדרט": "3.0",
      "אורך כבל": "15cm",
      "מותג": "IPUMYNO"
    }
  },

  // ===============================
  // מקלדות גיימינג
  // ===============================
  {
    id: "2154",
    sku: "AJAZZ-AK820-PRO",
    title: "מקלדת מכנית Ajazz AK820 Pro - גיימינג Tri-Mode עם מסך TFT ו-Hot-Swap",
    shortDescription: "מקלדת גיימינג מכנית 75% עם Bluetooth 5.1, 2.4G ו-USB-C, מסך TFT צבעוני, גלגלת ווליום מתכתית, תאורת RGB והחלפת סוויצ'ים חמה.",
    description: `<div class="product-description rtl">
<h2>Ajazz AK820 Pro - המקלדת שתשנה את חוויית הגיימינג</h2>
<p>מקלדת מכנית ברמה אחרת! שילוב מושלם של ביצועים מקצועיים, נוחות והתאמה אישית מלאה.</p>

<div class="hero-features">
<div class="hero-feature">
<h3>🎮 Tri-Mode - 3 דרכי חיבור</h3>
<ul>
<li><strong>Bluetooth 5.1</strong> - לטאבלטים וטלפונים</li>
<li><strong>2.4G אלחוטי</strong> - לגיימינג ללא השהיה</li>
<li><strong>USB-C חוטי</strong> - לתחרויות</li>
</ul>
</div>
<div class="hero-feature">
<h3>📺 מסך TFT צבעוני</h3>
<ul>
<li>תצוגת סטטוס סוללה</li>
<li>שעון ותאריך</li>
<li>מצב חיבור</li>
<li>התאמה אישית מלאה</li>
</ul>
</div>
</div>

<div class="features-grid">
<div class="feature">
<h3>🔧 Hot-Swap</h3>
<p>החלפת סוויצ'ים ללא הלחמה! תמיכה ב-3/5 פינים - בחרו את התחושה המושלמת עבורכם.</p>
</div>
<div class="feature">
<h3>🎚️ גלגלת מתכת</h3>
<p>שליטה נוחה בעוצמת קול ותפקודים נוספים.</p>
</div>
<div class="feature">
<h3>🌈 RGB מלא</h3>
<p>1.6 מיליון צבעים, 20+ פרופילים, South-Facing LEDs.</p>
</div>
<div class="feature">
<h3>🔋 סוללה 4000mAh</h3>
<p>שבועות של שימוש בטעינה אחת!</p>
</div>
</div>

<div class="specs-box">
<h3>📋 מפרט טכני</h3>
<ul>
<li><strong>פריסה:</strong> 75% (81 מקשים)</li>
<li><strong>מבנה:</strong> Gasket Mount</li>
<li><strong>מקשים:</strong> PBT OEM Profile</li>
<li><strong>Anti-Ghosting:</strong> מלא</li>
<li><strong>תאימות:</strong> Windows / Mac</li>
</ul>
</div>

<div class="warranty-badge">
<span>✅ אחריות יבואן</span>
<span>🎮 Pro Gamer Choice</span>
</div>
</div>`,
    price: 199.00,
    category: "מקלדות",
    subcategory: "מקלדות מכניות",
    images: [],
    inStock: true,
    stockQuantity: 20,
    attributes: {
      "פריסה": "75% (81 מקשים)",
      "חיבור": "Tri-Mode (BT/2.4G/USB-C)",
      "סוללה": "4000mAh",
      "RGB": "South-Facing",
      "Hot-Swap": "כן (3/5 פינים)"
    }
  },

  // ===============================
  // כרטיסי זיכרון
  // ===============================
  {
    id: "2731",
    sku: "SANDISK-MICRO-SD",
    title: "כרטיס זיכרון SanDisk Ultra - MicroSD מהיר A1 Class 10 לסמארטפון ומצלמה",
    shortDescription: "כרטיס MicroSD מקורי SanDisk Ultra עם מהירות קריאה עד 100MB/s, סיווג A1 לאפליקציות, Class 10 U1 לוידאו HD. מתאים לסמארטפונים, מצלמות ורחפנים.",
    description: `<div class="product-description rtl">
<h2>SanDisk Ultra - הזיכרון שאפשר לסמוך עליו</h2>
<p>מותג מספר 1 בעולם! כרטיסי זיכרון SanDisk Ultra מציעים אמינות ומהירות ללא תחרות.</p>

<div class="speed-showcase">
<h3>⚡ מהירות מרשימה</h3>
<div class="speed-grid">
<div class="speed-item"><strong>100MB/s</strong><br/>קריאה</div>
<div class="speed-item"><strong>Class 10</strong><br/>וידאו</div>
<div class="speed-item"><strong>A1</strong><br/>אפליקציות</div>
<div class="speed-item"><strong>U1</strong><br/>Full HD</div>
</div>
</div>

<div class="compatibility">
<h3>📱 מתאים ל...</h3>
<div class="device-grid">
<div class="device">סמארטפונים Android</div>
<div class="device">מצלמות דיגיטליות</div>
<div class="device">מצלמות רכב (Dash Cam)</div>
<div class="device">מצלמות אבטחה</div>
<div class="device">Nintendo Switch</div>
<div class="device">רחפנים</div>
</div>
</div>

<div class="capacity-options">
<h3>💾 נפחים זמינים</h3>
<ul>
<li><strong>32GB</strong> - לשימוש בסיסי ₪21.75</li>
<li><strong>64GB</strong> - מומלץ לרוב המשתמשים ₪25.74</li>
<li><strong>128GB</strong> - לצלמים ויוצרי תוכן ₪69.17</li>
<li><strong>256GB</strong> - לאחסון מקסימלי ₪119.51</li>
</ul>
</div>

<div class="warranty-badge">
<span>✅ אחריות יצרן מלאה</span>
<span>🔒 מקורי SanDisk</span>
</div>
</div>`,
    price: 21.75,
    category: "אחסון חיצוני",
    subcategory: "כרטיסי זיכרון",
    images: [
      "https://techforyou.co.il/wp-content/uploads/2025/10/S7b9aff45a8894b809f0286c1dc433028U.webp",
      "https://techforyou.co.il/wp-content/uploads/2025/10/S17902cccbd6d476e9f81122a838db8c7A.webp"
    ],
    variants: [
      { id: "2742", sku: "SANDISK-32GB", name: "32GB", price: 21.75, attributes: { "נפח": "32GB" }, stockQuantity: 287 },
      { id: "2747", sku: "SANDISK-64GB", name: "64GB", price: 25.74, attributes: { "נפח": "64GB" }, stockQuantity: 915 },
      { id: "2753", sku: "SANDISK-128GB", name: "128GB", price: 69.17, attributes: { "נפח": "128GB" }, stockQuantity: 234 },
      { id: "2737", sku: "SANDISK-256GB", name: "256GB", price: 119.51, attributes: { "נפח": "256GB" }, stockQuantity: 37 }
    ],
    inStock: true,
    stockQuantity: 1473,
    attributes: {
      "מותג": "SanDisk",
      "סוג": "MicroSDXC",
      "מהירות קריאה": "עד 100MB/s",
      "Class": "10 (U1/A1/V10)",
      "אחריות": "יצרן"
    }
  },

  // ===============================
  // עכברים גיימינג
  // ===============================
  {
    id: "3117",
    sku: "ATTACK-SHARK-X6",
    title: "עכבר גיימינג Attack Shark X6 - חיישן PAW3395 עם בסיס טעינה מגנטי RGB",
    shortDescription: "עכבר גיימינג אלחוטי Tri-Mode מקצועי עם חיישן PAW3395 (26,000 DPI), בסיס טעינה מגנטי עם טבעת RGB, משקל 55 גרם בלבד וסוויצ'ים HUANO 80M.",
    description: `<div class="product-description rtl">
<h2>Attack Shark X6 - עכבר הגיימינג הבא שלכם</h2>
<p>חיישן פלאגשיפ PAW3395 בעכבר קל במיוחד עם בסיס טעינה מגנטי מרהיב! הכל בעיצוב אגרסיבי שמתאים לגיימרים רציניים.</p>

<div class="sensor-showcase">
<h3>🎯 חיישן PAW3395 - הטוב ביותר</h3>
<div class="sensor-stats">
<div class="stat"><strong>26,000</strong><br/>DPI</div>
<div class="stat"><strong>650</strong><br/>IPS</div>
<div class="stat"><strong>50G</strong><br/>האצה</div>
</div>
</div>

<div class="features-grid">
<div class="feature">
<h3>⚡ Tri-Mode חיבור</h3>
<ul>
<li><strong>2.4G</strong> - ללא השהיה</li>
<li><strong>Bluetooth 5.2</strong> - לניידות</li>
<li><strong>USB-C</strong> - לתחרויות</li>
</ul>
</div>
<div class="feature">
<h3>🪶 משקל 55g בלבד</h3>
<ul>
<li>קל כנוצה</li>
<li>תנועה מהירה ומדויקת</li>
<li>פחות עייפות ביד</li>
</ul>
</div>
<div class="feature">
<h3>🔋 בסיס טעינה מגנטי</h3>
<ul>
<li>טעינה מהירה ונוחה</li>
<li>טבעת RGB מרהיבה</li>
<li>עד 65 שעות עבודה</li>
</ul>
</div>
<div class="feature">
<h3>🖱️ סוויצ'ים HUANO</h3>
<ul>
<li>80 מיליון לחיצות</li>
<li>Pink Dot - תחושה מעולה</li>
</ul>
</div>
</div>

<div class="color-options">
<h3>🎨 צבעים זמינים</h3>
<p>שחור | לבן | אדום</p>
</div>

<h3>📦 מה באריזה?</h3>
<ul>
<li>עכבר Attack Shark X6</li>
<li>מקלט 2.4G USB</li>
<li>בסיס טעינה מגנטי</li>
<li>כבל USB-C</li>
<li>מדבקות אנטי-סליפ</li>
<li>מדריך משתמש</li>
</ul>

<div class="warranty-badge">
<span>✅ אחריות שנה</span>
<span>🎮 Esports Ready</span>
</div>
</div>`,
    price: 187.23,
    category: "עכברים",
    subcategory: "עכברי גיימינג",
    images: [
      "https://techforyou.co.il/wp-content/uploads/2025/12/Sf6bd97f712ef45bab3f9039c395109941.webp",
      "https://techforyou.co.il/wp-content/uploads/2025/12/S808d43a754ab4870bfd8d55ceac82c23e.webp"
    ],
    variants: [
      { id: "3122", sku: "X6-RED", name: "אדום", price: 191.06, attributes: { "צבע": "אדום" }, stockQuantity: 25 },
      { id: "3129", sku: "X6-BLACK", name: "שחור", price: 187.23, attributes: { "צבע": "שחור" }, stockQuantity: 14 },
      { id: "3130", sku: "X6-WHITE", name: "לבן", price: 187.23, attributes: { "צבע": "לבן" }, stockQuantity: 13 }
    ],
    inStock: true,
    stockQuantity: 52,
    attributes: {
      "חיישן": "PixArt PAW3395",
      "DPI": "800-26,000",
      "Polling Rate": "125-1000Hz",
      "משקל": "55g±3g",
      "סוויצ'ים": "HUANO Pink 80M"
    }
  },

  // ===============================
  // רמקולים
  // ===============================
  {
    id: "3088",
    sku: "ZEALOT-S32-PRO",
    title: "רמקול בלוטות' Zealot S32 Pro - רמקול נייד עמיד במים IPX6 עם סאבוופר",
    shortDescription: "רמקול אלחוטי עוצמתי עם באס סאבוופר עמוק, עמידות במים IPX6, אפשרות לחיבור כפול (Dual Pairing) וסוללה 3600mAh לעד 12 שעות נגינה.",
    description: `<div class="product-description rtl">
<h2>Zealot S32 Pro - סאונד עוצמתי בכל מקום</h2>
<p>קחו את המסיבה לכל מקום! רמקול חזק ועמיד שלא מפחד ממים וחול.</p>

<div class="sound-showcase">
<h3>🔊 סאונד מרשים</h3>
<div class="sound-features">
<div class="sound-feature">
<strong>באס סאבוופר</strong>
<p>עמוק ועוצמתי</p>
</div>
<div class="sound-feature">
<strong>20W עוצמה</strong>
<p>למסיבות</p>
</div>
<div class="sound-feature">
<strong>360° סאונד</strong>
<p>לכל הכיוונים</p>
</div>
</div>
</div>

<div class="features-grid">
<div class="feature">
<h3>💧 עמידות IPX6</h3>
<ul>
<li>עמיד בהתזת מים חזקה</li>
<li>מושלם לחוף ולבריכה</li>
<li>עמיד באבק וחול</li>
</ul>
</div>
<div class="feature">
<h3>🔗 Dual Pairing</h3>
<ul>
<li>חברו 2 רמקולים לסטריאו</li>
<li>כפילו את העוצמה!</li>
</ul>
</div>
<div class="feature">
<h3>🔋 סוללה 3600mAh</h3>
<ul>
<li>עד 12 שעות נגינה</li>
<li>טעינה USB-C מהירה</li>
</ul>
</div>
<div class="feature">
<h3>🎨 עיצוב</h3>
<ul>
<li>קומפקטי וחזק</li>
<li>רצועת נשיאה</li>
<li>כפתורי שליטה נוחים</li>
</ul>
</div>
</div>

<div class="color-options">
<h3>🎨 צבעים זמינים</h3>
<p>שחור | אפור | הסוואה</p>
</div>

<div class="warranty-badge">
<span>✅ אחריות שנה</span>
<span>🏖️ Summer Ready</span>
</div>
</div>`,
    price: 127.33,
    category: "רמקולים",
    subcategory: "רמקולים ניידים",
    images: [
      "https://techforyou.co.il/wp-content/uploads/2025/12/S2f74b96f697b40af92aeb22f46786e027.webp"
    ],
    variants: [
      { id: "3091", sku: "S32-BLACK", name: "שחור", price: 127.33, attributes: { "צבע": "שחור" }, stockQuantity: 45 },
      { id: "3094", sku: "S32-CAMO", name: "הסוואה", price: 127.33, attributes: { "צבע": "הסוואה" }, stockQuantity: 73 },
      { id: "3100", sku: "S32-GREY", name: "אפור", price: 130.35, attributes: { "צבע": "אפור" }, stockQuantity: 0 }
    ],
    inStock: true,
    stockQuantity: 118,
    attributes: {
      "עוצמה": "20W",
      "סוללה": "3600mAh",
      "עמידות": "IPX6",
      "Bluetooth": "5.0",
      "זמן נגינה": "עד 12 שעות"
    }
  },

  // ===============================
  // קירור למחשב
  // ===============================
  {
    id: "3105",
    sku: "COOLCOLD-F2PLUS",
    title: "משטח קירור למחשב נייד COOLCOLD - 5 מאווררים שקטים עם מחזיק טלפון",
    shortDescription: "מעמד קירור מקצועי ללפטופ 12-17 אינץ' עם 5 מאווררים שקטים, רשת מתכת חלת דבש, 5 זוויות הטיה, מחזיק טלפון מובנה ו-2 יציאות USB.",
    description: `<div class="product-description rtl">
<h2>COOLCOLD F2 Plus - שמרו על הלפטופ קריר ומהיר</h2>
<p>מנעו התחממות יתר ושמרו על ביצועים מקסימליים! משטח קירור מקצועי שישמור על המחשב שלכם בטמפרטורה אופטימלית.</p>

<div class="cooling-showcase">
<h3>❄️ קירור יעיל במיוחד</h3>
<div class="cooling-stats">
<div class="stat"><strong>5</strong><br/>מאווררים</div>
<div class="stat"><strong>-15°C</strong><br/>הורדת חום</div>
<div class="stat"><strong>שקט</strong><br/>במיוחד</div>
</div>
</div>

<div class="features-grid">
<div class="feature">
<h3>🌬️ מערכת קירור</h3>
<ul>
<li>5 מאווררים (1 קטן + 4 גדולים)</li>
<li>רשת מתכת חלת דבש</li>
<li>זרימת אוויר אופטימלית</li>
<li>ווסת מהירות</li>
</ul>
</div>
<div class="feature">
<h3>📐 5 זוויות הטיה</h3>
<ul>
<li>התאמה ארגונומית</li>
<li>נוח להקלדה ממושכת</li>
<li>מתקפל לנשיאה</li>
</ul>
</div>
<div class="feature">
<h3>📱 מחזיק טלפון</h3>
<ul>
<li>נוח לעבודה</li>
<li>הטלפון תמיד בהישג יד</li>
</ul>
</div>
<div class="feature">
<h3>🔌 2 יציאות USB</h3>
<ul>
<li>הרחבת חיבוריות</li>
<li>חיבור אביזרים נוספים</li>
</ul>
</div>
</div>

<div class="compatibility">
<h3>💻 מתאים ללפטופים 12-17"</h3>
<p>MacBook, Dell, HP, Lenovo, ASUS, Acer ועוד</p>
</div>

<div class="specs-box">
<h3>📋 מפרט</h3>
<ul>
<li>מידות: 33.3×25×3.6 ס"מ</li>
<li>משקל: 800 גרם</li>
<li>מהירות: 1500±10% RPM</li>
<li>צריכה: 2.5W</li>
</ul>
</div>

<div class="warranty-badge">
<span>✅ אחריות 24 חודשים</span>
<span>❄️ Keep It Cool</span>
</div>
</div>`,
    price: 123.10,
    category: "אביזרי מחשב",
    subcategory: "קירור",
    images: [
      "https://techforyou.co.il/wp-content/uploads/2025/12/S3e873271946744c496a445d5f04caba4e-scaled.webp",
      "https://techforyou.co.il/wp-content/uploads/2025/12/S3d39d435cdc1491f91d9d1ebc499e9c8y.webp"
    ],
    inStock: true,
    stockQuantity: 92,
    attributes: {
      "מאווררים": "5 (1 קטן + 4 גדולים)",
      "גודל מתאים": "12-17 אינץ'",
      "חומר": "אלומיניום + פלסטיק",
      "USB יציאות": "2",
      "מותג": "COOLCOLD"
    }
  }
];

// Export function to get products by category
export function getProductsByCategory(category: string): EnhancedProduct[] {
  return enhancedProducts.filter(p => p.category === category);
}

// Export function to get product by ID
export function getProductById(id: string): EnhancedProduct | undefined {
  return enhancedProducts.find(p => p.id === id);
}

// Export function to search products
export function searchProducts(query: string): EnhancedProduct[] {
  const lowerQuery = query.toLowerCase();
  return enhancedProducts.filter(p => 
    p.title.toLowerCase().includes(lowerQuery) ||
    p.shortDescription.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery)
  );
}
