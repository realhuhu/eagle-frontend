<template>
  <div class="fixed left-0 top-0 bg-[var(--theme-dark-2)] w-full border-b border-[var(--theme-gray-3)] z-50">
    <div class="flex justify-between items-center m-2 md:mx-10">
<!--      <div/>-->
      <span class="w-9"/>

      <a-tabs type="text" hide-content :active-key="route.meta.active" @change="change">
        <a-tab-pane key="1">
          <template #title>
            <i-bxs-home class="inline"/>
            <span class="hidden md:inline ml-1">首页</span>
          </template>
        </a-tab-pane>
        <a-tab-pane key="2">
          <template #title>
            <i-bxs-chat class="inline"/>
            <span class="hidden md:inline ml-1">聊天消息</span>
          </template>
        </a-tab-pane>
        <a-tab-pane key="3">
          <template #title>
            <i-solar-chart-line-duotone class="inline"/>
            <span class="hidden md:inline ml-1">其它数据</span>
          </template>
        </a-tab-pane>
      </a-tabs>

      <a-button size="large" type="text" shape="circle" @click="store.toggleTheme()" class="w-9 flex-shrink-0">
        <i-ph-sun-bold v-if="!store.dark"/>
        <i-ph-moon-bold v-else/>
      </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {UseStore} from "@/store";
import {useRoute, useRouter} from "vue-router";

const store = UseStore()
const route = useRoute()
const router = useRouter()

const change = async (key: number | string) => {
  await router.push({
    "1": "/home",
    "2": "/message",
    "3": "/statistic"
  }[key.toString()] || "/home")
}
</script>

<style scoped lang="less">

</style>
