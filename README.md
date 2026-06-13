# Al Miaraj Ecommerce

Next.js 14 App Router ecommerce site for a Sharjah, UAE boutique selling Bukhoor, Oud, perfumes, cosmetics and gift sets.

## Stack

- Next.js 14, React, TypeScript
- Tailwind CSS using the Google Stitch design tokens
- Supabase Postgres, Auth and Storage
- Zustand persistent cart
- React Hook Form and Zod

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` from `.env.local.example`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

3. Run the SQL in `supabase/schema.sql` in the Supabase SQL editor.

4. Create at least one Supabase Auth email/password user for `/admin/login`.

5. Start locally:

```bash
npm run dev
```

The storefront works with demo products when Supabase env vars are missing. Admin write operations and image uploads require Supabase.

## Vercel Deploy

1. Push the project to a Git provider.
2. Import the repository in Vercel.
3. Add the three Supabase environment variables.
4. Deploy. Next.js will generate `robots.txt` and `sitemap.xml`, including product URLs from Supabase.

## Supabase Storage

The product form uploads images to a public bucket named `product-images`.

## Supabase Setup

### 1. Create Or Open A Supabase Project

1. Go to Supabase and open your project dashboard.
2. Go to **Project Settings > API**.
3. Copy these values into `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=Project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=anon public key
SUPABASE_SERVICE_ROLE_KEY=service_role key
```

Keep `SUPABASE_SERVICE_ROLE_KEY` private. Do not expose it in client code.

### 2. Create The Database Tables

1. In Supabase, open **SQL Editor**.
2. Create a new query.
3. Paste the contents of `supabase/schema.sql`.
4. Run the query.

This creates:

- `products`
- `orders`
- `messages`
- public Storage bucket `product-images`

### 3. Create The Storage Bucket Manually If Needed

If the SQL bucket insert does not work in your project:

1. Go to **Storage**.
2. Click **New bucket**.
3. Bucket name: `product-images`.
4. Set it to **Public bucket**.
5. Click **Create bucket**.

### 4. Add Storage Policies

Go to **Storage > product-images > Policies** and add policies for the `objects` table.

Public read policy:

```sql
create policy "Public can read product images"
on storage.objects for select
using (bucket_id = 'product-images');
```

Authenticated upload policy:

```sql
create policy "Authenticated users can upload product images"
on storage.objects for insert
to authenticated
with check (bucket_id = 'product-images');
```

Authenticated update policy:

```sql
create policy "Authenticated users can update product images"
on storage.objects for update
to authenticated
using (bucket_id = 'product-images')
with check (bucket_id = 'product-images');
```

Authenticated delete policy:

```sql
create policy "Authenticated users can delete product images"
on storage.objects for delete
to authenticated
using (bucket_id = 'product-images');
```

### 5. Create An Admin User

1. Go to **Authentication > Users**.
2. Click **Add user**.
3. Choose **Create new user**.
4. Enter the admin email and password.
5. Use those credentials at `/admin/login`.

The admin route is separate from the public storefront. It is available directly at `/admin` and is no longer shown in the main site navigation.
