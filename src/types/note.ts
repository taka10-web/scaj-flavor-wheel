export type TabId = "wheel" | "score" | "notes";

export type Lang = "ja" | "en";

export interface CuppingScores {
  aroma: number;
  flavor: number;
  aftertaste: number;
  acidity: number;
  body: number;
  balance: number;
  sweetness: number;
  cleanCup: number;
  uniformity: number;
  overall: number;
}

export interface BeanMetadata {
  name: string;
  origin: string;
  variety: string;
  process: string;
  roastLevel: string;
}

export interface UnifiedNote {
  id: string;
  bean: BeanMetadata;
  date: string;
  scores: CuppingScores;
  totalScore: number;
  selectedFlavors: string[];
  comment: string;
  createdAt: number;
}

export const SCORE_KEYS: (keyof CuppingScores)[] = [
  "aroma",
  "flavor",
  "aftertaste",
  "acidity",
  "body",
  "balance",
  "sweetness",
  "cleanCup",
  "uniformity",
  "overall",
];

export const DEFAULT_SCORES: CuppingScores = {
  aroma: 6,
  flavor: 6,
  aftertaste: 6,
  acidity: 6,
  body: 6,
  balance: 6,
  sweetness: 6,
  cleanCup: 6,
  uniformity: 6,
  overall: 6,
};

export const DEFAULT_BEAN: BeanMetadata = {
  name: "",
  origin: "",
  variety: "",
  process: "",
  roastLevel: "",
};
