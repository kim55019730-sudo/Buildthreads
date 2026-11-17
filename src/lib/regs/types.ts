export type TopicId =
  | "planning"
  | "fire"
  | "access"
  | "pnap"
  | "construct"
  | "sanitary"
  | "works"
  | "process"
  | "structure";

export type Fact = {
  id: string;
  topic: TopicId;
  importance: 1 | 2 | 3 | 4 | 5;
  code: string;
  ref: string;
  title: string;
  point: string;
  detail: string;
  sourceUrl: string;
  sourceLabel: string;
  traps: string[];
  lines: string[];
  keywords: string;
};

export type Persona = {
  id: string;
  name: string;
  handle: string;
  role: string;
  voice: "hk" | "tw" | "pedantic" | "site" | "student" | "calm";
};

export type Comment = {
  id: string;
  persona: Persona;
  text: string;
  likes: number;
  anchors: boolean;
};

export type Level = "intro" | "advanced" | "site";

export type Post = {
  id: string;
  index: number;
  fact: Fact;
  author: Persona;
  body: string;
  timeLabel: string;
  likes: number;
  comments: Comment[];
  searchText: string;
  misread: boolean;
  level: Level;
};
