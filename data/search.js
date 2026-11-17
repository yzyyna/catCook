// 菜品检索与相关度排序（纯函数，不依赖 i18n 实例，便于单测）。
// 支持：中英文菜名 / 食材名 / 描述 / 做法 / 小贴士 / 标签 / 拼音首字母。
// 排序规则：命中位置越靠前、字段越关键，得分越高；同分按菜品 id 升序。

import { getPinyinInitials } from "./pinyin.js";

// 字段得分权重（越高越靠前）
const SCORE = {
  nameExact: 100,
  namePrefix: 92,
  nameIncludes: 84,
  enNameExact: 98,
  enNamePrefix: 90,
  enNameIncludes: 82,
  pinyinExact: 80,
  pinyinPrefix: 72,
  ingredientExact: 70,
  ingredientPrefix: 64,
  ingredientPinyinExact: 66,
  ingredientPinyinPrefix: 60,
  ingredientIncludes: 54,
  descriptionIncludes: 40,
  practiceIncludes: 34,
  tipsIncludes: 30,
  tagIncludes: 26,
};

function includesScore(text, keyword, exact, prefix, includes) {
  if (!text) return 0;
  const value = String(text).toLowerCase();
  if (value === keyword) return exact;
  if (value.startsWith(keyword)) return prefix;
  if (value.includes(keyword)) return includes;
  return 0;
}

function fieldIncludesScore(text, keyword) {
  if (!text) return 0;
  return String(text).toLowerCase().includes(keyword)
    ? SCORE.descriptionIncludes
    : 0;
}

// 计算单道菜对关键词的得分（0 表示未命中）
export function scoreDish(dish, keyword) {
  const kw = String(keyword || "").trim().toLowerCase();
  if (!kw || !dish) return 0;

  let score = 0;
  const take = (value) => {
    if (value > score) score = value;
  };

  const name = dish.name || "";
  const enName = dish.i18n?.name?.["en-US"] || "";
  const py = getPinyinInitials(name);

  take(includesScore(name, kw, SCORE.nameExact, SCORE.namePrefix, SCORE.nameIncludes));
  take(
    includesScore(
      enName,
      kw,
      SCORE.enNameExact,
      SCORE.enNamePrefix,
      SCORE.enNameIncludes,
    ),
  );

  if (py) {
    if (py === kw) take(SCORE.pinyinExact);
    else if (py.startsWith(kw)) take(SCORE.pinyinPrefix);
  }

  for (const ingredient of dish.ingredients || []) {
    const ingName = ingredient.name || "";
    const ingEn = ingredient.i18n?.name?.["en-US"] || "";
    take(
      includesScore(
        ingName,
        kw,
        SCORE.ingredientExact,
        SCORE.ingredientPrefix,
        SCORE.ingredientIncludes,
      ),
    );
    take(
      includesScore(
        ingEn,
        kw,
        SCORE.ingredientExact,
        SCORE.ingredientPrefix,
        SCORE.ingredientIncludes,
      ),
    );
    const ingPy = getPinyinInitials(ingName);
    if (ingPy) {
      if (ingPy === kw) take(SCORE.ingredientPinyinExact);
      else if (ingPy.startsWith(kw)) take(SCORE.ingredientPinyinPrefix);
    }
  }

  take(fieldIncludesScore(dish.description, kw));
  take(fieldIncludesScore(dish.i18n?.description?.["en-US"], kw));
  take(fieldIncludesScore(dish.practice, kw));
  take(fieldIncludesScore(dish.i18n?.practice?.["en-US"], kw));
  take(fieldIncludesScore(dish.tips, kw));
  take(fieldIncludesScore(dish.i18n?.tips?.["en-US"], kw));

  const tagPool = [
    ...(Array.isArray(dish.tags) ? dish.tags : []),
    ...(Array.isArray(dish.i18n?.tags?.["zh-CN"]) ? dish.i18n.tags["zh-CN"] : []),
    ...(Array.isArray(dish.i18n?.tags?.["en-US"]) ? dish.i18n.tags["en-US"] : []),
  ];
  if (
    tagPool.some((tag) =>
      String(tag || "").toLowerCase().includes(kw),
    )
  ) {
    take(SCORE.tagIncludes);
  }

  return score;
}

// 检索并按相关度排序，返回原菜品对象数组
export function matchDishes(dishes, keyword) {
  const kw = String(keyword || "").trim();
  if (!kw) return [];
  return dishes
    .map((dish) => ({ dish, score: scoreDish(dish, kw) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.dish.id - b.dish.id)
    .map((entry) => entry.dish);
}
