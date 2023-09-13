create table
  public.species (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default timezone ('utc'::text, now()),
    updated_at timestamp with time zone not null default timezone ('utc'::text, now()),
    user_id uuid null default auth.uid (),
    kingdom text not null default ''::text,
    "order" text not null default ''::text,
    family text not null default ''::text,
    species text not null default ''::text,
    latin text not null default ''::text,
    place text not null default ''::text,
    county text not null default ''::text,
    date text null,
    gender text[] null,
    image uuid null,
    constraint species_pkey primary key (id),
    constraint species_image_fkey foreign key (image) references images (id),
    constraint species_user_id_fkey foreign key (user_id) references auth.users (id)
  ) tablespace pg_default;

insert into species (kingdom, "order", family, species, gender,  latin, place, county, date)
values
  ('Fåglar','Tättingar','Kråkfåglar','Skata', '{"male"}', 'Pica pica','Råstasjön','uppland','2009-05-15'),
  ('Fåglar','Tättingar','Kråkfåglar','Kråka','{"female"}','Corvus corone','Råstasjön','uppland','2009-05-15'),
  ('Fåglar','Tättingar','Kråkfåglar','Råka','{"male", "female"}','Corvus frugilegus','Verkeån','skane','2010-05-19'),
  ('Fåglar','Tättingar','Kråkfåglar','Lavskrika','{}','Perisoreus infaustus','Ånnsjön','jamtland','2010-06-16'),
  ('Fåglar','Tättingar','Kråkfåglar','Kaja','{}','Corvus monedula','Ottenby','kalmar','2009-07-12'),
  ('Fåglar','Tättingar','Kråkfåglar','Nötskrika','{}','Garrulus glandarius','Källhagen','sodermanland','2018-04-28');
