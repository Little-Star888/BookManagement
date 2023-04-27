<template>
  <div class="view count-view">
    <div class="head-info">
      数据统计与分析&nbsp;&nbsp;&nbsp;
      <span>Data Statistics And Analysis</span>
    </div>
    <template-view>
      <!-- 分类信息柱状统计表 -->
      <div class="columnar">
        <h1
          style="
          font-size: 24px;
          margin: 30px 0 0 0;
          text-align: center;
          color: skyblue;
        "
        >分类信息柱状统计表</h1>
        <div class="echart" id="mychart" :style="myChartStyle"></div>
      </div>

      <!-- 分类信息统计饼图 -->
      <div class="pie">
        <h1
          style="
          font-size: 24px;
          margin: 30px 0 0 0;
          text-align: center;
          color: skyblue;
        "
        >分类信息饼图统计表</h1>
        <template>
          <div ref="myChart" id="myChart1" :style="myChartStyle"></div>
        </template>
      </div>
    </template-view>
  </div>
</template>

<script>
import * as echarts from "echarts";
import http from "@/request/request";
import TemplateView from "../Template/TemplateView.vue";
export default {
  components: {
    TemplateView
  },
  data() {
    return {
      xData: [], // 横坐标
      yData: [
        84,
        17,
        24,
        84,
        17,
        24,
        84,
        17,
        24,
        84,
        17,
        24,
        28,
        24,
        84,
        17,
        28,
        28,
        24,
        84,
        17,
        28,
        24,
        84,
        17,
        24,
        84,
        17
      ], // 数据
      myChartStyle: { float: "left", width: "100%", height: "400px" }, // 图表样式

      pieData: [], // 饼状图数据
      pieLegend: [] // 饼状图分类标签
    };
  },
  mounted() {
    this.getCategory();
    this.getPieData();
  },
  methods: {
    async getCategory() {
      const res = await http.category();
      this.xData = res.map(item => item.Name);
      // console.log(this.xData);
      this.initEcharts();
    },
    async getPieData() {
      const res = await http.category();
      this.pieData = res.map(item => ({
        value: this.yData,
        name: item.Name
      }));

      this.pieLegend = res.map(item => item.Name);
      this.initPieChart();
    },
    initEcharts() {
      // 基本柱状图
      const option = {
        xAxis: {
          data: this.xData,
          axisLabel: {
            interval: 0 //强制所有标签都显示
          }
        },
        yAxis: {},
        series: [
          {
            type: "bar", // 形状为柱状图
            data: this.yData
          }
        ]
      };
      const myChart = echarts.init(document.getElementById("mychart"));
      myChart.setOption(option);
      // 随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    initPieChart() {
      const option = {
        legend: {
          orient: "vertical",
          left: 10,
          data: this.pieLegend
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      const myChart = echarts.init(this.$refs.myChart);
      myChart.setOption(option);
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    }
  }
};
</script>
<style lang="less" scoped>
// .count-view {
// }
</style>
