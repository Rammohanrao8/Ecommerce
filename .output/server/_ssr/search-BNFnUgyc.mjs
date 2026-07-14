import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as stringType, r as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-BNFnUgyc.js
var $$splitComponentImporter = () => import("./search-D6jwTecG.mjs");
var Route = createFileRoute("/search")({
	validateSearch: (s) => objectType({ q: stringType().optional().default("") }).parse(s),
	head: () => ({ meta: [
		{ title: "Search — Ateliér" },
		{
			name: "description",
			content: "Search across products, brands and categories."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
