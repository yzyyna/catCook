# 家庭菜单小程序设计方案

## 项目概述

一个面向家庭的微信小程序，帮助家庭成员选择菜品、管理购物清单、分享采购信息。

## 核心功能

1. 菜品浏览 - 左侧分类导航，右侧菜品列表
2. 菜品详情 - 查看图片、做法、食材
3. 购物车管理 - 添加、删除、修改数量
4. 食材汇总 - 自动合并相同食材
5. 分享功能 - 分享采购清单给家人
6. 收藏和历史 - 个性化功能

## 页面结构

### 1. 首页 (pages/index/index)

**布局设计：**

- 左侧：分类导航栏（固定宽度 90px）
- 右侧：菜品列表（自适应宽度）
- 顶部：搜索框
- 底部：购物车悬浮按钮

**交互设计：**

- 点击分类切换右侧菜品
- 点击菜品卡片跳转详情页
- 点击搜索框跳转搜索页
- 长按菜品卡片显示快捷操作（收藏、加入购物车）

**数据流：**

```
用户操作 → 选择分类 → 筛选菜品 → 渲染列表
         → 点击菜品 → 记录浏览历史 → 跳转详情
```

### 2. 详情页 (pages/detail/detail)

**布局设计：**

- 顶部：菜品大图（轮播）
- 中部：菜品信息（名称、描述、难度、时间、热量）
- 下部：食材列表（可折叠）
- 底部：固定操作栏（收藏、加入购物车）

**交互设计：**

- 图片支持放大预览
- 食材列表点击可标记已购买
- 加入购物车动画效果
- 收藏状态实时更新

### 3. 购物车页 (pages/cart/cart)

**布局设计：**

- 顶部：购物车统计（菜品数量、预估价格）
- 中部：购物车列表（分组显示）
- 底部：操作栏（全选、删除、生成采购清单、分享）

**交互设计：**

- 滑动删除菜品
- 数量增减动画
- 批量操作（全选、删除）
- 生成采购清单跳转

### 4. 采购清单页 (pages/shopping/shopping)

**布局设计：**

- 顶部：清单概览（菜品数量、食材种类）
- 中部：食材清单（按类别分组）
  - 蔬菜类
  - 肉类
  - 调料类
  - 其他
- 底部：分享按钮

**核心逻辑：**

```javascript
食材汇总算法：
1. 遍历购物车所有菜品
2. 提取每个菜品的食材信息
3. 按食材名称合并相同食材
4. 记录该食材被哪些菜品使用
5. 按类别分组展示
```

**数据结构示例：**

```javascript
{
  name: '五花肉',
  amounts: ['500g', '300g'],  // 来自不同菜品的用量
  dishes: ['红烧肉', '糖醋排骨'],  // 使用该食材的菜品
  category: '肉类'
}
```

### 5. 搜索页 (pages/search/search)

**布局设计：**

- 顶部：搜索输入框（自定义导航栏）
- 中部：搜索结果列表
- 底部：搜索历史（可清空）

**搜索功能：**

- 支持菜品名称搜索
- 支持食材搜索
- 支持做法关键词搜索
- 实时搜索建议

### 6. 收藏页 (pages/favorite/favorite)

**布局设计：**

- 顶部：收藏统计
- 中部：收藏列表（网格布局）
- 空状态：引导添加收藏

### 7. 历史页 (pages/history/history)

**布局设计：**

- 顶部：清空历史按钮
- 中部：历史列表（时间倒序）
- 每条记录显示：菜品缩略图、名称、浏览时间

## 架构设计（2026-07 重构）

### 设计令牌（App.vue 全局 CSS 变量）

- 主色 `--primary: #FF6B6B`，渐变 `--gradient-primary: 135deg #FF6B6B→#FF8E53`
- 辅色 `--accent: #4ECDC4`；背景 `--bg: #F7F6F3`（米白）；卡片白
- 文字 `#2A2A2A / #5A5A5A / #8A8A8A / #BFBFBF` 四级
- 卡片圆角 20rpx、柔和阴影；所有文本容器 `min-width:0` + 省略/clamp，保证中英文切换不溢出

