//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-2Q1c5Cy_.js
var manifest = {
	"51ad93d03c52987e0e52d0164e41771f8765a8919d8a537367eaf795dff9b9d8": {
		functionName: "listProducts_createServerFn_handler",
		importer: () => import("./_ssr/products.functions-BGOcTdwv.mjs")
	},
	"74cf57a5ce5acc5ff7716c464d5de5a2260685d83f4d25828e2026fb3932cf53": {
		functionName: "listCategories_createServerFn_handler",
		importer: () => import("./_ssr/products.functions-BGOcTdwv.mjs")
	},
	"934a19e0a64899030ca094a104b50f8fc2c2f2533d480be67184ceddaf6faaf0": {
		functionName: "getProductBySlug_createServerFn_handler",
		importer: () => import("./_ssr/products.functions-BGOcTdwv.mjs")
	},
	"98f6ea06219c15c258067120d8debbcde0f6f83e0efb6c06816ddb77b33849a7": {
		functionName: "searchProducts_createServerFn_handler",
		importer: () => import("./_ssr/products.functions-BGOcTdwv.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
