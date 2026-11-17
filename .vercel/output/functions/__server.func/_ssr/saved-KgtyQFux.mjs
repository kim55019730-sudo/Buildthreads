import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useSocial, i as SAVE_TAGS } from "./router-DN32mQ74.mjs";
import { i as Shell } from "./shell-CmXSOBEl.mjs";
import { o as generatePost, r as PostCard } from "./generate-DXER0Otg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/saved-KgtyQFux.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SavedPage() {
	const social = useSocial();
	const [tag, setTag] = (0, import_react.useState)("全部");
	const ids = social.savedIds.map((id) => Number(id)).filter((id) => Number.isInteger(id) && id >= 0 && (tag === "全部" || social.tag(String(id)) === tag)).sort((a, b) => a - b);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-b border-line px-4 py-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold",
				children: "已存"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "標籤只留喺呢部機。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex gap-2 overflow-x-auto",
				children: ["全部", ...SAVE_TAGS].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: `h-10 shrink-0 rounded-full px-3 text-sm ${tag === item ? "bg-ink text-surface" : "bg-surface"}`,
					onClick: () => setTag(item),
					children: item
				}, item))
			})
		]
	}), !social.ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "px-4 py-8 text-sm text-muted",
		children: "讀緊你存低嘅帖…"
	}) : ids.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "px-4 py-12 text-sm leading-relaxed text-muted",
		children: "呢個標籤未有帖。存低時揀考試、地盤、要背或者誤解。"
	}) : ids.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostCard, { post: generatePost(id) }, id))] });
}
//#endregion
export { SavedPage as component };