### 状态层（Pinia 为运行时唯一事实源，storage 为持久层）

- `stores/cart.js`：购物车 items + selectedIds；默认全选；变更即持久化并同步 tabBar 角标（index 1，启动时 tabBar 未就绪会自动重试，数量 0 移除角标，超 99 显示 99+）
- `stores/favorites.js`：收藏 items；`isFavorite(id)` 实时驱动心形态
- App onLaunch 载入；页面 onShow 调 `load()` 重新按当前语言归一化名称（保留选中态）

### 公共组件（components/，easycom 自动注册）

- `dish-card`：统一菜品卡（封面/名单行省略/描述两行 clamp/元信息胶囊），插槽 `leading`（勾选圈）、`actions`（步进器/心形）、`footer`
- `quantity-stepper`：美团式 − n +；0 时仅显示渐变 + 圆钮
- `empty-state`：统一空态（图标圆盘 + 标题 + 提示 + 渐变主按钮）

### 页面要点

- 首页：问候头 + 定宽语言 pill（🌐 中/EN）、搜索卡、今日推荐渐变横幅（按日轮换）、最近浏览横滑、分类侧栏（176rpx，选中渐变指示条）、底部黑色悬浮结算条直达采购清单
- 购物车：CSS 圆形勾选（非 emoji）、默认全选、步进器改份数、仅选中项进入清单
- 详情：hero 大图 + 上叠信息卡、三宫格统计、食材清单行、做法自动分步编号、底部收藏 + 加购/步进器切换
- 采购清单：食材带 `category` 字段（数据驱动分组，替代关键词硬编码）；已购勾选持久化 `catcook_shopping_checked`（按食材原始名 key，跨语言有效）；顶部进度条；复制文本含勾选态
- 搜索：200ms 防抖实时搜索、热门搜索 chip（各分类首菜）、历史 chip 流式布局

### 食材分组字段

`dishes.js` 每个食材含 `category: "vegetable" | "meat" | "seasoning" | "other"`；本地化后保留原始中文名为 `key`，汇总/已购均按 key 合并与持久化。

### 动效体系（2026-07-21，2026-09-27 修正坐标系）

- 页面进入：全局 `.page` 淡入上浮 0.28s（keyframes 只写 from）。**fill-mode 必须用 `backwards`**：`both/forwards` 会让部分浏览器在动画结束后残留恒等 transform，使 `.page` 成为 fixed 后代（结算条、fly-ball）的包含块，导致定位整体偏移 44px（H5 导航栏高度）
- 页面高度：`.page` 用 `calc(100vh - var(--window-top) - var(--window-bottom))`，H5 端扣除导航栏与 tabBar（MP 端变量回退 0，仍为 100vh），避免内容超高被裁剪
- 列表卡片：`dish-card` 按 index 错峰入场（45ms × 序号，上限 8 级）
- 加购抛物线：`fly-ball` 组件双轴缓动（X ease-out 快甩 + Y ease-in 下坠，0.6s；opacity 淡出至 0 避免 pop 感），全部 transform/opacity 合成层动画保证 60fps。实现要点：**from-only keyframes + 内联 transform 作隐式终点**，元素插入即起飞，无需两段式 transition 的初始渲染等待；隐式 to 会正确读取内联 transform（含 Vue :style 绑定）。坐标统一用**视口坐标系**：起点经 `utils/event.js` 的 `extractTouchPoint()`（changedTouches.clientX 优先，兼容 MP tap / H5 MouseEvent / 合成事件）；终点经 `measureViewportAnchor()`（H5 用原生 `getBoundingClientRect`，MP 用 `uni.createSelectorQuery`——H5 端 uni 查询返回的是页面内容区坐标，与视口相差一个导航栏高度，不能混用）；锚点就绪立即起飞（H5 同步测量 ≈0 延迟），未就绪短间隔重试后兜底

### 内容与体验增强（2026-09）

