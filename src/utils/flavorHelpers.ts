import { flavorWheel } from "../data/flavors";
import type { Lang } from "../types/note";

export function resolveFlavorName(
  flavorId: string,
  lang: Lang
): string {
  const parts = flavorId.split("-").map(Number);
  const t1 = flavorWheel[parts[0]];
  if (!t1) return flavorId;
  if (parts.length === 1) return lang === "ja" ? t1.nameJa : t1.nameEn;
  const t2 = t1.children?.[parts[1]];
  if (!t2) return flavorId;
  if (parts.length === 2) return lang === "ja" ? t2.nameJa : t2.nameEn;
  const t3 = t2.children?.[parts[2]];
  if (!t3) return flavorId;
  return lang === "ja" ? t3.nameJa : t3.nameEn;
}
