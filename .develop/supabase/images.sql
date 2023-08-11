create table if not exists images (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users default auth.uid(),
  filename text,
  url text,
  thumbnail_url text
);

insert into images(filename, url, thumbnail_url)
values
  ('image001.jpg','https://image001.jpg','https://image001_thumb.jpg'),
  ('image002.jpg','https://image002.jpg','https://image002_thumb.jpg'),
  ('image003.jpg','https://image003.jpg','https://image003_thumb.jpg'),
  ('image004.jpg','https://image004.jpg','https://image004_thumb.jpg');
  