- **菜谱库扩至 51 道**：新增 `data/dishes-extra.js`（42 道双语文真实食谱），`dishes.js` 保留原 9 道（含本地图）并拼接导出 `dishes = [...baseDishes, ...moreDishes]`；全部菜品含内嵌 i18n（名称/描述/做法/时间/热量）与食材 `category` 字段
- **无图封面兜底**：新组件 `dish-cover`（easycom）——有图显示图（加载失败仅降级显示，不删数据），无图显示按分类着色的柔和渐变 + emoji（`dish.emoji` 优先，回退分类 icon），装饰圆避免空洞；emoji 大小经 CSS 变量 `--cover-emoji-size` 由宿主控制；已接入 dish-card、首页今日推荐/最近浏览、详情页 hero
- **食材用量双语**：食材 `i18n.amount` 可选字段（如 2勺→2 tbsp、适量→to taste），`getIngredientAmount()` 缺省回退原值，旧数据零改动兼容
- **首页**：新增"全部"虚拟分类（默认选中，展示全库）+ 每分类菜品计数徽标；问候语按时段切换（早/午/晚）；结算条 `bottom: calc(24rpx + var(--window-bottom))` 修复 H5 端被 tabBar 遮挡
- **详情页**：新增"相关推荐"横滑区（同分类其余菜品，redirectTo 跳转）；菜品数据改为按语言 computed 求值，切语言即时刷新；新增 `onShareAppMessage`（详情/首页/采购清单）
- **搜索**：新增结果计数文案（含单数分支 `resultCountOne`）
- **i18n 插值修复**：vue-i18n 11 会吞掉 `t()` 返回串中的 `{count}` 占位符，全部 `formatMessage(t(key), params)` 写法改为原生 `t(key, params)`；英文单复数采用数字无关文案（"{count} in total"）
- **英文排版**：侧栏分类名 `word-break: keep-all` + 缩小字号，禁止 Vegetarian 之类的断词；今日推荐名称改为自然换行，避免英文断在词中
- **旧菜谱用量双语补齐**：基础 9 道菜 35 处中文单位用量补上 `i18n.amount`（2勺→2 tbsp、1条→1 whole、适量→to taste 等），与扩充数据格式统一；zh 视图原样、en 视图自动翻译
- **采购清单分享按钮**：微信小程序端用 `<button open-type="share">` 触发 `onShareAppMessage`（`uni.share` 仅 App 端可用），其他平台条件编译保持原逻辑；tabBar 购物车角标随数量实时增减

### 交互细节打磨（2026-09 第二批）

- **分类切换回顶**：切换分类后右侧列表回顶部。两端实现分派——H5 端不向 scroll-view 传 `scroll-top`（传 undefined 让组件不干预用户滚动，避免无关重渲染拉顶），nextTick + 60ms 双保险置原生 `scrollTop=0` 并派发 `scroll` 事件同步组件内部状态；MP 端用 scroll-top prop 0↔0.01 交替驱动（原生组件不会因无关重渲染拉回）。注意 H5 真实滚动层是嵌套 div 中 `overflow-y: auto` 的那层
- **结算条入场动画**：`bar-in`（opacity + 中心 scale 0.94→1）——用中心缩放而非 translateY，避免扰动飞球锚点的测量位置；瞬态 fixed 元素可安全用 both fill
- **全站按压反馈**：`hover-class` 体系——卡片 `hv-scale`（scale 0.98）、按钮/文字 `hv-dim`（opacity 0.72），覆盖菜品卡、今日推荐、分类项、搜索框、结算条、详情底栏、清单/购物车按钮、空态按钮、搜索 chips；dish-card 的 `card-in` 动画 fill 改 backwards，解除 fill 残留 transform 对 hover 的压制
- **详情页大图预览**：hero 图点击 `uni.previewImage`（有实拍图时）；无效 id 渲染 empty-state + 返回按钮（替代原 loading 死页）
- **图片懒加载**：dish-cover 内 image 加 `lazy-load`
- **搜索空结果推荐**：无结果时在空态下方展示热门搜索 chips（各分类首菜，点击直接填词搜索）
- **勾选打勾动画**：购物车/收藏/采购清单的勾选圈 `check-pop`（0.82→1.1→1 弹性）

