import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/env-kE5TAV13.js
function getRuntimeEnv() {
	const viteEnv = typeof import.meta !== "undefined" && "env" in import.meta ? {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_SUPABASE_PUBLISHABLE_KEY": "sb_publishable_JZOViLPRPsTfri9ZHYeybw_WbNpPV1i",
		"VITE_SUPABASE_URL": "https://mrweynhhjafyxivxbfqz.supabase.co"
	} : void 0;
	return {
		...typeof processModule !== "undefined" ? processModule.env : {},
		...viteEnv ?? {}
	};
}
function getSupabaseConfig(input) {
	const env = input?.env ?? getRuntimeEnv();
	const runtime = input?.runtime ?? "server";
	return {
		url: runtime === "client" ? env.VITE_SUPABASE_URL ?? env.SUPABASE_URL : env.SUPABASE_URL ?? env.VITE_SUPABASE_URL,
		key: runtime === "client" ? env.VITE_SUPABASE_PUBLISHABLE_KEY ?? env.SUPABASE_PUBLISHABLE_KEY : env.SUPABASE_PUBLISHABLE_KEY ?? env.VITE_SUPABASE_PUBLISHABLE_KEY,
		serviceRoleKey: env.SUPABASE_SERVICE_ROLE_KEY ?? env.VITE_SUPABASE_SERVICE_ROLE_KEY
	};
}
function hasSupabaseConfig(config) {
	return Boolean(config.url && config.key);
}
//#endregion
export { hasSupabaseConfig as n, getSupabaseConfig as t };
