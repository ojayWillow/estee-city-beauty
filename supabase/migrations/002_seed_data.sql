-- Real Estee City Beauty services with actual prices
insert into public.services (name, description, duration_minutes, price, category) values
  -- Manikīrs
  ('Manikīrs ar gēllaku', 'Ilgnoturīgs gēla lakas manikīrs ar nagu formas veidošanu', 90, 35.00, 'Manikīrs'),
  ('Manikīrs ar gēlu', 'Gēla nagu stiprināšana un veidošana', 90, 40.00, 'Manikīrs'),
  ('Nagu pieaudzēšana no nullēm', 'Pilnīga gēla nagu pieaudzēšana', 120, 50.00, 'Manikīrs'),
  ('Gēla nagu korekcija', 'Esotšo gēla nagu korekcija un atjaunošana', 90, 40.00, 'Manikīrs'),
  -- Pedikīrs
  ('Pedikīrs', 'Profesionāls pedikīrs ar pēdu kopšanu', 90, 40.00, 'Pedikīrs'),
  ('Pedikīrs ar gēllaku', 'Pedikīrs ar ilgnoturīgu gēla lakas pārklājumu', 90, 45.00, 'Pedikīrs'),
  -- Skropstas un uzacis
  ('Skropstu pagarināšana (klasiskā)', 'Klasiskā 1:1 tehnika dabīgam izskatam', 120, 40.00, 'Skropstas un uzacis'),
  ('Skropstu pagarināšana (2D-3D)', 'Apjomīga skropstu pagarināšana ar 2D-3D tehniku', 150, 55.00, 'Skropstas un uzacis'),
  ('Skropstu laminēšana', 'Skropstu laminācija ar krāsošanu un barošanu', 60, 30.00, 'Skropstas un uzacis'),
  ('Uzacu laminēšana', 'Ilgnoturīga uzacu laminācija un veidošana', 45, 25.00, 'Skropstas un uzacis'),
  ('Uzacu korekcija un krāsošana', 'Uzacu formas korekcija ar krāsošanu', 30, 15.00, 'Skropstas un uzacis'),
  -- Permanentais grims
  ('Lūpu permanentais grims', 'Ilgnoturīgs lūpu permanentais grims', 120, 80.00, 'Permanentais grims'),
  ('Uzacu mikropigmentācija', 'Uzacu mikropigmentācija ar pūdra tehniku', 120, 80.00, 'Permanentais grims'),
  ('Permanenta grima korekcija', 'Esošā permanenta grima korekcija', 90, 50.00, 'Permanentais grims'),
  -- Masāža
  ('Sejas masāža', 'Relaksējoša sejas un kakla masāža', 45, 25.00, 'Masāža'),
  ('Relaksējošā ķermeņa masāža', 'Pilnīga ķermeņa relaksācijas masāža', 60, 40.00, 'Masāža'),
  ('Dziļā sejas tīrīšana', 'Dziļa sejas tīrīšana ar profesionāliem līdzekļiem', 60, 35.00, 'Masāža');
