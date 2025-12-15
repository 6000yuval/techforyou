-- Update shipping methods - deactivate all except pickup and update pickup details
UPDATE shipping_methods SET is_active = false WHERE name != 'Pickup';

UPDATE shipping_methods 
SET 
  name_he = 'איסוף מנקודה הקרובה לבית',
  description = 'איסוף מנקודת החלוקה הקרובה לכתובת שלך',
  estimated_days_min = 7,
  estimated_days_max = 12,
  price = 0,
  sort_order = 1
WHERE name = 'Pickup';