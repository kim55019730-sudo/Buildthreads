import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Heart, c as Bookmark, o as Copy, r as MessageCircle, s as Check } from "../_libs/lucide-react.mjs";
import { a as useSocial, i as SAVE_TAGS } from "./router-DN32mQ74.mjs";
import { c as levelOf, l as topicLabel, s as levelLabel, t as FACTS } from "./shell-CmXSOBEl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/generate-DXER0Otg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Avatar({ persona, size = "md" }) {
	const accent = persona.id.charCodeAt(0) % 2 === 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `${size === "sm" ? "size-8 text-xs" : "size-11 text-base"} grid shrink-0 place-items-center rounded-full font-semibold ${accent ? "bg-accent text-ink" : "bg-ink text-surface"}`,
		"aria-hidden": true,
		children: persona.name.slice(0, 1)
	});
}
function SourceRow({ fact }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-3 rounded-2xl border border-line bg-surface px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold text-accent",
				children: fact.code
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "truncate text-sm",
				children: fact.ref
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: fact.sourceUrl,
			target: "_blank",
			rel: "noreferrer",
			className: "shrink-0 text-sm font-medium underline-offset-2 hover:underline",
			children: "官方"
		})]
	});
}
function FactCard({ fact, expanded = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "rounded-2xl border border-line bg-surface px-3 py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold text-accent",
					children: fact.code
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-xs text-muted",
					children: fact.ref
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-1 text-lg font-semibold leading-snug",
				children: fact.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed",
				children: fact.point
			}),
			expanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-muted",
				children: fact.detail
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
				className: "group mt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
					className: "inline-flex min-h-11 items-center text-sm font-medium",
					children: "展開依據"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "pb-1 text-sm leading-relaxed text-muted",
					children: fact.detail
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: fact.sourceUrl,
					target: "_blank",
					rel: "noreferrer",
					className: "text-xs font-medium underline-offset-2 hover:underline",
					children: fact.sourceLabel
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted",
					children: "卡先算數"
				})]
			})
		]
	});
}
function formatCount(n) {
	const value = Math.max(0, Math.round(n));
	if (value < 1e4) return value.toLocaleString("zh-HK");
	const wan = value / 1e4;
	return `${wan >= 10 ? String(Math.round(wan)) : wan.toFixed(1).replace(/\.0$/, "")}萬`;
}
function PostCard({ post, preview = true }) {
	const social = useSocial();
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [picking, setPicking] = (0, import_react.useState)(false);
	const liked = social.liked(post.id);
	const saved = social.saved(post.id);
	const tag = social.tag(post.id);
	const peek = preview ? post.comments.find((comment) => comment.anchors) ?? post.comments[0] : void 0;
	async function copyPoint() {
		const text = `${post.fact.code} ${post.fact.ref}\n${post.fact.title}\n${post.fact.point}`;
		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1600);
		} catch {
			setCopied(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "feed-card border-b border-line px-4 py-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					search: (prev) => ({
						...prev,
						who: post.author.id
					}),
					"aria-label": `${post.author.name}的帖`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, { persona: post.author })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-baseline gap-x-2 gap-y-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								search: (prev) => ({
									...prev,
									who: post.author.id
								}),
								className: "font-semibold",
								children: post.author.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-sm text-muted",
								children: ["@", post.author.handle]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-sm text-muted",
								children: ["· ", post.timeLabel]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: [
							post.author.role,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "px-1",
								children: "·"
							}),
							topicLabel(post.fact.topic),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "px-1",
								children: "·"
							}),
							levelLabel(post.level),
							post.fact.importance >= 5 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-accent",
								children: " · 高頻"
							}) : null,
							post.misread ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-accent",
								children: " · 誤解"
							}) : null
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/p/$id",
				params: { id: post.id },
				className: "mt-3 block whitespace-pre-wrap text-base leading-relaxed",
				children: post.body
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: post.misread ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceRow, { fact: post.fact }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FactCard, {
					fact: post.fact,
					expanded: !preview
				})
			}),
			peek ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/p/$id",
				params: { id: post.id },
				className: "mt-3 block rounded-2xl border border-line bg-surface px-3 py-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "line-clamp-2 text-sm leading-relaxed text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-ink",
							children: peek.persona.name
						}),
						"  ",
						peek.text
					]
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1 flex items-center gap-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/p/$id",
						params: { id: post.id },
						className: "inline-flex h-11 items-center gap-1 rounded-full px-2 text-sm text-muted hover:bg-accent-soft hover:text-ink",
						"aria-label": `${post.comments.length}則留言`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums",
							children: formatCount(post.comments.length)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: `inline-flex h-11 items-center gap-1 rounded-full px-2 text-sm hover:bg-accent-soft ${liked ? "text-accent" : "text-muted"}`,
						"aria-pressed": liked,
						onClick: () => social.toggleLike(post.id),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: `size-5 ${liked ? "fill-current" : ""}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums",
							children: formatCount(post.likes + (liked ? 1 : 0))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: `inline-flex h-11 items-center gap-1 rounded-full px-2 text-sm hover:bg-accent-soft ${saved ? "text-ink" : "text-muted"}`,
						"aria-pressed": saved,
						onClick: () => {
							if (saved) {
								social.unsave(post.id);
								setPicking(false);
							} else setPicking((open) => !open);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: `size-5 ${saved ? "fill-current" : ""}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: saved ? tag || "已存" : "存低" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "inline-flex h-11 items-center gap-1 rounded-full px-2 text-sm text-muted hover:bg-accent-soft hover:text-ink",
						onClick: copyPoint,
						children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: copied ? "已抄" : "抄重點" })]
					})
				]
			}),
			picking ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2 px-1 pb-2",
				children: SAVE_TAGS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-10 rounded-full bg-surface px-3 text-sm",
					onClick: () => {
						social.save(post.id, item);
						setPicking(false);
					},
					children: item
				}, item))
			}) : null
		]
	});
}
var PERSONAS = [
	{
		id: "tsat",
		name: "阿澤",
		handle: "tsat_ap",
		role: "AP 助理",
		voice: "hk"
	},
	{
		id: "keung",
		name: "強哥",
		handle: "keung_gd",
		role: "判頭",
		voice: "site"
	},
	{
		id: "lam",
		name: "琳琳",
		handle: "lam_moe",
		role: "消防顧問",
		voice: "calm"
	},
	{
		id: "may",
		name: "May",
		handle: "may_cram",
		role: "聽日考試",
		voice: "student"
	},
	{
		id: "fai",
		name: "輝Sir",
		handle: "fai_rse",
		role: "RSE",
		voice: "pedantic"
	},
	{
		id: "ka",
		name: "嘉嘉",
		handle: "ka_access",
		role: "無障礙",
		voice: "calm"
	},
	{
		id: "ho",
		name: "豪",
		handle: "ho_gfa",
		role: "QS",
		voice: "hk"
	},
	{
		id: "ting",
		name: "婷",
		handle: "ting_tcp",
		role: "TCP 地盤",
		voice: "site"
	},
	{
		id: "suk",
		name: "木叔",
		handle: "suk_mw",
		role: "小型工程",
		voice: "site"
	},
	{
		id: "ming",
		name: "阿明",
		handle: "ming_site",
		role: "地盤管工",
		voice: "site"
	},
	{
		id: "ken",
		name: "學生仔",
		handle: "ken_parttime",
		role: "兼讀建築",
		voice: "student"
	},
	{
		id: "loi",
		name: "樂怡",
		handle: "loi_cap",
		role: "專捉章號",
		voice: "pedantic"
	},
	{
		id: "tai",
		name: "冠宇",
		handle: "guanyu_tw",
		role: "台灣來港",
		voice: "tw"
	},
	{
		id: "fat",
		name: "發叔",
		handle: "fat_drain",
		role: "給排水",
		voice: "site"
	},
	{
		id: "wing",
		name: "Wing",
		handle: "wing_repair",
		role: "維修監督",
		voice: "hk"
	},
	{
		id: "jay",
		name: "阿J",
		handle: "j_mic",
		role: "MiC / BIM",
		voice: "hk"
	},
	{
		id: "suki",
		name: "Suki",
		handle: "suki_lease",
		role: "發展規劃",
		voice: "calm"
	},
	{
		id: "newbie",
		name: "新手",
		handle: "day1_site",
		role: "入行三日",
		voice: "student"
	},
	{
		id: "spark",
		name: "花火",
		handle: "spark_argue",
		role: "專挑機",
		voice: "hk"
	}
];
function personaById(id) {
	return PERSONAS.find((p) => p.id === id);
}
function mix(n) {
	return Math.imul(n + 1, 2654435761) >>> 0;
}
function rng(seed) {
	let s = seed >>> 0;
	return () => {
		s = Math.imul(s, 1664525) + 1013904223 >>> 0;
		return s / 4294967296;
	};
}
function pick(rand, list) {
	return list[Math.floor(rand() * list.length)];
}
var OPENERS = [
	"認真問。",
	"半夜溫書。",
	"地盤茶水間。",
	"考試前。",
	"補料到眼紅。",
	"唔好笑完唔答。",
	"我接受對罵。",
	"新人問，老手唔好裝睇唔到。",
	"宣告。",
	"呢單我栽過。",
	"有無人仲記得。",
	"交圖之前最後一次確認。"
];
function timeLabel(index) {
	const minutes = 2 + index * 11 + index % 7 * 3;
	if (minutes < 60) return `${minutes}分鐘`;
	const hours = Math.floor(minutes / 60);
	if (hours < 24) return `${hours}小時`;
	const days = Math.floor(hours / 24);
	if (days < 14) return `${days}日`;
	const weeks = Math.floor(days / 7);
	if (weeks < 8) return `${weeks}星期`;
	return `${Math.floor(days / 30)}個月`;
}
function likesFor(importance, rand) {
	const [lo, hi] = {
		5: [1400, 22e3],
		4: [320, 6400],
		3: [70, 980],
		2: [14, 160],
		1: [2, 28]
	}[importance];
	const skewed = Math.pow(rand(), 1.35);
	return Math.round(lo + skewed * (hi - lo));
}
function say(persona, kind, fact, rand, at, trap) {
	const bite = fact.point.split("。")[0] ?? fact.point;
	const to = `@${at}`;
	if (persona.voice === "tw") {
		if (kind === "wrong") return `${to} 等一下，我在台灣是記成「${trap}」。來香港之後開始懷疑人生。`;
		if (kind === "anchor") return `${to} 我重看了一次。你們香港的寫法是：${bite}。容積率這個詞我先收起來。`;
		if (kind === "panic") return `${to} 這也差太多。我把「${fact.title}」抄進筆記。`;
		return `${to} 真的假的。${fact.code} ${fact.ref} 這條我昨晚才第一次打開。`;
	}
	if (kind === "wrong") return pick(rand, [
		`${to} 我一直記「${trap}」。做咗咁多年都冇人講我錯。`,
		`${to} ${trap}。你張卡如果唔係咁寫，我就當你溫錯書。`,
		`${to} 收皮之前聽我講：${trap}。地盤係咁做。`
	]);
	if (kind === "anchor") return pick(rand, [
		`${to} 唔好再教。${bite}。`,
		`${to} ${fact.code} ${fact.ref}。${bite}。交圖前對原文，唔好背我呢句。`,
		`${to} 錯嘅嗰句好大聲，啱嘅呢句先算：${bite}。`,
		`${to} 章號同數字分開記。${bite}。`
	]);
	if (kind === "panic") return pick(rand, [
		`${to} 即係我聽日如果寫「${bite}」，有冇人會話我簡化到錯？`,
		`${to} 我抄低咗「${fact.title}」。求你哋唔好凌晨先話我記反。`,
		`${to} 呢條再錯我就真係放棄背表。`
	]);
	if (kind === "site") return pick(rand, [
		`${to} 現場唔使演講。照呢句做：${bite}。`,
		`${to} 上次補料就係栽喺「${trap}」。`,
		`${to} 判頭可以嘈，條文唔可以嘈。${fact.code} 擺上台。`
	]);
	return pick(rand, [
		`${to} 讚數高只代表大家都不熟。默返一次先好瞓。`,
		`${to} ${fact.code} 同日常口語中間，通常差一次補料。`,
		`${to} 我將「${fact.title}」釘咗喺茶水間。有人當係裝飾。`,
		`${to} 計唔計錢都好，答案仍然係 ${fact.code}，唔係我心情。`
	]);
}
function buildComments(fact, index, author, rand, trap) {
	const pattern = index % 4;
	const pool = PERSONAS.filter((p) => p.id !== author.id);
	const take = () => {
		const i = Math.floor(rand() * pool.length);
		return pool.splice(i, 1)[0];
	};
	const plan = pattern === 0 ? [
		"wrong",
		"panic",
		"anchor",
		"site"
	] : pattern === 1 ? [
		"panic",
		"anchor",
		"aside"
	] : pattern === 2 ? [
		"site",
		"wrong",
		"anchor"
	] : [
		"aside",
		"anchor",
		"panic",
		"site"
	];
	const count = 2 + index % Math.max(2, fact.importance - 1);
	const kinds = plan.slice(0, Math.min(count, plan.length));
	if (!kinds.includes("anchor")) kinds.push("anchor");
	let replyTo = author;
	return kinds.map((kind, n) => {
		const persona = take();
		const anchors = kind === "anchor";
		const comment = {
			id: `${index}-${n}`,
			persona,
			text: say(persona, kind, fact, rand, replyTo.handle, trap),
			likes: anchors ? 40 + Math.floor(rand() * 900) : Math.floor(rand() * 180),
			anchors
		};
		replyTo = persona;
		return comment;
	});
}
function generatePost(index) {
	const fact = FACTS[mix(index) % FACTS.length];
	const rand = rng(mix(index) ^ 2654435769);
	const author = PERSONAS[Math.floor(rand() * PERSONAS.length)];
	const line = fact.lines[Math.floor(rand() * fact.lines.length)];
	const trap = fact.traps[Math.floor(rand() * fact.traps.length)] ?? fact.traps[0];
	const misread = index % 3 === 0;
	const opener = rand() > .28 ? `${pick(rand, OPENERS)}\n\n` : "";
	const body = misread ? `${opener}我而家係咁理解，你哋唔好即刻鬧：${trap}。\n\n出處我貼咗 ${fact.code} ${fact.ref}，但係我覺得實務唔係咁。` : `${opener}${line}${rand() > .62 ? "" : "\n\n下面張卡先算數。留言可以錯。"}`;
	const comments = buildComments(fact, index, author, rand, trap);
	const level = levelOf(fact);
	const searchText = [
		body,
		fact.title,
		fact.point,
		fact.detail,
		fact.code,
		fact.ref,
		fact.keywords,
		fact.traps.join(" "),
		level,
		misread ? "誤解" : "",
		author.name,
		author.handle,
		author.role,
		...comments.map((c) => `${c.persona.name} ${c.text}`)
	].join("\n").toLowerCase();
	return {
		id: String(index),
		index,
		fact,
		author,
		body,
		timeLabel: timeLabel(index),
		likes: likesFor(fact.importance, rand),
		comments,
		searchText,
		misread,
		level
	};
}
function collectPosts(count, pred) {
	const posts = [];
	let i = 0;
	const limit = Math.max(4e3, count * 40);
	while (posts.length < count && i < limit) {
		const post = generatePost(i);
		if (pred(post)) posts.push(post);
		i += 1;
	}
	return {
		posts,
		exhausted: posts.length < count
	};
}
//#endregion
export { formatCount as a, collectPosts as i, FactCard as n, generatePost as o, PostCard as r, personaById as s, Avatar as t };
