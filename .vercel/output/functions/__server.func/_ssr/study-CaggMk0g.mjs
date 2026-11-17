import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as StudyPeek, i as Shell, r as SOURCES } from "./shell-CmXSOBEl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/study-CaggMk0g.js
var import_jsx_runtime = require_jsx_runtime();
function StudyPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-4 py-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold",
				children: "測驗"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-muted",
				children: "揀一句。答完先顯示出處。誤解帖的正確版本喺討論最底。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudyPeek, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6 rounded-2xl border border-line bg-surface p-4 xl:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold",
					children: "原文"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 flex flex-col gap-3",
					children: SOURCES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: item.href,
						target: "_blank",
						rel: "noreferrer",
						className: "text-sm leading-snug hover:text-accent",
						children: item.label
					}) }, item.href))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs leading-relaxed text-muted",
				children: "數字同條款用嚟溫習。屋宇署改完 PDF，以改完嗰版為準。"
			})
		]
	}) });
}
//#endregion
export { StudyPage as component };
