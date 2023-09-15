create table
  public.images (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default timezone ('utc'::text, now()),
    updated_at timestamp with time zone not null default timezone ('utc'::text, now()),
    user_id uuid null default auth.uid (),
    filename text not null default ''::text,
    url text not null default ''::text,
    width integer not null default 0,
    height integer not null default 0,
    mime_type text not null default ''::text,
    thumbnail_url text not null default ''::text,
    upscaled boolean not null default false,
    constraint images_pkey primary key (id),
    constraint images_user_id_fkey foreign key (user_id) references auth.users (id)
  ) tablespace pg_default;

-- create table if not exists images (
--   id uuid default gen_random_uuid() primary key,
--   created_at timestamp with time zone default timezone('utc'::text, now()) not null,
--   updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
--   user_id uuid references auth.users default auth.uid(),
--   filename text,
--   url text,
--   thumbnail_url text
-- );

-- insert into images(filename, url, thumbnail_url)
-- values
--   ('image001.jpg','https://image001.jpg','https://image001_thumb.jpg'),
--   ('image002.jpg','https://image002.jpg','https://image002_thumb.jpg'),
--   ('image003.jpg','https://image003.jpg','https://image003_thumb.jpg'),
--   ('image004.jpg','https://firebasestorage.googleapis.com/v0/b/artdatabanken-2023.appspot.com/o/images%2Fimage559.jpg?alt=media&token=9d63e2a6-4bcf-4a31-9895-b5a5623601d7','https://firebasestorage.googleapis.com/v0/b/artdatabanken-2023.appspot.com/o/thumbs%2Fimage559.jpg?alt=media&token=de29369a-5e1a-47c6-a3ec-2ffe20ca4b2c'),
--   ;
  