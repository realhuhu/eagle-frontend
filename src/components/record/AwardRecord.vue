<template>
  <div class="md:flex justify-start items-start my-2 w-full">
    <div class="font-[8px] flex-shrink-0 mr-2 text-bold"> {{ time }}</div>

    <div class="border-[#3d1aa6] border-[2px] rounded-xl overflow-hidden w-96 max-w-full bg-[#fff8ef]">
      <div class="text-center text-[#120a76] font-bold text-lg p-2 bg-yellow-200 truncate"
           style="text-shadow: #ffda85 2px 2px 1px;">
        {{ award.award_name }}
      </div>

      <div class="p-4">
        <div v-for="(user,k) in award.award_users" :key="k" class="flex justify-start items-center mb-3">
          <a-avatar :size="32" :image-url="proxy_url(user.face)" class="flex-shrink-0"/>

          <div :style="{color:`${user.color}`}" @click="open_url(`https://space.bilibili.com/${user.uid}/`)"
               class="font-bold text-[#45409a] hover:text-[#4ebaee] cursor-pointer duration-100  truncate">
            {{ user.uname }}
          </div>

          <a-tag checkable color="grey" class="flex-shrink-0 mx-1" size="small">Lv.{{ user.level }}</a-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {DateParser, open_url, proxy_url} from "@/assets/lib/utils";
import {computed} from "vue";

const props = defineProps<{ award: Award }>()
const time = computed(() => (new DateParser(props.award.timestamp)).monthDayHoursMinutes())
</script>

<style scoped lang="less">

</style>
