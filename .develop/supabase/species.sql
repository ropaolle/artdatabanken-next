create table if not exists species (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users default auth.uid(),
  kingdom text,
  taxonomy_order text,
  family text,
  species text,
  sex text,
  latin_name text,
  place text,
  county text,
  date text,
  image text
);

insert into species(kingdom, taxonomy_order, family, species, sex, latin_name, place, county, date, image)
values
  ('Fåglar','Tättingar','Kråkfåglar','Skata','','Pica pica','Råstasjön','Uppland','2009-05-15','image067.jpg'),
  ('Fåglar','Tättingar','Kråkfåglar','Kråka','','Corvus corone','Råstasjön','Uppland','2009-05-15','image068.jpg'),
  ('Fåglar','Tättingar','Kråkfåglar','Råka','','Corvus frugilegus','Verkeån','Skåne','2010-05-19','image066.jpg'),
  ('Fåglar','Tättingar','Kråkfåglar','Lavskrika','','Perisoreus infaustus','Ånnsjön','Jämtland','2010-06-16','image069.jpg'),
  ('Fåglar','Tättingar','Kråkfåglar','Kaja','','Corvus monedula','Ottenby','Öland','2009-07-12','image070.jpg'),
  ('Fåglar','Tättingar','Kråkfåglar','Nötskrika','','Garrulus glandarius','Källhagen','Sörmland','2018-04-28','image301.jpg');