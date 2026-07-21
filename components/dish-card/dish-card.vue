<template>
  <view
    class="dish-card"
    :class="{ selected }"
    :style="{ animationDelay: `${Math.min(index, 8) * 45}ms` }"
    @click="emit('click', dish)"
    @longpress="emit('longpress', dish)"
  >
    <view v-if="$slots.leading" class="card-leading" @click.stop>
      <slot name="leading" />
    </view>
    <view class="card-cover">
      <image class="card-image" :src="dish.image" mode="aspectFill" />
    </view>
    <view class="card-body">
      <text class="card-name">{{ getDishName(dish) }}</text>
      <text class="card-desc">{{ getDishDescription(dish) }}</text>
      <view class="card-meta">
        <text class="meta-tag">{{ getDifficultyLabel(dish) }}</text>
        <text class="meta-tag">{{ getDishTime(dish) }}</text>
        <text v-if="showCalories" class="meta-tag">{{
          getDishCalories(dish)
        }}</text>
      </view>
      <slot name="footer" />
    </view>
    <view v-if="$slots.actions" class="card-actions" @click.stop>
      <slot name="actions" />
    </view>
  </view>
</template>

<script setup>
import {
  getDifficultyLabel,
  getDishCalories,
  getDishDescription,
  getDishName,
  getDishTime,
} from "@/utils/i18n";

const props = defineProps({
  dish: {
    type: Object,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
  showCalories: {
    type: Boolean,
    default: false,
  },
  index: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["click", "longpress"]);
</script>

<style scoped>
.dish-card {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 20rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);
  box-sizing: border-box;
  overflow: hidden;
  animation: card-in 0.32s cubic-bezier(0.22, 0.61, 0.36, 1) both;
}

@keyframes card-in {
  from {
    opacity: 0;
    transform: translateY(18rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dish-card.selected {
  background-color: #fff7f4;
  box-shadow: 0 6rpx 18rpx rgba(255, 107, 107, 0.12);
}

.card-leading {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-right: 16rpx;
}

.card-cover {
  width: 176rpx;
  height: 176rpx;
  flex-shrink: 0;
  border-radius: 14rpx;
  overflow: hidden;
  background-color: #f0ece6;
}

.card-image {
  width: 100%;
  height: 100%;
}

.card-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  margin-left: 20rpx;
}

.card-name {
  font-size: 31rpx;
  font-weight: 600;
  color: #2a2a2a;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-desc {
  margin-top: 8rpx;
  font-size: 24rpx;
  color: #8a8a8a;
  line-height: 1.45;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-word;
}

.card-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
  margin-top: 12rpx;
}

.meta-tag {
  font-size: 20rpx;
  color: #a0928b;
  padding: 4rpx 14rpx;
  background-color: #f7f3ef;
  border-radius: 999rpx;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  flex-shrink: 0;
  margin-left: 16rpx;
}
</style>
