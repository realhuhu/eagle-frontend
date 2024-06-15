<template>
  <div class="p-4">
    <div class="md:flex justify-between items-center gap-6">
      <a-form-item label="房管" class="w-auto md:w-[45%]">
        <a-select v-model="params.admin_type" placeholder="请选择..." multiple>
          <a-option :value="0">非房管</a-option>
          <a-option :value="1" :tag-props="{color:'orange'}">房管</a-option>
          <a-option :value="2" :tag-props="{color:'red'}">主播</a-option>
        </a-select>
      </a-form-item>

      <a-form-item label="舰长" class="w-auto md:w-[55%]">
        <a-select v-model="params.privilege_type" placeholder="请选择..." multiple>
          <a-option :value="0">未上舰</a-option>
          <a-option :value="1" :tag-props="{color:'blue'}">舰长</a-option>
          <a-option :value="2" :tag-props="{color:'orange'}">提督</a-option>
          <a-option :value="3" :tag-props="{color:'red'}">总督</a-option>
        </a-select>
      </a-form-item>
    </div>
    <div class="md:flex justify-between items-center gap-6">
      <a-form-item label="筛选" class="w-auto md:w-[45%]">
        <div class="flex justify-start items-center gap-4">
          <a-checkbox v-model="params.omit_lottery">忽略天选时刻</a-checkbox>
          <a-checkbox v-model="params.not_iying">佩戴<span class="text-blue-400">鹰快飞</span>以外粉丝牌
          </a-checkbox>
        </div>
      </a-form-item>

      <a-form-item label="排序" class="w-auto md:w-[55%]">
        <a-select placeholder="请选择" v-model="params.order">
          <a-option value="-timestamp">最新弹幕</a-option>
          <a-option value="timestamp">最早弹幕</a-option>
        </a-select>
      </a-form-item>
    </div>

    <div class="md:flex justify-between items-center gap-6">
      <a-form-item label="搜索">
        <div class="flex justify-start items-center md:w-[70%] gap-6">
          <a-input-number hide-button placeholder="搜索UID" v-model="params.uid" allow-clear/>
          <a-input placeholder="搜索评论" v-model="params.search" allow-clear/>
        </div>
      </a-form-item>

      <a-button class="w-full md:w-auto" status="success" @click="refresh_data">更新</a-button>
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
        <div v-for="(danmu,k) of data.danmu" :key="k">
          <transition enter-active-class="animate__animated animate__fadeIn" appear>
            <danmu-record :danmu="danmu"/>
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

const props = defineProps<{ timestamp: { start: Date, end: Date } }>()
const store = UseStore()

const loading = ref(true)
const params = ref<Params<{ omit_lottery: boolean, not_iying: boolean, admin_type: number[] }>>({
  page: 1,
  size: 20,
  omit_lottery: true,
  not_iying: false,
  order: "-timestamp",
  admin_type: [0, 1, 2],
  privilege_type: [0, 1, 2, 3]
})
const data = ref<{ count: number, danmu: Danmu[] }>({
  count: 0,
  danmu: []
})

const get_data = async () => {
  try {
    loading.value = true
    const res = await client.get<PaginatedResponse<Danmu>>({
      url: "danmu",
      params: {
        ...params.value,
        timestamp_start: new Date(props.timestamp.start).getTime(),
        timestamp_end: new Date(props.timestamp.end).getTime(),
        privilege_type: JSON.stringify(params.value.privilege_type)
      }
    })

    if (res.code === 100) {
      data.value.count = res.data.count
      data.value.danmu = res.data.results
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
  data.value.danmu = []
})
</script>

<style scoped lang="less">

</style>
