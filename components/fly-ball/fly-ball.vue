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

const FLY_DURATION = 560;
const CLEANUP_DELAY = FLY_DURATION + 120;
const START_FRAME_DELAY = 40;

let seq = 0;
const balls = ref([]);

const outerStyle = (ball) => ({
  left: `${ball.startX}px`,
  top: `${ball.startY}px`,
  transform: ball.go ? `translate3d(${ball.dx}px, 0, 0)` : "translate3d(0, 0, 0)",
});

const innerStyle = (ball) => ({
  transform: ball.go
    ? `translate3d(0, ${ball.dy}px, 0) scale(0.25)`
    : "translate3d(0, 0, 0) scale(1)",
  opacity: ball.go ? 0.2 : 1,
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
    go: false,
  });
  setTimeout(() => {
    const ball = balls.value.find((entry) => entry.id === id);
    if (ball) ball.go = true;
  }, START_FRAME_DELAY);
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

.fly-ball-outer {
  position: fixed;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  transition: transform 0.56s linear;
  will-change: transform;
}

.fly-ball-inner {
  width: 32rpx;
  height: 32rpx;
  margin: -16rpx 0 0 -16rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff6b6b, #ff8e53);
  box-shadow: 0 4rpx 12rpx rgba(255, 107, 107, 0.45);
  transition:
    transform 0.56s cubic-bezier(0.55, 0.06, 0.68, 0.19),
    opacity 0.56s ease-in;
  will-change: transform, opacity;
}
</style>
