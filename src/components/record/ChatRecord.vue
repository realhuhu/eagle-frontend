<template>
  <div class="md:flex justify-start items-start my-2 w-full">
    <div class="text-[12px] md:text-[14px] flex-shrink-0 mr-2 text-bold"> {{ time }}</div>
    <div class="card-detail">
      <div class="card-head" :style="`background-color:${chat.chat_color};border-color: ${chat.chat_bottom_color}`">
        <privilege-avatar :avatar="chat.avatar" :privilege_type="chat.privilege_type"/>
        <div class="card-info">
          <div class="card-name" @click="open_url(`https://space.bilibili.com/${chat.uid}/`)">{{ chat.username }}</div>
          <div class="card-price">
            <div class="card-price-inner">{{ chat.chat_price * 10 }}电池</div>
          </div>
        </div>
      </div>
      <div class="card-body" :style="`background-color:${chat.chat_bottom_color}`">
        <div class="card-content">
          {{ chat.chat_message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {DateParser, open_url} from "@/assets/lib/utils";
import {computed} from "vue";

const props = defineProps<{ chat: Chat }>()
const time = computed(() => (new DateParser(props.chat.timestamp_start)).monthDayHoursMinutes())
</script>

<style scoped lang="less">
.card-detail {
  margin: 2px;
  width: 270px;
  max-width: 100%;
  position: relative;
  z-index: 2;
  min-height: 88px;
}

.card-head {
  border: 1px solid;
  border-radius: 6px 6px 0 0;
  height: 50px;
  background-position: 100% center;
  background-size: contain;
  background-repeat: no-repeat;
  padding: 8px 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.card-body {
  position: relative;
  padding: 8px 10px;
  box-sizing: border-box;
  border-radius: 2px 2px 6px 6px;
  min-height: 38px;
}

.card-content {
  position: relative;
  min-height: 12px;
  word-wrap: break-word;
  font-size: 12px;
  color: #fff;
  text-align: left;
  line-height: 20px;
}

.card-info {
  margin: 2px 0 0 6px;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.card-name {
  opacity: .78;
  font-size: 12px;
  cursor: pointer;
  color: #f9708e;
}

.card-price {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.card-price-inner {
  margin: 2px;
  font-size: 13px;
  line-height: 16px;
  color: #333;
}
</style>
