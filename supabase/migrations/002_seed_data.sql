-- Insert sample services
insert into public.services (name, description, duration_minutes, price, category) values
  ('Manikīrs (klasiskais)', 'Klasiskais manikīrs ar nagu formas veidošanu un lakošanu', 45, 15.00, 'Manikīrs'),
  ('Manikīrs ar gēlu', 'Ilgnoturīgs gēla manikīrs līdz 3 nedēļām', 60, 25.00, 'Manikīrs'),
  ('Manikīrs ar dizainu', 'Gēla manikīrs ar papildu dizaina elementiem', 90, 35.00, 'Manikīrs'),
  ('Pedikīrs (klasiskais)', 'Klasiskais pedikīrs ar nagu kopšanu un lakošanu', 60, 20.00, 'Pedikīrs'),
  ('Pedikīrs ar gēlu', 'Ilgnoturīgs gēla pedikīrs', 75, 30.00, 'Pedikīrs'),
  ('Skropstu pagarināšana (klasiskā)', 'Klasiskā 1:1 tehnika dabīgam rezultātam', 120, 40.00, 'Skropstas'),
  ('Skropstu pagarināšana (2D-3D)', 'Apjomīga skropstu pagarināšana', 150, 55.00, 'Skropstas'),
  ('Skropstu laminēšana', 'Skropstu laminācija ar krāsošanu', 60, 30.00, 'Skropstas'),
  ('Uzacu veidošana', 'Uzacu korekcija un krāsošana', 30, 15.00, 'Uzacis'),
  ('Uzacu laminēšana', 'Ilgnoturīga uzacu laminācija', 45, 25.00, 'Uzacis'),
  ('Sejas tīrīšana', 'Dziļa sejas tīrīšana ar profesionāliem līdzekļiem', 60, 35.00, 'Seja'),
  ('Sejas masāža', 'Relaksējoša sejas un kakla masāža', 45, 25.00, 'Seja');

-- Insert sample creator (you'll need to update user_id after creating auth user)
-- insert into public.creators (user_id, full_name, email, phone, bio, specialties) values
--   ('REPLACE_WITH_AUTH_USER_ID', 'Estee Beauty Master', 'info@esteecitybeauty.lv', '+371 20000000', 'Profesionāla skaistumkopšanas meistare ar 5 gadu pieredzi', '{"Manikīrs", "Pedikīrs", "Skropstas"}');

-- Insert sample availability (Monday to Friday, 9 AM - 6 PM)
-- Uncomment and update creator_id after creating a creator
-- insert into public.availability (creator_id, day_of_week, start_time, end_time) values
--   ('REPLACE_WITH_CREATOR_ID', 1, '09:00', '18:00'),
--   ('REPLACE_WITH_CREATOR_ID', 2, '09:00', '18:00'),
--   ('REPLACE_WITH_CREATOR_ID', 3, '09:00', '18:00'),
--   ('REPLACE_WITH_CREATOR_ID', 4, '09:00', '18:00'),
--   ('REPLACE_WITH_CREATOR_ID', 5, '09:00', '18:00');
