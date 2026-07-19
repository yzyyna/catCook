<template>
  <view class="stepper" @click.stop>
    <template v-if="quantity > 0">
      <view
        class="stepper-btn minus"
        :class="{ animating: animating === 'minus' }"
        @click.stop="onDecrease"
      >
        <text class="stepper-symbol">−</text>
      </view>
      <text class="stepper-count">{{ quantity }}</text>
    </template>
    <view
      class="stepper-btn plus"
      :class="{ animating: animating === 'plus' }"
      @click.stop="onIncrease"
    >
      <text class="stepper-symbol">+</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  quantity: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["increase", "decrease"]);

const animating = ref("");
let timer = null;

const trigger = (type) => {
  animating.value = type;
  clearTimeout(timer);
  timer = setTimeout(() => {
    animating.value = "";
  }, 200);
};

const onIncrease = () => {
  trigger("plus");
  emit("increase");
};

const onDecrease = () => {
  trigger("minus");
  emit("decrease");
};
</script>

<style scoped>
.stepper {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.stepper-btn {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease;
}

.stepper-btn.plus {
  background: linear-gradient(135deg, #ff6b6b, #ff8e53);
  box-shadow: 0 6rpx 16rpx rgba(255, 107, 107, 0.32);
}

.stepper-btn.minus {
  background-color: #fff;
  border: 2rpx solid #ff6b6b;
}

.stepper-btn.animating {
  transform: scale(1.18);
}

.stepper-symbol {
  font-size: 32rpx;
  line-height: 1;
  font-weight: 600;
}

.plus .stepper-symbol {
  color: #fff;
}

.minus .stepper-symbol {
  color: #ff6b6b;
}

.stepper-count {
  min-width: 56rpx;
  text-align: center;
  font-size: 30rpx;
  font-weight: 600;
  color: #2a2a2a;
}
</style>
