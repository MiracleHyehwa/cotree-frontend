export const DEFAULT_CATEGORY = "ALL" as const;

export const CATEGORIES = [
  { key: DEFAULT_CATEGORY, label: "전체" },
  { key: "FRUIT_VEGETABLE", label: "과일과 채소" },
  { key: "CROP", label: "곡물과 견과" },
  { key: "FISH", label: "생선과 해산물" },
  { key: "NUTRITION", label: "영양제" },
  { key: "MEAT", label: "육류와 달걀" },
  { key: "RICE", label: "밥과 국, 면" },
  { key: "SIDE_DISH", label: "밑반찬" },
  { key: "SAUCE", label: "양념과 오일, 통조림" },
  { key: "BREAD_CHEEZE", label: "빵과 치즈" },
  { key: "SNACK", label: "과자와 초콜릿, 캔디" },
] as const;

export const CATEGORY_KEYS = CATEGORIES.map((c) => c.key);
