<template>
  <view
    class="dish-card"
    :class="{ selected }"
    :style="{ animationDelay: `${Math.min(index, 8) * 45}ms` }"
    hover-class="hv-scale"
    :hover-stay-time="80"
    @click="emit('click', dish)"
    @longpress="emit('longpress', dish)"
  >
    <view v-if="$slots.leading" class="card-leading" @click.stop>
      <slot name="leading" />
    </view>
    <view class="card-cover">
      <dish-cover :dish="dish" />
    </view>
    <view class="card-body">
      <text class="card-name">{{ getDishName(dish) }}</text>
      <text class="card-desc">{{ getDishDescription(dish) }}</text>
      <view v-if="cardTags.length > 0" class="card-tags">
        <text v-for="tag in cardTags" :key="tag" class="card-tag">{{
          tag
        }}</text>
      </view>
      <view class="card-meta">
        <text class="meta-tag">{{ getDifficultyLabel(dish) }}</text>
        <text class="meta-tag">{{ getDishTime(dish) }}</text>
      </view>
      <slot name="footer" />
    </view>
    <view v-if="$slots.actions" class="card-actions" @click.stop>
      <slot name="actions" />
    </view>
  </view>
</template>

<script setup>
import { computed } from "vue";
import {
  getDifficultyLabel,
  getDishDescription,
  getDishName,
  getDishTags,
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
  index: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["click", "longpress"]);

// 卡片最多展示 2 个特色标签，避免信息过载
const cardTags = computed(() => getDishTags(props.dish).slice(0, 2));
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
  /* backwards：动画结束还原，避免 fill 残留 transform 压制 hover 按压效果 */
  animation: card-in 0.32s cubic-bezier(0.22, 0.61, 0.36, 1) backwards;
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
  /* 英文菜名较长，允许两行自适应，避免被硬截断 */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-word;
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

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
  margin-top: 12rpx;
}

.card-tag {
  font-size: 19rpx;
  font-weight: 600;
  color: var(--primary);
  padding: 4rpx 14rpx;
  background-color: #fff0ee;
  border-radius: 999rpx;
  word-break: break-word;
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

/* 小程序组件样式隔离下 App.vue 的全局按压类可能不生效，组件内补一份 */
.hv-scale {
  transform: scale(0.98);
}
</style>