### 全面走查修复与打磨（2026-10）

- **双重下拉刷新冲突**：首页原先同时开启页面级 `enablePullDownRefresh` 与 scroll-view `refresher-enabled`，微信端两套刷新并存且页面级未接 `onPullDownRefresh`/`stopPullDownRefresh`；已移除页面级配置，统一走 scroll-view 自定义刷新（`@refresherrefresh` + `refreshing` 500ms）
- **搜索页键盘重复弹出**：input 静态 `focus` 导致从详情返回时键盘再次弹出；改为 `:focus="inputFocused"` 绑定，`onHide` 置 false（首次进入仍自动聚焦）
- **收藏页选中态残留**：`selectedIds` 在 onShow 不清理，去详情页取消收藏返回后计数虚高、`allSelected` 误判；onShow 按当前列表 prune（与购物车 store 的 load 对齐）
- **H5 分享降级**：`uni.share` 仅 App 端可用，采购清单 H5 端点击分享必失败；`fail` 回调降级为复制清单文本（抽出 `buildShareText()` 复用）
- **步进器定时器清理**：`quantity-stepper` 卸载时清理 `animating` 回置定时器（`onUnmounted`）
- **取消收藏交互统一**：收藏页心形按钮由「每次弹确认框」改为即时取消 + toast，与详情页/历史页一致；批量删除仍保留确认框
- **空态/提示文案**：新增 `empty.goBrowse`（空态主按钮，替换语义不当的 `noDataTip`）、`common.selectFirst`（未勾选提示，替换语义不明的「选择」）、`share.homeTitle`（首页分享标题）、`dish.noImage`（详情页无图 hero 点击反馈）；中英语言包同步新增
- **英文排版防截断**：详情页收藏按钮加宽至 144rpx 且文案允许换行（"Unfavorite" 不再被省略号截断）；采购清单概览标签、食材来源行由 nowrap 省略改为完整换行展示
- **按压反馈补齐**：语言 pill、搜索取消/清除（触达区域加大）、历史清空、收藏/历史心形、购物车删除链接统一 `hv-dim`；各列表（购物车/收藏/搜索/历史）补传 `:index` 启用错峰入场
- **tabBar 分割线**：`borderStyle` black → white，与柔和米白设计协调（内容区与 tabBar 有背景色差分界）
- **清理死代码**：收藏页从未赋值的 `animatingId` 状态及对应 `.animating` 样式移除

### 第二轮优化（2026-10）

- **语言切换入口扩展**：抽出公共组件 `components/lang-pill`（首页原 pill 逻辑迁入，内部完成 `toggleLanguage` + `syncGlobalI18nUI` 并派发 `change` 事件供页面按需刷新），接入购物车/收藏/历史页头部——此前只有首页能切语言，其他页面用户会困在错误语言里；菜品名/难度/时间等经 i18n getter 响应 locale，切语言即时刷新无需重载
- **批量操作禁用态**：购物车「删除选中/生成清单」、收藏「删除选中」在无可勾选项时置灰（opacity 0.45），把「点了才弹提示」变为「可见即知不可用」；toast 兜底保留
- **搜索体验**：点击热门/历史 chip 后 `uni.hideKeyboard()` 收起键盘
- **采购清单分组图标**：分组标题前加类别 emoji（🥬 蔬菜 / 🥩 肉类 / 🧂 调料 / 🍽️ 其他），便于扫视定位
- **分类侧栏 scroll-into-view**：首页侧栏加 `scroll-into-view` + `scroll-with-animation`，切换分类时自动把选中项滚入可见区域，小屏（侧栏装不下 9 个分类）不再点不到下方分类
- **存储健壮性**：`getSearchHistory` / `getShoppingChecked` 加 `Array.isArray` 防御，脏数据按空数组兜底
- **死代码清理**：`dish-card` 的 `showCalories` prop（从未有页面传入）、`utils/i18n.js` 的 `formatMessage`（AGENTS.md 明确的占位符反模式）与 `useAppI18n`（无调用方）、`stores/app.js` 的 `getAppName/getLanguage/getSupportedLanguages/getCurrentLanguageInfo` getters 与 `setAppName`/`appName`（均无引用）

