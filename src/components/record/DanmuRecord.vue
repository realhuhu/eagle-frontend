<template>
  <div class="md:flex justify-start items-center my-2 md:my-4">
    <div class="text-[12px] md:text-[14px] flex-shrink-0 mr-2"> {{ time }}</div>

    <div class="flex justify-start items-center">
      <privilege-avatar :avatar="danmu.avatar" :privilege_type="danmu.privilege_type" :size="34" class="mr-2"/>

      <div v-if="danmu.admin_type==1"
           class="p-0.5 rounded-md text-[#FFB027] border border-[#FFB027]  flex-shrink-0  mr-1">房
      </div>

      <div :style="{color:`${danmu.username_color}`}" @click="open_url(`https://space.bilibili.com/${danmu.uid}/`)"
           class="font-bold hover:text-[#4ebaee] cursor-pointer duration-100  truncate mr-1">
        {{ danmu.username }}
      </div>

      <a-tooltip :content="`全站排名${danmu.level_rank}`" mini>
        <div :style="{backgroundColor:number_to_color(danmu.level_color)}"
             class="rounded-[4px] text-center flex-shrink-0 text-[10px] md:text-[12px] px-1  mr-1">
          Lv.{{ danmu.level }}
        </div>
      </a-tooltip>

      <medal-chip v-if="danmu.medal" :medal="danmu" class="mr-1"/>

      <div class="mr-2 font-bold">:</div>

      <div v-if="danmu.message_type===0" :style="{color:number_to_color(danmu.text_color,true)}">
        {{ danmu.text }}
      </div>

      <div v-if="danmu.message_type===1">
        <a-image height="24" :src="proxy_url(danmu.emoticon.url)"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {DateParser, number_to_color, open_url, proxy_url} from "@/assets/lib/utils";
import {computed} from "vue";

const props = defineProps<{ danmu: Danmu }>()
const time = computed(() => (new DateParser(props.danmu.timestamp)).monthDayHoursMinutes())
</script>

<style scoped lang="less">

</style>
