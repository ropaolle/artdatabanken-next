CREATE POLICY "Enable select for users based on user_id" ON "public"."images"
AS PERMISSIVE FOR SELECT
TO authenticated
USING (auth.uid() = user_id)

-- https://supabase.com/docs/guides/database/postgres/row-level-security

-- Images

alter table images enable row level security;

create policy "User can see their own images only."
on images for select
to authenticated
using ( auth.uid() = user_id );

-- Error running SQL: Failed to run sql query: only WITH CHECK expression allowed for INSERT
-- create policy "Users can create a images."
-- to authenticated
-- for insert using (
--   auth.uid() = user_id
-- )  with check (
--   auth.uid() = user_id
-- );

create policy "Users can create a images."
on images for insert 
to authenticated
with check ( auth.uid() = user_id );

create policy "Users can update their own images."
on images for update
to authenticated
using ( auth.uid() = user_id ); 

create policy "Users can delete a images."
on images for delete
to authenticated
using ( auth.uid() = user_id );