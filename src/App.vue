<template>
  <header-bar/>

  <router-view v-slot="{ Component }" class="my-16 md:my-32 text-[var(--color-text-1)]">
    <keep-alive include="HomePage">
      <component class="w-[968px] max-w-[90vw] mx-auto" :is="Component"/>
    </keep-alive>
  </router-view>
</template>

<script setup lang="ts">
</script>

<style lang="less">
</style>