### 第三轮优化（2026-10）

- **触达热区加大**：`quantity-stepper` 圆钮 48rpx→56rpx、勾选圈 42rpx→48rpx（原约 21–24pt，低于 comfortable touch 区间），列表行内点击更稳
- **空态垂直居中**：`empty-state` 加 `flex: 1` 撑满 `.page` 剩余空间，购物车/收藏/历史/采购清单/详情失败态由贴顶改为垂直居中；嵌入滚动区或块级容器时该属性自然失效，不影响搜索页空结果布局
- **详情页导航栏标题动态化**：onShow 在 `syncGlobalI18nUI()` 后把标题覆写为当前菜名（`getDishName`），无数据时保留语言包「菜品详情」兜底
- **采购清单重置勾选**：进度行右侧新增「重置勾选」入口（`shopping.resetChecked`，仅在有已购项时出现），避免逐条点击取消；清空即写存储

### 第四轮优化（2026-10）

- **购物车默认全选修复**：设计文档与代码此前不一致——`selectedIds` 初始为空，首次进购物车所有批量按钮都是灰的，而采购清单页又用 `selectedCount > 0 ? selected : all` 兜底显示全部。现按设计实现默认全选：`load()` 在 `selectionTouched === false` 时全选，用户任一勾选操作（单选/全选/删除）置 `selectionTouched = true`，此后只做失效项清理，不再覆盖用户意图；新增菜品在用户已手动整理过勾选时自动勾选，重复加购不改变勾选态
- **清单用量按份数放大**：原 `getIngredientSummary` 完全忽略 `quantity`——2 份红烧肉仍显示 500g 五花肉，采购会买少。新增 `scaleAmount(amount, quantity)`：仅处理「数字 + 单位」（500g / 2勺 / 110ml），「适量 / 少许 / to taste」等模糊用量原样返回，解析失败也原样返回不丢信息；浮点误差按 2 位精度取整
- **清理模板残留**：删除根目录 HBuilderX 初始化模板 `index.vue`（Hello 示例页，无任何引用，容易误认为入口）
- **按压反馈补齐（第二批）**：购物车/收藏底部「全选」、收藏「删除选中」按钮

### 第五轮优化（2026-10）

- **双语全域检索**：`dataService.searchDishes` 检索池扩充至全部中英文字段（`dish.name`, `dish.i18n.name.en-US`, 做法, 描述, 所有食材中英文名），不再受当前界面语言限制。中英文混合搜索 100% 命中，并统一返回 `.map(localizeDish)` 本地化结果
- **封面加载失败状态防污染**：`dish-cover` 增加对 `props.dish.id` 和 `props.dish.image` 的 watch，在卡片复用或菜品切换时重置 `loadFailed = false`，防止上一道菜图片加载失败导致新菜有效图片被屏蔽
- **语言切换集中联动全局 Store**：`lang-pill` 点击时集中调用 `cartStore.load()` 和 `favoritesStore.load()`，使任意页面切语言时购物车与收藏夹的内存数据即刻同步中英文状态
- **详情页浮动语言切换与标题联动**：菜品大图右上角放置浮动 `lang-pill`（`@click.stop`），并配合 `watch(() => appStore.language)` 动态更新顶部导航栏为新语言菜名，看菜谱时无需退出页面即可中英秒切
- **采购清单体验统一**：顶部补齐 `<view class="header">` 与 `lang-pill`，四工具/列表页视觉架构统一；`ingredientSummary` 绑定语言响应
- **触觉与交互反馈**：首页/收藏/历史长按菜品卡片弹出 ActionSheet 前触发 `uni.vibrateShort({ type: 'light' })`；历史页切换语言自动重载相对时间；搜索页热门菜品 Chip 补齐 `hv-dim` 按压反馈

