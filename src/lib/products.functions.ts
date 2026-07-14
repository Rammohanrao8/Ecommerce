import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";
import { getSupabaseConfig, hasSupabaseConfig } from "@/integrations/supabase/env";

function publicClient() {
  const config = getSupabaseConfig({ runtime: "server" });
  if (!hasSupabaseConfig(config)) {
    throw new Error("Missing Supabase environment variable(s): SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY");
  }

  return createClient<Database>(config.url!, config.key!, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });
}

const PRODUCT_COLS =
  "id,slug,name,brand,description,category_id,price,compare_at_price,rating,review_count,stock,images,sizes,colors,tags,is_featured,is_new,is_flash_sale,is_best_seller";

export const listCategories = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
    .from("categories")
    .select("id,slug,name,tagline,image_url,sort_order")
    .order("sort_order");
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const listProducts = createServerFn({ method: "GET" })
  .inputValidator((input) =>
    z
      .object({
        categorySlug: z.string().optional(),
        featured: z.boolean().optional(),
        flashSale: z.boolean().optional(),
        isNew: z.boolean().optional(),
        bestSeller: z.boolean().optional(),
        limit: z.number().int().min(1).max(60).optional(),
      })
      .parse(input ?? {}),
  )
  .handler(async ({ data }) => {
    const sb = publicClient();
    let categoryId: string | null = null;
    if (data.categorySlug) {
      const { data: c } = await sb.from("categories").select("id").eq("slug", data.categorySlug).maybeSingle();
      if (!c) return [];
      categoryId = c.id;
    }
    let q = sb.from("products").select(PRODUCT_COLS);
    if (categoryId) q = q.eq("category_id", categoryId);
    if (data.featured) q = q.eq("is_featured", true);
    if (data.flashSale) q = q.eq("is_flash_sale", true);
    if (data.isNew) q = q.eq("is_new", true);
    if (data.bestSeller) q = q.eq("is_best_seller", true);
    q = q.order("created_at", { ascending: false }).limit(data.limit ?? 24);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const getProductBySlug = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ slug: z.string().min(1) }).parse(input))
  .handler(async ({ data }) => {
    const sb = publicClient();
    const { data: product, error } = await sb
      .from("products")
      .select(`${PRODUCT_COLS},categories(id,name,slug)`)
      .eq("slug", data.slug)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!product) return null;
    const { data: related } = await sb
      .from("products")
      .select(PRODUCT_COLS)
      .eq("category_id", product.category_id)
      .neq("id", product.id)
      .limit(8);
    return { product, related: related ?? [] };
  });

export const searchProducts = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ q: z.string().min(1).max(80) }).parse(input))
  .handler(async ({ data }) => {
    const sb = publicClient();
    const like = `%${data.q.replace(/[%_]/g, "")}%`;
    const { data: rows, error } = await sb
      .from("products")
      .select(PRODUCT_COLS)
      .or(`name.ilike.${like},brand.ilike.${like},description.ilike.${like}`)
      .limit(24);
    if (error) throw new Error(error.message);
    return rows ?? [];
  });
