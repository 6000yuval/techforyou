// Product Import Utility - Transforms WooCommerce export to optimized Hebrew e-commerce data
import { supabase } from "@/integrations/supabase/client";

interface WooProduct {
  id: string;
  type: string;
  sku: string;
  name: string;
  shortDescription: string;
  description: string;
  regularPrice: string;
  categories: string;
  images: string;
  parentSku: string;
  attributes: Record<string, string>;
}

interface TransformedProduct {
  id: string;
  sku: string;
  title: string;
  short_description: string;
  description: string;
  price: number;
  status: string;
  primary_category_id: string | null;
  primary_subcategory_id: string | null;
  supplier_id: number;
}

// Mapping of English product types to Hebrew selling titles
const productTitleMappings: Record<string, { title: string; shortDesc: string; description: string }> = {
  // Earphones/Headphones
  "KZ EDX PRO": {
    title: "אוזניות KZ EDX PRO - סאונד Hi-Fi מקצועי עם באס עוצמתי",
    shortDesc: "אוזניות In-Ear מקצועיות עם דרייברים דינמיים, באס עמוק וביטול רעשים פסיבי. חוויית שמע סטודיו בכל מקום.",
    description: `<div class="product-description">
<h2>אוזניות KZ EDX PRO - הבחירה של מקצוענים</h2>
<p>חוויית שמע שלא תשכחו! אוזניות KZ EDX PRO מביאות לכם איכות סטודיו בעיצוב נוח ומחיר משתלם.</p>

<h3>🎵 יתרונות מרכזיים</h3>
<ul>
<li><strong>באס עוצמתי ומדויק</strong> - דרייברים דינמיים 10mm לצלילים עמוקים</li>
<li><strong>ביטול רעשים פסיבי</strong> - איזולציה מושלמת מהסביבה</li>
<li><strong>נוחות לשעות ארוכות</strong> - עיצוב ארגונומי עם קצפיות סיליקון</li>
<li><strong>כבל נתיק</strong> - קל להחלפה ושדרוג</li>
<li><strong>מיקרופון מובנה</strong> - לשיחות ברורות</li>
</ul>

<h3>📦 מה באריזה?</h3>
<ul>
<li>אוזניות KZ EDX PRO</li>
<li>3 זוגות קצפיות (S/M/L)</li>
<li>כבל עם מיקרופון</li>
<li>נרתיק נשיאה</li>
</ul>

<h3>✅ אחריות שנה מלאה</h3>
</div>`
  },
  "Bone Conduction": {
    title: "אוזניות הולכת עצם Xiaomi Mijia - עמידות במים IPX8 לשחייה וספורט",
    shortDesc: "אוזניות ספורט אלחוטיות עם טכנולוגיית הולכת עצם, Bluetooth 5.4 וזיכרון מובנה 32GB. מושלמות לשחייה, ריצה ורכיבה.",
    description: `<div class="product-description">
<h2>אוזניות הולכת עצם Xiaomi - החירות לשמוע הכל</h2>
<p>הטכנולוגיה המתקדמת ביותר לספורטאים! אוזניות שמשאירות את האוזניים פתוחות לסביבה בזמן שאתם נהנים ממוזיקה באיכות גבוהה.</p>

<h3>💪 למה הולכת עצם?</h3>
<ul>
<li><strong>בטיחות מקסימלית</strong> - שומעים את הסביבה בזמן הריצה</li>
<li><strong>נוחות ללא תחרות</strong> - לא נכנסות לתוך האוזן</li>
<li><strong>היגיינה מושלמת</strong> - אידיאלי לאימונים אינטנסיביים</li>
</ul>

<h3>🏊 עמידות IPX8 - לשחייה אמיתית</h3>
<ul>
<li>עמידות בעומק עד 20 מטר</li>
<li>מצב MP3 עם 32GB זיכרון מובנה</li>
<li>אין צורך בטלפון בבריכה!</li>
</ul>

<h3>🔋 סוללה עוצמתית</h3>
<ul>
<li>עד 8 שעות השמעה רציפה</li>
<li>טעינה מהירה USB-C</li>
<li>Bluetooth 5.4 יציב</li>
</ul>

<h3>🎨 צבעים זמינים</h3>
<p>שחור | לבן | אדום | ירוק</p>

<h3>✅ אחריות יבואן רשמי</h3>
</div>`
  },
  "WiFi Pro": {
    title: "מגבר WiFi שיאומי Pro - הרחבת טווח רשת 300Mbps עם 2 אנטנות",
    shortDesc: "מרחיב טווח אלחוטי מבית Xiaomi עם 2 אנטנות חיצוניות, מהירות 300Mbps והתקנה קלה. פתרון מושלם לכיסוי WiFi בכל הבית.",
    description: `<div class="product-description">
<h2>מגבר WiFi שיאומי Pro - אינטרנט מהיר בכל פינה</h2>
<p>נמאס לכם מנקודות מתות ברשת? מגבר ה-WiFi של שיאומי יפתור את הבעיה תוך דקות!</p>

<h3>📶 ביצועים מרשימים</h3>
<ul>
<li><strong>מהירות 300Mbps</strong> - מספיק לסטרימינג ב-HD</li>
<li><strong>2 אנטנות חיצוניות</strong> - כיסוי מקסימלי</li>
<li><strong>טווח הרחבה עד 100 מ"ר</strong></li>
</ul>

<h3>⚡ התקנה פשוטה</h3>
<ul>
<li>חברו לשקע</li>
<li>לחצו WPS</li>
<li>מוכן לשימוש!</li>
</ul>

<h3>💡 חכם ויעיל</h3>
<ul>
<li>מצב שינה חכם לחיסכון בחשמל</li>
<li>תואם לכל הנתבים</li>
<li>עיצוב קומפקטי ואלגנטי</li>
</ul>

<h3>✅ אחריות שנה</h3>
</div>`
  },
  "MP3": {
    title: "נגן MP3 בלוטות' עם מסך LCD - נגן מוזיקה דיגיטלי HiFi",
    shortDesc: "נגן MP3 מתקדם עם מסך צבעוני, Bluetooth 5.0, תמיכה בכרטיס זיכרון עד 128GB וסוללה עד 50 שעות. איכות שמע Lossless.",
    description: `<div class="product-description">
<h2>נגן MP3 בלוטות' - מוזיקה באיכות שלא הכרתם</h2>
<p>שחררו את עצמכם מהטלפון! נגן MP3 קומפקטי ועוצמתי שמביא את כל המוזיקה שלכם לכל מקום.</p>

<h3>🎵 איכות שמע מקצועית</h3>
<ul>
<li><strong>פורמט Lossless</strong> - צליל ללא דחיסה</li>
<li><strong>Bluetooth 5.0</strong> - חיבור יציב לאוזניות</li>
<li><strong>יציאת AUX</strong> - לרמקולים ולרכב</li>
</ul>

<h3>📱 תכונות מתקדמות</h3>
<ul>
<li>מסך TFT צבעוני</li>
<li>תמיכה בכרטיס עד 128GB</li>
<li>הקלטת קול</li>
<li>רדיו FM</li>
<li>קריאת E-Books</li>
</ul>

<h3>🔋 סוללה אדירה</h3>
<ul>
<li>עד 50 שעות השמעה!</li>
<li>טעינה USB מהירה</li>
</ul>

<h3>✅ אחריות שנה מלאה</h3>
</div>`
  },
  "AK820": {
    title: "מקלדת מכנית Ajazz AK820 Pro - גיימינג Tri-Mode עם RGB ו-Hot-Swap",
    shortDesc: "מקלדת גיימינג מכנית 75% עם Bluetooth 5.1, 2.4G ו-USB-C, מסך TFT צבעוני, גלגלת ווליום מתכתית והחלפת סוויצ'ים חמה.",
    description: `<div class="product-description">
<h2>Ajazz AK820 Pro - המקלדת שתשנה את המשחק</h2>
<p>מקלדת גיימינג ברמה אחרת! שילוב מושלם של ביצועים, נוחות והתאמה אישית.</p>

<h3>🎮 ביצועי גיימינג מקצועיים</h3>
<ul>
<li><strong>Tri-Mode</strong> - Bluetooth, 2.4G ו-USB לפי בחירה</li>
<li><strong>Anti-Ghosting מלא</strong> - כל לחיצה נרשמת</li>
<li><strong>מבנה Gasket</strong> - הקלדה שקטה ומדויקת</li>
</ul>

<h3>✨ מסך TFT צבעוני</h3>
<ul>
<li>תצוגת סטטוס סוללה</li>
<li>שעון ותאריך</li>
<li>התאמה אישית מלאה</li>
</ul>

<h3>🔧 Hot-Swap</h3>
<ul>
<li>החלפת סוויצ'ים ללא הלחמה</li>
<li>תמיכה ב-3/5 פינים</li>
<li>בחרו את התחושה שלכם</li>
</ul>

<h3>🌈 תאורת RGB</h3>
<ul>
<li>1.6 מיליון צבעים</li>
<li>20+ פרופילים מובנים</li>
<li>South-Facing LEDs</li>
</ul>

<h3>🔋 סוללה 4000mAh</h3>
<p>שבועות של שימוש בטעינה אחת!</p>

<h3>✅ אחריות יבואן</h3>
</div>`
  },
  "HDMI Transmitter": {
    title: "משדר HDMI אלחוטי 50 מטר - סטרימינג 1080P ללא כבלים",
    shortDesc: "ערכת משדר ומקלט HDMI אלחוטית עם טווח 50 מטר, תמיכה ב-1080P@60Hz. מושלם לפרויקטורים, מסכים וטלוויזיות.",
    description: `<div class="product-description">
<h2>משדר HDMI אלחוטי - חופש ממגבלות הכבלים</h2>
<p>שדרו וידאו באיכות גבוהה עד 50 מטר ללא כבלים! פתרון מושלם לחדרי ישיבות, סלונים וחללי עבודה.</p>

<h3>📺 איכות תמונה מושלמת</h3>
<ul>
<li><strong>1080P@60Hz</strong> - וידאו חלק וברור</li>
<li><strong>טווח 50 מטר</strong> - גם דרך קירות</li>
<li><strong>השהיה מינימלית</strong> - מתאים גם לגיימינג</li>
</ul>

<h3>🔌 התקנה פשוטה</h3>
<ul>
<li>חברו TX למקור (מחשב/קונסולה)</li>
<li>חברו RX לטלוויזיה/פרויקטור</li>
<li>מתחבר אוטומטית!</li>
</ul>

<h3>💼 שימושים מגוונים</h3>
<ul>
<li>חדרי ישיבות ומצגות</li>
<li>סטרימינג לטלוויזיה בסלון</li>
<li>חיבור פרויקטור</li>
<li>משחקים על מסך גדול</li>
</ul>

<h3>📦 תכולת האריזה</h3>
<ul>
<li>משדר TX</li>
<li>מקלט RX</li>
<li>כבלי USB לחשמל</li>
<li>מדריך הפעלה</li>
</ul>

<h3>✅ אחריות שנה</h3>
</div>`
  },
  "USB Hub": {
    title: "מפצל USB-C 8 ב-1 - Hub מקצועי עם קורא כרטיסים ויציאת אודיו",
    shortDesc: "תחנת עגינה USB-C עם 4 יציאות USB 3.0, USB-C PD, קורא SD/TF ויציאת אודיו. תואם MacBook, Windows ומכשירי USB-C.",
    description: `<div class="product-description">
<h2>מפצל USB-C 8 ב-1 - הכל מיציאה אחת</h2>
<p>הפכו את ה-USB-C היחיד שלכם למרכז קישוריות מלא! מושלם ללפטופים מודרניים.</p>

<h3>🔌 8 יציאות בהתקן אחד</h3>
<ul>
<li><strong>4× USB 3.0</strong> - העברה מהירה עד 5Gbps</li>
<li><strong>1× USB-C PD</strong> - טעינה עד 100W</li>
<li><strong>קורא SD</strong> - לצלמים ויוצרי תוכן</li>
<li><strong>קורא TF/MicroSD</strong></li>
<li><strong>יציאת אודיו 3.5mm</strong></li>
</ul>

<h3>💻 תאימות מלאה</h3>
<ul>
<li>MacBook Pro/Air</li>
<li>iPad Pro</li>
<li>לפטופים Windows</li>
<li>סמארטפונים USB-C</li>
</ul>

<h3>⚡ ביצועים מרשימים</h3>
<ul>
<li>העברת קבצים מהירה</li>
<li>טעינה Pass-Through</li>
<li>חיבור מספר התקנים במקביל</li>
</ul>

<h3>✅ אחריות שנה</h3>
</div>`
  },
  "SanDisk": {
    title: "כרטיס זיכרון SanDisk - מהירות A1 Class 10 לסמארטפון ומצלמה",
    shortDesc: "כרטיס MicroSD מקורי SanDisk עם מהירות קריאה עד 100MB/s, סיווג A1 לאפליקציות ו-Class 10 לוידאו.",
    description: `<div class="product-description">
<h2>כרטיס זיכרון SanDisk - הזיכרון שאפשר לסמוך עליו</h2>
<p>מותג מספר 1 בעולם! כרטיסי זיכרון SanDisk מציעים אמינות ומהירות ללא תחרות.</p>

<h3>⚡ מהירות מרשימה</h3>
<ul>
<li><strong>קריאה עד 100MB/s</strong></li>
<li><strong>Class 10</strong> - לצילום וידאו רציף</li>
<li><strong>A1</strong> - אופטימיזציה לאפליקציות</li>
<li><strong>U1</strong> - לצילום Full HD</li>
</ul>

<h3>📱 מתאים ל...</h3>
<ul>
<li>סמארטפונים Android</li>
<li>מצלמות דיגיטליות</li>
<li>מצלמות רכב (Dash Cam)</li>
<li>מצלמות אבטחה</li>
<li>קונסולות Nintendo Switch</li>
<li>רחפנים</li>
</ul>

<h3>💾 נפחים זמינים</h3>
<ul>
<li>32GB - לשימוש בסיסי</li>
<li>64GB - מומלץ לרוב המשתמשים</li>
<li>128GB - לצלמים ויוצרי תוכן</li>
<li>256GB - לאחסון מקסימלי</li>
</ul>

<h3>✅ אחריות יצרן מלאה</h3>
</div>`
  },
  "UGREEN": {
    title: "כבל USB-C ל-USB-C מבית UGREEN - טעינה מהירה 100W עם E-Marker",
    shortDesc: "כבל Type-C איכותי עם תמיכה ב-PD 100W, העברת נתונים 480Mbps וצ'יפ E-Marker לטעינה בטוחה. מתאים ל-MacBook, iPad וסמארטפונים.",
    description: `<div class="product-description">
<h2>כבל UGREEN USB-C 100W - טעינה מהירה ובטוחה</h2>
<p>מותג UGREEN מוביל בעולם הכבלים! איכות פרימיום, עמידות גבוהה וביצועים מעולים.</p>

<h3>⚡ טעינה מהירה 100W</h3>
<ul>
<li><strong>PD (Power Delivery)</strong> - טעינה מהירה מקסימלית</li>
<li><strong>צ'יפ E-Marker</strong> - הגנה מפני התחממות</li>
<li><strong>5A זרם</strong> - טעינת MacBook מלאה</li>
</ul>

<h3>🔌 תאימות אוניברסלית</h3>
<ul>
<li>MacBook Pro/Air</li>
<li>iPad Pro</li>
<li>Samsung Galaxy</li>
<li>Google Pixel</li>
<li>Nintendo Switch</li>
</ul>

<h3>💪 בנייה איכותית</h3>
<ul>
<li>קליעת ניילון עמידה</li>
<li>מחברי מתכת מוזהבים</li>
<li>עמידות בכיפוף</li>
<li>אחריות לכל החיים</li>
</ul>

<h3>📏 אורכים זמינים</h3>
<ul>
<li>0.5 מטר - לנייד</li>
<li>1 מטר - סטנדרטי</li>
<li>2 מטר - לנוחות</li>
<li>3 מטר - למרחק</li>
</ul>

<h3>✅ אחריות UGREEN</h3>
</div>`
  },
  "7 Port Hub": {
    title: "מפצל USB 7 יציאות - Hub מהיר USB 3.0 עם חיבור Type-C/USB",
    shortDesc: "מפצל USB עם 7 יציאות USB 3.0 מהירות, תואם Windows/Mac/Linux. זמין בחיבור USB או USB-C.",
    description: `<div class="product-description">
<h2>מפצל 7 יציאות USB - הכל מתחבר!</h2>
<p>צריכים יותר יציאות USB? מפצל איכותי שמרחיב את האפשרויות שלכם.</p>

<h3>🔌 7 יציאות USB 3.0</h3>
<ul>
<li><strong>מהירות עד 5Gbps</strong></li>
<li><strong>תאימות USB 2.0</strong> - לאחור</li>
<li><strong>חיבור מספר התקנים</strong> - במקביל</li>
</ul>

<h3>💻 סוגי חיבור</h3>
<ul>
<li><strong>USB-A</strong> - למחשבים קלאסיים</li>
<li><strong>USB-C</strong> - ללפטופים מודרניים</li>
</ul>

<h3>✅ תאימות מלאה</h3>
<ul>
<li>Windows 10/11</li>
<li>macOS</li>
<li>Linux</li>
<li>Chrome OS</li>
</ul>

<h3>✅ אחריות שנה</h3>
</div>`
  },
  "Webcam": {
    title: "מצלמת רשת 4K Ultra HD - וובקאם מקצועית עם מיקרופון ותאורה",
    shortDesc: "מצלמת וובקאם ברזולוציית 4K עם פוקוס אוטומטי, מיקרופון סטריאו ותאורת LED מובנית. מושלמת לזום, סטרימינג וסרטונים.",
    description: `<div class="product-description">
<h2>מצלמת רשת 4K - תיראו מקצועיים בכל שיחה</h2>
<p>שדרגו את הנוכחות הדיגיטלית שלכם! מצלמת 4K שתגרום לכם להיראות מעולה.</p>

<h3>📹 איכות תמונה מדהימה</h3>
<ul>
<li><strong>רזולוציית 4K Ultra HD</strong></li>
<li><strong>פוקוס אוטומטי מהיר</strong></li>
<li><strong>תיקון אור אוטומטי</strong></li>
<li><strong>זווית רחבה 90°</strong></li>
</ul>

<h3>🎤 שמע קריסטלי</h3>
<ul>
<li>מיקרופון סטריאו מובנה</li>
<li>ביטול רעשי רקע</li>
<li>קליטה עד 3 מטר</li>
</ul>

<h3>💡 תאורת LED מובנית</h3>
<ul>
<li>3 רמות בהירות</li>
<li>טמפרטורת צבע מתכווננת</li>
<li>מושלם לחדרים חשוכים</li>
</ul>

<h3>💻 תאימות אוניברסלית</h3>
<ul>
<li>Zoom, Teams, Google Meet</li>
<li>OBS, Streamlabs</li>
<li>Windows, Mac, Chrome OS</li>
</ul>

<h3>✅ אחריות שנה</h3>
</div>`
  },
  "Speaker": {
    title: "רמקול בלוטות' Zealot S32 Pro - רמקול נייד עמיד במים IPX6",
    shortDesc: "רמקול אלחוטי עוצמתי עם באס סאבוופר, עמידות IPX6, חיבור כפול וסוללה 3600mAh. מושלם לחוף, טיולים ואירועים.",
    description: `<div class="product-description">
<h2>Zealot S32 Pro - סאונד עוצמתי בכל מקום</h2>
<p>קחו את המסיבה לכל מקום! רמקול חזק ועמיד שלא מפחד ממים וחול.</p>

<h3>🔊 סאונד מרשים</h3>
<ul>
<li><strong>באס סאבוופר עמוק</strong></li>
<li><strong>עוצמה 20W</strong></li>
<li><strong>סאונד 360°</strong></li>
</ul>

<h3>💧 עמידות IPX6</h3>
<ul>
<li>עמיד בהתזת מים</li>
<li>מושלם לחוף ולבריכה</li>
<li>עמיד באבק וחול</li>
</ul>

<h3>🔗 חיבור כפול (Dual Pairing)</h3>
<ul>
<li>חברו 2 רמקולים לסטריאו</li>
<li>כפילו את העוצמה!</li>
</ul>

<h3>🔋 סוללה 3600mAh</h3>
<ul>
<li>עד 12 שעות נגינה</li>
<li>טעינה USB-C</li>
</ul>

<h3>🎨 צבעים זמינים</h3>
<p>שחור | אפור | הסוואה</p>

<h3>✅ אחריות שנה</h3>
</div>`
  },
  "Gaming Keyboard FUN60": {
    title: "מקלדת מכנית Akko MonsGeek FUN60 - Rapid Trigger גיימינג 60%",
    shortDesc: "מקלדת גיימינג מגנטית 60% עם Rapid Trigger 0.01mm, 8K Polling Rate, RGB וסוויצ'ים מגנטיים. המקלדת המהירה בעולם.",
    description: `<div class="product-description">
<h2>Akko FUN60 - המקלדת המהירה בעולם</h2>
<p>טכנולוגיית Rapid Trigger מגנטית! מקלדת שמגיבה לפני שסיימתם ללחוץ.</p>

<h3>⚡ Rapid Trigger 0.01mm</h3>
<ul>
<li><strong>תגובה ב-0.01mm</strong> - המהירה בשוק</li>
<li><strong>8K Polling Rate</strong> - 8000Hz תגובה</li>
<li><strong>סוויצ'ים מגנטיים</strong> - רגישות מתכווננת</li>
</ul>

<h3>🎮 לגיימרים רציניים</h3>
<ul>
<li>פורמט 60% קומפקטי</li>
<li>יתרון במשחקי FPS</li>
<li>Strafing מהיר יותר</li>
<li>תנועות מדויקות</li>
</ul>

<h3>🌈 RGB מלא</h3>
<ul>
<li>ARGB per-key</li>
<li>אפקטים מותאמים</li>
<li>סנכרון עם משחקים</li>
</ul>

<h3>⌨️ דגמים זמינים</h3>
<ul>
<li>Pro Wired - חוטי בלבד</li>
<li>Ultra TMR - Tri-Mode אלחוטי</li>
</ul>

<h3>✅ אחריות יבואן</h3>
</div>`
  },
  "Laptop Cooling": {
    title: "משטח קירור למחשב נייד - מאוורר USB עם 5 מפוחים שקטים",
    shortDesc: "מעמד קירור ללפטופ 12-17 אינץ' עם 5 מאווררים שקטים, 5 זוויות הטיה, מחזיק טלפון ו-2 יציאות USB.",
    description: `<div class="product-description">
<h2>משטח קירור COOLCOLD - שמרו על הלפטופ קריר</h2>
<p>מנעו התחממות יתר! משטח קירור שישמור על המחשב שלכם בטמפרטורה אופטימלית.</p>

<h3>❄️ קירור יעיל</h3>
<ul>
<li><strong>5 מאווררים שקטים</strong></li>
<li><strong>רשת מתכת חלת דבש</strong></li>
<li><strong>הורדת טמפרטורה עד 15°C</strong></li>
</ul>

<h3>📐 5 זוויות הטיה</h3>
<ul>
<li>התאמה ארגונומית</li>
<li>נוח להקלדה ארוכה</li>
<li>מתקפל לנשיאה</li>
</ul>

<h3>📱 מחזיק טלפון מובנה</h3>
<ul>
<li>נוח לעבודה</li>
<li>פנוי לשיחות</li>
</ul>

<h3>🔌 2 יציאות USB</h3>
<ul>
<li>הרחבת חיבוריות</li>
<li>ווסת מהירות</li>
</ul>

<h3>💻 מתאים ללפטופים 12-17"</h3>
<ul>
<li>MacBook</li>
<li>Dell, HP, Lenovo, ASUS</li>
<li>כל מחשב נייד</li>
</ul>

<h3>✅ אחריות 24 חודשים</h3>
</div>`
  },
  "Gaming Mouse X6": {
    title: "עכבר גיימינג Attack Shark X6 - חיישן PAW3395 עם בסיס טעינה מגנטי",
    shortDesc: "עכבר גיימינג אלחוטי Tri-Mode עם חיישן PAW3395, 26000 DPI, בסיס טעינה מגנטי RGB ומשקל 55 גרם בלבד.",
    description: `<div class="product-description">
<h2>Attack Shark X6 - עכבר הגיימינג הבא שלכם</h2>
<p>חיישן פלאגשיפ PAW3395 בעכבר קל במיוחד עם בסיס טעינה מגנטי מרהיב!</p>

<h3>🎯 חיישן PAW3395</h3>
<ul>
<li><strong>26,000 DPI</strong> - דיוק מקסימלי</li>
<li><strong>650 IPS</strong> - מעקב מהיר</li>
<li><strong>50G האצה</strong></li>
</ul>

<h3>⚡ Tri-Mode חיבור</h3>
<ul>
<li>2.4G אלחוטי - ללא השהיה</li>
<li>Bluetooth 5.2 - לנייד</li>
<li>USB-C חוטי - לתחרויות</li>
</ul>

<h3>🪶 משקל 55 גרם בלבד</h3>
<ul>
<li>קל כנוצה</li>
<li>תנועה מהירה</li>
<li>פחות עייפות</li>
</ul>

<h3>🔋 בסיס טעינה מגנטי</h3>
<ul>
<li>טעינה מהירה</li>
<li>טבעת RGB מרהיבה</li>
<li>עד 65 שעות עבודה</li>
</ul>

<h3>🖱️ סוויצ'ים HUANO</h3>
<ul>
<li>80 מיליון לחיצות</li>
<li>תחושה מדויקת</li>
</ul>

<h3>🎨 צבעים</h3>
<p>שחור | לבן | אדום</p>

<h3>✅ אחריות שנה</h3>
</div>`
  },
};

