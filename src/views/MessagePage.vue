<template>
  <div>
    <a-divider/>

    <div class="flex flex-col justify-start items-center">
      <div class="md:flex justify-between items-center w-full">
        <a-tabs type="capsule" size="large" hide-content v-model:active-key="active">
          <a-tab-pane key="1" title="全部"/>
          <a-tab-pane key="2" title="弹幕"/>
          <a-tab-pane key="3" title="上舰"/>
          <a-tab-pane key="4" title="礼物"/>
          <a-tab-pane key="5" title="入场"/>
          <a-tab-pane key="6" title="留言"/>
          <a-tab-pane key="7" title="抽奖"/>
        </a-tabs>

        <div class="md:flex justify-end items-center pt-4">
          <div class="px-2">
            <a-form-item label="开始">
              <a-date-picker
                  class="w-full"
                  show-time
                  format="YYYY-MM-DD HH:mm"
                  v-model:model-value="timestamp.start"
              />
            </a-form-item>
          </div>

          <div class="px-2">
            <a-form-item label="结束">
              <a-date-picker
                  class="w-full"
                  show-time
                  format="YYYY-MM-DD HH:mm"
                  v-model:model-value="timestamp.end"
              />
            </a-form-item>
          </div>
        </div>
      </div>

      <div class="w-full bg-[var(--theme-dark-2)] m-2 rounded">
        <TotalTable v-if="active==='1'" :timestamp="timestamp"/>
        <DanmuTable v-else-if="active==='2'" :timestamp="timestamp"/>
        <GuardTable v-else-if="active==='3'" :timestamp="timestamp"/>
        <GiftTable v-else-if="active==='4'" :timestamp="timestamp"/>
        <EntryTable v-else-if="active==='5'" :timestamp="timestamp"/>
        <ChatTable v-else-if="active==='6'" :timestamp="timestamp"/>
        <AwardTable v-else-if="active==='7'" :timestamp="timestamp"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useRoute} from "vue-router";
import {flat_query} from "@/assets/lib/utils";

const route = useRoute()
const today = new Date(new Date().toLocaleDateString()).getTime()

const active = ref("1")
const timestamp = ref<{ start: Date, end: Date }>({
  start: new Date(Number(flat_query(route.query.start)) || today),
  end: new Date(Number(flat_query(route.query.end)) || (today + 24 * 60 * 60 * 1000 - 1)),
})
</script>

<style scoped lang="less">

</style>
