<template>
  <div class="w-full">
    <transition enter-active-class="animate__animated animate__fadeIn" appear>
      <div v-if="loading" class="flex justify-center items-center">
        <a-spin tip="加载中..."/>
      </div>
      <div v-else>
        <div v-for="(info,k) of data.info" :key="k" class="md:px-2 py-2">
          <transition enter-active-class="animate__animated animate__fadeIn" appear>
            <info-record :info="info"/>
          </transition>
        </div>

        <div class="flex justify-end" v-if="data.count">
          <a-pagination
              :simple="store.is_mobile"
              :total="data.count"
              v-model:current="params.page"
              :page-size="10"
              @change="get_data"
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

const store = UseStore()


const loading = ref(true)
const params = ref<{ page: number }>({page: 1})
const data = ref<{ count: number, info: Info[] }>({
  count: 0,
  info: []
})

const get_data = async () => {
  try {
    loading.value = true
    const res = await client.get<PaginatedResponse<Info>>({
      url: "info",
      params: {
        ...params.value,
      }
    })

    if (res.code === 100) {
      data.value.count = res.data.count
      data.value.info = res.data.results
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
  data.value.info = []
})
</script>

<style scoped lang="less">

</style>
