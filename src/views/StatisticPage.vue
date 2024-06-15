<template>
  <div>
    <a-divider/>

    <div class="flex flex-col justify-start items-center">
      <div class="md:flex justify-between items-center w-full">
        <a-tabs type="capsule" size="large" hide-content v-model:active-key="params.table" @change="refresh">
          <a-tab-pane :key="1" title="观看数"/>
          <a-tab-pane :key="2" title="在线数"/>
          <a-tab-pane :key="3" title="粉丝团"/>
          <a-tab-pane :key="4" title="点赞数"/>
          <a-tab-pane :key="5" title="热度排名"/>
        </a-tabs>

        <div class="md:flex justify-end items-center pt-4">
          <div class="px-2">
            <a-form-item label="开始">
              <a-date-picker
                  class="w-full"
                  show-time
                  format="YYYY-MM-DD HH:mm"
                  v-model:model-value="params.timestamp_start"
                  @change="refresh"
              />
            </a-form-item>
          </div>

          <div class="px-2">
            <a-form-item label="结束">
              <a-date-picker
                  class="w-full"
                  show-time
                  format="YYYY-MM-DD HH:mm"
                  v-model:model-value="params.timestamp_end"
                  @change="refresh"
              />
            </a-form-item>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full bg-[var(--theme-dark-2)] rounded py-2 md:py-6">
      <div id="chart" class="w-full h-[300px] md:h-[500px]"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue"
import * as echarts from "echarts";
import {client} from "@/assets/lib/request";
import {Notification} from "@arco-design/web-vue";
import {useRoute} from "vue-router";
import {flat_query} from "@/assets/lib/utils";


const route = useRoute()
const today = new Date(new Date().toLocaleDateString()).getTime()

const loading = ref(true)
const params = ref<{
  timestamp_start: Date
  timestamp_end: Date
  table: 1 | 2 | 3 | 4 | 5
}>({
  timestamp_start: new Date(Number(flat_query(route.query.start)) || today),
  timestamp_end: new Date(Number(flat_query(route.query.end)) || (today + 24 * 60 * 60 * 1000 - 1)),
  table: 1
})
let chart: echarts.EChartsType
const points = ref<Point[]>([])
const lives = ref<Live[]>([])

const get_data = async () => {
  try {
    loading.value = true
    const res = await client.get<{ lives: Live[], points: Point[] }>({
      url: "chart",
      params: {
        table: params.value.table,
        timestamp_start: new Date(params.value.timestamp_start).getTime(),
        timestamp_end: new Date(params.value.timestamp_end).getTime(),
      }
    })

    if (res.code === 100) {
      points.value = res.data.points
      lives.value = res.data.lives
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

const refresh = async () => {
  get_data().then(() => {
    chart.setOption({
      title: {
        text: ["累计观看人数", "在线人数", "粉丝团人数", "点赞总数", "热度排名"][params.value.table - 1],
      },
      grid: {
        left: "15%",
        // containLabel: true
      },
      yAxis: {
        min: params.value.table === 5 ? 1 : 0,
        inverse: params.value.table === 5,
      },
      dataZoom: [
        {
          type: "inside",
          start: 0,
          end: 100,
          backgroundColor: "rgba( 78,186,238, 0.2)",
          borderColor: "#4ebaee",
        },
        {
          start: 0,
          end: 100,
          backgroundColor: "rgba( 78,186,238, 0.2)",
          borderColor: "#4ebaee",
        }
      ],
      series: [{
        markLine: {
          symbol: ["none", "none"],
          label: {show: false},
          data: [
            ...lives.value.map(x => ({xAxis: x.timestamp_start})),
            ...lives.value.filter(x => x.timestamp_end).map(x => ({xAxis: x.timestamp_end})),
          ]
        },
        name: ["人数", "人数", "人数", "总数", "排名"][params.value.table - 1],
        data: points.value.filter(x => x.count).map((x: Point) => ({
          name: "1",
          value: [x.timestamp, x.count.toFixed()]
        })),
        markArea: {
          data: lives.value.map(x => {
            if (x.timestamp_end) {
              return [
                {name: "直播时段", xAxis: x.timestamp_start, itemStyle: {color: "rgba(0, 0, 0, 0)"}},
                {xAxis: x.timestamp_end},
              ]
            } else {
              return [
                {name: "正在直播", xAxis: x.timestamp_start, label: {color: "#4ebaee"}},
                {xAxis: x.timestamp_end}
              ]
            }
          })
        }
      }],
      visualMap: {
        type: "piecewise",
        show: false,
        dimension: 0,
        seriesIndex: 0,
        pieces: [
          ...lives.value.map(x => ({
            gt: x.timestamp_start, lt: x.timestamp_end || 9999999999999, color: "rgba(78,186,238, 0.2)"
          }))
        ]
      },
    })
  })
}

onMounted(() => {
  chart = echarts.init(document.getElementById("chart"))
  chart.setOption({
    title: {
      x: "center",
      textStyle: {
        color: "#fac859",
      }
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        animation: false
      }
    },
    xAxis: {
      type: "time",
      boundaryGap: false
    },
    yAxis: {
      type: "value",
      boundaryGap: [0, "10%"],
      axisLabel: {
        formatter: function (value: number) {
          if (value > 1e4) {
            return (value / 1e4).toFixed(1).toString() + "w"
          } else if (value > 1e3) {
            return (value / 1e3).toFixed(1).toString() + "k"
          } else {
            return value.toString()
          }
        }
      }
    },
    series: [
      {
        type: "line",
        smooth: 0.6,
        symbol: "none",
        lineStyle: {
          color: "#4ebaee"
        },
        areaStyle: {}
      }
    ]
  })

  refresh()
})
</script>

<style scoped lang="less">

</style>
