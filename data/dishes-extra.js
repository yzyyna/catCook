export const moreDishes = [
  {
    id: 10,
    categoryId: 1,
    name: "鱼香肉丝",
    image: "",
    emoji: "🥢",
    description: "咸甜酸辣，经典下饭",
    practice:
      "猪里脊切丝，用料酒和淀粉腌制；木耳和胡萝卜切丝焯水；调好鱼香汁备用；滑炒肉丝变色盛出；爆香姜蒜和泡椒，下配菜肉丝，烹入鱼香汁翻匀",
    i18n: {
      name: { "zh-CN": "鱼香肉丝", "en-US": "Yu-Shiang Shredded Pork" },
      description: {
        "zh-CN": "咸甜酸辣，经典下饭",
        "en-US": "Sweet, sour and spicy pork in classic yu-xiang style",
      },
      practice: {
        "zh-CN":
          "猪里脊切丝，用料酒和淀粉腌制；木耳和胡萝卜切丝焯水；调好鱼香汁备用；滑炒肉丝变色盛出；爆香姜蒜和泡椒，下配菜肉丝，烹入鱼香汁翻匀",
        "en-US": "Shred the pork and marinate with cooking wine and starch; Blanch shredded wood ear and carrot; Mix the yu-xiang sauce; Stir-fry the pork until it changes color and set aside; Sauté ginger, garlic and pickled chilies, then toss everything with the sauce",
      },
      time: { "zh-CN": "25分钟", "en-US": "25 min" },
      calories: { "zh-CN": "160千卡/100g", "en-US": "160 kcal/100g" },
    },
    ingredients: [
      { name: "猪里脊", amount: "250g", category: "meat", i18n: { name: { "zh-CN": "猪里脊", "en-US": "Pork Tenderloin" } } },
      { name: "黑木耳", amount: "50g", category: "vegetable", i18n: { name: { "zh-CN": "黑木耳", "en-US": "Wood Ear Mushrooms" } } },
      { name: "胡萝卜", amount: "1根", category: "vegetable", i18n: { name: { "zh-CN": "胡萝卜", "en-US": "Carrot" }, amount: { "zh-CN": "1根", "en-US": "1" } } },
      { name: "青椒", amount: "1个", category: "vegetable", i18n: { name: { "zh-CN": "青椒", "en-US": "Green Pepper" }, amount: { "zh-CN": "1个", "en-US": "1" } } },
      { name: "豆瓣酱", amount: "1勺", category: "seasoning", i18n: { name: { "zh-CN": "豆瓣酱", "en-US": "Doubanjiang" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
      { name: "香醋", amount: "2勺", category: "seasoning", i18n: { name: { "zh-CN": "香醋", "en-US": "Black Vinegar" }, amount: { "zh-CN": "2勺", "en-US": "2 tbsp" } } },
      { name: "糖", amount: "1勺", category: "seasoning", i18n: { name: { "zh-CN": "糖", "en-US": "Sugar" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
      { name: "淀粉", amount: "1勺", category: "seasoning", i18n: { name: { "zh-CN": "淀粉", "en-US": "Starch" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
    ],
    difficultyKey: "dish.medium",
    time: "25分钟",
    calories: "160千卡/100g",
  },
  {
    id: 11,
    categoryId: 1,
    name: "宫保鸡丁",
    image: "",
    emoji: "🥜",
    description: "酸甜微辣，花生香脆",
    practice:
      "鸡胸肉切丁，用生抽料酒淀粉腌制；调宫保汁备用；干辣椒和花椒炝锅；下鸡丁炒散，加葱段和宫保汁；最后放熟花生米翻匀",
    i18n: {
      name: { "zh-CN": "宫保鸡丁", "en-US": "Kung Pao Chicken" },
      description: {
        "zh-CN": "酸甜微辣，花生香脆",
        "en-US": "Diced chicken with peanuts in a tangy, mildly spicy sauce",
      },
      practice: {
        "zh-CN":
          "鸡胸肉切丁，用生抽料酒淀粉腌制；调宫保汁备用；干辣椒和花椒炝锅；下鸡丁炒散，加葱段和宫保汁；最后放熟花生米翻匀",
        "en-US": "Dice chicken breast and marinate with soy sauce, cooking wine and starch; Prepare the kung pao sauce; Sizzle dried chilies and Sichuan peppercorns in oil; Stir-fry the chicken, add scallion sections and sauce; Finish with roasted peanuts",
      },
      time: { "zh-CN": "30分钟", "en-US": "30 min" },
      calories: { "zh-CN": "190千卡/100g", "en-US": "190 kcal/100g" },
    },
    ingredients: [
      { name: "鸡胸肉", amount: "300g", category: "meat", i18n: { name: { "zh-CN": "鸡胸肉", "en-US": "Chicken Breast" } } },
      { name: "熟花生米", amount: "60g", category: "other", i18n: { name: { "zh-CN": "熟花生米", "en-US": "Roasted Peanuts" } } },
      { name: "干辣椒", amount: "8个", category: "seasoning", i18n: { name: { "zh-CN": "干辣椒", "en-US": "Dried Chilies" }, amount: { "zh-CN": "8个", "en-US": "8" } } },
      { name: "花椒", amount: "1勺", category: "seasoning", i18n: { name: { "zh-CN": "花椒", "en-US": "Sichuan Peppercorns" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
      { name: "大葱", amount: "1根", category: "vegetable", i18n: { name: { "zh-CN": "大葱", "en-US": "Scallion" }, amount: { "zh-CN": "1根", "en-US": "1" } } },
      { name: "生抽", amount: "2勺", category: "seasoning", i18n: { name: { "zh-CN": "生抽", "en-US": "Light Soy Sauce" }, amount: { "zh-CN": "2勺", "en-US": "2 tbsp" } } },
      { name: "醋", amount: "1勺", category: "seasoning", i18n: { name: { "zh-CN": "醋", "en-US": "Vinegar" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
      { name: "淀粉", amount: "1勺", category: "seasoning", i18n: { name: { "zh-CN": "淀粉", "en-US": "Starch" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
    ],
    difficultyKey: "dish.medium",
    time: "30分钟",
    calories: "190千卡/100g",
  },
  {
    id: 12,
    categoryId: 1,
    name: "回锅肉",
    image: "",
    emoji: "🥘",
    description: "肥而不腻，蒜苗飘香",
    practice:
      "五花肉整块煮至八成熟，捞出晾凉切薄片；蒜苗切段；热锅煸肉片出油卷起；加豆瓣酱甜面酱炒香；下蒜苗断生即可",
    i18n: {
      name: { "zh-CN": "回锅肉", "en-US": "Twice-Cooked Pork" },
      description: {
        "zh-CN": "肥而不腻，蒜苗飘香",
        "en-US": "Sliced pork stir-fried with garlic leeks in fragrant bean sauce",
      },
      practice: {
        "zh-CN":
          "五花肉整块煮至八成熟，捞出晾凉切薄片；蒜苗切段；热锅煸肉片出油卷起；加豆瓣酱甜面酱炒香；下蒜苗断生即可",
        "en-US": "Simmer the pork belly until just cooked, then slice thinly; Cut the garlic leeks into sections; Render the pork slices in a hot wok until curled; Add doubanjiang and sweet bean sauce; Toss in the leeks until just tender",
      },
      time: { "zh-CN": "35分钟", "en-US": "35 min" },
      calories: { "zh-CN": "280千卡/100g", "en-US": "280 kcal/100g" },
    },
    ingredients: [
      { name: "五花肉", amount: "300g", category: "meat", i18n: { name: { "zh-CN": "五花肉", "en-US": "Pork Belly" } } },
      { name: "蒜苗", amount: "100g", category: "vegetable", i18n: { name: { "zh-CN": "蒜苗", "en-US": "Garlic Leeks" } } },
      { name: "豆瓣酱", amount: "1勺", category: "seasoning", i18n: { name: { "zh-CN": "豆瓣酱", "en-US": "Doubanjiang" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
      { name: "甜面酱", amount: "1勺", category: "seasoning", i18n: { name: { "zh-CN": "甜面酱", "en-US": "Sweet Bean Sauce" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
      { name: "豆豉", amount: "1勺", category: "seasoning", i18n: { name: { "zh-CN": "豆豉", "en-US": "Fermented Black Beans" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
      { name: "姜", amount: "3片", category: "vegetable", i18n: { name: { "zh-CN": "姜", "en-US": "Ginger" }, amount: { "zh-CN": "3片", "en-US": "3 slices" } } },
    ],
    difficultyKey: "dish.medium",
    time: "35分钟",
    calories: "280千卡/100g",
  },
  {
    id: 13,
    categoryId: 1,
    name: "地三鲜",
    image: "",
    emoji: "🍆",
    description: "东北经典，咸香下饭",
    practice:
      "土豆和茄子切滚刀块；茄子撒盐腌出水分；土豆炸至金黄，茄子过油；爆香蒜末，三种食材回锅；淋入生抽糖水翻匀收汁",
    i18n: {
      name: { "zh-CN": "地三鲜", "en-US": "Sautéed Potato, Eggplant & Pepper" },
      description: {
        "zh-CN": "东北经典，咸香下饭",
        "en-US": "A classic Northeastern trio of potato, eggplant and pepper",
      },
      practice: {
        "zh-CN":
          "土豆和茄子切滚刀块；茄子撒盐腌出水分；土豆炸至金黄，茄子过油；爆香蒜末，三种食材回锅；淋入生抽糖水翻匀收汁",
        "en-US": "Cut potatoes and eggplant into rolling chunks; Salt the eggplant to draw out moisture; Fry the potatoes until golden and flash-fry the eggplant; Sauté minced garlic and return everything to the wok; Finish with soy sauce and a little sugar",
      },
      time: { "zh-CN": "25分钟", "en-US": "25 min" },
      calories: { "zh-CN": "140千卡/100g", "en-US": "140 kcal/100g" },
    },
    ingredients: [
      { name: "土豆", amount: "1个", category: "vegetable", i18n: { name: { "zh-CN": "土豆", "en-US": "Potato" }, amount: { "zh-CN": "1个", "en-US": "1" } } },
      { name: "茄子", amount: "1根", category: "vegetable", i18n: { name: { "zh-CN": "茄子", "en-US": "Eggplant" }, amount: { "zh-CN": "1根", "en-US": "1" } } },
      { name: "青椒", amount: "1个", category: "vegetable", i18n: { name: { "zh-CN": "青椒", "en-US": "Green Pepper" }, amount: { "zh-CN": "1个", "en-US": "1" } } },
      { name: "蒜", amount: "4瓣", category: "seasoning", i18n: { name: { "zh-CN": "蒜", "en-US": "Garlic" }, amount: { "zh-CN": "4瓣", "en-US": "4 cloves" } } },
      { name: "生抽", amount: "2勺", category: "seasoning", i18n: { name: { "zh-CN": "生抽", "en-US": "Light Soy Sauce" }, amount: { "zh-CN": "2勺", "en-US": "2 tbsp" } } },
      { name: "糖", amount: "1勺", category: "seasoning", i18n: { name: { "zh-CN": "糖", "en-US": "Sugar" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
    ],
    difficultyKey: "dish.simple",
    time: "25分钟",
    calories: "140千卡/100g",
  },
  {
    id: 14,
    categoryId: 1,
    name: "青椒肉丝",
    image: "",
    emoji: "🫑",
    description: "家常快手，清香微辣",
    practice:
      "猪里脊切丝，用生抽淀粉腌制；青椒去籽切丝；热锅滑炒肉丝至变色；下青椒丝大火翻炒；加盐调味出锅",
    i18n: {
      name: { "zh-CN": "青椒肉丝", "en-US": "Shredded Pork with Green Pepper" },
      description: {
        "zh-CN": "家常快手，清香微辣",
        "en-US": "Everyday shredded pork with fresh green peppers",
      },
      practice: {
        "zh-CN":
          "猪里脊切丝，用生抽淀粉腌制；青椒去籽切丝；热锅滑炒肉丝至变色；下青椒丝大火翻炒；加盐调味出锅",
        "en-US": "Shred the pork and marinate with soy sauce and starch; Seed and shred the peppers; Stir-fry the pork until it changes color; Add the peppers and toss over high heat; Season with salt and serve",
      },
      time: { "zh-CN": "20分钟", "en-US": "20 min" },
      calories: { "zh-CN": "150千卡/100g", "en-US": "150 kcal/100g" },
    },
    ingredients: [
      { name: "猪里脊", amount: "250g", category: "meat", i18n: { name: { "zh-CN": "猪里脊", "en-US": "Pork Tenderloin" } } },
      { name: "青椒", amount: "3个", category: "vegetable", i18n: { name: { "zh-CN": "青椒", "en-US": "Green Peppers" }, amount: { "zh-CN": "3个", "en-US": "3" } } },
      { name: "蒜", amount: "2瓣", category: "seasoning", i18n: { name: { "zh-CN": "蒜", "en-US": "Garlic" }, amount: { "zh-CN": "2瓣", "en-US": "2 cloves" } } },
      { name: "生抽", amount: "1勺", category: "seasoning", i18n: { name: { "zh-CN": "生抽", "en-US": "Light Soy Sauce" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
      { name: "淀粉", amount: "1勺", category: "seasoning", i18n: { name: { "zh-CN": "淀粉", "en-US": "Starch" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
      { name: "盐", amount: "适量", category: "seasoning", i18n: { name: { "zh-CN": "盐", "en-US": "Salt" }, amount: { "zh-CN": "适量", "en-US": "to taste" } } },
    ],
    difficultyKey: "dish.simple",
    time: "20分钟",
    calories: "150千卡/100g",
  },
  {
    id: 15,
    categoryId: 1,
    name: "韭菜炒蛋",
    image: "",
    emoji: "🌿",
    description: "十分钟快手，鲜香嫩滑",
    practice:
      "韭菜洗净切段；鸡蛋加盐打散；热油炒蛋至凝固盛出；下韭菜快炒几秒；回锅鸡蛋翻匀即可",
    i18n: {
      name: { "zh-CN": "韭菜炒蛋", "en-US": "Scrambled Eggs with Chives" },
      description: {
        "zh-CN": "十分钟快手，鲜香嫩滑",
        "en-US": "Fluffy scrambled eggs with fragrant Chinese chives",
      },
      practice: {
        "zh-CN":
          "韭菜洗净切段；鸡蛋加盐打散；热油炒蛋至凝固盛出；下韭菜快炒几秒；回锅鸡蛋翻匀即可",
        "en-US": "Wash and cut the chives into sections; Beat the eggs with salt; Scramble the eggs in hot oil and set aside; Flash-fry the chives for a few seconds; Return the eggs and toss together",
      },
      time: { "zh-CN": "10分钟", "en-US": "10 min" },
      calories: { "zh-CN": "130千卡/100g", "en-US": "130 kcal/100g" },
    },
    ingredients: [
      { name: "韭菜", amount: "150g", category: "vegetable", i18n: { name: { "zh-CN": "韭菜", "en-US": "Chinese Chives" } } },
      { name: "鸡蛋", amount: "3个", category: "meat", i18n: { name: { "zh-CN": "鸡蛋", "en-US": "Eggs" }, amount: { "zh-CN": "3个", "en-US": "3" } } },
      { name: "盐", amount: "适量", category: "seasoning", i18n: { name: { "zh-CN": "盐", "en-US": "Salt" }, amount: { "zh-CN": "适量", "en-US": "to taste" } } },
      { name: "食用油", amount: "1勺", category: "seasoning", i18n: { name: { "zh-CN": "食用油", "en-US": "Cooking Oil" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
    ],
    difficultyKey: "dish.simple",
    time: "10分钟",
    calories: "130千卡/100g",
  },
  {
    id: 16,
    categoryId: 2,
    name: "可乐鸡翅",
    image: "",
    emoji: "🍗",
    description: "甜咸入味，孩子最爱",
    practice:
      "鸡翅两面划刀焯水；小火煎至两面金黄；倒入可乐和生抽；中火炖15分钟；大火收汁裹匀",
    i18n: {
      name: { "zh-CN": "可乐鸡翅", "en-US": "Cola Chicken Wings" },
      description: {
        "zh-CN": "甜咸入味，孩子最爱",
        "en-US": "Sweet and savory braised wings in cola",
      },
      practice: {
        "zh-CN":
          "鸡翅两面划刀焯水；小火煎至两面金黄；倒入可乐和生抽；中火炖15分钟；大火收汁裹匀",
        "en-US": "Score and blanch the wings; Pan-fry until golden on both sides; Pour in cola and light soy sauce; Simmer for 15 minutes over medium heat; Reduce the sauce over high heat until glossy",
      },
      time: { "zh-CN": "30分钟", "en-US": "30 min" },
      calories: { "zh-CN": "220千卡/100g", "en-US": "220 kcal/100g" },
    },
    ingredients: [
      { name: "鸡翅", amount: "8个", category: "meat", i18n: { name: { "zh-CN": "鸡翅", "en-US": "Chicken Wings" }, amount: { "zh-CN": "8个", "en-US": "8" } } },
      { name: "可乐", amount: "330ml", category: "other", i18n: { name: { "zh-CN": "可乐", "en-US": "Cola" } } },
      { name: "生抽", amount: "2勺", category: "seasoning", i18n: { name: { "zh-CN": "生抽", "en-US": "Light Soy Sauce" }, amount: { "zh-CN": "2勺", "en-US": "2 tbsp" } } },
      { name: "老抽", amount: "1勺", category: "seasoning", i18n: { name: { "zh-CN": "老抽", "en-US": "Dark Soy Sauce" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
      { name: "姜", amount: "3片", category: "vegetable", i18n: { name: { "zh-CN": "姜", "en-US": "Ginger" }, amount: { "zh-CN": "3片", "en-US": "3 slices" } } },
      { name: "盐", amount: "适量", category: "seasoning", i18n: { name: { "zh-CN": "盐", "en-US": "Salt" }, amount: { "zh-CN": "适量", "en-US": "to taste" } } },
    ],
    difficultyKey: "dish.simple",
    time: "30分钟",
    calories: "220千卡/100g",
  },
  {
    id: 17,
    categoryId: 2,
    name: "土豆炖牛肉",
    image: "",
    emoji: "🥔",
    description: "软烂浓香，暖心暖胃",
    practice:
      "牛腩切块焯水；爆香姜蒜八角；下牛肉煸炒，加生抽老抽料酒；加热水炖60分钟；放土豆块再炖20分钟收汁",
    i18n: {
      name: { "zh-CN": "土豆炖牛肉", "en-US": "Beef Stew with Potatoes" },
      description: {
        "zh-CN": "软烂浓香，暖心暖胃",
        "en-US": "Tender beef and potatoes in a rich, comforting stew",
      },
      practice: {
        "zh-CN":
          "牛腩切块焯水；爆香姜蒜八角；下牛肉煸炒，加生抽老抽料酒；加热水炖60分钟；放土豆块再炖20分钟收汁",
        "en-US": "Cube and blanch the beef brisket; Sauté ginger, garlic and star anise; Add the beef with soy sauces and cooking wine; Simmer in hot water for 60 minutes; Add potato chunks and cook 20 more minutes until the sauce thickens",
      },
      time: { "zh-CN": "90分钟", "en-US": "90 min" },
      calories: { "zh-CN": "180千卡/100g", "en-US": "180 kcal/100g" },
    },
    ingredients: [
      { name: "牛腩", amount: "400g", category: "meat", i18n: { name: { "zh-CN": "牛腩", "en-US": "Beef Brisket" } } },
      { name: "土豆", amount: "2个", category: "vegetable", i18n: { name: { "zh-CN": "土豆", "en-US": "Potatoes" }, amount: { "zh-CN": "2个", "en-US": "2" } } },
      { name: "胡萝卜", amount: "1根", category: "vegetable", i18n: { name: { "zh-CN": "胡萝卜", "en-US": "Carrot" }, amount: { "zh-CN": "1根", "en-US": "1" } } },
      { name: "八角", amount: "2个", category: "seasoning", i18n: { name: { "zh-CN": "八角", "en-US": "Star Anise" }, amount: { "zh-CN": "2个", "en-US": "2" } } },
      { name: "生抽", amount: "2勺", category: "seasoning", i18n: { name: { "zh-CN": "生抽", "en-US": "Light Soy Sauce" }, amount: { "zh-CN": "2勺", "en-US": "2 tbsp" } } },
      { name: "老抽", amount: "1勺", category: "seasoning", i18n: { name: { "zh-CN": "老抽", "en-US": "Dark Soy Sauce" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
      { name: "料酒", amount: "2勺", category: "seasoning", i18n: { name: { "zh-CN": "料酒", "en-US": "Cooking Wine" }, amount: { "zh-CN": "2勺", "en-US": "2 tbsp" } } },
    ],
    difficultyKey: "dish.medium",
    time: "90分钟",
    calories: "180千卡/100g",
  },
  {
    id: 18,
    categoryId: 2,
    name: "辣子鸡",
    image: "",
    emoji: "🌶️",
    description: "麻辣干香，越吃越上瘾",
    practice:
      "鸡腿肉切小块，用料酒生抽腌制；油烧至七成热炸鸡块至酥脆；锅留底油爆香姜蒜干辣椒花椒；回锅鸡块翻炒；撒白芝麻和糖拌匀",
    i18n: {
      name: { "zh-CN": "辣子鸡", "en-US": "Chongqing Spicy Chicken" },
      description: {
        "zh-CN": "麻辣干香，越吃越上瘾",
        "en-US": "Crispy chicken bites buried in fragrant dried chilies",
      },
      practice: {
        "zh-CN":
          "鸡腿肉切小块，用料酒生抽腌制；油烧至七成热炸鸡块至酥脆；锅留底油爆香姜蒜干辣椒花椒；回锅鸡块翻炒；撒白芝麻和糖拌匀",
        "en-US": "Cut chicken thighs into small pieces and marinate with cooking wine and soy sauce; Deep-fry until crispy in hot oil; Sauté ginger, garlic, dried chilies and peppercorns in a little oil; Return the chicken and toss; Finish with white sesame seeds and a pinch of sugar",
      },
      time: { "zh-CN": "40分钟", "en-US": "40 min" },
      calories: { "zh-CN": "260千卡/100g", "en-US": "260 kcal/100g" },
    },
    ingredients: [
      { name: "鸡腿", amount: "500g", category: "meat", i18n: { name: { "zh-CN": "鸡腿", "en-US": "Chicken Thighs" } } },
      { name: "干辣椒", amount: "20个", category: "seasoning", i18n: { name: { "zh-CN": "干辣椒", "en-US": "Dried Chilies" }, amount: { "zh-CN": "20个", "en-US": "20" } } },
      { name: "花椒", amount: "1勺", category: "seasoning", i18n: { name: { "zh-CN": "花椒", "en-US": "Sichuan Peppercorns" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
      { name: "姜", amount: "3片", category: "vegetable", i18n: { name: { "zh-CN": "姜", "en-US": "Ginger" }, amount: { "zh-CN": "3片", "en-US": "3 slices" } } },
      { name: "蒜", amount: "4瓣", category: "seasoning", i18n: { name: { "zh-CN": "蒜", "en-US": "Garlic" }, amount: { "zh-CN": "4瓣", "en-US": "4 cloves" } } },
      { name: "白芝麻", amount: "1勺", category: "other", i18n: { name: { "zh-CN": "白芝麻", "en-US": "White Sesame Seeds" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
      { name: "糖", amount: "1勺", category: "seasoning", i18n: { name: { "zh-CN": "糖", "en-US": "Sugar" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
    ],
    difficultyKey: "dish.medium",
    time: "40分钟",
    calories: "260千卡/100g",
  },
  {
    id: 19,
    categoryId: 2,
    name: "红烧狮子头",
    image: "",
    emoji: "🍡",
    description: "团团圆圆，软糯多汁",
    practice:
      "猪肉末加葱姜水马蹄碎搅拌上劲；团成大丸子；油温六成热定型炸至微黄；加生抽老抽糖和热水；小火炖30分钟收汁",
    i18n: {
      name: { "zh-CN": "红烧狮子头", "en-US": "Braised Pork Meatballs" },
      description: {
        "zh-CN": "团团圆圆，软糯多汁",
        "en-US": "Silky braised pork meatballs, tender and juicy",
      },
      practice: {
        "zh-CN":
          "猪肉末加葱姜水马蹄碎搅拌上劲；团成大丸子；油温六成热定型炸至微黄；加生抽老抽糖和热水；小火炖30分钟收汁",
        "en-US": "Mix minced pork with scallion-ginger water and water chestnut bits until springy; Shape into large meatballs; Fry gently until set and lightly golden; Braise with soy sauces, sugar and hot water; Simmer 30 minutes and reduce the sauce",
      },
      time: { "zh-CN": "60分钟", "en-US": "60 min" },
      calories: { "zh-CN": "240千卡/100g", "en-US": "240 kcal/100g" },
    },
    ingredients: [
      { name: "猪肉末", amount: "400g", category: "meat", i18n: { name: { "zh-CN": "猪肉末", "en-US": "Minced Pork" } } },
      { name: "马蹄", amount: "4个", category: "vegetable", i18n: { name: { "zh-CN": "马蹄", "en-US": "Water Chestnuts" }, amount: { "zh-CN": "4个", "en-US": "4" } } },
      { name: "鸡蛋", amount: "1个", category: "meat", i18n: { name: { "zh-CN": "鸡蛋", "en-US": "Egg" }, amount: { "zh-CN": "1个", "en-US": "1" } } },
      { name: "淀粉", amount: "2勺", category: "seasoning", i18n: { name: { "zh-CN": "淀粉", "en-US": "Starch" }, amount: { "zh-CN": "2勺", "en-US": "2 tbsp" } } },
      { name: "生抽", amount: "2勺", category: "seasoning", i18n: { name: { "zh-CN": "生抽", "en-US": "Light Soy Sauce" }, amount: { "zh-CN": "2勺", "en-US": "2 tbsp" } } },
      { name: "老抽", amount: "1勺", category: "seasoning", i18n: { name: { "zh-CN": "老抽", "en-US": "Dark Soy Sauce" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
      { name: "糖", amount: "1勺", category: "seasoning", i18n: { name: { "zh-CN": "糖", "en-US": "Sugar" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
    ],
    difficultyKey: "dish.medium",
    time: "60分钟",
    calories: "240千卡/100g",
  },
  {
    id: 20,
    categoryId: 2,
    name: "孜然羊肉",
    image: "",
    emoji: "🐑",
    description: "孜然浓香，西北风味",
    practice:
      "羊腿肉切片，用料酒淀粉腌制；洋葱切丝；热油滑炒羊肉至变色；下洋葱丝和孜然辣椒粉；大火翻匀加盐出锅",
    i18n: {
      name: { "zh-CN": "孜然羊肉", "en-US": "Cumin Lamb" },
      description: {
        "zh-CN": "孜然浓香，西北风味",
        "en-US": "Sizzling lamb tossed with cumin and chili",
      },
      practice: {
        "zh-CN":
          "羊腿肉切片，用料酒淀粉腌制；洋葱切丝；热油滑炒羊肉至变色；下洋葱丝和孜然辣椒粉；大火翻匀加盐出锅",
        "en-US": "Slice the lamb and marinate with cooking wine and starch; Slice the onion; Stir-fry the lamb in hot oil until it changes color; Add onion, cumin and chili powder; Toss over high heat, season with salt and serve",
      },
      time: { "zh-CN": "30分钟", "en-US": "30 min" },
      calories: { "zh-CN": "230千卡/100g", "en-US": "230 kcal/100g" },
    },
    ingredients: [
      { name: "羊腿肉", amount: "350g", category: "meat", i18n: { name: { "zh-CN": "羊腿肉", "en-US": "Lamb Leg" } } },
      { name: "洋葱", amount: "1个", category: "vegetable", i18n: { name: { "zh-CN": "洋葱", "en-US": "Onion" }, amount: { "zh-CN": "1个", "en-US": "1" } } },
      { name: "孜然粉", amount: "2勺", category: "seasoning", i18n: { name: { "zh-CN": "孜然粉", "en-US": "Cumin Powder" }, amount: { "zh-CN": "2勺", "en-US": "2 tbsp" } } },
      { name: "辣椒粉", amount: "1勺", category: "seasoning", i18n: { name: { "zh-CN": "辣椒粉", "en-US": "Chili Powder" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
      { name: "白芝麻", amount: "1勺", category: "other", i18n: { name: { "zh-CN": "白芝麻", "en-US": "White Sesame Seeds" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
      { name: "料酒", amount: "1勺", category: "seasoning", i18n: { name: { "zh-CN": "料酒", "en-US": "Cooking Wine" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
    ],
    difficultyKey: "dish.medium",
    time: "30分钟",
    calories: "230千卡/100g",
  },
  {
    id: 21,
    categoryId: 2,
    name: "蒜香烤鸡翅",
    image: "",
    emoji: "🧄",
    description: "蒜香浓郁，外焦里嫩",
    practice:
      "鸡翅划刀，用蒜末生抽蚝油蜂蜜腌制2小时；烤箱200度预热；鸡翅摆盘刷腌料；烤20分钟翻面再烤15分钟；出炉撒芝麻",
    i18n: {
      name: { "zh-CN": "蒜香烤鸡翅", "en-US": "Garlic Roasted Chicken Wings" },
      description: {
        "zh-CN": "蒜香浓郁，外焦里嫩",
        "en-US": "Oven-roasted wings with a rich garlic aroma",
      },
      practice: {
        "zh-CN":
          "鸡翅划刀，用蒜末生抽蚝油蜂蜜腌制2小时；烤箱200度预热；鸡翅摆盘刷腌料；烤20分钟翻面再烤15分钟；出炉撒芝麻",
        "en-US": "Score the wings and marinate with minced garlic, soy sauce, oyster sauce and honey for 2 hours; Preheat the oven to 200°C; Brush the wings with marinade; Roast 20 minutes, flip and roast 15 more; Sprinkle with sesame seeds",
      },
      time: { "zh-CN": "45分钟", "en-US": "45 min" },
      calories: { "zh-CN": "250千卡/100g", "en-US": "250 kcal/100g" },
    },
    ingredients: [
      { name: "鸡翅", amount: "10个", category: "meat", i18n: { name: { "zh-CN": "鸡翅", "en-US": "Chicken Wings" }, amount: { "zh-CN": "10个", "en-US": "10" } } },
      { name: "蒜", amount: "6瓣", category: "seasoning", i18n: { name: { "zh-CN": "蒜", "en-US": "Garlic" }, amount: { "zh-CN": "6瓣", "en-US": "6 cloves" } } },
      { name: "蚝油", amount: "2勺", category: "seasoning", i18n: { name: { "zh-CN": "蚝油", "en-US": "Oyster Sauce" }, amount: { "zh-CN": "2勺", "en-US": "2 tbsp" } } },
      { name: "蜂蜜", amount: "1勺", category: "other", i18n: { name: { "zh-CN": "蜂蜜", "en-US": "Honey" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
      { name: "生抽", amount: "2勺", category: "seasoning", i18n: { name: { "zh-CN": "生抽", "en-US": "Light Soy Sauce" }, amount: { "zh-CN": "2勺", "en-US": "2 tbsp" } } },
      { name: "白芝麻", amount: "适量", category: "other", i18n: { name: { "zh-CN": "白芝麻", "en-US": "White Sesame Seeds" }, amount: { "zh-CN": "适量", "en-US": "to taste" } } },
    ],
    difficultyKey: "dish.medium",
    time: "45分钟",
    calories: "250千卡/100g",
  },
  {
    id: 22,
    categoryId: 3,
    name: "蒜蓉粉丝蒸虾",
    image: "",
    emoji: "🦐",
    description: "鲜甜弹嫩，蒜香扑鼻",
    practice:
      "粉丝温水泡软铺盘；鲜虾开背去虾线；铺上炒香的蒜蓉；水开后蒸8分钟；淋蒸鱼豉油撒葱花",
    i18n: {
      name: { "zh-CN": "蒜蓉粉丝蒸虾", "en-US": "Steamed Shrimp with Garlic Vermicelli" },
      description: {
        "zh-CN": "鲜甜弹嫩，蒜香扑鼻",
        "en-US": "Sweet steamed shrimp over garlic-soaked glass noodles",
      },
      practice: {
        "zh-CN":
          "粉丝温水泡软铺盘；鲜虾开背去虾线；铺上炒香的蒜蓉；水开后蒸8分钟；淋蒸鱼豉油撒葱花",
        "en-US": "Soak vermicelli until soft and spread on a plate; Butterfly the shrimp and remove the veins; Top with fragrant garlic; Steam 8 minutes after the water boils; Finish with soy sauce and scallions",
      },
      time: { "zh-CN": "25分钟", "en-US": "25 min" },
      calories: { "zh-CN": "120千卡/100g", "en-US": "120 kcal/100g" },
    },
    ingredients: [
      { name: "鲜虾", amount: "12只", category: "meat", i18n: { name: { "zh-CN": "鲜虾", "en-US": "Shrimp" }, amount: { "zh-CN": "12只", "en-US": "12" } } },
      { name: "粉丝", amount: "1把", category: "other", i18n: { name: { "zh-CN": "粉丝", "en-US": "Glass Noodles" }, amount: { "zh-CN": "1把", "en-US": "1 handful" } } },
      { name: "蒜", amount: "8瓣", category: "seasoning", i18n: { name: { "zh-CN": "蒜", "en-US": "Garlic" }, amount: { "zh-CN": "8瓣", "en-US": "8 cloves" } } },
      { name: "蒸鱼豉油", amount: "2勺", category: "seasoning", i18n: { name: { "zh-CN": "蒸鱼豉油", "en-US": "Steamed Fish Soy Sauce" }, amount: { "zh-CN": "2勺", "en-US": "2 tbsp" } } },
      { name: "葱花", amount: "适量", category: "vegetable", i18n: { name: { "zh-CN": "葱花", "en-US": "Chopped Scallions" }, amount: { "zh-CN": "适量", "en-US": "to taste" } } },
    ],
    difficultyKey: "dish.simple",
    time: "25分钟",
    calories: "120千卡/100g",
  },
  {
    id: 23,
    categoryId: 3,
    name: "红烧带鱼",
    image: "",
    emoji: "🐟",
    description: "咸鲜微甜，鱼肉紧实",
    practice:
      "带鱼切段，用盐料酒腌15分钟；拍薄淀粉煎至两面金黄；爆香姜蒜八角；加生抽老抽糖和热水；炖15分钟收汁",
    i18n: {
      name: { "zh-CN": "红烧带鱼", "en-US": "Braised Ribbonfish" },
      description: {
        "zh-CN": "咸鲜微甜，鱼肉紧实",
        "en-US": "Pan-fried ribbonfish braised in savory soy glaze",
      },
      practice: {
        "zh-CN":
          "带鱼切段，用盐料酒腌15分钟；拍薄淀粉煎至两面金黄；爆香姜蒜八角；加生抽老抽糖和热水；炖15分钟收汁",
        "en-US": "Cut ribbonfish into sections and marinate with salt and cooking wine for 15 minutes; Dust with starch and pan-fry until golden; Sauté ginger, garlic and star anise; Braise with soy sauces, sugar and hot water; Simmer 15 minutes until the glaze coats",
      },
      time: { "zh-CN": "35分钟", "en-US": "35 min" },
      calories: { "zh-CN": "200千卡/100g", "en-US": "200 kcal/100g" },
    },
    ingredients: [
      { name: "带鱼", amount: "500g", category: "meat", i18n: { name: { "zh-CN": "带鱼", "en-US": "Ribbonfish" } } },
      { name: "淀粉", amount: "2勺", category: "seasoning", i18n: { name: { "zh-CN": "淀粉", "en-US": "Starch" }, amount: { "zh-CN": "2勺", "en-US": "2 tbsp" } } },
      { name: "姜", amount: "4片", category: "vegetable", i18n: { name: { "zh-CN": "姜", "en-US": "Ginger" }, amount: { "zh-CN": "4片", "en-US": "4 slices" } } },
      { name: "蒜", amount: "4瓣", category: "seasoning", i18n: { name: { "zh-CN": "蒜", "en-US": "Garlic" }, amount: { "zh-CN": "4瓣", "en-US": "4 cloves" } } },
      { name: "八角", amount: "2个", category: "seasoning", i18n: { name: { "zh-CN": "八角", "en-US": "Star Anise" }, amount: { "zh-CN": "2个", "en-US": "2" } } },
      { name: "生抽", amount: "2勺", category: "seasoning", i18n: { name: { "zh-CN": "生抽", "en-US": "Light Soy Sauce" }, amount: { "zh-CN": "2勺", "en-US": "2 tbsp" } } },
      { name: "糖", amount: "1勺", category: "seasoning", i18n: { name: { "zh-CN": "糖", "en-US": "Sugar" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
    ],
    difficultyKey: "dish.medium",
    time: "35分钟",
    calories: "200千卡/100g",
  },
  {
    id: 24,
    categoryId: 3,
    name: "香煎三文鱼",
    image: "",
    emoji: "🍣",
    description: "外脆里嫩，健康低脂",
    practice:
      "三文鱼擦干，撒盐和黑胡椒腌10分钟；皮朝下入热锅煎4分钟；翻面再煎2分钟；搭配柠檬角享用",
    i18n: {
      name: { "zh-CN": "香煎三文鱼", "en-US": "Pan-Seared Salmon" },
      description: {
        "zh-CN": "外脆里嫩，健康低脂",
        "en-US": "Crisp-skinned salmon, tender and healthy",
      },
      practice: {
        "zh-CN":
          "三文鱼擦干，撒盐和黑胡椒腌10分钟；皮朝下入热锅煎4分钟；翻面再煎2分钟；搭配柠檬角享用",
        "en-US": "Pat the salmon dry and season with salt and black pepper for 10 minutes; Sear skin-side down for 4 minutes; Flip and cook 2 more minutes; Serve with lemon wedges",
      },
      time: { "zh-CN": "15分钟", "en-US": "15 min" },
      calories: { "zh-CN": "210千卡/100g", "en-US": "210 kcal/100g" },
    },
    ingredients: [
      { name: "三文鱼", amount: "2块", category: "meat", i18n: { name: { "zh-CN": "三文鱼", "en-US": "Salmon Fillets" }, amount: { "zh-CN": "2块", "en-US": "2 fillets" } } },
      { name: "盐", amount: "适量", category: "seasoning", i18n: { name: { "zh-CN": "盐", "en-US": "Salt" }, amount: { "zh-CN": "适量", "en-US": "to taste" } } },
      { name: "黑胡椒", amount: "适量", category: "seasoning", i18n: { name: { "zh-CN": "黑胡椒", "en-US": "Black Pepper" }, amount: { "zh-CN": "适量", "en-US": "to taste" } } },
      { name: "柠檬", amount: "2片", category: "vegetable", i18n: { name: { "zh-CN": "柠檬", "en-US": "Lemon" }, amount: { "zh-CN": "2片", "en-US": "2 slices" } } },
      { name: "橄榄油", amount: "1勺", category: "seasoning", i18n: { name: { "zh-CN": "橄榄油", "en-US": "Olive Oil" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
    ],
    difficultyKey: "dish.simple",
    time: "15分钟",
    calories: "210千卡/100g",
  },
  {
    id: 25,
    categoryId: 3,
    name: "蛤蜊蒸蛋",
    image: "",
    emoji: "🥚",
    description: "嫩滑如布丁，鲜掉眉毛",
    practice:
      "蛤蜊吐沙后煮至开口；鸡蛋加温水打散过筛；倒入蛋液盖上保鲜膜；中火蒸10分钟；淋香油生抽撒葱花",
    i18n: {
      name: { "zh-CN": "蛤蜊蒸蛋", "en-US": "Steamed Egg Custard with Clams" },
      description: {
        "zh-CN": "嫩滑如布丁，鲜掉眉毛",
        "en-US": "Silky steamed egg custard with fresh clams",
      },
      practice: {
        "zh-CN":
          "蛤蜊吐沙后煮至开口；鸡蛋加温水打散过筛；倒入蛋液盖上保鲜膜；中火蒸10分钟；淋香油生抽撒葱花",
        "en-US": "Purge and boil the clams until they open; Beat the eggs with warm water and strain; Pour the custard into the plate and cover with film; Steam 10 minutes over medium heat; Finish with sesame oil, soy sauce and scallions",
      },
      time: { "zh-CN": "20分钟", "en-US": "20 min" },
      calories: { "zh-CN": "95千卡/100g", "en-US": "95 kcal/100g" },
    },
    ingredients: [
      { name: "蛤蜊", amount: "200g", category: "meat", i18n: { name: { "zh-CN": "蛤蜊", "en-US": "Clams" } } },
      { name: "鸡蛋", amount: "3个", category: "meat", i18n: { name: { "zh-CN": "鸡蛋", "en-US": "Eggs" }, amount: { "zh-CN": "3个", "en-US": "3" } } },
      { name: "温水", amount: "200ml", category: "other", i18n: { name: { "zh-CN": "温水", "en-US": "Warm Water" } } },
      { name: "香油", amount: "1勺", category: "seasoning", i18n: { name: { "zh-CN": "香油", "en-US": "Sesame Oil" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
      { name: "生抽", amount: "1勺", category: "seasoning", i18n: { name: { "zh-CN": "生抽", "en-US": "Light Soy Sauce" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
      { name: "葱花", amount: "适量", category: "vegetable", i18n: { name: { "zh-CN": "葱花", "en-US": "Chopped Scallions" }, amount: { "zh-CN": "适量", "en-US": "to taste" } } },
    ],
    difficultyKey: "dish.simple",
    time: "20分钟",
    calories: "95千卡/100g",
  },
  {
    id: 26,
    categoryId: 3,
    name: "剁椒鱼头",
    image: "",
    emoji: "🐠",
    description: "鲜辣开胃，湘菜代表",
    practice:
      "鱼头洗净剖开，用料酒姜片腌15分钟；铺上剁椒和姜丝；大火蒸12分钟；倒掉多余汤汁；淋热油和蒸鱼豉油撒葱花",
    i18n: {
      name: { "zh-CN": "剁椒鱼头", "en-US": "Fish Head with Chopped Chilies" },
      description: {
        "zh-CN": "鲜辣开胃，湘菜代表",
        "en-US": "A signature Hunan dish: fish head under fiery chopped chilies",
      },
      practice: {
        "zh-CN":
          "鱼头洗净剖开，用料酒姜片腌15分钟；铺上剁椒和姜丝；大火蒸12分钟；倒掉多余汤汁；淋热油和蒸鱼豉油撒葱花",
        "en-US": "Clean and split the fish head, marinating with cooking wine and ginger for 15 minutes; Cover with chopped chilies and ginger; Steam 12 minutes over high heat; Drain the excess liquid; Finish with hot oil, soy sauce and scallions",
      },
      time: { "zh-CN": "40分钟", "en-US": "40 min" },
      calories: { "zh-CN": "130千卡/100g", "en-US": "130 kcal/100g" },
    },
    ingredients: [
      { name: "鱼头", amount: "1个", category: "meat", i18n: { name: { "zh-CN": "鱼头", "en-US": "Fish Head" }, amount: { "zh-CN": "1个", "en-US": "1 whole" } } },
      { name: "剁椒", amount: "100g", category: "seasoning", i18n: { name: { "zh-CN": "剁椒", "en-US": "Chopped Pickled Chilies" } } },
      { name: "姜", amount: "5片", category: "vegetable", i18n: { name: { "zh-CN": "姜", "en-US": "Ginger" }, amount: { "zh-CN": "5片", "en-US": "5 slices" } } },
      { name: "蒜", amount: "4瓣", category: "seasoning", i18n: { name: { "zh-CN": "蒜", "en-US": "Garlic" }, amount: { "zh-CN": "4瓣", "en-US": "4 cloves" } } },
      { name: "蒸鱼豉油", amount: "3勺", category: "seasoning", i18n: { name: { "zh-CN": "蒸鱼豉油", "en-US": "Steamed Fish Soy Sauce" }, amount: { "zh-CN": "3勺", "en-US": "3 tbsp" } } },
      { name: "小葱", amount: "2根", category: "vegetable", i18n: { name: { "zh-CN": "小葱", "en-US": "Scallions" }, amount: { "zh-CN": "2根", "en-US": "2 stalks" } } },
    ],
    difficultyKey: "dish.hard",
    time: "40分钟",
    calories: "130千卡/100g",
  },
  {
    id: 27,
    categoryId: 4,
    name: "蒜蓉西兰花",
    image: "",
    emoji: "🥦",
    description: "翠绿爽脆，低卡健康",
    practice:
      "西兰花切小朵盐水浸泡；水开焯烫1分钟过凉；热油爆香蒜末；下西兰花大火翻炒；加盐和少许蚝油炒匀",
    i18n: {
      name: { "zh-CN": "蒜蓉西兰花", "en-US": "Stir-Fried Broccoli with Garlic" },
      description: {
        "zh-CN": "翠绿爽脆，低卡健康",
        "en-US": "Crisp broccoli tossed with fragrant garlic",
      },
      practice: {
        "zh-CN":
          "西兰花切小朵盐水浸泡；水开焯烫1分钟过凉；热油爆香蒜末；下西兰花大火翻炒；加盐和少许蚝油炒匀",
        "en-US": "Cut broccoli into florets and soak in salt water; Blanch 1 minute and chill; Sauté minced garlic in hot oil; Toss the broccoli over high heat; Season with salt and a touch of oyster sauce",
      },
      time: { "zh-CN": "15分钟", "en-US": "15 min" },
      calories: { "zh-CN": "60千卡/100g", "en-US": "60 kcal/100g" },
    },
    ingredients: [
      { name: "西兰花", amount: "300g", category: "vegetable", i18n: { name: { "zh-CN": "西兰花", "en-US": "Broccoli" } } },
      { name: "蒜", amount: "5瓣", category: "seasoning", i18n: { name: { "zh-CN": "蒜", "en-US": "Garlic" }, amount: { "zh-CN": "5瓣", "en-US": "5 cloves" } } },
      { name: "蚝油", amount: "1勺", category: "seasoning", i18n: { name: { "zh-CN": "蚝油", "en-US": "Oyster Sauce" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
      { name: "盐", amount: "适量", category: "seasoning", i18n: { name: { "zh-CN": "盐", "en-US": "Salt" }, amount: { "zh-CN": "适量", "en-US": "to taste" } } },
      { name: "食用油", amount: "1勺", category: "seasoning", i18n: { name: { "zh-CN": "食用油", "en-US": "Cooking Oil" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
    ],
    difficultyKey: "dish.simple",
    time: "15分钟",
    calories: "60千卡/100g",
  },
  {
    id: 28,
    categoryId: 4,
    name: "干煸四季豆",
    image: "",
    emoji: "🫑",
    description: "干香入味，川味经典",
    practice:
      "四季豆掰段擦干；油锅炸至起虎皮捞出；锅留底油炒肉末和芽菜；下干辣椒花椒爆香；回锅豆角加盐糖翻匀",
    i18n: {
      name: { "zh-CN": "干煸四季豆", "en-US": "Dry-Fried Green Beans" },
      description: {
        "zh-CN": "干香入味，川味经典",
        "en-US": "Wok-charred green beans with savory minced pork",
      },
      practice: {
        "zh-CN":
          "四季豆掰段擦干；油锅炸至起虎皮捞出；锅留底油炒肉末和芽菜；下干辣椒花椒爆香；回锅豆角加盐糖翻匀",
        "en-US": "Snap the beans into sections and pat dry; Fry until blistered and remove; Sauté minced pork and preserved vegetable in a little oil; Add dried chilies and peppercorns; Return the beans and season with salt and sugar",
      },
      time: { "zh-CN": "20分钟", "en-US": "20 min" },
      calories: { "zh-CN": "110千卡/100g", "en-US": "110 kcal/100g" },
    },
    ingredients: [
      { name: "四季豆", amount: "400g", category: "vegetable", i18n: { name: { "zh-CN": "四季豆", "en-US": "Green Beans" } } },
      { name: "猪肉末", amount: "80g", category: "meat", i18n: { name: { "zh-CN": "猪肉末", "en-US": "Minced Pork" } } },
      { name: "碎米芽菜", amount: "30g", category: "other", i18n: { name: { "zh-CN": "碎米芽菜", "en-US": "Preserved Mustard Greens" } } },
      { name: "干辣椒", amount: "6个", category: "seasoning", i18n: { name: { "zh-CN": "干辣椒", "en-US": "Dried Chilies" }, amount: { "zh-CN": "6个", "en-US": "6" } } },
      { name: "花椒", amount: "1茶匙", category: "seasoning", i18n: { name: { "zh-CN": "花椒", "en-US": "Sichuan Peppercorns" }, amount: { "zh-CN": "1茶匙", "en-US": "1 tsp" } } },
      { name: "糖", amount: "1茶匙", category: "seasoning", i18n: { name: { "zh-CN": "糖", "en-US": "Sugar" }, amount: { "zh-CN": "1茶匙", "en-US": "1 tsp" } } },
    ],
    difficultyKey: "dish.medium",
    time: "20分钟",
    calories: "110千卡/100g",
  },
  {
    id: 29,
    categoryId: 4,
    name: "醋溜土豆丝",
    image: "",
    emoji: "🥔",
    description: "酸辣爽脆，超级下饭",
    practice:
      "土豆切细丝，清水冲洗淀粉；干辣椒和花椒炝锅；大火快炒土豆丝；沿锅边烹入香醋；加盐和蒜末翻匀",
    i18n: {
      name: { "zh-CN": "醋溜土豆丝", "en-US": "Hot and Sour Shredded Potato" },
      description: {
        "zh-CN": "酸辣爽脆，超级下饭",
        "en-US": "Crunchy shredded potatoes in a tangy, mildly hot sauce",
      },
      practice: {
        "zh-CN":
          "土豆切细丝，清水冲洗淀粉；干辣椒和花椒炝锅；大火快炒土豆丝；沿锅边烹入香醋；加盐和蒜末翻匀",
        "en-US": "Shred the potatoes and rinse off the starch; Sizzle dried chilies and peppercorns in oil; Stir-fry the potato shreds over high heat; Splash vinegar along the wok edge; Season with salt and minced garlic",
      },
      time: { "zh-CN": "20分钟", "en-US": "20 min" },
      calories: { "zh-CN": "120千卡/100g", "en-US": "120 kcal/100g" },
    },
    ingredients: [
      { name: "土豆", amount: "2个", category: "vegetable", i18n: { name: { "zh-CN": "土豆", "en-US": "Potatoes" }, amount: { "zh-CN": "2个", "en-US": "2" } } },
      { name: "干辣椒", amount: "4个", category: "seasoning", i18n: { name: { "zh-CN": "干辣椒", "en-US": "Dried Chilies" }, amount: { "zh-CN": "4个", "en-US": "4" } } },
      { name: "花椒", amount: "1茶匙", category: "seasoning", i18n: { name: { "zh-CN": "花椒", "en-US": "Sichuan Peppercorns" }, amount: { "zh-CN": "1茶匙", "en-US": "1 tsp" } } },
      { name: "香醋", amount: "2勺", category: "seasoning", i18n: { name: { "zh-CN": "香醋", "en-US": "Black Vinegar" }, amount: { "zh-CN": "2勺", "en-US": "2 tbsp" } } },
      { name: "盐", amount: "适量", category: "seasoning", i18n: { name: { "zh-CN": "盐", "en-US": "Salt" }, amount: { "zh-CN": "适量", "en-US": "to taste" } } },
      { name: "蒜", amount: "3瓣", category: "seasoning", i18n: { name: { "zh-CN": "蒜", "en-US": "Garlic" }, amount: { "zh-CN": "3瓣", "en-US": "3 cloves" } } },
    ],
    difficultyKey: "dish.simple",
    time: "20分钟",
    calories: "120千卡/100g",
  },
  {
    id: 30,
    categoryId: 4,
    name: "凉拌黄瓜",
    image: "",
    emoji: "🥒",
    description: "清爽解腻，五分钟搞定",
    practice:
      "黄瓜拍裂切段；加盐腌5分钟倒掉水分；加蒜末生抽香醋；淋香油撒糖拌匀；喜辣可加辣椒油",
    i18n: {
      name: { "zh-CN": "凉拌黄瓜", "en-US": "Smashed Cucumber Salad" },
      description: {
        "zh-CN": "清爽解腻，五分钟搞定",
        "en-US": "A refreshing 5-minute smashed cucumber salad",
      },
      practice: {
        "zh-CN":
          "黄瓜拍裂切段；加盐腌5分钟倒掉水分；加蒜末生抽香醋；淋香油撒糖拌匀；喜辣可加辣椒油",
        "en-US": "Smash and cut the cucumbers into sections; Salt for 5 minutes and drain; Add garlic, soy sauce and black vinegar; Dress with sesame oil and a pinch of sugar; Add chili oil if you like it hot",
      },
      time: { "zh-CN": "10分钟", "en-US": "10 min" },
      calories: { "zh-CN": "40千卡/100g", "en-US": "40 kcal/100g" },
    },
    ingredients: [
      { name: "黄瓜", amount: "2根", category: "vegetable", i18n: { name: { "zh-CN": "黄瓜", "en-US": "Cucumbers" }, amount: { "zh-CN": "2根", "en-US": "2" } } },
      { name: "蒜", amount: "3瓣", category: "seasoning", i18n: { name: { "zh-CN": "蒜", "en-US": "Garlic" }, amount: { "zh-CN": "3瓣", "en-US": "3 cloves" } } },
      { name: "生抽", amount: "1勺", category: "seasoning", i18n: { name: { "zh-CN": "生抽", "en-US": "Light Soy Sauce" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
      { name: "香醋", amount: "1勺", category: "seasoning", i18n: { name: { "zh-CN": "香醋", "en-US": "Black Vinegar" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
      { name: "香油", amount: "1茶匙", category: "seasoning", i18n: { name: { "zh-CN": "香油", "en-US": "Sesame Oil" }, amount: { "zh-CN": "1茶匙", "en-US": "1 tsp" } } },
      { name: "糖", amount: "1茶匙", category: "seasoning", i18n: { name: { "zh-CN": "糖", "en-US": "Sugar" }, amount: { "zh-CN": "1茶匙", "en-US": "1 tsp" } } },
    ],
    difficultyKey: "dish.simple",
    time: "10分钟",
    calories: "40千卡/100g",
  },
  {
    id: 31,
    categoryId: 4,
    name: "红烧茄子",
    image: "",
    emoji: "🍆",
    description: "软糯浓香，米饭杀手",
    practice:
      "茄子切条撒盐腌10分钟挤水；调糖醋生抽汁；茄子拍淀粉煎至金黄；爆香蒜末豆瓣；回锅烹汁收浓",
    i18n: {
      name: { "zh-CN": "红烧茄子", "en-US": "Braised Eggplant" },
      description: {
        "zh-CN": "软糯浓香，米饭杀手",
        "en-US": "Melt-in-your-mouth eggplant in a glossy savory glaze",
      },
      practice: {
        "zh-CN":
          "茄子切条撒盐腌10分钟挤水；调糖醋生抽汁；茄子拍淀粉煎至金黄；爆香蒜末豆瓣；回锅烹汁收浓",
        "en-US": "Cut eggplant into strips, salt 10 minutes and squeeze dry; Mix a sweet-sour soy glaze; Dust with starch and pan-fry until golden; Sauté garlic and doubanjiang; Return the eggplant and reduce the sauce",
      },
      time: { "zh-CN": "25分钟", "en-US": "25 min" },
      calories: { "zh-CN": "160千卡/100g", "en-US": "160 kcal/100g" },
    },
    ingredients: [
      { name: "茄子", amount: "2根", category: "vegetable", i18n: { name: { "zh-CN": "茄子", "en-US": "Eggplants" }, amount: { "zh-CN": "2根", "en-US": "2" } } },
      { name: "蒜", amount: "4瓣", category: "seasoning", i18n: { name: { "zh-CN": "蒜", "en-US": "Garlic" }, amount: { "zh-CN": "4瓣", "en-US": "4 cloves" } } },
      { name: "豆瓣酱", amount: "1勺", category: "seasoning", i18n: { name: { "zh-CN": "豆瓣酱", "en-US": "Doubanjiang" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
      { name: "生抽", amount: "2勺", category: "seasoning", i18n: { name: { "zh-CN": "生抽", "en-US": "Light Soy Sauce" }, amount: { "zh-CN": "2勺", "en-US": "2 tbsp" } } },
      { name: "糖", amount: "1勺", category: "seasoning", i18n: { name: { "zh-CN": "糖", "en-US": "Sugar" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
      { name: "淀粉", amount: "1勺", category: "seasoning", i18n: { name: { "zh-CN": "淀粉", "en-US": "Starch" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
      { name: "小葱", amount: "1根", category: "vegetable", i18n: { name: { "zh-CN": "小葱", "en-US": "Scallion" }, amount: { "zh-CN": "1根", "en-US": "1" } } },
    ],
    difficultyKey: "dish.medium",
    time: "25分钟",
    calories: "160千卡/100g",
  },
  {
    id: 32,
    categoryId: 4,
    name: "香菇油菜",
    image: "",
    emoji: "🍄",
    description: "清淡鲜美，营养搭配",
    practice:
      "香菇切花刀，油菜对半切开；焯烫油菜摆盘；蚝油生抽水淀粉调汁；炒香菇倒入料汁；连汁浇在油菜上",
    i18n: {
      name: { "zh-CN": "香菇油菜", "en-US": "Bok Choy with Shiitake" },
      description: {
        "zh-CN": "清淡鲜美，营养搭配",
        "en-US": "Tender bok choy with umami-rich shiitake mushrooms",
      },
      practice: {
        "zh-CN":
          "香菇切花刀，油菜对半切开；焯烫油菜摆盘；蚝油生抽水淀粉调汁；炒香菇倒入料汁；连汁浇在油菜上",
        "en-US": "Score the shiitake caps and halve the bok choy; Blanch and arrange the greens; Mix oyster sauce, soy sauce and starch water; Sauté the mushrooms with the sauce; Spoon everything over the bok choy",
      },
      time: { "zh-CN": "15分钟", "en-US": "15 min" },
      calories: { "zh-CN": "70千卡/100g", "en-US": "70 kcal/100g" },
    },
    ingredients: [
      { name: "鲜香菇", amount: "8朵", category: "vegetable", i18n: { name: { "zh-CN": "鲜香菇", "en-US": "Shiitake Mushrooms" }, amount: { "zh-CN": "8朵", "en-US": "8" } } },
      { name: "油菜", amount: "300g", category: "vegetable", i18n: { name: { "zh-CN": "油菜", "en-US": "Bok Choy" } } },
      { name: "蚝油", amount: "1勺", category: "seasoning", i18n: { name: { "zh-CN": "蚝油", "en-US": "Oyster Sauce" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
      { name: "生抽", amount: "1勺", category: "seasoning", i18n: { name: { "zh-CN": "生抽", "en-US": "Light Soy Sauce" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
      { name: "淀粉", amount: "1茶匙", category: "seasoning", i18n: { name: { "zh-CN": "淀粉", "en-US": "Starch" }, amount: { "zh-CN": "1茶匙", "en-US": "1 tsp" } } },
      { name: "蒜", amount: "2瓣", category: "seasoning", i18n: { name: { "zh-CN": "蒜", "en-US": "Garlic" }, amount: { "zh-CN": "2瓣", "en-US": "2 cloves" } } },
    ],
    difficultyKey: "dish.simple",
    time: "15分钟",
    calories: "70千卡/100g",
  },
  {
    id: 33,
    categoryId: 5,
    name: "番茄蛋花汤",
    image: "",
    emoji: "🍅",
    description: "酸甜开胃，家喻户晓",
    practice:
      "番茄去皮切块炒出汁；加热水煮开；水淀粉勾薄芡；淋入蛋液搅出蛋花；加盐和香油撒葱花",
    i18n: {
      name: { "zh-CN": "番茄蛋花汤", "en-US": "Tomato Egg Drop Soup" },
      description: {
        "zh-CN": "酸甜开胃，家喻户晓",
        "en-US": "A comforting tomato soup with silky egg ribbons",
      },
      practice: {
        "zh-CN":
          "番茄去皮切块炒出汁；加热水煮开；水淀粉勾薄芡；淋入蛋液搅出蛋花；加盐和香油撒葱花",
        "en-US": "Peel and dice the tomatoes, then cook down into a sauce; Add hot water and bring to a boil; Thicken lightly with starch water; Drizzle in beaten eggs to form ribbons; Season with salt, sesame oil and scallions",
      },
      time: { "zh-CN": "15分钟", "en-US": "15 min" },
      calories: { "zh-CN": "60千卡/100g", "en-US": "60 kcal/100g" },
    },
    ingredients: [
      { name: "番茄", amount: "2个", category: "vegetable", i18n: { name: { "zh-CN": "番茄", "en-US": "Tomatoes" }, amount: { "zh-CN": "2个", "en-US": "2" } } },
      { name: "鸡蛋", amount: "2个", category: "meat", i18n: { name: { "zh-CN": "鸡蛋", "en-US": "Eggs" }, amount: { "zh-CN": "2个", "en-US": "2" } } },
      { name: "淀粉", amount: "1勺", category: "seasoning", i18n: { name: { "zh-CN": "淀粉", "en-US": "Starch" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
      { name: "香油", amount: "1茶匙", category: "seasoning", i18n: { name: { "zh-CN": "香油", "en-US": "Sesame Oil" }, amount: { "zh-CN": "1茶匙", "en-US": "1 tsp" } } },
      { name: "盐", amount: "适量", category: "seasoning", i18n: { name: { "zh-CN": "盐", "en-US": "Salt" }, amount: { "zh-CN": "适量", "en-US": "to taste" } } },
      { name: "小葱", amount: "1根", category: "vegetable", i18n: { name: { "zh-CN": "小葱", "en-US": "Scallion" }, amount: { "zh-CN": "1根", "en-US": "1" } } },
    ],
    difficultyKey: "dish.simple",
    time: "15分钟",
    calories: "60千卡/100g",
  },
  {
    id: 34,
    categoryId: 5,
    name: "玉米排骨汤",
    image: "",
    emoji: "🌽",
    description: "清甜滋养，老少皆宜",
    practice:
      "排骨焯水冲净；玉米切段胡萝卜切块；全部入锅加姜片；大火烧开转小火炖60分钟；加盐调味",
    i18n: {
      name: { "zh-CN": "玉米排骨汤", "en-US": "Corn and Pork Rib Soup" },
      description: {
        "zh-CN": "清甜滋养，老少皆宜",
        "en-US": "A naturally sweet soup of corn and tender ribs",
      },
      practice: {
        "zh-CN":
          "排骨焯水冲净；玉米切段胡萝卜切块；全部入锅加姜片；大火烧开转小火炖60分钟；加盐调味",
        "en-US": "Blanch the ribs and rinse; Cut corn into sections and chunk the carrot; Simmer everything with ginger; Boil then reduce to low for 60 minutes; Season with salt",
      },
      time: { "zh-CN": "70分钟", "en-US": "70 min" },
      calories: { "zh-CN": "130千卡/100g", "en-US": "130 kcal/100g" },
    },
    ingredients: [
      { name: "排骨", amount: "400g", category: "meat", i18n: { name: { "zh-CN": "排骨", "en-US": "Pork Ribs" } } },
      { name: "玉米", amount: "2根", category: "vegetable", i18n: { name: { "zh-CN": "玉米", "en-US": "Corn" }, amount: { "zh-CN": "2根", "en-US": "2" } } },
      { name: "胡萝卜", amount: "1根", category: "vegetable", i18n: { name: { "zh-CN": "胡萝卜", "en-US": "Carrot" }, amount: { "zh-CN": "1根", "en-US": "1" } } },
      { name: "姜", amount: "3片", category: "vegetable", i18n: { name: { "zh-CN": "姜", "en-US": "Ginger" }, amount: { "zh-CN": "3片", "en-US": "3 slices" } } },
      { name: "料酒", amount: "1勺", category: "seasoning", i18n: { name: { "zh-CN": "料酒", "en-US": "Cooking Wine" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
      { name: "盐", amount: "适量", category: "seasoning", i18n: { name: { "zh-CN": "盐", "en-US": "Salt" }, amount: { "zh-CN": "适量", "en-US": "to taste" } } },
    ],
    difficultyKey: "dish.simple",
    time: "70分钟",
    calories: "130千卡/100g",
  },
  {
    id: 35,
    categoryId: 5,
    name: "酸辣汤",
    image: "",
    emoji: "🌶️",
    description: "酸辣开胃，唤醒味蕾",
    practice:
      "木耳豆腐火腿切丝；水开下所有食材煮2分钟；生抽醋白胡椒调味；勾芡后淋入蛋液；滴香油撒香菜",
    i18n: {
      name: { "zh-CN": "酸辣汤", "en-US": "Hot and Sour Soup" },
      description: {
        "zh-CN": "酸辣开胃，唤醒味蕾",
        "en-US": "Hot, tangy and packed with texture",
      },
      practice: {
        "zh-CN":
          "木耳豆腐火腿切丝；水开下所有食材煮2分钟；生抽醋白胡椒调味；勾芡后淋入蛋液；滴香油撒香菜",
        "en-US": "Shred wood ear, tofu and ham; Boil everything together for 2 minutes; Season with soy sauce, vinegar and white pepper; Thicken with starch and swirl in egg; Finish with sesame oil and cilantro",
      },
      time: { "zh-CN": "30分钟", "en-US": "30 min" },
      calories: { "zh-CN": "90千卡/100g", "en-US": "90 kcal/100g" },
    },
    ingredients: [
      { name: "嫩豆腐", amount: "150g", category: "vegetable", i18n: { name: { "zh-CN": "嫩豆腐", "en-US": "Soft Tofu" } } },
      { name: "黑木耳", amount: "30g", category: "vegetable", i18n: { name: { "zh-CN": "黑木耳", "en-US": "Wood Ear Mushrooms" } } },
      { name: "火腿", amount: "50g", category: "meat", i18n: { name: { "zh-CN": "火腿", "en-US": "Ham" } } },
      { name: "鸡蛋", amount: "1个", category: "meat", i18n: { name: { "zh-CN": "鸡蛋", "en-US": "Egg" }, amount: { "zh-CN": "1个", "en-US": "1" } } },
      { name: "白胡椒粉", amount: "1茶匙", category: "seasoning", i18n: { name: { "zh-CN": "白胡椒粉", "en-US": "White Pepper Powder" }, amount: { "zh-CN": "1茶匙", "en-US": "1 tsp" } } },
      { name: "香醋", amount: "2勺", category: "seasoning", i18n: { name: { "zh-CN": "香醋", "en-US": "Black Vinegar" }, amount: { "zh-CN": "2勺", "en-US": "2 tbsp" } } },
      { name: "香菜", amount: "适量", category: "vegetable", i18n: { name: { "zh-CN": "香菜", "en-US": "Cilantro" }, amount: { "zh-CN": "适量", "en-US": "to taste" } } },
    ],
    difficultyKey: "dish.medium",
    time: "30分钟",
    calories: "90千卡/100g",
  },
  {
    id: 36,
    categoryId: 5,
    name: "香菇炖鸡汤",
    image: "",
    emoji: "🍲",
    description: "汤鲜肉嫩，滋补暖身",
    practice:
      "鸡块焯水冲净；干香菇泡发洗净；全料入锅加姜片料酒；烧开转小火炖70分钟；加盐调味即可",
    i18n: {
      name: { "zh-CN": "香菇炖鸡汤", "en-US": "Chicken Soup with Shiitake" },
      description: {
        "zh-CN": "汤鲜肉嫩，滋补暖身",
        "en-US": "A nourishing chicken soup with earthy shiitake",
      },
      practice: {
        "zh-CN":
          "鸡块焯水冲净；干香菇泡发洗净；全料入锅加姜片料酒；烧开转小火炖70分钟；加盐调味即可",
        "en-US": "Blanch the chicken and rinse; Soak and clean the dried shiitake; Simmer everything with ginger and cooking wine; Boil then lower to a gentle simmer for 70 minutes; Season with salt",
      },
      time: { "zh-CN": "80分钟", "en-US": "80 min" },
      calories: { "zh-CN": "150千卡/100g", "en-US": "150 kcal/100g" },
    },
    ingredients: [
      { name: "鸡", amount: "500g", category: "meat", i18n: { name: { "zh-CN": "鸡", "en-US": "Chicken" } } },
      { name: "干香菇", amount: "8朵", category: "vegetable", i18n: { name: { "zh-CN": "干香菇", "en-US": "Dried Shiitake" }, amount: { "zh-CN": "8朵", "en-US": "8" } } },
      { name: "姜", amount: "4片", category: "vegetable", i18n: { name: { "zh-CN": "姜", "en-US": "Ginger" }, amount: { "zh-CN": "4片", "en-US": "4 slices" } } },
      { name: "料酒", amount: "2勺", category: "seasoning", i18n: { name: { "zh-CN": "料酒", "en-US": "Cooking Wine" }, amount: { "zh-CN": "2勺", "en-US": "2 tbsp" } } },
      { name: "红枣", amount: "5颗", category: "other", i18n: { name: { "zh-CN": "红枣", "en-US": "Red Dates" }, amount: { "zh-CN": "5颗", "en-US": "5" } } },
      { name: "盐", amount: "适量", category: "seasoning", i18n: { name: { "zh-CN": "盐", "en-US": "Salt" }, amount: { "zh-CN": "适量", "en-US": "to taste" } } },
    ],
    difficultyKey: "dish.simple",
    time: "80分钟",
    calories: "150千卡/100g",
  },
  {
    id: 37,
    categoryId: 5,
    name: "绿豆汤",
    image: "",
    emoji: "🍵",
    description: "清热消暑，夏日甜汤",
    practice:
      "绿豆洗净浸泡1小时；加水大火煮开；转小火煮至开花；加冰糖搅化；冷藏后风味更佳",
    i18n: {
      name: { "zh-CN": "绿豆汤", "en-US": "Mung Bean Soup" },
      description: {
        "zh-CN": "清热消暑，夏日甜汤",
        "en-US": "A cooling summer classic to beat the heat",
      },
      practice: {
        "zh-CN":
          "绿豆洗净浸泡1小时；加水大火煮开；转小火煮至开花；加冰糖搅化；冷藏后风味更佳",
        "en-US": "Rinse and soak the mung beans for 1 hour; Bring to a boil over high heat; Simmer until the beans split; Stir in rock sugar; Even better chilled",
      },
      time: { "zh-CN": "60分钟", "en-US": "60 min" },
      calories: { "zh-CN": "80千卡/100g", "en-US": "80 kcal/100g" },
    },
    ingredients: [
      { name: "绿豆", amount: "150g", category: "other", i18n: { name: { "zh-CN": "绿豆", "en-US": "Mung Beans" } } },
      { name: "冰糖", amount: "30g", category: "seasoning", i18n: { name: { "zh-CN": "冰糖", "en-US": "Rock Sugar" } } },
      { name: "水", amount: "1500ml", category: "other", i18n: { name: { "zh-CN": "水", "en-US": "Water" } } },
    ],
    difficultyKey: "dish.simple",
    time: "60分钟",
    calories: "80千卡/100g",
  },
  {
    id: 38,
    categoryId: 6,
    name: "冰糖雪梨",
    image: "",
    emoji: "🍐",
    description: "润肺清甜，秋冬暖饮",
    practice:
      "雪梨顶部切盖挖核；放入冰糖和枸杞；盖回梨盖放入碗中；蒸30分钟至软透；趁热食用",
    i18n: {
      name: { "zh-CN": "冰糖雪梨", "en-US": "Snow Pear with Rock Sugar" },
      description: {
        "zh-CN": "润肺清甜，秋冬暖饮",
        "en-US": "Gently steamed pear in sweet rock-sugar syrup",
      },
      practice: {
        "zh-CN":
          "雪梨顶部切盖挖核；放入冰糖和枸杞；盖回梨盖放入碗中；蒸30分钟至软透；趁热食用",
        "en-US": "Cut off the pear top and core it; Fill with rock sugar and goji berries; Replace the lid and place in a bowl; Steam 30 minutes until tender; Serve warm",
      },
      time: { "zh-CN": "40分钟", "en-US": "40 min" },
      calories: { "zh-CN": "90千卡/份", "en-US": "90 kcal/serving" },
    },
    ingredients: [
      { name: "雪梨", amount: "2个", category: "vegetable", i18n: { name: { "zh-CN": "雪梨", "en-US": "Snow Pears" }, amount: { "zh-CN": "2个", "en-US": "2" } } },
      { name: "冰糖", amount: "20g", category: "seasoning", i18n: { name: { "zh-CN": "冰糖", "en-US": "Rock Sugar" } } },
      { name: "枸杞", amount: "10粒", category: "other", i18n: { name: { "zh-CN": "枸杞", "en-US": "Goji Berries" }, amount: { "zh-CN": "10粒", "en-US": "10" } } },
      { name: "红枣", amount: "3颗", category: "other", i18n: { name: { "zh-CN": "红枣", "en-US": "Red Dates" }, amount: { "zh-CN": "3颗", "en-US": "3" } } },
    ],
    difficultyKey: "dish.simple",
    time: "40分钟",
    calories: "90千卡/份",
  },
  {
    id: 39,
    categoryId: 6,
    name: "双皮奶",
    image: "",
    emoji: "🥛",
    description: "奶香浓郁，嫩滑如脂",
    practice:
      "牛奶煮热倒入碗中放凉结皮；挑开奶皮倒出牛奶；蛋清加糖打散与牛奶混合；沿碗边倒回让奶皮浮起；蒸12分钟焖5分钟",
    i18n: {
      name: { "zh-CN": "双皮奶", "en-US": "Double-Skin Milk Pudding" },
      description: {
        "zh-CN": "奶香浓郁，嫩滑如脂",
        "en-US": "A silky Cantonese milk pudding with double skin",
      },
      practice: {
        "zh-CN":
          "牛奶煮热倒入碗中放凉结皮；挑开奶皮倒出牛奶；蛋清加糖打散与牛奶混合；沿碗边倒回让奶皮浮起；蒸12分钟焖5分钟",
        "en-US": "Heat the milk, cool until a skin forms; Ease the skin aside and pour out the milk; Whisk egg whites with sugar into the milk; Pour back along the bowl edge so the skin floats; Steam 12 minutes and rest 5",
      },
      time: { "zh-CN": "30分钟", "en-US": "30 min" },
      calories: { "zh-CN": "160千卡/份", "en-US": "160 kcal/serving" },
    },
    ingredients: [
      { name: "全脂牛奶", amount: "400ml", category: "other", i18n: { name: { "zh-CN": "全脂牛奶", "en-US": "Whole Milk" } } },
      { name: "蛋清", amount: "3个", category: "meat", i18n: { name: { "zh-CN": "蛋清", "en-US": "Egg Whites" }, amount: { "zh-CN": "3个", "en-US": "3" } } },
      { name: "糖", amount: "25g", category: "seasoning", i18n: { name: { "zh-CN": "糖", "en-US": "Sugar" } } },
      { name: "红豆", amount: "适量", category: "other", i18n: { name: { "zh-CN": "红豆", "en-US": "Red Beans" }, amount: { "zh-CN": "适量", "en-US": "to taste" } } },
    ],
    difficultyKey: "dish.simple",
    time: "30分钟",
    calories: "160千卡/份",
  },
  {
    id: 40,
    categoryId: 6,
    name: "蛋挞",
    image: "",
    emoji: "🥧",
    description: "酥皮嫩芯，葡式风味",
    practice:
      "淡奶油牛奶糖加热搅化放凉；加蛋黄和炼乳拌匀过筛；挞皮摆盘倒入八分满；200度烤20分钟；边缘起焦斑即可",
    i18n: {
      name: { "zh-CN": "蛋挞", "en-US": "Baked Egg Tarts" },
      description: {
        "zh-CN": "酥皮嫩芯，葡式风味",
        "en-US": "Portuguese-style tarts with flaky crust and silky custard",
      },
      practice: {
        "zh-CN":
          "淡奶油牛奶糖加热搅化放凉；加蛋黄和炼乳拌匀过筛；挞皮摆盘倒入八分满；200度烤20分钟；边缘起焦斑即可",
        "en-US": "Warm cream, milk and sugar until dissolved, then cool; Whisk in egg yolks and condensed milk, strain; Fill the tart shells 80% full; Bake at 200°C for 20 minutes until charred spots appear",
      },
      time: { "zh-CN": "45分钟", "en-US": "45 min" },
      calories: { "zh-CN": "300千卡/份", "en-US": "300 kcal/serving" },
    },
    ingredients: [
      { name: "蛋挞皮", amount: "10个", category: "other", i18n: { name: { "zh-CN": "蛋挞皮", "en-US": "Tart Shells" }, amount: { "zh-CN": "10个", "en-US": "10" } } },
      { name: "淡奶油", amount: "110ml", category: "other", i18n: { name: { "zh-CN": "淡奶油", "en-US": "Whipping Cream" } } },
      { name: "牛奶", amount: "80ml", category: "other", i18n: { name: { "zh-CN": "牛奶", "en-US": "Milk" } } },
      { name: "蛋黄", amount: "2个", category: "meat", i18n: { name: { "zh-CN": "蛋黄", "en-US": "Egg Yolks" }, amount: { "zh-CN": "2个", "en-US": "2" } } },
      { name: "炼乳", amount: "1勺", category: "other", i18n: { name: { "zh-CN": "炼乳", "en-US": "Condensed Milk" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
      { name: "糖", amount: "20g", category: "seasoning", i18n: { name: { "zh-CN": "糖", "en-US": "Sugar" } } },
    ],
    difficultyKey: "dish.medium",
    time: "45分钟",
    calories: "300千卡/份",
  },
  {
    id: 41,
    categoryId: 6,
    name: "银耳莲子羹",
    image: "",
    emoji: "🍲",
    description: "胶质满满，滋阴养颜",
    practice:
      "银耳泡发撕小朵；莲子红枣洗净；全部入锅大火煮开；小火炖60分钟至出胶；加冰糖枸杞稍煮",
    i18n: {
      name: { "zh-CN": "银耳莲子羹", "en-US": "Snow Fungus and Lotus Seed Soup" },
      description: {
        "zh-CN": "胶质满满，滋阴养颜",
        "en-US": "A nourishing dessert soup with silky snow fungus",
      },
      practice: {
        "zh-CN":
          "银耳泡发撕小朵；莲子红枣洗净；全部入锅大火煮开；小火炖60分钟至出胶；加冰糖枸杞稍煮",
        "en-US": "Soak and tear the snow fungus into pieces; Rinse the lotus seeds and red dates; Bring everything to a boil; Simmer 60 minutes until silky; Stir in rock sugar and goji berries briefly",
      },
      time: { "zh-CN": "70分钟", "en-US": "70 min" },
      calories: { "zh-CN": "70千卡/份", "en-US": "70 kcal/serving" },
    },
    ingredients: [
      { name: "干银耳", amount: "1朵", category: "other", i18n: { name: { "zh-CN": "干银耳", "en-US": "Dried Snow Fungus" }, amount: { "zh-CN": "1朵", "en-US": "1" } } },
      { name: "莲子", amount: "50g", category: "other", i18n: { name: { "zh-CN": "莲子", "en-US": "Lotus Seeds" } } },
      { name: "红枣", amount: "6颗", category: "other", i18n: { name: { "zh-CN": "红枣", "en-US": "Red Dates" }, amount: { "zh-CN": "6颗", "en-US": "6" } } },
      { name: "冰糖", amount: "30g", category: "seasoning", i18n: { name: { "zh-CN": "冰糖", "en-US": "Rock Sugar" } } },
      { name: "枸杞", amount: "10粒", category: "other", i18n: { name: { "zh-CN": "枸杞", "en-US": "Goji Berries" }, amount: { "zh-CN": "10粒", "en-US": "10" } } },
    ],
    difficultyKey: "dish.simple",
    time: "70分钟",
    calories: "70千卡/份",
  },
  {
    id: 42,
    categoryId: 6,
    name: "红豆小圆子",
    image: "",
    emoji: "🍡",
    description: "绵密香甜，暖心甜品",
    practice:
      "红豆浸泡4小时；加水煮至酥烂加糖；糯米粉加水和团搓小圆子；圆子煮至浮起；入红豆汤撒桂花",
    i18n: {
      name: { "zh-CN": "红豆小圆子", "en-US": "Red Bean Soup with Rice Balls" },
      description: {
        "zh-CN": "绵密香甜，暖心甜品",
        "en-US": "Sweet red bean soup with chewy glutinous rice balls",
      },
      practice: {
        "zh-CN":
          "红豆浸泡4小时；加水煮至酥烂加糖；糯米粉加水和团搓小圆子；圆子煮至浮起；入红豆汤撒桂花",
        "en-US": "Soak the red beans for 4 hours; Simmer until soft and sweeten; Knead glutinous rice flour with water into tiny balls; Boil until they float; Combine with the red bean soup and top with osmanthus",
      },
      time: { "zh-CN": "50分钟", "en-US": "50 min" },
      calories: { "zh-CN": "180千卡/份", "en-US": "180 kcal/serving" },
    },
    ingredients: [
      { name: "红豆", amount: "150g", category: "other", i18n: { name: { "zh-CN": "红豆", "en-US": "Red Beans" } } },
      { name: "糯米粉", amount: "100g", category: "other", i18n: { name: { "zh-CN": "糯米粉", "en-US": "Glutinous Rice Flour" } } },
      { name: "冰糖", amount: "30g", category: "seasoning", i18n: { name: { "zh-CN": "冰糖", "en-US": "Rock Sugar" } } },
      { name: "桂花", amount: "1茶匙", category: "other", i18n: { name: { "zh-CN": "桂花", "en-US": "Dried Osmanthus" }, amount: { "zh-CN": "1茶匙", "en-US": "1 tsp" } } },
      { name: "水", amount: "1200ml", category: "other", i18n: { name: { "zh-CN": "水", "en-US": "Water" } } },
    ],
    difficultyKey: "dish.medium",
    time: "50分钟",
    calories: "180千卡/份",
  },
  {
    id: 43,
    categoryId: 7,
    name: "皮蛋瘦肉粥",
    image: "",
    emoji: "🥣",
    description: "咸香绵滑，广式经典",
    practice:
      "大米浸泡30分钟；瘦肉切丝用盐腌制；米加水大火煮开转小火40分钟；下肉丝皮蛋丁煮10分钟；加盐撒葱花",
    i18n: {
      name: { "zh-CN": "皮蛋瘦肉粥", "en-US": "Congee with Pork and Century Egg" },
      description: {
        "zh-CN": "咸香绵滑，广式经典",
        "en-US": "Silky Cantonese congee with pork and century egg",
      },
      practice: {
        "zh-CN":
          "大米浸泡30分钟；瘦肉切丝用盐腌制；米加水大火煮开转小火40分钟；下肉丝皮蛋丁煮10分钟；加盐撒葱花",
        "en-US": "Soak the rice for 30 minutes; Shred the pork and salt it; Simmer the rice 40 minutes after boiling; Add the pork and diced century egg for 10 more; Season and top with scallions",
      },
      time: { "zh-CN": "50分钟", "en-US": "50 min" },
      calories: { "zh-CN": "120千卡/份", "en-US": "120 kcal/serving" },
    },
    ingredients: [
      { name: "大米", amount: "100g", category: "other", i18n: { name: { "zh-CN": "大米", "en-US": "Rice" } } },
      { name: "猪里脊", amount: "150g", category: "meat", i18n: { name: { "zh-CN": "猪里脊", "en-US": "Pork Tenderloin" } } },
      { name: "皮蛋", amount: "2个", category: "meat", i18n: { name: { "zh-CN": "皮蛋", "en-US": "Century Eggs" }, amount: { "zh-CN": "2个", "en-US": "2" } } },
      { name: "姜", amount: "3片", category: "vegetable", i18n: { name: { "zh-CN": "姜", "en-US": "Ginger" }, amount: { "zh-CN": "3片", "en-US": "3 slices" } } },
      { name: "小葱", amount: "1根", category: "vegetable", i18n: { name: { "zh-CN": "小葱", "en-US": "Scallion" }, amount: { "zh-CN": "1根", "en-US": "1" } } },
      { name: "盐", amount: "适量", category: "seasoning", i18n: { name: { "zh-CN": "盐", "en-US": "Salt" }, amount: { "zh-CN": "适量", "en-US": "to taste" } } },
    ],
    difficultyKey: "dish.simple",
    time: "50分钟",
    calories: "120千卡/份",
  },
  {
    id: 44,
    categoryId: 7,
    name: "葱花鸡蛋饼",
    image: "",
    emoji: "🥞",
    description: "外脆内软，早餐快手",
    practice:
      "面粉加水和蛋搅成糊；加盐和葱花拌匀；平底锅刷油小火；倒入面糊摊平；两面煎至金黄切块",
    i18n: {
      name: { "zh-CN": "葱花鸡蛋饼", "en-US": "Scallion Egg Pancake" },
      description: {
        "zh-CN": "外脆内软，早餐快手",
        "en-US": "Crisp-edged scallion pancakes for busy mornings",
      },
      practice: {
        "zh-CN":
          "面粉加水和蛋搅成糊；加盐和葱花拌匀；平底锅刷油小火；倒入面糊摊平；两面煎至金黄切块",
        "en-US": "Whisk flour, water and eggs into a batter; Season with salt and scallions; Brush a pan with oil over low heat; Pour and spread the batter; Fry both sides golden and cut into wedges",
      },
      time: { "zh-CN": "15分钟", "en-US": "15 min" },
      calories: { "zh-CN": "220千卡/份", "en-US": "220 kcal/serving" },
    },
    ingredients: [
      { name: "面粉", amount: "150g", category: "other", i18n: { name: { "zh-CN": "面粉", "en-US": "Flour" } } },
      { name: "鸡蛋", amount: "2个", category: "meat", i18n: { name: { "zh-CN": "鸡蛋", "en-US": "Eggs" }, amount: { "zh-CN": "2个", "en-US": "2" } } },
      { name: "小葱", amount: "3根", category: "vegetable", i18n: { name: { "zh-CN": "小葱", "en-US": "Scallions" }, amount: { "zh-CN": "3根", "en-US": "3 stalks" } } },
      { name: "盐", amount: "适量", category: "seasoning", i18n: { name: { "zh-CN": "盐", "en-US": "Salt" }, amount: { "zh-CN": "适量", "en-US": "to taste" } } },
      { name: "食用油", amount: "1勺", category: "seasoning", i18n: { name: { "zh-CN": "食用油", "en-US": "Cooking Oil" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
    ],
    difficultyKey: "dish.simple",
    time: "15分钟",
    calories: "220千卡/份",
  },
  {
    id: 45,
    categoryId: 7,
    name: "牛奶燕麦粥",
    image: "",
    emoji: "🌾",
    description: "三分钟暖胃，饱腹低卡",
    practice:
      "水烧开下燕麦片；小火煮3分钟搅动；倒入牛奶搅匀；关火焖1分钟；加香蕉片或坚果更佳",
    i18n: {
      name: { "zh-CN": "牛奶燕麦粥", "en-US": "Milky Oatmeal" },
      description: {
        "zh-CN": "三分钟暖胃，饱腹低卡",
        "en-US": "A 3-minute filling bowl of creamy oats",
      },
      practice: {
        "zh-CN":
          "水烧开下燕麦片；小火煮3分钟搅动；倒入牛奶搅匀；关火焖1分钟；加香蕉片或坚果更佳",
        "en-US": "Boil water and add the oats; Simmer 3 minutes stirring; Pour in the milk and stir; Rest 1 minute off the heat; Top with banana slices or nuts",
      },
      time: { "zh-CN": "10分钟", "en-US": "10 min" },
      calories: { "zh-CN": "150千卡/份", "en-US": "150 kcal/serving" },
    },
    ingredients: [
      { name: "燕麦片", amount: "60g", category: "other", i18n: { name: { "zh-CN": "燕麦片", "en-US": "Rolled Oats" } } },
      { name: "牛奶", amount: "250ml", category: "other", i18n: { name: { "zh-CN": "牛奶", "en-US": "Milk" } } },
      { name: "香蕉", amount: "1根", category: "vegetable", i18n: { name: { "zh-CN": "香蕉", "en-US": "Banana" }, amount: { "zh-CN": "1根", "en-US": "1" } } },
      { name: "坚果碎", amount: "1勺", category: "other", i18n: { name: { "zh-CN": "坚果碎", "en-US": "Chopped Nuts" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
    ],
    difficultyKey: "dish.simple",
    time: "10分钟",
    calories: "150千卡/份",
  },
  {
    id: 46,
    categoryId: 7,
    name: "茶叶蛋",
    image: "",
    emoji: "🥚",
    description: "茶香入味，便携早餐",
    practice:
      "鸡蛋煮8分钟过凉水；轻敲出裂纹；加水生抽老抽茶叶八角糖；放入鸡蛋小火煮30分钟；关火浸泡2小时更入味",
    i18n: {
      name: { "zh-CN": "茶叶蛋", "en-US": "Tea Eggs" },
      description: {
        "zh-CN": "茶香入味，便携早餐",
        "en-US": "Marbled tea-scented eggs, perfect on the go",
      },
      practice: {
        "zh-CN":
          "鸡蛋煮8分钟过凉水；轻敲出裂纹；加水生抽老抽茶叶八角糖；放入鸡蛋小火煮30分钟；关火浸泡2小时更入味",
        "en-US": "Boil the eggs 8 minutes and chill in cold water; Crack the shells all over; Simmer water with soy sauces, tea, star anise and sugar; Add the eggs and simmer 30 minutes; Soak 2 hours for deeper flavor",
      },
      time: { "zh-CN": "60分钟", "en-US": "60 min" },
      calories: { "zh-CN": "110千卡/份", "en-US": "110 kcal/serving" },
    },
    ingredients: [
      { name: "鸡蛋", amount: "8个", category: "meat", i18n: { name: { "zh-CN": "鸡蛋", "en-US": "Eggs" }, amount: { "zh-CN": "8个", "en-US": "8" } } },
      { name: "红茶叶", amount: "2勺", category: "other", i18n: { name: { "zh-CN": "红茶叶", "en-US": "Black Tea Leaves" }, amount: { "zh-CN": "2勺", "en-US": "2 tbsp" } } },
      { name: "八角", amount: "2个", category: "seasoning", i18n: { name: { "zh-CN": "八角", "en-US": "Star Anise" }, amount: { "zh-CN": "2个", "en-US": "2" } } },
      { name: "生抽", amount: "3勺", category: "seasoning", i18n: { name: { "zh-CN": "生抽", "en-US": "Light Soy Sauce" }, amount: { "zh-CN": "3勺", "en-US": "3 tbsp" } } },
      { name: "老抽", amount: "1勺", category: "seasoning", i18n: { name: { "zh-CN": "老抽", "en-US": "Dark Soy Sauce" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
      { name: "冰糖", amount: "15g", category: "seasoning", i18n: { name: { "zh-CN": "冰糖", "en-US": "Rock Sugar" } } },
    ],
    difficultyKey: "dish.simple",
    time: "60分钟",
    calories: "110千卡/份",
  },
  {
    id: 47,
    categoryId: 7,
    name: "自制豆浆",
    image: "",
    emoji: "🥛",
    description: "香浓无添加，元气早晨",
    practice:
      "黄豆浸泡8小时或过夜；加水用破壁机打磨；纱布过滤豆渣；煮沸后小火再煮5分钟；按口味加糖",
    i18n: {
      name: { "zh-CN": "自制豆浆", "en-US": "Homemade Soy Milk" },
      description: {
        "zh-CN": "香浓无添加，元气早晨",
        "en-US": "Fragrant homemade soy milk with no additives",
      },
      practice: {
        "zh-CN":
          "黄豆浸泡8小时或过夜；加水用破壁机打磨；纱布过滤豆渣；煮沸后小火再煮5分钟；按口味加糖",
        "en-US": "Soak the soybeans 8 hours or overnight; Blend with water; Strain through cheesecloth; Boil then simmer 5 more minutes; Sweeten to taste",
      },
      time: { "zh-CN": "40分钟", "en-US": "40 min" },
      calories: { "zh-CN": "80千卡/份", "en-US": "80 kcal/serving" },
    },
    ingredients: [
      { name: "黄豆", amount: "100g", category: "other", i18n: { name: { "zh-CN": "黄豆", "en-US": "Soybeans" } } },
      { name: "水", amount: "1200ml", category: "other", i18n: { name: { "zh-CN": "水", "en-US": "Water" } } },
      { name: "糖", amount: "适量", category: "seasoning", i18n: { name: { "zh-CN": "糖", "en-US": "Sugar" }, amount: { "zh-CN": "适量", "en-US": "to taste" } } },
    ],
    difficultyKey: "dish.simple",
    time: "40分钟",
    calories: "80千卡/份",
  },
  {
    id: 48,
    categoryId: 8,
    name: "柠檬蜂蜜水",
    image: "",
    emoji: "🍋",
    description: "清新维C，一夜好心情",
    practice:
      "柠檬用盐搓洗切片；杯中放入柠檬片；倒入40度以下温水；加蜂蜜搅匀即可；冷藏风味更清爽",
    i18n: {
      name: { "zh-CN": "柠檬蜂蜜水", "en-US": "Honey Lemon Water" },
      description: {
        "zh-CN": "清新维C，一夜好心情",
        "en-US": "A bright vitamin-C boost to start the day",
      },
      practice: {
        "zh-CN":
          "柠檬用盐搓洗切片；杯中放入柠檬片；倒入40度以下温水；加蜂蜜搅匀即可；冷藏风味更清爽",
        "en-US": "Scrub the lemon with salt and slice; Add the slices to a cup; Pour in warm water below 40°C; Stir in honey; Chill for extra freshness",
      },
      time: { "zh-CN": "10分钟", "en-US": "10 min" },
      calories: { "zh-CN": "40千卡/杯", "en-US": "40 kcal/cup" },
    },
    ingredients: [
      { name: "柠檬", amount: "2片", category: "vegetable", i18n: { name: { "zh-CN": "柠檬", "en-US": "Lemon" }, amount: { "zh-CN": "2片", "en-US": "2 slices" } } },
      { name: "蜂蜜", amount: "2勺", category: "other", i18n: { name: { "zh-CN": "蜂蜜", "en-US": "Honey" }, amount: { "zh-CN": "2勺", "en-US": "2 tbsp" } } },
      { name: "温水", amount: "300ml", category: "other", i18n: { name: { "zh-CN": "温水", "en-US": "Warm Water" } } },
    ],
    difficultyKey: "dish.simple",
    time: "10分钟",
    calories: "40千卡/杯",
  },
  {
    id: 49,
    categoryId: 8,
    name: "芒果奶昔",
    image: "",
    emoji: "🥤",
    description: "浓稠香甜，五分钟果饮",
    practice:
      "芒果取果肉切块；与牛奶酸奶入榨汁机；搅打至顺滑无颗粒；倒入杯中冷藏；装饰芒果丁薄荷",
    i18n: {
      name: { "zh-CN": "芒果奶昔", "en-US": "Mango Smoothie" },
      description: {
        "zh-CN": "浓稠香甜，五分钟果饮",
        "en-US": "A thick, sweet 5-minute mango smoothie",
      },
      practice: {
        "zh-CN":
          "芒果取果肉切块；与牛奶酸奶入榨汁机；搅打至顺滑无颗粒；倒入杯中冷藏；装饰芒果丁薄荷",
        "en-US": "Cube the mango flesh; Blend with milk and yogurt until smooth; Pour into glasses and chill; Garnish with mango dice and mint",
      },
      time: { "zh-CN": "10分钟", "en-US": "10 min" },
      calories: { "zh-CN": "140千卡/杯", "en-US": "140 kcal/cup" },
    },
    ingredients: [
      { name: "芒果", amount: "2个", category: "vegetable", i18n: { name: { "zh-CN": "芒果", "en-US": "Mangoes" }, amount: { "zh-CN": "2个", "en-US": "2" } } },
      { name: "牛奶", amount: "150ml", category: "other", i18n: { name: { "zh-CN": "牛奶", "en-US": "Milk" } } },
      { name: "酸奶", amount: "100g", category: "other", i18n: { name: { "zh-CN": "酸奶", "en-US": "Yogurt" } } },
      { name: "蜂蜜", amount: "1勺", category: "other", i18n: { name: { "zh-CN": "蜂蜜", "en-US": "Honey" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
    ],
    difficultyKey: "dish.simple",
    time: "10分钟",
    calories: "140千卡/杯",
  },
  {
    id: 50,
    categoryId: 8,
    name: "酸梅汤",
    image: "",
    emoji: "🍹",
    description: "生津解腻，古法消暑",
    practice:
      "乌梅山楂甘草陈皮洗净浸泡30分钟；大火煮开转小火40分钟；加冰糖桂花搅化；过滤放凉；冰镇后饮用最佳",
    i18n: {
      name: { "zh-CN": "酸梅汤", "en-US": "Sour Plum Drink" },
      description: {
        "zh-CN": "生津解腻，古法消暑",
        "en-US": "A traditional sour-sweet cooler to cut the grease",
      },
      practice: {
        "zh-CN":
          "乌梅山楂甘草陈皮洗净浸泡30分钟；大火煮开转小火40分钟；加冰糖桂花搅化；过滤放凉；冰镇后饮用最佳",
        "en-US": "Rinse and soak smoked plums, hawthorn, licorice and tangerine peel for 30 minutes; Boil then simmer 40 minutes; Dissolve rock sugar and osmanthus; Strain and cool; Best served over ice",
      },
      time: { "zh-CN": "50分钟", "en-US": "50 min" },
      calories: { "zh-CN": "90千卡/杯", "en-US": "90 kcal/cup" },
    },
    ingredients: [
      { name: "乌梅", amount: "30g", category: "other", i18n: { name: { "zh-CN": "乌梅", "en-US": "Smoked Plums" } } },
      { name: "山楂", amount: "20g", category: "other", i18n: { name: { "zh-CN": "山楂", "en-US": "Hawthorn" } } },
      { name: "甘草", amount: "5g", category: "other", i18n: { name: { "zh-CN": "甘草", "en-US": "Licorice" } } },
      { name: "陈皮", amount: "5g", category: "other", i18n: { name: { "zh-CN": "陈皮", "en-US": "Tangerine Peel" } } },
      { name: "冰糖", amount: "50g", category: "seasoning", i18n: { name: { "zh-CN": "冰糖", "en-US": "Rock Sugar" } } },
      { name: "桂花", amount: "1茶匙", category: "other", i18n: { name: { "zh-CN": "桂花", "en-US": "Dried Osmanthus" }, amount: { "zh-CN": "1茶匙", "en-US": "1 tsp" } } },
    ],
    difficultyKey: "dish.medium",
    time: "50分钟",
    calories: "90千卡/杯",
  },
  {
    id: 51,
    categoryId: 8,
    name: "热可可",
    image: "",
    emoji: "☕",
    description: "丝滑浓郁，冬日治愈",
    practice:
      "可可粉糖加少量牛奶搅成酱；剩余牛奶小火加热；倒入可可酱搅匀；煮至微沸关火；倒入杯中撒可可粉",
    i18n: {
      name: { "zh-CN": "热可可", "en-US": "Hot Cocoa" },
      description: {
        "zh-CN": "丝滑浓郁，冬日治愈",
        "en-US": "Silky rich cocoa for cold winter days",
      },
      practice: {
        "zh-CN":
          "可可粉糖加少量牛奶搅成酱；剩余牛奶小火加热；倒入可可酱搅匀；煮至微沸关火；倒入杯中撒可可粉",
        "en-US": "Whisk cocoa powder and sugar with a splash of milk into a paste; Warm the rest of the milk gently; Stir in the cocoa paste; Heat until steaming, not boiling; Pour and dust with cocoa powder",
      },
      time: { "zh-CN": "10分钟", "en-US": "10 min" },
      calories: { "zh-CN": "150千卡/杯", "en-US": "150 kcal/cup" },
    },
    ingredients: [
      { name: "可可粉", amount: "2勺", category: "other", i18n: { name: { "zh-CN": "可可粉", "en-US": "Cocoa Powder" }, amount: { "zh-CN": "2勺", "en-US": "2 tbsp" } } },
      { name: "牛奶", amount: "300ml", category: "other", i18n: { name: { "zh-CN": "牛奶", "en-US": "Milk" } } },
      { name: "糖", amount: "1勺", category: "seasoning", i18n: { name: { "zh-CN": "糖", "en-US": "Sugar" }, amount: { "zh-CN": "1勺", "en-US": "1 tbsp" } } },
      { name: "棉花糖", amount: "适量", category: "other", i18n: { name: { "zh-CN": "棉花糖", "en-US": "Marshmallows" }, amount: { "zh-CN": "适量", "en-US": "to taste" } } },
    ],
    difficultyKey: "dish.simple",
    time: "10分钟",
    calories: "150千卡/杯",
  },
];
