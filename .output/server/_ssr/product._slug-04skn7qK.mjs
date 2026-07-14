import { i as formatCurrency } from "./format-CDIcmAXO.mjs";
import { M as notFound, f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as productBySlugQuery } from "./ProductCard-DU7wvuMF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product._slug-04skn7qK.js
var $$splitComponentImporter = () => import("./product._slug-C2_899UR.mjs");
var $$splitNotFoundComponentImporter = () => import("./product._slug-C5TI-2E4.mjs");
var Route = createFileRoute("/product/$slug")({
	loader: async ({ context, params }) => {
		const data = await context.queryClient.ensureQueryData(productBySlugQuery(params.slug));
		if (!data) throw notFound();
		return data;
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "Product" }, {
			name: "robots",
			content: "noindex"
		}] };
		const p = loaderData.product;
		const img = p.images?.[0];
		return { meta: [
			{ title: `${p.name} by ${p.brand} — Ateliér` },
			{
				name: "description",
				content: p.description.slice(0, 155)
			},
			{
				property: "og:title",
				content: `${p.name} — ${formatCurrency(p.price)}`
			},
			{
				property: "og:description",
				content: p.description.slice(0, 155)
			},
			...img ? [{
				property: "og:image",
				content: img
			}] : []
		] };
	},
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
