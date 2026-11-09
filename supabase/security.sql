-- Run this once in the Supabase SQL editor.
-- The website talks to the database only through its server (service role key),
-- which bypasses row level security. Turning RLS on with no public policies
-- blocks anyone who copies the public "anon" key from the browser from reading
-- orders, messages, cart edit tokens, or changing products directly.

alter table products enable row level security;
alter table orders enable row level security;
alter table messages enable row level security;
alter table categories enable row level security;
alter table cart_links enable row level security;

-- Image uploads now go through the site's /api/uploads route (admin only),
-- so signed-in Supabase users no longer need direct write access to storage.
drop policy if exists "Authenticated users can upload product images" on storage.objects;
drop policy if exists "Authenticated users can update product images" on storage.objects;
drop policy if exists "Authenticated users can delete product images" on storage.objects;
