<template>
  <div class="p-4">
    <div class="md:flex justify-between items-start gap-6">
      <a-form-item label="类型">
        <a-select v-model="params.table" placeholder="请选择..." multiple>
          <a-option :value="1" :tag-props="{color:'blue'}">弹幕</a-option>
          <a-option :value="2" :tag-props="{color:'blue'}">上舰</a-option>
          <a-option :value="3" :tag-props="{color:'blue'}">礼物</a-option>
          <a-option :value="4" :tag-props="{color:'blue'}">入场</a-option>
          <a-option :value="5" :tag-props="{color:'blue'}">留言</a-option>
        </a-select>
      </a-form-item>
    </div>

    <div class="md:flex justify-between items-start gap-6">
      <div class="flex justify-between items-start gap-6 md:w-full">
        <a-form-item label="搜索">
          <div class="flex justify-between items-center gap-3 w-full">
            <a-input-number hide-button placeholder="搜索UID" v-model="params.uid" allow-clear/>
          </div>
        </a-form-item>

        <a-form-item label="排序">
          <a-select placeholder="请选择" v-model="params.order">
            <a-option value="-timestamp">最新</a-option>
            <a-option value="timestamp">最早</a-option>
          </a-select>
        </a-form-item>
      </div>

      <a-button status="success" class="w-full md:w-auto" @click="refresh_data">更新</a-button>
    </div>

    <div class="my-6">
      <a-divider :margin="10" orientation="left">
        <div class="flex gap-3">
          <a-tag checkable color="arcoblue">
            <template #icon>
              <icon-message/>
            </template>
            {{ data.count }}条
          </a-tag>

          <a-tag checkable color="gold">
            <template #icon>
              <icon-gift/>
            </template>
            {{ (Math.round(data.price * 100) / 100).toFixed(2) }}元
          </a-tag>
        </div>
      </a-divider>
    </div>

    <transition enter-active-class="animate__animated animate__fadeIn" appear>
      <div v-if="loading" class="flex justify-center items-center">
        <a-spin tip="加载中..."/>
      </div>
      <div v-else>
        <div v-for="(message,k) of data.message" :key="k">
          <transition enter-active-class="animate__animated animate__fadeIn" appear>
            <danmu-record v-if="message.message_category===1" :danmu="message"/>
            <guard-record v-else-if="message.message_category===2" :guard="message"/>
            <gift-record v-else-if="message.message_category===3" :gift="message"/>
            <entry-record v-else-if="message.message_category===4" :entry="message"/>
            <chat-record v-else-if="message.message_category===5" :chat="message"/>
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
import * as _ from "lodash"
import {UseStore} from "@/store";

const props = defineProps<{ timestamp: { start: Date, end: Date } }>()
const store = UseStore()

const loading = ref(true)
const params = ref<Params<{ table: number[] }>>({
  page: 1,
  size: 20,
  order: "-timestamp",
  table: [1, 2, 3, 4, 5]
})
const data = ref<{ count: number, price: number, message: any[] }>({
  count: 0,
  price: 0,
  message: []
})

const get_data = async () => {
  try {
    loading.value = true
    const res = await client.get<{
      count: number,
      price: number,
      danmu: Danmu[],
      gift: Gift[],
      entry: Entry[],
      guard: Guard[],
      chat: Chat[]
    }>({
      url: "total",
      params: {
        ...params.value,
        timestamp_start: new Date(props.timestamp.start).getTime(),
        timestamp_end: new Date(props.timestamp.end).getTime(),
        table: JSON.stringify(params.value.table)
      }
    })

    let temp: any[] = []
    if (res.code === 100) {
      for (let danmu of res.data.danmu) {
        temp.push({
          message_category: 1,
          ...danmu
        })
      }

      for (let guard of res.data.guard) {
        temp.push({
          message_category: 2,
          timestamp: guard.timestamp_start * 1000,
          ...guard
        })
      }

      for (let gift of res.data.gift) {
        gift.timestamp = gift.timestamp * 1000
        temp.push({
          message_category: 3,
          ...gift
        })
      }

      for (let entry of res.data.entry) {
        entry.timestamp = entry.timestamp * 1000
        temp.push({
          message_category: 4,
          ...entry
        })
      }
      for (let chat of res.data.chat) {
        temp.push({
          message_category: 5,
          timestamp: chat.timestamp_start * 1000,
          ...chat
        })
      }
      data.value.message = _.orderBy(temp, ["timestamp"], [params.value.order === "-timestamp" ? "desc" : "asc"])

      data.value.count = res.data.count
      data.value.price = res.data.price
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

const refresh_data = async () => {
  params.value.page = 1
  await get_data()
}

watch(() => params.value.page, () => {
  data.value.message = []
})
get_data()

</script>

<style scoped lang="less">

</style>