// Category mapping
const categoryMappings: Record<string, { category: string; subcategory?: string }> = {
  "אוזניות": { category: "אוזניות" },
  "בית חכם": { category: "רשת" },
  "גאדג'טים": { category: "אביזרים נוספים" },
  "מתאמים": { category: "מתאמים" },
  "Uncategorized": { category: "אביזרים נוספים" },
};

// Helper to find best matching product template
function findProductTemplate(productName: string): { title: string; shortDesc: string; description: string } | null {
  const lowerName = productName.toLowerCase();
  
  for (const [key, template] of Object.entries(productTitleMappings)) {
    if (lowerName.includes(key.toLowerCase())) {
      return template;
    }
  }
  
  // Generic templates based on keywords
  if (lowerName.includes("earphone") || lowerName.includes("headphone") || lowerName.includes("אוזניות")) {
    return productTitleMappings["KZ EDX PRO"];
  }
  if (lowerName.includes("bone") || lowerName.includes("עצם")) {
    return productTitleMappings["Bone Conduction"];
  }
  if (lowerName.includes("wifi") || lowerName.includes("repeater") || lowerName.includes("extender")) {
    return productTitleMappings["WiFi Pro"];
  }
  if (lowerName.includes("mp3") || lowerName.includes("music player")) {
    return productTitleMappings["MP3"];
  }
  if (lowerName.includes("keyboard") || lowerName.includes("מקלדת")) {
    if (lowerName.includes("fun60") || lowerName.includes("rapid")) {
      return productTitleMappings["Gaming Keyboard FUN60"];
    }
    return productTitleMappings["AK820"];
  }
  if (lowerName.includes("hdmi") && (lowerName.includes("wireless") || lowerName.includes("transmitter"))) {
    return productTitleMappings["HDMI Transmitter"];
  }
  if (lowerName.includes("hub") && lowerName.includes("8")) {
    return productTitleMappings["USB Hub"];
  }
  if (lowerName.includes("hub") && lowerName.includes("7")) {
    return productTitleMappings["7 Port Hub"];
  }
  if (lowerName.includes("sandisk") || lowerName.includes("memory card") || lowerName.includes("sd card")) {
    return productTitleMappings["SanDisk"];
  }
  if (lowerName.includes("ugreen") || (lowerName.includes("cable") && lowerName.includes("100w"))) {
    return productTitleMappings["UGREEN"];
  }
  if (lowerName.includes("webcam") || lowerName.includes("מצלמת רשת")) {
    return productTitleMappings["Webcam"];
  }
  if (lowerName.includes("speaker") || lowerName.includes("רמקול") || lowerName.includes("zealot")) {
    return productTitleMappings["Speaker"];
  }
  if (lowerName.includes("cooling") || lowerName.includes("cooler") || lowerName.includes("קירור")) {
    return productTitleMappings["Laptop Cooling"];
  }
  if (lowerName.includes("mouse") || lowerName.includes("עכבר") || lowerName.includes("shark")) {
    return productTitleMappings["Gaming Mouse X6"];
  }
  
  return null;
}

