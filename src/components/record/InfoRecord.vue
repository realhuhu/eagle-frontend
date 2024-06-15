<template>
  <a-card :title="info.live.room.title" class="w-full rounded-lg">
    <template #extra>
      <div class="flex gap-3">
        <a-tag checkable color="arcoblue">{{ info.live.room.area }}</a-tag>
        <a-tag checkable color="arcoblue">{{ info.live.room.sub_area }}</a-tag>
      </div>
    </template>


    <div class="md:flex justify-between items-center text-[12px]">
      <div class="flex-shrink-0 flex md:flex-col justify-center items-center md:items-start gap-3 md:gap-1 text-gray-500">
        <div>{{ date(info.live.start) }}</div>
        <div v-if="info.live.end" class="flex justify-center items-center gap-3">
          <div class="md:hidden">到</div>
          <div>{{ date(info.live.end) }}</div>
        </div>
        <a-tag v-else checkable color="red" size="small">直播中</a-tag>
      </div>

      <a-divider class="md:hidden" :margin="7"/>

      <div class="flex justify-between md:justify-end items-center gap-3 flex-shrink-0 px-3">
        <div class="flex flex-col justify-center items-center">
          <div>在线数</div>
          <div>{{ info.rank.toFixed(0) }}</div>
        </div>

        <div class="flex flex-col justify-center items-center">
          <div>进场数</div>
          <div>{{ (info.entry / 1000).toFixed(2) }}k</div>
        </div>

        <div class="flex flex-col justify-center items-center">
          <div>点赞数</div>
          <div>{{ (info.like / 10000).toFixed(2) }}w</div>
        </div>

        <div class="flex flex-col justify-center items-center">
          <div>观看数</div>
          <div>{{ (info.watch / 10000).toFixed(2) }}w</div>
        </div>

        <div class="flex flex-col justify-center items-center">
          <div>粉丝团</div>
          <div>{{ (info.fans / 1000).toFixed(2) }}k</div>
        </div>
      </div>
    </div>

    <div class="bg-[var(--theme-dark-3)] rounded">
      <a-divider :margin="7"/>
      <a-row>
        <a-col :md="{span:6}" :xs="{span:12}">
          <div class="flex flex-col justify-center items-center p-2">
            <div class="md:text-lg font-bold">弹幕</div>
            <div class="flex flex-col justify-center items-center">
              <div><span class="text-[#e17aff] mr-1">{{ info.danmu.user_count }} </span>人</div>
              <div><span class="text-[#4ebaee] mr-1">{{ info.danmu.total_count }}</span>条</div>
            </div>
          </div>
        </a-col>
        <a-col :md="{span:6}" :xs="{span:12}">
          <div class="flex flex-col justify-center items-center p-2">
            <div class="flex justify-center items-center text-yellow-600 gap-1">
              <div class="md:text-lg font-bold">礼物</div>
              <a-tag checkable color="gold" size="small" class="px-1"> {{ info.gift.price / 1000 }}元</a-tag>
            </div>

            <div class="flex flex-col justify-center items-center">
              <div><span class="text-[#e17aff] mr-1">{{ info.gift.user_count }}</span>人</div>
              <div><span class="text-[#4ebaee] mr-1">{{ info.gift.total_count }}</span>件</div>
            </div>
          </div>
        </a-col>
        <a-col :md="{span:6}" :xs="{span:12}">
          <div class="flex flex-col justify-center items-center p-2">
            <div class="flex justify-center items-center text-yellow-600 gap-1">
              <div class="md:text-lg font-bold">留言</div>
              <a-tag checkable color="gold" size="small" class="px-1"> {{ info.chat.price }}元</a-tag>
            </div>

            <div class="flex flex-col justify-center items-center">
              <div><span class="text-[#e17aff] mr-1">{{ info.chat.user_count }}</span>人</div>
              <div><span class="text-[#4ebaee] mr-1">{{ info.chat.total_count }}</span>条</div>
            </div>
          </div>
        </a-col>
        <a-col :md="{span:6}" :xs="{span:12}">
          <div class="flex flex-col justify-center items-center p-2">
            <div class="flex justify-center items-center text-yellow-600 gap-1">
              <div class="md:text-lg font-bold">舰长</div>
              <a-tag checkable color="gold" size="small" class="px-1"> {{ guard_price }}元</a-tag>
            </div>

            <div class="flex flex-col justify-center items-center">
              <div v-for="(guard,k) in info.guard" :key="k" class="flex justify-start items-center">
                <a-image width="20" :src="privilege_image(guard.privilege_type)"/>
                <div>×{{ guard.total_count }}</div>
              </div>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>

    <div class="flex justify-end items-center gap-3 mt-2">
      <a-button status="warning" size="small" @click="to('message')">查看聊天</a-button>
      <a-button status="success" size="small" @click="to('statistic')">查看数据</a-button>
    </div>
  </a-card>
</template>

<script setup lang="ts">
import {DateParser, privilege_image} from "@/assets/lib/utils";
import {computed} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()
const props = defineProps<{ info: Info }>()
const date = (timestamp: number) => (new DateParser(timestamp)).all()
const guard_price = computed(() => {
  let price = 0
  for (let i of props.info.guard) {
    price += i.total_price
  }
  return price / 1000
})
const to = (path: string) => {
  router.push({
    path,
    query: {start: props.info.live.start, end: props.info.live.end}
  })
}
</script>

<style scoped lang="less">

</style>
