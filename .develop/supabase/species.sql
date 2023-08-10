create table if not exists species (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users default auth.uid(),
  kingdom text,
  "order" text,
  family text,
  species text,
  sex text,
  speciesLatin text,
  place text,
  county text,
  date text,
  image text
);