### 第六轮：审查风险修复（2026-11）

- **清单严格按选中项生成**：移除 `selectedItems` 为空时回退展示全部购物车的逻辑，与「仅选中项进入清单」语义一致；空态提示改为「去购物车勾选（`empty.goCart`）」，按钮跳转购物车
- **首页结算条守卫对齐**：未勾选任何菜品时 toast 提示并跳转购物车，避免进入空清单
- **H5 分享安全降级**：`uni.share` 为 App 专属 API，调用前加 `typeof` 守卫，未实现端直接复制清单文本，避免 TypeError 吞掉兜底
- **空态页保留语言入口**：购物车/收藏/采购清单的 header 从 `v-if` 内提到页面顶层，空态时仍可切换语言
- **详情页标题单一出口**：`PAGE_TITLE_MAP` 移除详情页映射，标题统一由 `syncDetailTitle()` 管理（有菜名显示菜名，无数据回退语言包），消除 `syncGlobalI18nUI` 与页面 watch 的抢写
- **历史页绝对日期本地化**：超过 7 天的日期按 `appStore.language` 传入 `toLocaleDateString` 的 locale，中英一致
- **英文用量单复数**：`scaleAmount` 增加英文计数单位复数化（1 box → 2 boxes、1 handful → 2 handfuls；tbsp/tsp/whole 保持原形）
- **组件内按压类兜底**：`dish-card`/`empty-state`/`lang-pill` 各自补充 `hv-scale`/`hv-dim` 定义，规避微信小程序组件样式隔离导致的全局类失效
- **文档校正**：移除 AGENTS.md 中已删除的 `pages/index/index.js` 遗留说明，补充 `lang-pill` 目录与分享/选中守卫说明

### 份数语义（重要）

`quantity` 在三个地方语义一致：购物车角标与 `totalCount` 累加份数；采购清单「菜品数量」累加份数；食材用量按份数放大。因此 1 道菜 × 2 份在清单里记 2 道菜、食材量翻倍，与用户「买两份」的预期一致。

## 数据存储设计

### 本地存储结构

```javascript
// 购物车
{
  key: 'catcook_cart',
  value: [
    {
      id: 1,
      name: '红烧肉',
      quantity: 2,
      addTime: 1234567890,
      ...dishData
    }
  ]
}

// 收藏
{
  key: 'catcook_favorites',
  value: [
    {
      id: 1,
      addTime: 1234567890,
      ...dishData
    }
  ]
}

// 浏览历史
{
  key: 'catcook_history',
  value: [
    {
      id: 1,
      viewTime: 1234567890,
      ...dishData
    }
  ]
}
```

### 静态数据结构

```javascript
// 分类
{
  id: 1,
  name: '家常菜',
  icon: '🍲'
}

// 菜品
{
  id: 1,
  categoryId: 1,
  name: '红烧肉',
  image: '/static/images/dishes/hongshaorou.jpg',
  description: '肥而不腻，入口即化',
  practice: '五花肉切块焯水...',
  ingredients: [
    { name: '五花肉', amount: '500g' },
    { name: '冰糖', amount: '30g' }
  ],
  difficulty: '简单',
  time: '60分钟',
  calories: '450千卡/100g'
}
```

## 核心功能流程

### 1. 菜品选择流程

```
用户进入首页
  ↓
浏览分类或搜索
  ↓
查看菜品列表
  ↓
点击菜品查看详情
  ↓
点击"加入购物车"
  ↓
购物车数量+1
  ↓
继续浏览或去购物车
```

### 2. 采购清单生成流程

```
用户进入购物车
  ↓
查看已选菜品
  ↓
点击"生成采购清单"
  ↓
系统自动汇总食材
  ↓
按类别分组展示
  ↓
用户核对清单
  ↓
点击"分享"或"导出"
```

