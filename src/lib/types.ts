export type ProductImage = string;

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  description: string;
  category_id: string;
  price: number | string;
  compare_at_price: number | string | null;
  rating: number | string;
  review_count: number;
  stock: number;
  images: ProductImage[];
  sizes: string[];
  colors: string[];
  tags: string[];
  is_featured: boolean;
  is_new: boolean;
  is_flash_sale: boolean;
  is_best_seller: boolean;
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  image_url: string | null;
  sort_order: number;
};
