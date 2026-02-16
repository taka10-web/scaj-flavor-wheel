import type { Lang } from "../types/note";

const dict = {
  // Header
  appTitle: { en: "Coffee Taster's Flavor Wheel", ja: "Coffee Taster's Flavor Wheel" },

  // Tabs
  tabWheel: { en: "Wheel", ja: "ホイール" },
  tabScore: { en: "Score", ja: "スコア" },
  tabNotes: { en: "Notes", ja: "ノート" },

  // Score Sheet - Bean Info
  sectionBean: { en: "Bean Info", ja: "豆情報" },
  beanName: { en: "Coffee Name", ja: "コーヒー名" },
  beanNamePlaceholder: { en: "e.g. Ethiopia Yirgacheffe", ja: "例: エチオピア イルガチェフェ" },
  beanNameRequired: { en: "* Required", ja: "* 必須" },
  origin: { en: "Origin", ja: "産地" },
  originPlaceholder: { en: "e.g. Ethiopia", ja: "例: エチオピア" },
  variety: { en: "Variety", ja: "品種" },
  varietyPlaceholder: { en: "e.g. Heirloom", ja: "例: ゲイシャ" },
  process: { en: "Process", ja: "精製方法" },
  roastLevel: { en: "Roast Level", ja: "焙煎度" },
  date: { en: "Date", ja: "日付" },

  // Process options
  processWashed: { en: "Washed", ja: "Washed" },
  processNatural: { en: "Natural", ja: "Natural" },
  processHoney: { en: "Honey", ja: "Honey" },
  processOther: { en: "Other", ja: "Other" },

  // Roast Level options
  roastLight: { en: "Light", ja: "浅煎り" },
  roastMedium: { en: "Medium", ja: "中煎り" },
  roastMediumDark: { en: "Med-Dark", ja: "中深煎り" },
  roastDark: { en: "Dark", ja: "深煎り" },

  // Score Sheet - Scores
  sectionScores: { en: "Cupping Scores", ja: "カッピングスコア" },
  totalScore: { en: "Total", ja: "合計" },
  scoreAroma: { en: "Aroma", ja: "アロマ" },
  scoreFlavor: { en: "Flavor", ja: "フレーバー" },
  scoreAftertaste: { en: "Aftertaste", ja: "アフターテイスト" },
  scoreAcidity: { en: "Acidity", ja: "酸味" },
  scoreBody: { en: "Body", ja: "ボディ" },
  scoreBalance: { en: "Balance", ja: "バランス" },
  scoreSweetness: { en: "Sweetness", ja: "甘味" },
  scoreCleanCup: { en: "Clean Cup", ja: "クリーンカップ" },
  scoreUniformity: { en: "Uniformity", ja: "ユニフォーミティ" },
  scoreOverall: { en: "Overall", ja: "オーバーオール" },

  // Score Sheet - Flavors
  sectionFlavors: { en: "Flavors", ja: "フレーバー" },
  noFlavorsSelected: { en: "Select flavors from the Wheel tab", ja: "ホイールタブでフレーバーを選択" },
  goToWheel: { en: "Go to Wheel", ja: "ホイールへ" },
  openWheel: { en: "Select from Wheel", ja: "ホイールから選択" },
  modalDone: { en: "Done", ja: "完了" },

  // Score Sheet - Comment
  sectionComment: { en: "Comment", ja: "コメント" },
  commentPlaceholder: { en: "Notes and impressions...", ja: "メモや感想を入力..." },

  // Score Sheet - Actions
  saveNote: { en: "Save", ja: "保存" },
  resetForm: { en: "Reset", ja: "リセット" },

  // Saved Notes
  savedNotesTitle: { en: "Saved Notes", ja: "保存済みノート" },
  noNotesYet: { en: "No notes yet", ja: "まだノートがありません" },
  loadNote: { en: "Load", ja: "読み込む" },
  deleteNote: { en: "Delete", ja: "削除" },
  confirmDelete: { en: "Delete this note?", ja: "このノートを削除しますか？" },
  points: { en: "pts", ja: "点" },
} as const;

type DictKey = keyof typeof dict;

export function t(key: DictKey, lang: Lang): string {
  return dict[key][lang];
}

export function scoreLabel(key: string, lang: Lang): string {
  const map: Record<string, DictKey> = {
    aroma: "scoreAroma",
    flavor: "scoreFlavor",
    aftertaste: "scoreAftertaste",
    acidity: "scoreAcidity",
    body: "scoreBody",
    balance: "scoreBalance",
    sweetness: "scoreSweetness",
    cleanCup: "scoreCleanCup",
    uniformity: "scoreUniformity",
    overall: "scoreOverall",
  };
  const dictKey = map[key];
  if (!dictKey) return key;
  return dict[dictKey][lang];
}