### 3. 分享功能流程

```
用户在采购清单页
  ↓
点击"分享"按钮
  ↓
生成分享数据
  ↓
调用微信分享接口
  ↓
选择分享对象
  ↓
对方打开查看清单
```

## 分享功能设计

### 分享内容格式

```javascript
{
  title: '家庭菜单采购清单',
  desc: '老婆选了3道菜，需要购买15种食材',
  path: '/pages/shopping/shopping?data=xxx',
  imageUrl: '/static/images/share-cover.jpg',
  data: {
    dishes: [
      { name: '红烧肉', quantity: 1 },
      { name: '番茄炒蛋', quantity: 2 }
    ],
    ingredients: [
      {
        name: '五花肉',
        amounts: ['500g'],
        dishes: ['红烧肉'],
        category: '肉类'
      }
    ],
    totalCount: 3,
    generateTime: '2024-01-15 18:30:00'
  }
}
```

### 分享场景

1. **微信好友** - 直接分享给家人
2. **微信群** - 分享到家庭群
3. **朋友圈** - 分享采购成果（可选）

### 分享后的展示

- 接收方点击分享链接
- 打开采购清单页
- 显示完整的菜品和食材信息
- 可以直接使用该清单购物

## UI/UX 设计亮点

### 1. 视觉设计

- **配色方案**：
  - 主色：#FF6B6B（温暖橙色）
  - 辅色：#4ECDC4（清新绿色）
  - 背景色：#F5F5F5（浅灰）
  - 文字色：#333333（深灰）

- **字体规范**：
  - 标题：18px，加粗
  - 正文：14px，常规
  - 辅助文字：12px，灰色

### 2. 交互设计

- **微动画**：
  - 加入购物车时的飞入动画
  - 数量增减时的缩放动画
  - 页面切换时的滑动过渡

- **反馈机制**：
  - 加入购物车成功提示
  - 收藏状态变化动画
  - 长按震动反馈

### 3. 用户体验优化

- **离线可用**：所有数据本地存储
- **快速操作**：长按快捷菜单
- **智能推荐**：基于浏览历史推荐
- **一键分享**：快速生成采购清单

## 技术实现要点

### 1. 状态管理

使用 Pinia 管理全局状态：

- 购物车状态
- 收藏状态
- 当前分类
- 搜索关键词

### 2. 国际化

使用 vue-i18n 支持多语言：

- 中文（默认）
- 英文（可选）

### 3. 性能优化

- 图片懒加载
- 列表虚拟滚动
- 防抖搜索
- 缓存策略

### 4. 兼容性

- 支持微信小程序
- 支持不同屏幕尺寸
- 支持深色模式（可选）

## 扩展功能（未来规划）

1. **菜品评分** - 用户可以对菜品评分
2. **营养分析** - 计算菜品的营养成分
3. **智能推荐** - 基于历史推荐菜品
4. **菜谱编辑** - 用户可以添加自定义菜品
5. **云端同步** - 多设备数据同步
6. **家庭共享** - 家庭成员共享购物车
7. **提醒功能** - 采购提醒、烹饪提醒
8. **语音搜索** - 语音输入搜索菜品

## 开发计划

### 阶段一：核心功能（当前）

- [x] 数据结构设计
- [x] 页面路由配置
- [ ] 首页开发
- [ ] 详情页开发
- [ ] 购物车开发
- [ ] 采购清单开发

### 阶段二：辅助功能

- [ ] 搜索功能
- [ ] 收藏功能
- [ ] 历史功能
- [ ] 分享功能

### 阶段三：优化完善

- [ ] UI 细节优化
- [ ] 性能优化
- [ ] 用户体验优化
- [ ] 测试和修复

## 总结

本设计方案围绕"家庭菜单"这一核心场景，提供了完整的菜品浏览、购物车管理、食材汇总和分享功能。通过本地存储实现离线可用，通过智能汇总提升采购效率，通过分享功能促进家庭协作。整体设计注重用户体验，界面简洁美观，操作流畅便捷。
