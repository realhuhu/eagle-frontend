<template>
  <div class="md:flex justify-start items-center my-2">
    <div class="text-[12px] md:text-[14px] flex-shrink-0 mr-2"> {{ time }}</div>

    <div class="flex justify-start items-center">
      <privilege-avatar :avatar="gift.avatar" :privilege_type="gift.privilege_type" :size="34" class="mr-2"/>

      <div @click="open_url(`https://space.bilibili.com/${gift.uid}/`)"
           class="font-bold hover:text-[#4ebaee] cursor-pointer duration-100  truncate">
        {{ gift.username }}
      </div>

      <div class="flex-shrink-0">{{ gift.gift_action }}了</div>
      <div class="text-red-600 bg-red-200 rounded text-[10px] md:text-[14px] px-0.5 flex-shrink-0">
        {{ gift.gift_name }}
      </div>
      <div class="mr-2">×{{ gift.gift_num }}</div>

      <div v-if="gift.gift_coin"
           class="bg-yellow-200 text-yellow-600 text-[10px] md:text-[14px] rounded border border-amber-500  px-0.5 flex-shrink-0">
        {{ gift.gift_total_price / 1000 }}元
      </div>
      <div v-else
           class="bg-gray-200 text-gray-600 text-[10px] md:text-[14px]  rounded border border-gray-500 flex-shrink-0 px-0.5">
        {{ gift.gift_total_price }}银瓜子
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {DateParser, open_url} from "@/assets/lib/utils";

const props = defineProps<{ gift: Gift }>()
const time = computed(() => (new DateParser(props.gift.timestamp)).monthDayHoursMinutes())
</script>

<style scoped lang="less">

</style>
