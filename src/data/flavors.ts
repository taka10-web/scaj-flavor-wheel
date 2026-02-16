export interface FlavorNode {
  nameJa: string;
  nameEn: string;
  color: string;
  children?: FlavorNode[];
}

export const flavorWheel: FlavorNode[] = [
  {
    nameJa: "花", nameEn: "Floral", color: "#B14D8E",
    children: [
      {
        nameJa: "フローラル", nameEn: "Floral", color: "#C670A8",
        children: [
          { nameJa: "ブラックティー", nameEn: "Black Tea", color: "#D490BF" },
          { nameJa: "ジャスミン", nameEn: "Jasmine", color: "#DA9CC8" },
          { nameJa: "ローズ", nameEn: "Rose", color: "#DD89BE" },
          { nameJa: "カモミール", nameEn: "Chamomile", color: "#D48AB7" },
        ],
      },
    ],
  },
  {
    nameJa: "果実", nameEn: "Fruity", color: "#DC3545",
    children: [
      {
        nameJa: "ベリー", nameEn: "Berry", color: "#C44D73",
        children: [
          { nameJa: "ブラックベリー", nameEn: "Blackberry", color: "#5C1F47" },
          { nameJa: "ラズベリー", nameEn: "Raspberry", color: "#A81C62" },
          { nameJa: "ブルーベリー", nameEn: "Blueberry", color: "#3845A0" },
          { nameJa: "ストロベリー", nameEn: "Strawberry", color: "#E03E7A" },
        ],
      },
      {
        nameJa: "ドライフルーツ", nameEn: "Dried Fruit", color: "#C73A3A",
        children: [
          { nameJa: "レーズン", nameEn: "Raisin", color: "#8C2050" },
          { nameJa: "プルーン", nameEn: "Prune", color: "#B73362" },
        ],
      },
      {
        nameJa: "その他の果実", nameEn: "Other Fruit", color: "#E25C50",
        children: [
          { nameJa: "ココナッツ", nameEn: "Coconut", color: "#E8AE78" },
          { nameJa: "チェリー", nameEn: "Cherry", color: "#E02E3C" },
          { nameJa: "ザクロ", nameEn: "Pomegranate", color: "#E44858" },
          { nameJa: "パイナップル", nameEn: "Pineapple", color: "#F07E5C" },
          { nameJa: "ブドウ", nameEn: "Grape", color: "#E86060" },
          { nameJa: "リンゴ", nameEn: "Apple", color: "#F09A78" },
          { nameJa: "モモ", nameEn: "Peach", color: "#F4B28A" },
          { nameJa: "ナシ", nameEn: "Pear", color: "#F5C59A" },
        ],
      },
      {
        nameJa: "柑橘", nameEn: "Citrus Fruit", color: "#F08E30",
        children: [
          { nameJa: "グレープフルーツ", nameEn: "Grapefruit", color: "#F49E34" },
          { nameJa: "オレンジ", nameEn: "Orange", color: "#F8B048" },
          { nameJa: "レモン", nameEn: "Lemon", color: "#FCCA32" },
          { nameJa: "ライム", nameEn: "Lime", color: "#FDD828" },
        ],
      },
    ],
  },
  {
    nameJa: "酸味/発酵", nameEn: "Sour/Fermented", color: "#E8A030",
    children: [
      {
        nameJa: "酸味", nameEn: "Sour", color: "#D4B044",
        children: [
          { nameJa: "酸味", nameEn: "Sour Aromatics", color: "#C8B848" },
          { nameJa: "酢酸", nameEn: "Acetic Acid", color: "#CCBC4C" },
          { nameJa: "酪酸", nameEn: "Butyric Acid", color: "#D0C050" },
          { nameJa: "イソ吉草酸", nameEn: "Isovaleric Acid", color: "#D4C454" },
          { nameJa: "クエン酸", nameEn: "Citric Acid", color: "#D8C858" },
          { nameJa: "リンゴ酸", nameEn: "Malic Acid", color: "#DCCC5C" },
        ],
      },
      {
        nameJa: "アルコール/発酵", nameEn: "Alcohol/Fermented", color: "#C49828",
        children: [
          { nameJa: "ワイニー", nameEn: "Winey", color: "#B89028" },
          { nameJa: "ウィスキー", nameEn: "Whiskey", color: "#BC9430" },
          { nameJa: "発酵", nameEn: "Fermented", color: "#C09838" },
          { nameJa: "過熟", nameEn: "Overripe", color: "#C49C40" },
        ],
      },
    ],
  },
  {
    nameJa: "緑/野菜", nameEn: "Green/Vegetative", color: "#689C48",
    children: [
      {
        nameJa: "オリーブオイル", nameEn: "Olive Oil", color: "#88AA62",
        children: [
          { nameJa: "オリーブオイル", nameEn: "Olive Oil", color: "#9CBC78" },
        ],
      },
      {
        nameJa: "生", nameEn: "Raw", color: "#80A85C",
        children: [
          { nameJa: "未熟", nameEn: "Under-ripe", color: "#98BC78" },
          { nameJa: "ピーポッド", nameEn: "Peapod", color: "#90B870" },
          { nameJa: "フレッシュ", nameEn: "Fresh", color: "#88B468" },
        ],
      },
      {
        nameJa: "緑/野菜", nameEn: "Green/Vegetable", color: "#78A454",
        children: [
          { nameJa: "ダークグリーン", nameEn: "Dark Green", color: "#68963E" },
          { nameJa: "植物的", nameEn: "Vegetative", color: "#A8C89C" },
          { nameJa: "干し草", nameEn: "Hay-like", color: "#B0CC9C" },
        ],
      },
      {
        nameJa: "豆類", nameEn: "Beany", color: "#88A862",
        children: [
          { nameJa: "豆", nameEn: "Beany", color: "#98BC78" },
        ],
      },
    ],
  },
  {
    nameJa: "その他", nameEn: "Other", color: "#8DA0B0",
    children: [
      {
        nameJa: "紙/カビ", nameEn: "Papery/Musty", color: "#A4B5C0",
        children: [
          { nameJa: "古い", nameEn: "Stale", color: "#B8C4CC" },
          { nameJa: "段ボール", nameEn: "Cardboard", color: "#B4C0C8" },
          { nameJa: "紙", nameEn: "Papery", color: "#C4CCD2" },
          { nameJa: "木材", nameEn: "Woody", color: "#A8B4BC" },
          { nameJa: "カビ/湿", nameEn: "Musty/Damp", color: "#9CAAB4" },
          { nameJa: "カビ/ほこり", nameEn: "Musty/Dusty", color: "#94A4AE" },
          { nameJa: "カビ/土", nameEn: "Musty/Earthy", color: "#88989E" },
          { nameJa: "動物的", nameEn: "Animalic", color: "#7C8C94" },
          { nameJa: "肉/出汁", nameEn: "Meaty/Brothy", color: "#707C84" },
          { nameJa: "フェノール", nameEn: "Phenolic", color: "#646C74" },
        ],
      },
      {
        nameJa: "化学", nameEn: "Chemical", color: "#706050",
        children: [
          { nameJa: "苦い", nameEn: "Bitter", color: "#585048" },
          { nameJa: "塩", nameEn: "Salty", color: "#4C443C" },
          { nameJa: "薬品", nameEn: "Medicinal", color: "#3C3430" },
          { nameJa: "石油", nameEn: "Petroleum", color: "#302828" },
          { nameJa: "スカンク", nameEn: "Skunky", color: "#242020" },
          { nameJa: "ゴム", nameEn: "Rubber", color: "#1C1818" },
        ],
      },
    ],
  },
  {
    nameJa: "ロースト", nameEn: "Roasted", color: "#5A3018",
    children: [
      {
        nameJa: "パイプタバコ", nameEn: "Pipe Tobacco", color: "#6E4028",
        children: [
          { nameJa: "タバコ", nameEn: "Tobacco", color: "#7E5038" },
        ],
      },
      {
        nameJa: "焼き", nameEn: "Burnt", color: "#684028",
        children: [
          { nameJa: "焦げ臭い", nameEn: "Acrid", color: "#4A2C18" },
          { nameJa: "灰", nameEn: "Ashy", color: "#746050" },
          { nameJa: "スモーキー", nameEn: "Smoky", color: "#5C4430" },
          { nameJa: "ブラウンロースト", nameEn: "Brown, Roast", color: "#8C6C50" },
        ],
      },
      {
        nameJa: "穀物", nameEn: "Cereal", color: "#7C5838",
        children: [
          { nameJa: "穀物", nameEn: "Grain", color: "#8C6848" },
          { nameJa: "モルト", nameEn: "Malt", color: "#9C7858" },
        ],
      },
    ],
  },
  {
    nameJa: "スパイス", nameEn: "Spices", color: "#C04838",
    children: [
      {
        nameJa: "刺激的", nameEn: "Pungent", color: "#CC5C4C",
        children: [
          { nameJa: "ペッパー", nameEn: "Pepper", color: "#D47060" },
          { nameJa: "刺激", nameEn: "Pungent", color: "#D86858" },
        ],
      },
      {
        nameJa: "ブラウンスパイス", nameEn: "Brown Spice", color: "#C45840",
        children: [
          { nameJa: "アニス", nameEn: "Anise", color: "#D87460" },
          { nameJa: "ナツメグ", nameEn: "Nutmeg", color: "#D47058" },
          { nameJa: "シナモン", nameEn: "Cinnamon", color: "#CC6850" },
          { nameJa: "クローブ", nameEn: "Clove", color: "#C46048" },
        ],
      },
    ],
  },
  {
    nameJa: "ナッツ/ココア", nameEn: "Nutty/Cocoa", color: "#C09040",
    children: [
      {
        nameJa: "ナッツ", nameEn: "Nutty", color: "#CCA058",
        children: [
          { nameJa: "ピーナッツ", nameEn: "Peanuts", color: "#D8B070" },
          { nameJa: "ヘーゼルナッツ", nameEn: "Hazelnut", color: "#DCBC80" },
          { nameJa: "アーモンド", nameEn: "Almond", color: "#E0C890" },
        ],
      },
      {
        nameJa: "ココア", nameEn: "Cocoa", color: "#B48438",
        children: [
          { nameJa: "チョコレート", nameEn: "Chocolate", color: "#C89858" },
          { nameJa: "ダークチョコレート", nameEn: "Dark Chocolate", color: "#A07830" },
        ],
      },
    ],
  },
  {
    nameJa: "甘味", nameEn: "Sweet", color: "#E08890",
    children: [
      {
        nameJa: "ブラウンシュガー", nameEn: "Brown Sugar", color: "#E89C98",
        children: [
          { nameJa: "糖蜜", nameEn: "Molasses", color: "#ECA8A0" },
          { nameJa: "メープルシロップ", nameEn: "Maple Syrup", color: "#F0B4A8" },
          { nameJa: "キャラメライズ", nameEn: "Caramelized", color: "#F4C0B0" },
          { nameJa: "ハニー", nameEn: "Honey", color: "#F8CCB8" },
        ],
      },
      {
        nameJa: "バニラ", nameEn: "Vanilla", color: "#E8A0A0",
        children: [
          { nameJa: "バニリン", nameEn: "Vanillin", color: "#F0B0A8" },
          { nameJa: "バニラ", nameEn: "Vanilla", color: "#F4BCB0" },
        ],
      },
      {
        nameJa: "甘い芳香", nameEn: "Overall Sweet", color: "#E89490",
        children: [
          { nameJa: "スイートアロマ", nameEn: "Sweet Aromatics", color: "#F0A8A0" },
          { nameJa: "甘味全般", nameEn: "Overall Sweet", color: "#ECA09C" },
        ],
      },
    ],
  },
];

export function countLeaves(node: FlavorNode): number {
  if (!node.children || node.children.length === 0) return 1;
  return node.children.reduce((sum, child) => sum + countLeaves(child), 0);
}

export function getTotalLeaves(): number {
  return flavorWheel.reduce((sum, cat) => sum + countLeaves(cat), 0);
}

export function getFlavorId(tier1Idx: number, tier2Idx?: number, tier3Idx?: number): string {
  let id = `${tier1Idx}`;
  if (tier2Idx !== undefined) id += `-${tier2Idx}`;
  if (tier3Idx !== undefined) id += `-${tier3Idx}`;
  return id;
}
