globalThis.__nitro_main__ = import.meta.url;
import { a as FastResponse, n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/cart-Bf7JInB3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15a9-B0JEEfW6gLmRR7Csf+iqwtbcNyM\"",
		"mtime": "2026-07-14T05:33:03.213Z",
		"size": 5545,
		"path": "../public/assets/cart-Bf7JInB3.js"
	},
	"/favicon.png": {
		"type": "image/png",
		"etag": "\"1d615-Zz8yjXAfcceJa9tXxeeBgqxHQAQ\"",
		"mtime": "2026-07-08T04:26:40.435Z",
		"size": 120341,
		"path": "../public/favicon.png"
	},
	"/assets/category._slug-DHGLOU-_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"165-9Bwz6Je5icN+qyU5dYHSM8h4eUs\"",
		"mtime": "2026-07-14T05:33:03.215Z",
		"size": 357,
		"path": "../public/assets/category._slug-DHGLOU-_.js"
	},
	"/assets/format-uDZJ2Hqv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"897f-5AS+1wx7T+IK84B1vrUlA+P0JIo\"",
		"mtime": "2026-07-14T05:33:03.217Z",
		"size": 35199,
		"path": "../public/assets/format-uDZJ2Hqv.js"
	},
	"/assets/category._slug-BcymgnAR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"179-uDy5j1IUy8Mnd1lBovKYbArf4rc\"",
		"mtime": "2026-07-14T05:33:03.214Z",
		"size": 377,
		"path": "../public/assets/category._slug-BcymgnAR.js"
	},
	"/assets/jsx-runtime-DGeXAQPT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3ab-mgnSm9dUpwL2+z7tKxJ2MsN0fOM\"",
		"mtime": "2026-07-14T05:33:03.218Z",
		"size": 939,
		"path": "../public/assets/jsx-runtime-DGeXAQPT.js"
	},
	"/assets/link-D9v7SzLQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"85f1-ZKPDO0OnskEKx8KsinUiM6+JJuE\"",
		"mtime": "2026-07-14T05:33:03.220Z",
		"size": 34289,
		"path": "../public/assets/link-D9v7SzLQ.js"
	},
	"/assets/product._slug-BWtGVXML.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"184-g5T554ZegY2tOGqqZCH9tozQGzk\"",
		"mtime": "2026-07-14T05:33:03.224Z",
		"size": 388,
		"path": "../public/assets/product._slug-BWtGVXML.js"
	},
	"/assets/product._slug-B6gEkOcr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22fc-qcfcI7zNmMMX4AbaKGQizt/WJ08\"",
		"mtime": "2026-07-14T05:33:03.222Z",
		"size": 8956,
		"path": "../public/assets/product._slug-B6gEkOcr.js"
	},
	"/assets/shop-9tUx9Ygl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b80-zSJvumNS5gOWcDagl5aUJgUjGyA\"",
		"mtime": "2026-07-14T05:33:03.228Z",
		"size": 7040,
		"path": "../public/assets/shop-9tUx9Ygl.js"
	},
	"/assets/ProductCard-D7tEdc64.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11445-GkAgblhV/lkpRMb39A4musc1EY4\"",
		"mtime": "2026-07-14T05:33:03.211Z",
		"size": 70725,
		"path": "../public/assets/ProductCard-D7tEdc64.js"
	},
	"/assets/routes-nGHz0hzc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2612-+NlW+bkhVSXvF2nSnPeUmasQfcY\"",
		"mtime": "2026-07-14T05:33:03.226Z",
		"size": 9746,
		"path": "../public/assets/routes-nGHz0hzc.js"
	},
	"/assets/wishlist-DdGFJi_e.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"62e-sFx2epoBifDERG8R0emiIQWrZHA\"",
		"mtime": "2026-07-14T05:33:03.232Z",
		"size": 1582,
		"path": "../public/assets/wishlist-DdGFJi_e.js"
	},
	"/assets/search-C1EL5ohQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"791-kUw0FsT2vRZLs35HUUu0zSSaFAM\"",
		"mtime": "2026-07-14T05:33:03.227Z",
		"size": 1937,
		"path": "../public/assets/search-C1EL5ohQ.js"
	},
	"/assets/truck-dSYLI2AR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"399-fay1Q9/b7NYCaBKH8TDffcDh98I\"",
		"mtime": "2026-07-14T05:33:03.230Z",
		"size": 921,
		"path": "../public/assets/truck-dSYLI2AR.js"
	},
	"/assets/styles-DPnN8bRj.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"16533-PjuFXWN0gYKB/X/DSf+ZWHuIa/k\"",
		"mtime": "2026-07-14T05:33:03.234Z",
		"size": 91443,
		"path": "../public/assets/styles-DPnN8bRj.css"
	},
	"/assets/useBaseQuery-DfywvM7C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5c74-z7zRri1psQuF32fwALi6yJTrl9M\"",
		"mtime": "2026-07-14T05:33:03.231Z",
		"size": 23668,
		"path": "../public/assets/useBaseQuery-DfywvM7C.js"
	},
	"/assets/index-t-mygVFq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"934ca-uxibJazeyM7ZlIWZbEwMsb9cbJY\"",
		"mtime": "2026-07-14T05:33:03.209Z",
		"size": 603338,
		"path": "../public/assets/index-t-mygVFq.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_ye_npr = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_ye_npr
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
