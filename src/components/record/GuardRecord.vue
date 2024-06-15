<template>
  <div class="md:flex justify-start items-center my-2">
    <div class="text-[12px] md:text-[14px] flex-shrink-0 mr-2"> {{ time }}</div>

    <div class="flex justify-between items-center p-3 rounded w-[256px]" :style="background">
      <div class="flex justify-start items-center truncate">
        <a-image width="24" class="flex-shrink-0" v-if="guard.privilege_type" :src="privilege_image(guard.privilege_type)"/>
        <div class="mr-2 text-white">×{{ guard.guard_num }}</div>
        <div class="font-bold hover:text-[#4ebaee] cursor-pointer duration-100  truncate mr-1 text-yellow-400"
             @click="open_url(`https://space.bilibili.com/${guard.uid}/`)">
          {{ guard.username }}
        </div>
      </div>

      <div class="flex-shrink-0 bg-yellow-200 text-yellow-600 rounded border border-amber-500  px-0.5">
        {{ guard.guard_price / 1000 }}元
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {DateParser, open_url, privilege_image} from "@/assets/lib/utils";

const props = defineProps<{ guard: Guard }>()
const time = computed(() => (new DateParser(props.guard.timestamp_start)).monthDayHoursMinutes())
const background = computed(() => {
  switch (props.guard.privilege_type) {
    case 1:
      return "background-color:rgba(81,122,199,0.8);filter:drop-shadow(2px 2px 1px #3d4f8d)"
    case 2:
      return "background-color:rgba(222,157,254,0.8);filter:drop-shadow(2px 2px 1px #6722a1)"
    case 3:
      return "background-color:rgba(226,80,66,0.8);filter: drop-shadow(2px 2px 1px #91212d)"
  }
})

</script>

<style scoped lang="less">

</style>
