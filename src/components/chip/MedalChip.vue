<template>
  <div class="flex-shrink-0">
    <a-tooltip :content="`${medal.medal_roomer||''}(${medal.medal_room_id})`" mini>
      <div :style="{backgroundColor:number_to_color(medal.medal_color)}"
           @click="open_url(`https://live.bilibili.com/${medal.medal_room_id}`)"
           class="text-[10px] md:text-[12px] rounded-sm cursor-pointer flex justify-center items-center">
        <div class="text-white px-[4px]">{{ medal.medal }}</div>

        <div class="p-[1px]">
          <div class="bg-white w-[16px] text-center rounded-[1px]"
               :style="{color:number_to_color(medal.medal_color)}">
            {{ medal.medal_level }}
          </div>
        </div>
      </div>
    </a-tooltip>
  </div>
</template>

<script setup lang="ts">
import {number_to_color, open_url} from "@/assets/lib/utils";

type Medal = {
  medal: string
  medal_level: string
  medal_color: number
  medal_roomer?: string
  medal_room_id: number
  medal_special: string
}

const props = defineProps<{ medal: Medal }>()
</script>

<style scoped lang="less">

</style>
