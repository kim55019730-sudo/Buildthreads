import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as ArrowLeft } from "../_libs/lucide-react.mjs";
import { n as Route } from "./router-DN32mQ74.mjs";
import { i as Shell } from "./shell-CmXSOBEl.mjs";
import { a as formatCount, n as FactCard, o as generatePost, r as PostCard, t as Avatar } from "./generate-DXER0Otg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/p._id-CCQIhZpt.js
var import_jsx_runtime = require_jsx_runtime();
function ThreadPage() {
	const { id } = Route.useParams();
	const index = Number(id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "px-4 py-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/",
			className: "inline-flex h-11 items-center gap-2 text-sm font-medium",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "返回時間線"]
		})
	}), Number.isInteger(index) && index >= 0 && index < 5e5 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thread, { index }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "px-4 py-8 text-sm text-muted",
		children: "搵唔到呢條討論。"
	})] });
}
function Thread({ index }) {
	const post = generatePost(index);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostCard, {
			post,
			preview: false
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { children: post.comments.map((comment) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex gap-3 border-b border-line px-4 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
				persona: comment.persona,
				size: "sm"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: comment.persona.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: [" @", comment.persona.handle]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: [" · ", comment.persona.role]
							}),
							comment.anchors ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-accent",
								children: " · 條文"
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 whitespace-pre-wrap text-sm leading-relaxed",
						children: comment.text
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs text-muted tabular-nums",
						children: [formatCount(comment.likes), " 讚"]
					})
				]
			})]
		}, comment.id)) }),
		post.misread ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-4 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-sm font-medium",
				children: "正確理解"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FactCard, {
				fact: post.fact,
				expanded: true
			})]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "px-4 py-6 text-xs leading-relaxed text-muted",
			children: "留言可以錯、可以嘈。標咗「條文」嘅先係跟重點卡。交圖前對原文。"
		})
	] });
}
//#endregion
export { ThreadPage as component };
