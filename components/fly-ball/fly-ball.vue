<template>
  <view class="fly-layer">
    <view
      v-for="ball in balls"
      :key="ball.id"
      class="fly-ball-outer"
      :style="outerStyle(ball)"
    >
      <view class="fly-ball-inner" :style="innerStyle(ball)" />
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";

const FLY_DURATION = 600;
const CLEANUP_DELAY = FLY_DURATION + 120;

let seq = 0;
const balls = ref([]);

// 目标态由内联 transform 提供，keyframes 只写 from：
// 元素插入即按动画起飞，免去两段式 transition 的初始渲染等待
const outerStyle = (ball) => ({
  left: `${ball.startX}px`,
  top: `${ball.startY}px`,
  transform: `translate3d(${ball.dx}px, 0, 0)`,
});

const innerStyle = (ball) => ({
  transform: `translate3d(0, ${ball.dy}px, 0) scale(0.25)`,
  opacity: 0,
});

const fly = (startX, startY, endX, endY) => {
  if (
    [startX, startY, endX, endY].some(
      (value) => typeof value !== "number" || Number.isNaN(value),
    )
  ) {
    return;
  }
  const id = ++seq;
  balls.value.push({
    id,
    startX,
    startY,
    dx: endX - startX,
    dy: endY - startY,
  });
  setTimeout(() => {
    balls.value = balls.value.filter((entry) => entry.id !== id);
  }, CLEANUP_DELAY);
};

defineExpose({ fly });
</script>

<style scoped>
.fly-layer {
  position: fixed;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  z-index: 9999;
  pointer-events: none;
}

/* X 轴 ease-out：起步快速横甩、末端减速；Y 轴 ease-in：末端加速下坠，
   合成"抛入购物车"的弧线。全部 transform/opacity 合成层动画 */
.fly-ball-outer {
  position: fixed;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  animation: fly-x 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both;
  will-change: transform;
}

@keyframes fly-x {
  from {
    transform: translate3d(0, 0, 0);
  }
}

.fly-ball-inner {
  width: 32rpx;
  height: 32rpx;
  margin: -16rpx 0 0 -16rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff6b6b, #ff8e53);
  box-shadow: 0 4rpx 12rpx rgba(255, 107, 107, 0.45);
  animation:
    fly-y 0.6s cubic-bezier(0.55, 0.06, 0.68, 0.19) both,
    fly-fade 0.6s cubic-bezier(0.45, 0, 0.85, 0.4) both;
  will-change: transform, opacity;
}

@keyframes fly-y {
  from {
    transform: translate3d(0, 0, 0) scale(1);
  }
}

/* 淡出到 0（此前只降到 0.2 即移除，会有 pop 感） */
@keyframes fly-fade {
  from {
    opacity: 1;
  }
}
</style>
