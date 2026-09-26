// 从点击/触摸事件中提取视口坐标，供 fly-ball 抛物线动画使用。
// 兼容三种事件形态：小程序 tap（changedTouches）、H5 原生 MouseEvent（clientX）、
// uni-app 合成事件（detail.x/y，页面坐标）。小程序页面本身不滚动时页面坐标与视口一致。
export function extractTouchPoint(event) {
  const touch = event?.changedTouches?.[0] || event?.touches?.[0];
  if (touch && typeof touch.clientX === "number") {
    return { x: touch.clientX, y: touch.clientY };
  }
  if (typeof event?.clientX === "number") {
    return { x: event.clientX, y: event.clientY };
  }
  if (typeof event?.detail?.x === "number") {
    return { x: event.detail.x, y: event.detail.y };
  }
  return null;
}

// 测量锚点元素相对视口的中心坐标，返回 Promise<{x, y} | null>。
// 注意：H5 端 uni.createSelectorQuery().boundingClientRect 返回的是页面内容区
// 坐标（不含顶部导航栏），与触摸事件的视口坐标相差一个导航栏高度；因此 H5
// 直接用原生 getBoundingClientRect，小程序端 fixed 层与 boundingClientRect
// 同属页面坐标系，用 uni API 即可。
export function measureViewportAnchor(selector) {
  return new Promise((resolve) => {
    // #ifdef H5
    try {
      const el = document.querySelector(selector);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (typeof rect.left === "number") {
          resolve({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          });
          return;
        }
      }
    } catch (e) {
      // 查询失败走 null 兜底
    }
    resolve(null);
    // #endif
    // #ifndef H5
    uni
      .createSelectorQuery()
      .select(selector)
      .boundingClientRect((rect) => {
        if (rect && typeof rect.left === "number") {
          resolve({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          });
        } else {
          resolve(null);
        }
      })
      .exec();
    // #endif
  });
}
