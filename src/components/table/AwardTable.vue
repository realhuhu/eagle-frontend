<template>
  <div class="p-4">
    <div class="md:flex justify-end items-center gap-6">
      <a-form-item label="搜索">
        <div class="flex justify-between items-center gap-3 w-full md:w-auto">
          <a-input placeholder="搜索礼物名称" v-model="params.search" allow-clear/>
        </div>
      </a-form-item>

      <a-button status="success" class="w-full md:w-auto" @click="refresh_data">更新</a-button>
    </div>

    <div class="my-6">
      <a-divider :margin="10" orientation="left">
        <a-tag checkable color="arcoblue">
          <template #icon>
            <icon-message/>
          </template>
          {{ data.count }}条
        </a-tag>
      </a-divider>
    </div>

    <transition enter-active-class="animate__animated animate__fadeIn" appear>
      <div v-if="loading" class="flex justify-center items-center">
        <a-spin tip="加载中..."/>
      </div>
      <div v-else>
        <div v-for="(award,k) of data.award" :key="k">
          <transition enter-active-class="animate__animated animate__fadeIn" appear>
            <award-record :award="award"/>
          </transition>
        </div>

        <div class="flex justify-end" v-if="data.count">
          <a-pagination
              :simple="store.is_mobile"
              :total="data.count"
              v-model:current="params.page"
              v-model:page-size="params.size"
              @change="get_data"
              show-page-size
              :page-size-options="[20,50,100]"
              @pageSizeChange="refresh_data"
              show-jumper
          />
        </div>
        <div v-else class="text-center">
          没有查询到结果
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {client} from "@/assets/lib/request";
import {Notification} from "@arco-design/web-vue";
import {UseStore} from "@/store";
import GuardRecord from "@/components/record/GuardRecord.vue";

const props = defineProps<{ timestamp: { start: Date, end: Date } }>()
const store = UseStore()

const loading = ref(true)
const params = ref<Params<{}>>({
  page: 1,
  size: 20,
  order: "-timestamp",
})
const data = ref<{ count: number, award: Award[] }>({
  count: 0,
  award: []
})

const get_data = async () => {
  try {
    loading.value = true
    const res = await client.get<PaginatedResponse<Award>>({
      url: "award",
      params: {
        ...params.value,
        timestamp_start: new Date(props.timestamp.start).getTime(),
        timestamp_end: new Date(props.timestamp.end).getTime(),
      }
    })

    if (res.code === 100) {
      data.value.count = res.data.count
      data.value.award = res.data.results
    } else {
      Notification.warning("获取失败")
      console.log(res)
    }
    loading.value = false
  } catch (e) {
    Notification.warning("获取失败")
    loading.value = false
    console.error(e)
  }
}

get_data()

const refresh_data = async () => {
  params.value.page = 1
  await get_data()
}

watch(() => params.value.page, () => {
  data.value.award = []
})
</script>

<style scoped lang="less">

</style>