// Generate a selling title for products without a template
function generateSellingTitle(originalName: string): { title: string; shortDesc: string; description: string } {
  // Try to find a template first
  const template = findProductTemplate(originalName);
  if (template) return template;
  
  // Clean up the original name for Hebrew market
  let cleanName = originalName
    .replace(/\b(Original|NEW|Hot)\b/gi, '')
    .replace(/\b(for|with|and)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  return {
    title: cleanName,
    shortDesc: `מוצר איכותי עם משלוח מהיר ואחריות מלאה. ${cleanName}`,
    description: `<div class="product-description">
<h2>${cleanName}</h2>
<p>מוצר איכותי מיבוא מקביל עם אחריות מלאה.</p>
<h3>✅ מה מקבלים?</h3>
<ul>
<li>מוצר חדש באריזה מקורית</li>
<li>משלוח מהיר לכל הארץ</li>
<li>אחריות שנה מלאה</li>
<li>תמיכה טכנית בעברית</li>
</ul>
</div>`
  };
}

export async function importProductsToSupabase(csvData: string): Promise<{ success: boolean; message: string; count: number }> {
  try {
    // Parse CSV - this is a simplified parser
    const lines = csvData.split('\n');
    const headers = lines[0].split(',');
    
    const products: TransformedProduct[] = [];
    const variants: any[] = [];
    const images: any[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (!line.trim()) continue;
      
      // Parse CSV line (simplified - real implementation would handle quoted fields)
      const values = line.split(',');
      
      const id = values[0];
      const type = values[1];
      const sku = values[2];
      const name = values[4];
      const price = parseFloat(values[26]) || 0;
      const category = values[27] || 'Uncategorized';
      const imageUrls = values[30] || '';
      const parentSku = values[33] || '';
      
      // Only process main products (simple and variable), not variations
      if (type === 'simple' || type === 'variable') {
        const template = generateSellingTitle(name);
        
        products.push({
          id,
          sku,
          title: template.title,
          short_description: template.shortDesc,
          description: template.description,
          price,
          status: 'active',
          primary_category_id: null,
          primary_subcategory_id: null,
          supplier_id: 1
        });
        
        // Process images
        if (imageUrls) {
          const urls = imageUrls.split(', ');
          urls.forEach((url, index) => {
            if (url.trim()) {
              images.push({
                product_id: id,
                url: url.trim(),
                alt_text: template.title,
                sort_order: index,
                is_primary: index === 0
              });
            }
          });
        }
      } else if (type === 'variation') {
        // Process variants
        const variantName = name.split(' - ').pop() || name;
        variants.push({
          product_id: parentSku,
          sku,
          name: variantName,
          price,
          stock_quantity: parseInt(values[16]) || 0,
          is_active: true
        });
      }
    }
    
    console.log(`Parsed ${products.length} products, ${variants.length} variants, ${images.length} images`);
    
    return {
      success: true,
      message: `נמצאו ${products.length} מוצרים, ${variants.length} וריאציות ו-${images.length} תמונות`,
      count: products.length
    };
    
  } catch (error) {
    console.error('Import error:', error);
    return {
      success: false,
      message: `שגיאה בייבוא: ${error}`,
      count: 0
    };
  }
}

export { findProductTemplate, generateSellingTitle, productTitleMappings };
