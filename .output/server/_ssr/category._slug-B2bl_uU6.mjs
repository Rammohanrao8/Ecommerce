import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { a as categoriesQuery } from "./ProductCard-DU7wvuMF.mjs";
import { r as ShopView, t as Route } from "./category._slug-D5Vd7Vpn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/category._slug-B2bl_uU6.js
var import_jsx_runtime = require_jsx_runtime();
function CategoryPage() {
	const { slug } = Route.useParams();
	const { data: cats = [] } = useSuspenseQuery(categoriesQuery());
	const cat = cats.find((c) => c.slug === slug);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopView, {
		title: cat.name,
		subtitle: cat.tagline ?? void 0,
		filter: {
			categorySlug: slug,
			limit: 60
		},
		lockedCategoryId: cat.id
	});
}
//#endregion
export { CategoryPage as component };
