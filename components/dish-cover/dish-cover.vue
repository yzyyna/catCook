<template>
  <view class="dish-cover" :style="{ background: gradient }">
    <view v-if="!imageSrc || loadFailed" class="cover-deco cover-deco-a" />
    <view v-if="!imageSrc || loadFailed" class="cover-deco cover-deco-b" />
    <image
      v-if="imageSrc && !loadFailed"
      class="cover-image"
      :src="imageSrc"
      mode="aspectFill"
      @error="loadFailed = true"
    />
    <text v-else class="cover-emoji">{{ emoji }}</text>
  </view>
</template>

<script setup>
import { ref, computed } from "vue";
import { categories } from "@/data/categories";

const props = defineProps({
  dish: {
    type: Object,
    required: true,
  },
});

const loadFailed = ref(false);

// 每个分类一套柔和渐变，与米白底色和主色 #FF6B6B 协调
const COVER_GRADIENTS = {
  1: "linear-gradient(135deg, #ffe9dc, #ffd3bc)",
  2: "linear-gradient(135deg, #ffe2dc, #ffc5b8)",
  3: "linear-gradient(135deg, #dff4f2, #c3e8e4)",
  4: "linear-gradient(135deg, #e4f6e6, #cbecd2)",
  5: "linear-gradient(135deg, #fff2d8, #ffe5ae)",
  6: "linear-gradient(135deg, #fce4f0, #f6cce4)",
  7: "linear-gradient(135deg, #fff5d5, #ffe9a8)",
  8: "linear-gradient(135deg, #e3ecfb, #cbdcf7)",
};

const imageSrc = computed(() => (props.dish?.image || "").trim());

const emoji = computed(() => {
  const category = categories.find(
    (item) => item.id === props.dish?.categoryId,
  );
  return props.dish?.emoji || category?.icon || "🍽️";
});

const gradient = computed(
  () => COVER_GRADIENTS[props.dish?.categoryId] || COVER_GRADIENTS[1],
);
</script>

<style scoped>
.dish-cover {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.cover-image {
  width: 100%;
  height: 100%;
}

.cover-emoji {
  font-size: var(--cover-emoji-size, 88rpx);
  line-height: 1;
  filter: drop-shadow(0 6rpx 10rpx rgba(0, 0, 0, 0.08));
}

/* 柔和装饰圆，让兜底封面不显空洞 */
.cover-deco {
  position: absolute;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.4);
  pointer-events: none;
}

.cover-deco-a {
  width: 44%;
  height: 44%;
  left: -12%;
  top: -14%;
}

.cover-deco-b {
  width: 30%;
  height: 30%;
  right: -8%;
  bottom: -10%;
  background-color: rgba(255, 255, 255, 0.28);
}
</style>
