<template>
  <view class="empty-state">
    <view class="empty-illustration">
      <text class="empty-icon">{{ icon }}</text>
    </view>
    <text class="empty-title">{{ title }}</text>
    <text v-if="tip" class="empty-tip">{{ tip }}</text>
    <view v-if="buttonText" class="empty-button" @click="emit('action')">
      <text class="empty-button-text">{{ buttonText }}</text>
    </view>
  </view>
</template>

<script setup>
const props = defineProps({
  icon: {
    type: String,
    default: "🍽️",
  },
  title: {
    type: String,
    required: true,
  },
  tip: {
    type: String,
    default: "",
  },
  buttonText: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["action"]);
</script>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120rpx 60rpx;
}

.empty-illustration {
  width: 200rpx;
  height: 200rpx;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.05);
  margin-bottom: 36rpx;
}

.empty-icon {
  font-size: 96rpx;
}

.empty-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #2a2a2a;
  text-align: center;
}

.empty-tip {
  margin-top: 14rpx;
  font-size: 25rpx;
  color: #8a8a8a;
  text-align: center;
  line-height: 1.5;
  word-break: break-word;
}

.empty-button {
  margin-top: 48rpx;
  padding: 20rpx 64rpx;
  border-radius: 999rpx;
  background: linear-gradient(135deg, #ff6b6b, #ff8e53);
  box-shadow: 0 8rpx 20rpx rgba(255, 107, 107, 0.3);
}

.empty-button-text {
  font-size: 27rpx;
  font-weight: 600;
  color: #fff;
}
</style>
