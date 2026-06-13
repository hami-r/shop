export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  compare_price: number | null;
  images: string[] | null;
  category: string | null;
  stock: number;
  is_active: boolean;
  created_at?: string;
};

export type ProductCategory = {
  id: string;
  name: string;
  created_at?: string;
};

export type CartItem = {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  quantity: number;
};

export type CartLink = {
  id: string;
  items: CartItem[];
  edit_token?: string;
  created_at: string;
  updated_at: string;
};

export type Order = {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  notes?: string | null;
  items: CartItem[];
  total: number;
  status: "pending" | "processing" | "delivered";
  created_at: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  created_at: string;
};
