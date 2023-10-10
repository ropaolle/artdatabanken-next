-- https://supabase.com/docs/guides/auth/managing-user-data

create table public.users (
  id uuid not null references auth.users on delete cascade,
  created_at timestamp with time zone not null default timezone ('utc'::text, now()),
  updated_at timestamp with time zone not null default timezone ('utc'::text, now()),
  email text not null,

  primary key (id)
);

alter table public.users enable row level security;

create policy "Public users are viewable by everyone."
  on users for select
  using ( true );

create policy "Users can insert their own user."
  on users for insert
  with check ( auth.uid() = id );

create policy "Users can update own user."
  on users for update
  using ( auth.uid() = id );


-- 'handle_new_user' function

begin
  insert into public.users (id, email)
  values (new.id, new.email);
  return new;
end;

-- Last sign in (https://github.com/orgs/supabase/discussions/7463)
create function public.create_last_sign_in_on_users()
    returns trigger as $$
    begin
      IF (NEW.last_sign_in_at is null) THEN
        RETURN NULL;
      ELSE
        UPDATE public.users
        SET last_sign_in_at = NEW.last_sign_in_at
        WHERE id = (NEW.id)::uuid;
        RETURN NEW;
      END IF;
    end;
    $$ language plpgsql security definer;

create trigger on_last_sign_in
    after update on auth.users
    for each row execute procedure public.create_last_sign_in_on_users();    

-- DROP
drop trigger on_last_sign_in on auth.users;
drop function create_last_sign_in_on_users;