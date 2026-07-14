import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
import { i as stringType, n as numberType, r as objectType, t as booleanType } from "../_libs/zod.mjs";
import { n as hasSupabaseConfig, t as getSupabaseConfig } from "./env-kE5TAV13.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products.functions-BGOcTdwv.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function publicClient() {
	const config = getSupabaseConfig({ runtime: "server" });
	if (!hasSupabaseConfig(config)) throw new Error("Missing Supabase environment variable(s): SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY");
	return createClient(config.url, config.key, { auth: {
		storage: void 0,
		persistSession: false,
		autoRefreshToken: false
	} });
}
var PRODUCT_COLS = "id,slug,name,brand,description,category_id,price,compare_at_price,rating,review_count,stock,images,sizes,colors,tags,is_featured,is_new,is_flash_sale,is_best_seller";
var listCategories_createServerFn_handler = createServerRpc({
	id: "74cf57a5ce5acc5ff7716c464d5de5a2260685d83f4d25828e2026fb3932cf53",
	name: "listCategories",
	filename: "src/lib/products.functions.ts"
}, (opts) => listCategories.__executeServer(opts));
var listCategories = createServerFn({ method: "GET" }).handler(listCategories_createServerFn_handler, async () => {
	const { data, error } = await publicClient().from("categories").select("id,slug,name,tagline,image_url,sort_order").order("sort_order");
	if (error) throw new Error(error.message);
	return data ?? [];
});
var listProducts_createServerFn_handler = createServerRpc({
	id: "51ad93d03c52987e0e52d0164e41771f8765a8919d8a537367eaf795dff9b9d8",
	name: "listProducts",
	filename: "src/lib/products.functions.ts"
}, (opts) => listProducts.__executeServer(opts));
var listProducts = createServerFn({ method: "GET" }).inputValidator((input) => objectType({
	categorySlug: stringType().optional(),
	featured: booleanType().optional(),
	flashSale: booleanType().optional(),
	isNew: booleanType().optional(),
	bestSeller: booleanType().optional(),
	limit: numberType().int().min(1).max(60).optional()
}).parse(input ?? {})).handler(listProducts_createServerFn_handler, async ({ data }) => {
	const sb = publicClient();
	let categoryId = null;
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
var getProductBySlug_createServerFn_handler = createServerRpc({
	id: "934a19e0a64899030ca094a104b50f8fc2c2f2533d480be67184ceddaf6faaf0",
	name: "getProductBySlug",
	filename: "src/lib/products.functions.ts"
}, (opts) => getProductBySlug.__executeServer(opts));
var getProductBySlug = createServerFn({ method: "GET" }).inputValidator((input) => objectType({ slug: stringType().min(1) }).parse(input)).handler(getProductBySlug_createServerFn_handler, async ({ data }) => {
	const sb = publicClient();
	const { data: product, error } = await sb.from("products").select(`${PRODUCT_COLS},categories(id,name,slug)`).eq("slug", data.slug).maybeSingle();
	if (error) throw new Error(error.message);
	if (!product) return null;
	const { data: related } = await sb.from("products").select(PRODUCT_COLS).eq("category_id", product.category_id).neq("id", product.id).limit(8);
	return {
		product,
		related: related ?? []
	};
});
var searchProducts_createServerFn_handler = createServerRpc({
	id: "98f6ea06219c15c258067120d8debbcde0f6f83e0efb6c06816ddb77b33849a7",
	name: "searchProducts",
	filename: "src/lib/products.functions.ts"
}, (opts) => searchProducts.__executeServer(opts));
var searchProducts = createServerFn({ method: "GET" }).inputValidator((input) => objectType({ q: stringType().min(1).max(80) }).parse(input)).handler(searchProducts_createServerFn_handler, async ({ data }) => {
	const sb = publicClient();
	const like = `%${data.q.replace(/[%_]/g, "")}%`;
	const { data: rows, error } = await sb.from("products").select(PRODUCT_COLS).or(`name.ilike.${like},brand.ilike.${like},description.ilike.${like}`).limit(24);
	if (error) throw new Error(error.message);
	return rows ?? [];
});
//#endregion
export { getProductBySlug_createServerFn_handler, listCategories_createServerFn_handler, listProducts_createServerFn_handler, searchProducts_createServerFn_handler };
