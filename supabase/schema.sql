create table if not exists products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  name_ar text,
  slug text unique not null,
  description text,
  description_ar text,
  price decimal(10,2) not null,
  compare_price decimal(10,2),
  images text[],
  category text,
  stock int default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists orders (
  id uuid default gen_random_uuid() primary key,
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  address text,
  city text default 'Sharjah',
  country text default 'UAE',
  notes text,
  items jsonb not null,
  total decimal(10,2) not null,
  status text default 'pending',
  created_at timestamptz default now()
);

create table if not exists messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text,
  phone text,
  message text not null,
  created_at timestamptz default now()
);

alter table messages alter column email drop not null;

create table if not exists categories (
  id uuid default gen_random_uuid() primary key,
  name text unique not null,
  created_at timestamptz default now()
);

insert into categories (name)
values ('Bukhoor'), ('Oud'), ('Perfumes'), ('Cosmetics'), ('Gift Sets')
on conflict (name) do nothing;

create table if not exists cart_links (
  id uuid default gen_random_uuid() primary key,
  edit_token text not null,
  items jsonb not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "Public can read product images" on storage.objects;
create policy "Public can read product images"
on storage.objects for select
using (bucket_id = 'product-images');

-- Row level security: the site only uses the service role key on the server.
alter table products enable row level security;
alter table orders enable row level security;
alter table messages enable row level security;
alter table categories enable row level security;
alter table cart_links enable row level security;

-- Uploads go through the admin-only /api/uploads route, so no direct storage writes.
drop policy if exists "Authenticated users can upload product images" on storage.objects;
drop policy if exists "Authenticated users can update product images" on storage.objects;
drop policy if exists "Authenticated users can delete product images" on storage.objects;
