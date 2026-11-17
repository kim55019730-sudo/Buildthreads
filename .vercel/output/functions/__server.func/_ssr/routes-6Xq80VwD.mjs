import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as Route$3 } from "./router-DN32mQ74.mjs";
import { i as Shell, n as LEVELS, o as TOPICS } from "./shell-CmXSOBEl.mjs";
import { i as collectPosts, r as PostCard, s as personaById } from "./generate-DXER0Otg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-6Xq80VwD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Feed({ topic, q, who, level, mis }) {
	const [count, setCount] = (0, import_react.useState)(7);
	const sentinel = (0, import_react.useRef)(null);
	const topicOk = TOPICS.some((item) => item.id === topic) ? topic : "all";
	const levelOk = LEVELS.some((item) => item.id === level) ? level : "all";
	const misOnly = mis === "1";
	const person = who ? personaById(who) : void 0;
	const query = (q ?? "").trim().toLowerCase();
	const result = (0, import_react.useMemo)(() => collectPosts(count, (post) => {
		if (topicOk !== "all" && post.fact.topic !== topicOk) return false;
		if (levelOk !== "all" && post.level !== levelOk) return false;
		if (misOnly && !post.misread) return false;
		if (who && post.author.id !== who) return false;
		if (query && !post.searchText.includes(query)) return false;
		return true;
	}), [
		count,
		topicOk,
		levelOk,
		misOnly,
		who,
		query
	]);
	(0, import_react.useEffect)(() => {
		setCount(7);
	}, [
		topicOk,
		levelOk,
		misOnly,
		who,
		query
	]);
	(0, import_react.useEffect)(() => {
		const el = sentinel.current;
		if (!el || result.exhausted) return;
		const io = new IntersectionObserver((entries) => {
			if (entries.some((entry) => entry.isIntersecting)) setCount((c) => c + 6);
		}, { rootMargin: "700px" });
		io.observe(el);
		return () => io.disconnect();
	}, [
		result.exhausted,
		result.posts.length,
		topicOk,
		levelOk,
		misOnly,
		who,
		query
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-b border-line px-4 py-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-2xl font-semibold leading-tight",
					children: "BuildThreads"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted",
					children: "建築條例時間線。約三分一係誤解帖，留言會@人糾正。拉到底仍然有。"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex gap-2 overflow-x-auto pb-1",
					children: [LEVELS.map((item) => {
						const active = item.id === levelOk;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							search: (prev) => ({
								...prev,
								level: item.id === "all" ? void 0 : item.id
							}),
							className: `inline-flex h-10 shrink-0 items-center rounded-full px-3 text-sm ${active ? "bg-ink text-surface" : "bg-surface text-ink"}`,
							children: item.label
						}, item.id);
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						search: (prev) => ({
							...prev,
							mis: misOnly ? void 0 : "1"
						}),
						className: `inline-flex h-10 shrink-0 items-center rounded-full px-3 text-sm ${misOnly ? "bg-accent text-ink" : "bg-surface text-ink"}`,
						children: "誤解"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden",
					children: TOPICS.map((item) => {
						const active = item.id === "all" && topicOk === "all" || item.id === topicOk;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							search: (prev) => ({
								...prev,
								topic: item.id === "all" ? void 0 : item.id
							}),
							className: `inline-flex h-10 shrink-0 items-center rounded-full px-3 text-sm ${active ? "bg-ink text-surface" : "bg-surface text-ink"}`,
							children: item.label
						}, item.id);
					})
				}),
				person ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm",
					children: [
						"只看 ",
						person.name,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							search: (prev) => ({
								...prev,
								who: void 0
							}),
							className: "ml-2 text-accent",
							children: "清除"
						})
					]
				}) : null,
				query ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted",
					children: [
						"搜尋「",
						q,
						"」",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							search: (prev) => ({
								...prev,
								q: void 0
							}),
							className: "ml-2 text-accent",
							children: "清除"
						})
					]
				}) : null
			]
		}),
		result.posts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostCard, { post }, post.id)),
		result.posts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "px-4 py-16 text-center text-sm leading-relaxed text-muted",
			children: "呢個篩選暫時冇人嘈。試下「地積」「走火」「DMUA」或者全部。"
		}) : result.exhausted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "px-4 py-8 text-center text-sm text-muted",
			children: "呢組關鍵字暫時嘈完。換個詞，時間線仲長。"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: sentinel,
			className: "px-4 py-8 text-center text-sm text-muted",
			children: "仲有人喺度嘈…"
		})
	] });
}
function Home() {
	const { topic, q, who, level, mis } = Route$3.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feed, {
		topic,
		q,
		who,
		level,
		mis
	}) });
}
//#endregion
export { Home as component };
