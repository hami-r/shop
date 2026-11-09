-- Run once in the Supabase SQL editor to store Arabic product names and descriptions.
-- Both are optional: the Arabic site falls back to the English text when they are empty.
alter table products add column if not exists name_ar text;
alter table products add column if not exists description_ar text;
