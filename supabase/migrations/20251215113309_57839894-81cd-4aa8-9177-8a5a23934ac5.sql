-- Insert all 60 products from the products.ts file
-- The products have variants defined in attributes (colors, connection types)

-- First, insert all products
INSERT INTO products (id, name, slug, short_description, description, price, compare_at_price, category_id, is_active, is_featured, attributes)
VALUES
-- אוזניות (headphones)
('2144', 'אוזניות KZ EDX PRO דינאמיות – באס עוצמתי, מבטלות רעשים, ספורט', 'kz-edx-pro-headphones', 'אוזניות דינאמיות Hi-Fi עם באס עוצמתי וביטול רעשים. מתאימות לספורט עם אחריות יצרן.', 'אוזניות KZ EDX PRO דינאמיות מיועדות למי שמחפש חוויה שמעתית משובחת בשילוב עם איכות בנייה גבוהה.

תכונות עיקריות:
• סוג אוזניות: אוזניות In-Ear Monitor דינאמיות עם סאונד Hi-Fi
• התאמה לספורט: עיצוב יצוק ונוח המתאים לפעילות ספורט
• טכנולוגיה לביטול רעשים: איזולציה אקוסטית מתקדמת
• איכות סאונד: באס עמוק ועוצמתי, צלילים צלולים
• אורך כבל: 1.2 מטר

צבעים זמינים: שחור, שקוף, כסף', 49.99, NULL, 'headphones', true, false, '[{"name": "צבע", "values": ["שחור", "שקוף", "כסף"]}, {"name": "סוג חיבור", "values": ["חוטי"]}]'::jsonb),

('2216', 'אוזניות Bluetooth TWS Pro - ביטול רעשים אקטיבי ANC', 'tws-pro-anc-earbuds', 'אוזניות True Wireless עם ביטול רעשים אקטיבי ועד 30 שעות סוללה.', 'אוזניות TWS Pro עם טכנולוגיית ANC מתקדמת.

תכונות:
• ביטול רעשים אקטיבי (ANC)
• עד 8 שעות ניגון + 22 עם הקייס
• Bluetooth 5.3
• מיקרופון כפול לשיחות צלולות
• עמידות IPX5', 199.90, 249.90, 'headphones', true, true, '[{"name": "צבע", "values": ["שחור", "לבן", "כחול"]}, {"name": "סוג חיבור", "values": ["אלחוטי"]}]'::jsonb),

('2217', 'אוזניות Over-Ear Studio Monitor - צליל מקצועי', 'studio-monitor-over-ear', 'אוזניות מוניטור מקצועיות לאולפן ועריכת סאונד.', 'אוזניות Studio Monitor באיכות אולפנית.

מפרט:
• דרייברים 50mm
• תדר: 15Hz-25KHz
• עכבה: 32Ω
• רגישות: 98dB
• כבל נתיק 3 מטר', 349.90, NULL, 'headphones', true, false, '[{"name": "צבע", "values": ["שחור"]}, {"name": "סוג חיבור", "values": ["חוטי"]}]'::jsonb),

('2218', 'אוזניות ספורט Bluetooth עמידות במים IPX7', 'sport-bluetooth-ipx7', 'אוזניות ספורט אלחוטיות עם עמידות מלאה במים.', 'אוזניות ספורט אידיאליות לריצה ושחייה.

תכונות:
• עמידות IPX7 - אפשר לשחות איתן
• וו אוזן מאובטח
• עד 10 שעות סוללה
• טעינה מהירה: 10 דקות = שעתיים', 129.90, 159.90, 'headphones', true, true, '[{"name": "צבע", "values": ["שחור", "אדום", "ירוק"]}, {"name": "סוג חיבור", "values": ["אלחוטי"]}]'::jsonb),

('2219', 'אוזניות On-Ear קלות משקל - נוחות לשעות', 'on-ear-lightweight', 'אוזניות On-Ear קלות במיוחד לנוחות מרבית.', 'אוזניות On-Ear קלות ונוחות.

מפרט:
• משקל: 150 גרם בלבד
• כריות רכות ונושמות
• כבל מצופה ניילון 1.5 מטר
• מיקרופון מובנה', 89.90, NULL, 'headphones', true, false, '[{"name": "צבע", "values": ["שחור", "לבן", "ורוד"]}, {"name": "סוג חיבור", "values": ["חוטי"]}]'::jsonb),

-- מיקרופונים (microphones)
('2210', 'מיקרופון USB שולחני - סטרימינג ופודקאסט', 'usb-desktop-microphone-streaming', 'מיקרופון USB מקצועי לסטרימינג, פודקאסט ושיחות.', 'מיקרופון USB שולחני באיכות מקצועית.

מפרט:
• חיבור: USB Plug & Play
• תבנית קליטה: Cardioid
• תדר: 20Hz-20KHz
• כפתור Mute מובנה
• סטנד שולחני יציב', 129.90, 149.90, 'microphones', true, true, '[{"name": "צבע", "values": ["שחור", "לבן"]}, {"name": "סוג חיבור", "values": ["USB"]}]'::jsonb),

('2220', 'מיקרופון קונדנסר XLR מקצועי - הקלטות אולפן', 'xlr-condenser-studio-mic', 'מיקרופון קונדנסר XLR לאיכות הקלטה מקצועית.', 'מיקרופון קונדנסר באיכות אולפנית.

מפרט:
• חיבור: XLR
• תבנית: Large Diaphragm Cardioid
• תדר: 20Hz-20KHz
• רגישות: -34dB
• דורש פאנטום 48V', 399.90, NULL, 'microphones', true, false, '[{"name": "צבע", "values": ["שחור", "כסף"]}, {"name": "סוג חיבור", "values": ["XLR"]}]'::jsonb),

('2221', 'מיקרופון דש קליפ Lavalier - ראיונות ווידאו', 'lavalier-clip-mic', 'מיקרופון דש קטן וקל לצילומי וידאו וראיונות.', 'מיקרופון Lavalier קומפקטי.

תכונות:
• קליפ דש קל להרכבה
• כבל 2 מטר
• תואם סמארטפונים ומצלמות
• מגיע עם אדפטור TRS/TRRS', 69.90, NULL, 'microphones', true, false, '[{"name": "צבע", "values": ["שחור"]}, {"name": "סוג חיבור", "values": ["3.5mm"]}]'::jsonb),

('2222', 'מיקרופון אלחוטי Wireless - הרצאות ואירועים', 'wireless-handheld-mic', 'מיקרופון אלחוטי כף יד להרצאות ואירועים.', 'מיקרופון אלחוטי מקצועי.

מפרט:
• טווח: עד 50 מטר
• תדר: UHF
• סוללה: עד 8 שעות
• מקלט USB נטען', 299.90, NULL, 'microphones', true, false, '[{"name": "צבע", "values": ["שחור"]}, {"name": "סוג חיבור", "values": ["אלחוטי"]}]'::jsonb),

('2223', 'מיקרופון Shotgun למצלמה - צילומי וידאו', 'shotgun-camera-mic', 'מיקרופון Shotgun כיווני לצילומי וידאו מקצועיים.', 'מיקרופון Shotgun למצלמות.

תכונות:
• תבנית: Super-Cardioid
• חיבור: 3.5mm TRS
• בולם זעזועים מובנה
• סוללה AAA', 179.90, NULL, 'microphones', true, false, '[{"name": "צבע", "values": ["שחור"]}, {"name": "סוג חיבור", "values": ["3.5mm"]}]'::jsonb),

-- רמקולים (speakers)
('2224', 'רמקול Bluetooth נייד - סאונד 360°', 'portable-bluetooth-speaker-360', 'רמקול Bluetooth נייד עם סאונד 360 מעלות.', 'רמקול נייד עוצמתי.

מפרט:
• הספק: 20W
• סוללה: 12 שעות
• עמידות: IPX6
• חיבור: Bluetooth 5.0 + AUX', 179.90, 219.90, 'speakers', true, true, '[{"name": "צבע", "values": ["שחור", "כחול", "אדום"]}, {"name": "סוג חיבור", "values": ["אלחוטי"]}]'::jsonb),

('2225', 'רמקולי מחשב סטריאו 2.0 - USB', 'pc-stereo-speakers-usb', 'רמקולי מחשב סטריאו קומפקטיים עם חיבור USB.', 'רמקולי שולחן איכותיים.

מפרט:
• הספק: 6W (3W x 2)
• חיבור: USB לחשמל + 3.5mm לסאונד
• בקרת ווליום
• LED כחול', 79.90, NULL, 'speakers', true, false, '[{"name": "צבע", "values": ["שחור"]}, {"name": "סוג חיבור", "values": ["USB"]}]'::jsonb),

('2226', 'מערכת רמקולים 2.1 עם סאבוופר', 'speaker-system-2-1-subwoofer', 'מערכת רמקולים 2.1 עם סאבוופר לחוויית סאונד עשירה.', 'מערכת סאונד 2.1 לשולחן.

מפרט:
• הספק כולל: 50W
• סאבוופר 4 אינץ
• שלט רחוק
• חיבור: RCA + AUX + Bluetooth', 299.90, NULL, 'speakers', true, false, '[{"name": "צבע", "values": ["שחור"]}, {"name": "סוג חיבור", "values": ["חוטי", "אלחוטי"]}]'::jsonb),

('2227', 'רמקול חכם עם עוזר קולי', 'smart-speaker-voice-assistant', 'רמקול חכם עם בינה מלאכותית ועוזר קולי.', 'רמקול חכם לבית.

תכונות:
• עוזר קולי מובנה
• WiFi + Bluetooth
• מיקרופון רב-כיווני
• שליטה בבית חכם', 349.90, NULL, 'speakers', true, false, '[{"name": "צבע", "values": ["לבן", "שחור", "אפור"]}, {"name": "סוג חיבור", "values": ["אלחוטי"]}]'::jsonb),

('2228', 'סאונדבר לטלוויזיה - צליל קולנועי', 'soundbar-tv-home-theater', 'סאונדבר קומפקטי לחוויית צפייה קולנועית.', 'סאונדבר לטלוויזיה.

מפרט:
• הספק: 80W
• חיבור: HDMI ARC + Optical + Bluetooth
• מצבי סאונד: מוזיקה, סרטים, דיאלוגים
• שלט רחוק', 449.90, 549.90, 'speakers', true, true, '[{"name": "צבע", "values": ["שחור"]}, {"name": "סוג חיבור", "values": ["חוטי", "אלחוטי"]}]'::jsonb),

-- מצלמות (cameras)
('2229', 'מצלמת רשת Full HD 1080p - זום ושיחות', 'webcam-full-hd-1080p', 'מצלמת רשת Full HD עם מיקרופון מובנה לזום ושיחות.', 'מצלמת רשת מקצועית.

מפרט:
• רזולוציה: 1080p 30fps
• מיקרופון סטריאו
• תיקון תאורה אוטומטי
• קליפ אוניברסלי', 149.90, NULL, 'cameras', true, false, '[{"name": "צבע", "values": ["שחור"]}, {"name": "סוג חיבור", "values": ["USB"]}]'::jsonb),

('2230', 'מצלמת רשת 4K Ultra HD - סטרימינג מקצועי', 'webcam-4k-streaming', 'מצלמת רשת 4K לסטרימינג ויוטיוב.', 'מצלמת 4K מקצועית.

מפרט:
• רזולוציה: 4K 30fps / 1080p 60fps
• פוקוס אוטומטי מהיר
• תיקון צבע HDR
• זווית: 90°', 399.90, NULL, 'cameras', true, true, '[{"name": "צבע", "values": ["שחור"]}, {"name": "סוג חיבור", "values": ["USB-C"]}]'::jsonb),

('2231', 'מצלמת אבטחה WiFi - מעקב ביתי', 'security-camera-wifi-indoor', 'מצלמת אבטחה ביתית עם WiFi וראיית לילה.', 'מצלמת אבטחה חכמה.

תכונות:
• רזולוציה: 2K
• ראיית לילה עד 10 מטר
• זיהוי תנועה + התראות
• אחסון: כרטיס SD / ענן', 199.90, NULL, 'cameras', true, false, '[{"name": "צבע", "values": ["לבן", "שחור"]}, {"name": "סוג חיבור", "values": ["WiFi"]}]'::jsonb),

('2232', 'מצלמת PTZ ועידות - סיבוב אוטומטי', 'ptz-conference-camera', 'מצלמת PTZ לחדרי ישיבות עם מעקב אוטומטי.', 'מצלמת ועידות מקצועית.

מפרט:
• רזולוציה: 1080p
• זום אופטי x3
• סיבוב: 340° אופקי, 90° אנכי
• מעקב אוטומטי אחרי דובר', 999.90, NULL, 'cameras', true, false, '[{"name": "צבע", "values": ["שחור"]}, {"name": "סוג חיבור", "values": ["USB"]}]'::jsonb),

('2233', 'מצלמת דאשבורד לרכב - הקלטה מלאה', 'dashcam-car-recorder', 'מצלמת דאשבורד לרכב עם הקלטה רציפה.', 'מצלמת דאש לרכב.

תכונות:
• רזולוציה: 1440p
• זווית: 170°
• GPS מובנה
• מצב חניה', 279.90, NULL, 'cameras', true, false, '[{"name": "צבע", "values": ["שחור"]}, {"name": "סוג חיבור", "values": ["חוטי"]}]'::jsonb),

-- עכברים (mice)
('2234', 'עכבר אלחוטי ארגונומי - נוחות מקסימלית', 'ergonomic-wireless-mouse', 'עכבר אלחוטי ארגונומי למניעת כאבי שורש כף היד.', 'עכבר ארגונומי מקצועי.

מפרט:
• עיצוב אנכי טבעי
• DPI: 800-1600-2400
• חיבור: 2.4GHz + Bluetooth
• סוללה: עד 6 חודשים', 129.90, NULL, 'mice', true, true, '[{"name": "צבע", "values": ["שחור", "לבן"]}, {"name": "סוג חיבור", "values": ["אלחוטי"]}]'::jsonb),

('2235', 'עכבר גיימינג RGB - 16000 DPI', 'gaming-mouse-rgb-16000dpi', 'עכבר גיימינג מקצועי עם תאורת RGB וחיישן מדויק.', 'עכבר גיימינג עוצמתי.

מפרט:
• DPI: עד 16000
• 8 לחצנים ניתנים לתכנות
• תאורת RGB מותאמת
• משקולות מתכווננות', 199.90, NULL, 'mice', true, true, '[{"name": "צבע", "values": ["שחור"]}, {"name": "סוג חיבור", "values": ["חוטי"]}]'::jsonb),

('2236', 'עכבר אלחוטי שקט - ללא רעש', 'silent-wireless-mouse', 'עכבר אלחוטי שקט לסביבת עבודה שקטה.', 'עכבר שקט לחלוטין.

מפרט:
• לחיצות שקטות 90%
• DPI: 1000-1600
• סוללה AA: עד שנה
• מקלט ננו USB', 69.90, NULL, 'mice', true, false, '[{"name": "צבע", "values": ["שחור", "כסף", "ורוד"]}, {"name": "סוג חיבור", "values": ["אלחוטי"]}]'::jsonb),

('2237', 'עכבר נסיעות קומפקטי - מתקפל', 'travel-mouse-compact-foldable', 'עכבר נסיעות קטן ומתקפל למחשב נייד.', 'עכבר נסיעות קומפקטי.

תכונות:
• עיצוב מתקפל
• קל משקל: 55 גרם
• Bluetooth + USB
• נרתיק נשיאה', 89.90, NULL, 'mice', true, false, '[{"name": "צבע", "values": ["שחור", "כסף"]}, {"name": "סוג חיבור", "values": ["אלחוטי"]}]'::jsonb),

('2238', 'עכבר חוטי USB קלאסי', 'wired-usb-mouse-classic', 'עכבר חוטי USB פשוט ואמין.', 'עכבר חוטי בסיסי.

מפרט:
• DPI: 1200
• 3 לחצנים + גלגלת
• כבל 1.5 מטר
• Plug & Play', 29.90, NULL, 'mice', true, false, '[{"name": "צבע", "values": ["שחור"]}, {"name": "סוג חיבור", "values": ["חוטי"]}]'::jsonb),

-- מקלדות (keyboards)
('2239', 'מקלדת מכנית גיימינג - מתגי כחולים', 'mechanical-keyboard-blue-switches', 'מקלדת מכנית גיימינג עם מתגי Blue ותאורת RGB.', 'מקלדת מכנית מקצועית.

מפרט:
• מתגים: Blue (Clicky)
• Anti-ghosting N-Key
• תאורת RGB לכל מקש
• משענת יד נתיקת', 349.90, NULL, 'keyboards', true, true, '[{"name": "צבע", "values": ["שחור"]}, {"name": "סוג חיבור", "values": ["חוטי"]}]'::jsonb),

('2240', 'מקלדת אלחוטית דקה - מק ו-PC', 'slim-wireless-keyboard-mac-pc', 'מקלדת אלחוטית דקה ואלגנטית למק ו-PC.', 'מקלדת דקה אלחוטית.

מפרט:
• מתגי Scissor שקטים
• חיבור: Bluetooth + USB
• סוללה נטענת: חודש
• Layout עברית/אנגלית', 179.90, NULL, 'keyboards', true, false, '[{"name": "צבע", "values": ["לבן", "שחור", "כסף"]}, {"name": "סוג חיבור", "values": ["אלחוטי"]}]'::jsonb),

('2241', 'מקלדת גמישה סיליקון - עמידה למים', 'flexible-silicone-keyboard', 'מקלדת גמישה מסיליקון עמידה למים.', 'מקלדת גמישה ייחודית.

תכונות:
• עמידה למים לחלוטין
• מתגלגלת לנשיאה
• שקטה לחלוטין
• USB Plug & Play', 59.90, NULL, 'keyboards', true, false, '[{"name": "צבע", "values": ["שחור", "לבן"]}, {"name": "סוג חיבור", "values": ["חוטי"]}]'::jsonb),

('2242', 'מקלדת קומפקטית 60% - נסיעות', 'compact-60-keyboard-travel', 'מקלדת קומפקטית 60% לנסיעות וחיסכון במקום.', 'מקלדת קומפקטית.

מפרט:
• 61 מקשים
• מתגים: Red Linear
• Bluetooth 5.0
• סוללה: 2 שבועות', 249.90, NULL, 'keyboards', true, false, '[{"name": "צבע", "values": ["שחור", "לבן"]}, {"name": "סוג חיבור", "values": ["אלחוטי"]}]'::jsonb),

('2243', 'מקלדת משרדית ממברנה', 'office-membrane-keyboard', 'מקלדת משרדית שקטה וחסכונית.', 'מקלדת משרד בסיסית.

מפרט:
• מתגי ממברנה שקטים
• מקשי מולטימדיה
• עברית/אנגלית
• USB', 49.90, NULL, 'keyboards', true, false, '[{"name": "צבע", "values": ["שחור"]}, {"name": "סוג חיבור", "values": ["חוטי"]}]'::jsonb),

-- סטים למחשב (computer-sets)
('2244', 'סט מקלדת ועכבר אלחוטי', 'wireless-keyboard-mouse-combo', 'סט מקלדת ועכבר אלחוטי למשרד ובית.', 'סט אלחוטי חסכוני.

כולל:
• מקלדת אלחוטית Full Size
• עכבר אלחוטי 1600 DPI
• מקלט USB אחד לשניהם
• סוללות כלולות', 149.90, NULL, 'computer-sets', true, true, '[{"name": "צבע", "values": ["שחור", "לבן"]}, {"name": "סוג חיבור", "values": ["אלחוטי"]}]'::jsonb),

('2245', 'סט גיימינג מקלדת + עכבר + אוזניות', 'gaming-keyboard-mouse-headset-combo', 'סט גיימינג מלא עם תאורת RGB.', 'סט גיימינג מושלם.

כולל:
• מקלדת מכנית RGB
• עכבר 6400 DPI
• אוזניות עם מיקרופון
• פד עכבר XL', 399.90, 499.90, 'computer-sets', true, true, '[{"name": "צבע", "values": ["שחור"]}, {"name": "סוג חיבור", "values": ["חוטי"]}]'::jsonb),

('2246', 'סט סטרימינג - מיקרופון + מצלמה + תאורה', 'streaming-kit-mic-webcam-light', 'סט סטרימינג מקצועי ליוטיוב וטוויץ׳.', 'סט סטרימינג מלא.

כולל:
• מיקרופון USB קונדנסר
• מצלמה Full HD
• תאורת טבעת LED
• זרועות מתכווננות', 599.90, NULL, 'computer-sets', true, false, '[{"name": "צבע", "values": ["שחור"]}, {"name": "סוג חיבור", "values": ["USB"]}]'::jsonb),

('2247', 'סט עבודה מהבית - דוכן + מקלדת + עכבר', 'work-from-home-desk-kit', 'סט עבודה מהבית לפרודוקטיביות מקסימלית.', 'סט WFH מקצועי.

כולל:
• מעמד לפטופ מתכוונן
• מקלדת אלחוטית דקה
• עכבר ארגונומי
• פד עכבר גדול', 299.90, NULL, 'computer-sets', true, false, '[{"name": "צבע", "values": ["כסף", "שחור"]}, {"name": "סוג חיבור", "values": ["אלחוטי"]}]'::jsonb),

-- כבלים (cables)
('2248', 'כבל USB-C ל-USB-C 100W - טעינה מהירה', 'usb-c-to-usb-c-100w-cable', 'כבל USB-C איכותי לטעינה מהירה עד 100W.', 'כבל USB-C מקצועי.

מפרט:
• הספק: 100W PD
• מהירות: USB 3.2 10Gbps
• אורך: 2 מטר
• שזור ניילון', 59.90, NULL, 'cables', true, true, '[{"name": "אורך", "values": ["1 מטר", "2 מטר", "3 מטר"]}]'::jsonb),

('2249', 'כבל HDMI 2.1 8K - גיימינג וסרטים', 'hdmi-2-1-8k-cable', 'כבל HDMI 2.1 לרזולוציית 8K וקצב רענון גבוה.', 'כבל HDMI מתקדם.

מפרט:
• תמיכה: 8K@60Hz / 4K@120Hz
• eARC לסאונד
• VRR לגיימינג
• מצופה זהב', 89.90, NULL, 'cables', true, true, '[{"name": "אורך", "values": ["1.5 מטר", "3 מטר", "5 מטר"]}]'::jsonb),

('2250', 'כבל DisplayPort 1.4 - מסכים מקצועיים', 'displayport-1-4-cable', 'כבל DisplayPort 1.4 למסכים מקצועיים.', 'כבל DP מקצועי.

מפרט:
• תמיכה: 4K@144Hz / 8K@60Hz
• HDR
• נעילה מאובטחת', 69.90, NULL, 'cables', true, false, '[{"name": "אורך", "values": ["1.5 מטר", "3 מטר"]}]'::jsonb),

('2251', 'כבל רשת Cat8 - מהירות 40Gbps', 'cat8-ethernet-cable-40gbps', 'כבל רשת Cat8 למהירות מקסימלית.', 'כבל רשת מתקדם.

מפרט:
• מהירות: 40Gbps
• תדר: 2000MHz
• מיגון כפול STP
• חיבורים RJ45', 49.90, NULL, 'cables', true, false, '[{"name": "אורך", "values": ["2 מטר", "5 מטר", "10 מטר"]}]'::jsonb),

('2252', 'כבל אודיו AUX 3.5mm - איכותי', 'aux-audio-cable-3-5mm', 'כבל אודיו AUX איכותי לרמקולים ואוזניות.', 'כבל אודיו מקצועי.

מפרט:
• חיבור: 3.5mm זכר-זכר
• מצופה זהב 24K
• שזור ניילון', 19.90, NULL, 'cables', true, false, '[{"name": "אורך", "values": ["1 מטר", "2 מטר"]}]'::jsonb),

-- מתאמים (adapters)
('2253', 'מתאם USB-C ל-HDMI 4K', 'usb-c-to-hdmi-4k-adapter', 'מתאם USB-C ל-HDMI ברזולוציית 4K.', 'מתאם קומפקטי.

מפרט:
• יציאה: HDMI 2.0
• רזולוציה: 4K@60Hz
• Plug & Play
• תואם מק ו-PC', 79.90, NULL, 'adapters', true, true, '[{"name": "צבע", "values": ["כסף", "שחור"]}]'::jsonb),

('2254', 'מתאם USB-C רב-תכליתי 7-in-1', 'usb-c-multiport-7-in-1', 'מתאם USB-C מרובה יציאות לעבודה.', 'מתאם 7-in-1.

יציאות:
• HDMI 4K
• USB-A x2
• USB-C PD 100W
• SD + microSD
• RJ45 Gigabit', 179.90, NULL, 'adapters', true, true, '[{"name": "צבע", "values": ["כסף"]}]'::jsonb),

('2255', 'מתאם Lightning ל-USB-C', 'lightning-to-usb-c-adapter', 'מתאם לחיבור מכשירי Lightning ל-USB-C.', 'מתאם קומפקטי.

תכונות:
• העברת נתונים + טעינה
• מהירות USB 2.0
• קומפקטי ונייד', 39.90, NULL, 'adapters', true, false, '[{"name": "צבע", "values": ["לבן"]}]'::jsonb),

('2256', 'מתאם VGA ל-HDMI + אודיו', 'vga-to-hdmi-audio-adapter', 'מתאם VGA ל-HDMI עם יציאת אודיו.', 'מתאם עם שמע.

מפרט:
• כניסה: VGA + אודיו 3.5mm
• יציאה: HDMI
• רזולוציה: עד 1080p', 49.90, NULL, 'adapters', true, false, '[{"name": "צבע", "values": ["שחור"]}]'::jsonb),

('2257', 'מתאם USB-A ל-USB-C', 'usb-a-to-usb-c-adapter', 'מתאם פשוט לחיבור USB-C ל-USB-A.', 'מתאם קטן ושימושי.

פרטים:
• העברת נתונים + טעינה
• USB 3.0
• סט של 2 יחידות', 24.90, NULL, 'adapters', true, false, '[{"name": "צבע", "values": ["שחור", "כסף"]}]'::jsonb),

-- Hubs ותחנות עגינה (hubs-docking)
('2258', 'תחנת עגינה USB-C מקצועית', 'usb-c-docking-station-pro', 'תחנת עגינה מלאה למחשב נייד.', 'תחנת עגינה מקצועית.

יציאות:
• HDMI x2 (4K כפול)
• USB-A x4
• USB-C x2
• RJ45 Gigabit
• SD + microSD
• אודיו
• טעינה 100W', 499.90, NULL, 'hubs-docking', true, true, '[{"name": "צבע", "values": ["כסף"]}]'::jsonb),

('2259', 'USB Hub 4 יציאות - USB 3.0', 'usb-hub-4-ports-usb3', 'מפצל USB 4 יציאות במהירות גבוהה.', 'מפצל USB קומפקטי.

מפרט:
• 4 יציאות USB 3.0
• מהירות: 5Gbps
• חיבור USB-A
• לד חיווי', 49.90, NULL, 'hubs-docking', true, false, '[{"name": "צבע", "values": ["שחור", "לבן"]}]'::jsonb),

('2260', 'Hub USB-C עם HDMI + טעינה', 'usb-c-hub-hdmi-pd', 'מפצל USB-C עם HDMI וטעינה Pass-Through.', 'מפצל קומפקטי.

יציאות:
• HDMI 4K
• USB-A x2
• USB-C PD 60W', 119.90, NULL, 'hubs-docking', true, false, '[{"name": "צבע", "values": ["כסף", "אפור"]}]'::jsonb),

('2261', 'תחנת עגינה אוניברסלית USB 3.0', 'universal-usb3-docking-station', 'תחנת עגינה אוניברסלית בחיבור USB 3.0.', 'תחנת עגינה תואמת הכל.

יציאות:
• HDMI + VGA (מסך כפול)
• USB x6
• RJ45
• אודיו
• תואמת כל מחשב', 299.90, NULL, 'hubs-docking', true, false, '[{"name": "צבע", "values": ["שחור"]}]'::jsonb),

-- אחסון חיצוני (external-storage)
('2262', 'דיסק SSD חיצוני 1TB - USB-C', 'external-ssd-1tb-usb-c', 'דיסק SSD חיצוני מהיר ב-1TB.', 'SSD חיצוני מהיר.

מפרט:
• נפח: 1TB
• מהירות: 1050MB/s
• חיבור: USB-C 3.2
• קומפקטי ועמיד', 399.90, NULL, 'external-storage', true, true, '[{"name": "נפח", "values": ["500GB", "1TB", "2TB"]}]'::jsonb),

('2263', 'דיסק קשיח חיצוני 2TB', 'external-hdd-2tb', 'דיסק קשיח חיצוני 2TB לגיבוי.', 'דיסק קשיח נייד.

מפרט:
• נפח: 2TB
• מהירות: 5400rpm
• USB 3.0
• Plug & Play', 249.90, NULL, 'external-storage', true, false, '[{"name": "נפח", "values": ["1TB", "2TB", "4TB"]}]'::jsonb),

('2264', 'כונן הבזק USB 128GB - מהיר', 'usb-flash-drive-128gb', 'כונן USB מהיר ל-128GB.', 'פלאש דרייב מהיר.

מפרט:
• נפח: 128GB
• USB 3.2
• קריאה: 400MB/s
• עיצוב מתכת', 59.90, NULL, 'external-storage', true, false, '[{"name": "נפח", "values": ["64GB", "128GB", "256GB"]}]'::jsonb),

('2265', 'קורא כרטיסים USB-C - SD/microSD', 'usb-c-card-reader-sd', 'קורא כרטיסים מהיר ל-SD ו-microSD.', 'קורא כרטיסים קומפקטי.

מפרט:
• חריצים: SD + microSD
• USB-C / USB-A
• מהירות: UHS-II', 49.90, NULL, 'external-storage', true, false, '[{"name": "צבע", "values": ["כסף", "שחור"]}]'::jsonb),

-- רשת (networking)
('2266', 'ראוטר WiFi 6 - מהירות 1800Mbps', 'wifi-6-router-ax1800', 'ראוטר WiFi 6 מהיר לבית חכם.', 'ראוטר מתקדם.

מפרט:
• תקן: WiFi 6 (802.11ax)
• מהירות: 1800Mbps
• כיסוי: 150 מ"ר
• עד 64 מכשירים', 349.90, NULL, 'networking', true, true, '[{"name": "צבע", "values": ["לבן", "שחור"]}]'::jsonb),

('2267', 'מגדיל טווח WiFi - Mesh', 'wifi-mesh-extender', 'מגדיל טווח WiFi ברשת Mesh.', 'מגדיל טווח חכם.

תכונות:
• Mesh seamless roaming
• WiFi 5 AC1200
• הגדרה קלה באפליקציה
• כיסוי נוסף: 100 מ"ר', 199.90, NULL, 'networking', true, false, '[{"name": "צבע", "values": ["לבן"]}]'::jsonb),

('2268', 'מתאם רשת USB - Gigabit Ethernet', 'usb-gigabit-ethernet-adapter', 'מתאם USB לרשת קווית Gigabit.', 'מתאם רשת קווית.

מפרט:
• מהירות: 1Gbps
• חיבור: USB 3.0
• Plug & Play
• LED חיווי', 69.90, NULL, 'networking', true, false, '[{"name": "צבע", "values": ["שחור"]}]'::jsonb),

('2269', 'סוויץ׳ רשת 8 יציאות - Gigabit', 'network-switch-8-port-gigabit', 'סוויץ׳ רשת 8 יציאות Gigabit.', 'סוויץ׳ מקצועי.

מפרט:
• 8 יציאות RJ45
• מהירות: 1Gbps לכל יציאה
• Plug & Play
• גוף מתכת', 129.90, NULL, 'networking', true, false, '[{"name": "צבע", "values": ["שחור"]}]'::jsonb),

-- ארגון שולחן וסטאפ (desk-organization)
('2270', 'מעמד מוניטור עם מגירה - ארגון שולחן', 'monitor-stand-drawer-organizer', 'מעמד מוניטור עם מגירה לארגון.', 'מעמד ארגוני.

תכונות:
• מגביה מסך לגובה הנכון
• מגירה לאחסון
• 4 יציאות USB
• מתאים עד 27 אינץ׳', 149.90, NULL, 'desk-organization', true, true, '[{"name": "צבע", "values": ["שחור", "לבן"]}]'::jsonb),

('2271', 'זרוע מוניטור שולחנית - גמישה', 'monitor-arm-desk-mount', 'זרוע מוניטור מתכווננת לשולחן.', 'זרוע מוניטור מקצועית.

מפרט:
• תומכת: 17-32 אינץ׳
• משקל: עד 9 ק"ג
• VESA 75/100
• סיבוב 360°', 199.90, NULL, 'desk-organization', true, false, '[{"name": "צבע", "values": ["שחור", "כסף"]}]'::jsonb),

('2272', 'מעמד לפטופ מתכוונן - ארגונומי', 'laptop-stand-adjustable-ergonomic', 'מעמד לפטופ מתכוונן לגובה העיניים.', 'מעמד לפטופ ארגונומי.

תכונות:
• גובה מתכוונן
• מאוורר פסיבי
• מתקפל לנסיעות
• אלומיניום', 129.90, NULL, 'desk-organization', true, false, '[{"name": "צבע", "values": ["כסף", "שחור"]}]'::jsonb),

('2273', 'מארגן כבלים לשולחן', 'cable-management-desk-organizer', 'מערכת ארגון כבלים לשולחן נקי.', 'ארגון כבלים מלא.

כולל:
• קופסת כבלים
• קליפסים דביקים
• שרוול כבלים 2 מטר
• תוויות', 59.90, NULL, 'desk-organization', true, false, '[{"name": "צבע", "values": ["שחור", "לבן"]}]'::jsonb),

('2274', 'פד עכבר גדול - משטח מורחב', 'extended-mouse-pad-desk', 'פד עכבר מורחב לכל השולחן.', 'פד עכבר XL.

מפרט:
• גודל: 80x30 ס"מ
• עובי: 4mm
• בסיס נגד החלקה
• קצוות תפורים', 69.90, NULL, 'desk-organization', true, false, '[{"name": "צבע", "values": ["שחור", "אפור"]}]'::jsonb),

-- חשמל וטעינה (power-charging)
('2275', 'מטען קיר USB-C 65W - GaN', 'wall-charger-usb-c-65w-gan', 'מטען קיר קומפקטי 65W בטכנולוגיית GaN.', 'מטען GaN עוצמתי.

מפרט:
• הספק: 65W
• יציאות: USB-C x2 + USB-A
• GaN קומפקטי
• PD 3.0 + QC 4.0', 149.90, NULL, 'power-charging', true, true, '[{"name": "צבע", "values": ["לבן", "שחור"]}]'::jsonb),

('2276', 'פאוורבנק 20000mAh - טעינה מהירה', 'power-bank-20000mah-fast-charge', 'סוללת גיבוי 20000mAh עם טעינה מהירה.', 'פאוורבנק עוצמתי.

מפרט:
• קיבולת: 20000mAh
• יציאות: USB-C PD + USB-A QC
• הספק: 22.5W
• תצוגת LED', 129.90, NULL, 'power-charging', true, true, '[{"name": "צבע", "values": ["שחור", "לבן"]}]'::jsonb),

('2277', 'משטח טעינה אלחוטית - 15W', 'wireless-charging-pad-15w', 'משטח טעינה אלחוטית מהירה 15W.', 'טעינה אלחוטית מהירה.

מפרט:
• הספק: 15W (סמסונג) / 7.5W (אייפון)
• Qi תקני
• נורית חיווי
• ציפוי נגד החלקה', 79.90, NULL, 'power-charging', true, false, '[{"name": "צבע", "values": ["שחור", "לבן"]}]'::jsonb),

('2278', 'רב-שקע חכם עם USB - 6 שקעים', 'smart-power-strip-usb-6-outlet', 'רב-שקע עם הגנת ברקים ויציאות USB.', 'רב-שקע מקצועי.

תכונות:
• 6 שקעים + 4 USB
• הגנת ברקים
• כפתור בטיחות
• כבל 2 מטר', 119.90, NULL, 'power-charging', true, false, '[{"name": "צבע", "values": ["לבן", "שחור"]}]'::jsonb),

('2279', 'תחנת טעינה משפחתית - 6 מכשירים', 'family-charging-station-6-device', 'תחנת טעינה ל-6 מכשירים בו-זמנית.', 'תחנת טעינה משפחתית.

כולל:
• 6 מפרצים לטעינה
• מתאם USB-C קצר
• ארגון כבלים מובנה
• 60W כולל', 199.90, NULL, 'power-charging', true, false, '[{"name": "צבע", "values": ["לבן", "במבוק"]}]'::jsonb),

-- גיימינג (gaming)
('2280', 'בקר גיימינג אלחוטי - PC/קונסולות', 'wireless-gaming-controller', 'בקר גיימינג אלחוטי תואם PC וקונסולות.', 'בקר גיימינג מקצועי.

מפרט:
• תאימות: PC, PS, Switch
• חיבור: 2.4GHz + Bluetooth
• רטט כפול
• סוללה: 20 שעות', 199.90, NULL, 'gaming', true, true, '[{"name": "צבע", "values": ["שחור", "לבן", "אדום"]}]'::jsonb),

('2281', 'כיסא גיימינג ארגונומי - תמיכה מלאה', 'ergonomic-gaming-chair', 'כיסא גיימינג ארגונומי עם תמיכה מלאה.', 'כיסא גיימינג נוח.

תכונות:
• משענת גב גבוהה
• כריות ראש ומותן
• משענות יד 4D
• הטיה עד 180°
• בסיס מתכת', 899.90, NULL, 'gaming', true, true, '[{"name": "צבע", "values": ["שחור", "שחור-אדום", "שחור-כחול"]}]'::jsonb),

('2282', 'משטח עכבר גיימינג RGB - XL', 'rgb-gaming-mouse-pad-xl', 'משטח עכבר גיימינג עם תאורת RGB.', 'פד עכבר RGB.

מפרט:
• גודל: 80x30 ס"מ
• תאורת RGB בקצוות
• 12 מצבי תאורה
• חיבור USB', 99.90, NULL, 'gaming', true, false, '[{"name": "צבע", "values": ["שחור"]}]'::jsonb),

('2283', 'מעמד אוזניות גיימינג עם USB Hub', 'gaming-headset-stand-usb-hub', 'מעמד אוזניות גיימינג עם חיבורי USB.', 'מעמד אוזניות מתקדם.

תכונות:
• מעמד יציב
• 2x USB 3.0
• יציאת אודיו 3.5mm
• תאורת RGB', 79.90, NULL, 'gaming', true, false, '[{"name": "צבע", "values": ["שחור"]}]'::jsonb),

('2284', 'קלפה חיצונית USB - לכידת וידאו', 'usb-capture-card-streaming', 'קלפה ללכידת וידאו לסטרימינג.', 'Capture Card לסטרימינג.

מפרט:
• כניסה: HDMI 4K
• יציאה: USB 3.0
• הקלטה: 1080p60
• זמן תגובה נמוך', 299.90, NULL, 'gaming', true, false, '[{"name": "צבע", "values": ["שחור"]}]'::jsonb)

ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  category_id = EXCLUDED.category_id,
  is_active = EXCLUDED.is_active,
  is_featured = EXCLUDED.is_featured,
  attributes = EXCLUDED.attributes,
  updated_at = now();

-- Insert product images for all products
INSERT INTO product_images (product_id, url, is_primary, sort_order, alt_text)
VALUES
('2144', 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800', true, 0, 'אוזניות KZ EDX PRO דינאמיות'),
('2216', 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800', true, 0, 'אוזניות Bluetooth TWS Pro'),
('2217', 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800', true, 0, 'אוזניות Over-Ear Studio Monitor'),
('2218', 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800', true, 0, 'אוזניות ספורט Bluetooth'),
('2219', 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=800', true, 0, 'אוזניות On-Ear קלות משקל'),
('2210', 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800', true, 0, 'מיקרופון USB שולחני'),
('2220', 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800', true, 0, 'מיקרופון קונדנסר XLR'),
('2221', 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800', true, 0, 'מיקרופון דש Lavalier'),
('2222', 'https://images.unsplash.com/photo-1558470598-a5dda9640f68?w=800', true, 0, 'מיקרופון אלחוטי'),
('2223', 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800', true, 0, 'מיקרופון Shotgun'),
('2224', 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800', true, 0, 'רמקול Bluetooth נייד'),
('2225', 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800', true, 0, 'רמקולי מחשב סטריאו'),
('2226', 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800', true, 0, 'מערכת רמקולים 2.1'),
('2227', 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=800', true, 0, 'רמקול חכם'),
('2228', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', true, 0, 'סאונדבר לטלוויזיה'),
('2229', 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=800', true, 0, 'מצלמת רשת Full HD'),
('2230', 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=800', true, 0, 'מצלמת רשת 4K'),
('2231', 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800', true, 0, 'מצלמת אבטחה WiFi'),
('2232', 'https://images.unsplash.com/photo-1591165598032-1f60a05c9c73?w=800', true, 0, 'מצלמת PTZ ועידות'),
('2233', 'https://images.unsplash.com/photo-1576543588799-c5e0a2e4a27c?w=800', true, 0, 'מצלמת דאשבורד'),
('2234', 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800', true, 0, 'עכבר אלחוטי ארגונומי'),
('2235', 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800', true, 0, 'עכבר גיימינג RGB'),
('2236', 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800', true, 0, 'עכבר אלחוטי שקט'),
('2237', 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800', true, 0, 'עכבר נסיעות קומפקטי'),
('2238', 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800', true, 0, 'עכבר חוטי USB'),
('2239', 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800', true, 0, 'מקלדת מכנית גיימינג'),
('2240', 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800', true, 0, 'מקלדת אלחוטית דקה'),
('2241', 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800', true, 0, 'מקלדת גמישה סיליקון'),
('2242', 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800', true, 0, 'מקלדת קומפקטית 60%'),
('2243', 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800', true, 0, 'מקלדת משרדית'),
('2244', 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800', true, 0, 'סט מקלדת ועכבר אלחוטי'),
('2245', 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800', true, 0, 'סט גיימינג מלא'),
('2246', 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800', true, 0, 'סט סטרימינג'),
('2247', 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800', true, 0, 'סט עבודה מהבית'),
('2248', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', true, 0, 'כבל USB-C'),
('2249', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', true, 0, 'כבל HDMI 2.1'),
('2250', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', true, 0, 'כבל DisplayPort'),
('2251', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', true, 0, 'כבל רשת Cat8'),
('2252', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', true, 0, 'כבל אודיו AUX'),
('2253', 'https://images.unsplash.com/photo-1625315714730-b4e79c2c8a94?w=800', true, 0, 'מתאם USB-C ל-HDMI'),
('2254', 'https://images.unsplash.com/photo-1625315714730-b4e79c2c8a94?w=800', true, 0, 'מתאם USB-C רב-תכליתי'),
('2255', 'https://images.unsplash.com/photo-1625315714730-b4e79c2c8a94?w=800', true, 0, 'מתאם Lightning ל-USB-C'),
('2256', 'https://images.unsplash.com/photo-1625315714730-b4e79c2c8a94?w=800', true, 0, 'מתאם VGA ל-HDMI'),
('2257', 'https://images.unsplash.com/photo-1625315714730-b4e79c2c8a94?w=800', true, 0, 'מתאם USB-A ל-USB-C'),
('2258', 'https://images.unsplash.com/photo-1625315714730-b4e79c2c8a94?w=800', true, 0, 'תחנת עגינה USB-C'),
('2259', 'https://images.unsplash.com/photo-1625315714730-b4e79c2c8a94?w=800', true, 0, 'USB Hub 4 יציאות'),
('2260', 'https://images.unsplash.com/photo-1625315714730-b4e79c2c8a94?w=800', true, 0, 'Hub USB-C עם HDMI'),
('2261', 'https://images.unsplash.com/photo-1625315714730-b4e79c2c8a94?w=800', true, 0, 'תחנת עגינה USB 3.0'),
('2262', 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=800', true, 0, 'דיסק SSD חיצוני'),
('2263', 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=800', true, 0, 'דיסק קשיח חיצוני'),
('2264', 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=800', true, 0, 'כונן הבזק USB'),
('2265', 'https://images.unsplash.com/photo-1625315714730-b4e79c2c8a94?w=800', true, 0, 'קורא כרטיסים'),
('2266', 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=800', true, 0, 'ראוטר WiFi 6'),
('2267', 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=800', true, 0, 'מגדיל טווח WiFi'),
('2268', 'https://images.unsplash.com/photo-1625315714730-b4e79c2c8a94?w=800', true, 0, 'מתאם רשת USB'),
('2269', 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=800', true, 0, 'סוויץ׳ רשת'),
('2270', 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800', true, 0, 'מעמד מוניטור'),
('2271', 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800', true, 0, 'זרוע מוניטור'),
('2272', 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800', true, 0, 'מעמד לפטופ'),
('2273', 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800', true, 0, 'מארגן כבלים'),
('2274', 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800', true, 0, 'פד עכבר גדול'),
('2275', 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800', true, 0, 'מטען קיר USB-C'),
('2276', 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800', true, 0, 'פאוורבנק 20000mAh'),
('2277', 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800', true, 0, 'משטח טעינה אלחוטית'),
('2278', 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800', true, 0, 'רב-שקע חכם'),
('2279', 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800', true, 0, 'תחנת טעינה משפחתית'),
('2280', 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=800', true, 0, 'בקר גיימינג'),
('2281', 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800', true, 0, 'כיסא גיימינג'),
('2282', 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800', true, 0, 'משטח עכבר RGB'),
('2283', 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800', true, 0, 'מעמד אוזניות גיימינג'),
('2284', 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800', true, 0, 'קלפה לכידת וידאו')
ON CONFLICT (id) DO NOTHING;

-- Insert inventory records for all products
INSERT INTO inventory (product_id, quantity, low_stock_threshold)
VALUES
('2144', 50, 5), ('2216', 35, 5), ('2217', 20, 5), ('2218', 45, 5), ('2219', 60, 5),
('2210', 25, 5), ('2220', 15, 5), ('2221', 50, 5), ('2222', 20, 5), ('2223', 30, 5),
('2224', 40, 5), ('2225', 50, 5), ('2226', 20, 5), ('2227', 15, 5), ('2228', 25, 5),
('2229', 35, 5), ('2230', 20, 5), ('2231', 30, 5), ('2232', 10, 3), ('2233', 25, 5),
('2234', 40, 5), ('2235', 30, 5), ('2236', 60, 5), ('2237', 35, 5), ('2238', 100, 10),
('2239', 25, 5), ('2240', 40, 5), ('2241', 50, 5), ('2242', 20, 5), ('2243', 80, 10),
('2244', 45, 5), ('2245', 20, 5), ('2246', 15, 3), ('2247', 25, 5),
('2248', 100, 10), ('2249', 60, 5), ('2250', 40, 5), ('2251', 50, 5), ('2252', 100, 10),
('2253', 50, 5), ('2254', 30, 5), ('2255', 60, 5), ('2256', 40, 5), ('2257', 80, 10),
('2258', 15, 3), ('2259', 60, 5), ('2260', 40, 5), ('2261', 20, 5),
('2262', 30, 5), ('2263', 40, 5), ('2264', 100, 10), ('2265', 60, 5),
('2266', 25, 5), ('2267', 35, 5), ('2268', 50, 5), ('2269', 30, 5),
('2270', 40, 5), ('2271', 25, 5), ('2272', 45, 5), ('2273', 80, 10), ('2274', 60, 5),
('2275', 50, 5), ('2276', 60, 5), ('2277', 70, 5), ('2278', 40, 5), ('2279', 25, 5),
('2280', 35, 5), ('2281', 10, 3), ('2282', 50, 5), ('2283', 40, 5), ('2284', 20, 5)
ON CONFLICT (id) DO NOTHING;