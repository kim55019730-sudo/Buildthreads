import type { Persona } from "@/lib/regs/types";

export const PERSONAS: Persona[] = [
  { id: "tsat", name: "阿澤", handle: "tsat_ap", role: "AP 助理", voice: "hk" },
  { id: "keung", name: "強哥", handle: "keung_gd", role: "判頭", voice: "site" },
  { id: "lam", name: "琳琳", handle: "lam_moe", role: "消防顧問", voice: "calm" },
  { id: "may", name: "May", handle: "may_cram", role: "聽日考試", voice: "student" },
  { id: "fai", name: "輝Sir", handle: "fai_rse", role: "RSE", voice: "pedantic" },
  { id: "ka", name: "嘉嘉", handle: "ka_access", role: "無障礙", voice: "calm" },
  { id: "ho", name: "豪", handle: "ho_gfa", role: "QS", voice: "hk" },
  { id: "ting", name: "婷", handle: "ting_tcp", role: "TCP 地盤", voice: "site" },
  { id: "suk", name: "木叔", handle: "suk_mw", role: "小型工程", voice: "site" },
  { id: "ming", name: "阿明", handle: "ming_site", role: "地盤管工", voice: "site" },
  { id: "ken", name: "學生仔", handle: "ken_parttime", role: "兼讀建築", voice: "student" },
  { id: "loi", name: "樂怡", handle: "loi_cap", role: "專捉章號", voice: "pedantic" },
  { id: "tai", name: "冠宇", handle: "guanyu_tw", role: "台灣來港", voice: "tw" },
  { id: "fat", name: "發叔", handle: "fat_drain", role: "給排水", voice: "site" },
  { id: "wing", name: "Wing", handle: "wing_repair", role: "維修監督", voice: "hk" },
  { id: "jay", name: "阿J", handle: "j_mic", role: "MiC / BIM", voice: "hk" },
  { id: "suki", name: "Suki", handle: "suki_lease", role: "發展規劃", voice: "calm" },
  { id: "newbie", name: "新手", handle: "day1_site", role: "入行三日", voice: "student" },
  { id: "spark", name: "花火", handle: "spark_argue", role: "專挑機", voice: "hk" },
];

export function personaById(id: string): Persona | undefined {
  return PERSONAS.find((p) => p.id === id);
}
