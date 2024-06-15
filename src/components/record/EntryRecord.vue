<template>
  <div class="flex justify-center items-center my-2 text-[var(--color-text-3)] text-[10px] md:text-[14px]">
    <div class="flex-shrink-0 mr-2"> {{ time }}</div>

    <a-image width="20" v-if="entry.privilege_type" :src="privilege_image(entry.privilege_type)"/>

    <div :style="{color:`${entry.username_color}`}" @click="open_url(`https://space.bilibili.com/${entry.uid}/`)"
         class="font-bold hover:text-[#4ebaee] cursor-pointer duration-100  truncate">
      {{ entry.username }}
    </div>

    <medal-chip v-if="entry.medal" :medal="entry"  class="mx-1"/>

    <div class="truncate">进入直播间</div>
  </div>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {DateParser, open_url, privilege_image} from "@/assets/lib/utils";

const props = defineProps<{ entry: Entry }>()
const time = computed(() => (new DateParser(props.entry.timestamp)).monthDayHoursMinutes())
</script>

<style scoped lang="less">

</style>
