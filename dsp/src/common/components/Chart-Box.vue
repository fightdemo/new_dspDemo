<template>
    <div class="chart" ref="echarts"></div>
</template>

<script>
import echarts from "echarts";
export default {
    data() {
        return {
            chartOpt: {
                data1: [],
                data2: [],
                title1: '',
                title2: '',
                xAxis: []
            },
            screenWidth: document.body.clientWidth,
        }
    },
    props: {
        data: Object,
        targetList: Object,
    },
    mounted() {
        const that = this;
        window.onresize = () => {
            return (() => {
                window.screenWidth = document.body.clientWidth
                that.screenWidth = window.screenWidth
            })()
        }  
    },
    watch: {
        targetList: {
            handler(newVal, oldVal){
                this.chartOpt = {
                    data1: newVal.data1,
                    data2: newVal.data2,
                    title1: newVal.title1,
                    title2: newVal.title2,
                    xAxis: newVal.xAxis
                }
                this.setChart(this.chartOpt)
            },
            deep: true
        },
        screenWidth(val) {
            this.resize()
        },
    },
    methods: {
        //取到最近一个能被5整除的数
        fiveMultiple(val) {
            if (val <= 0) return 0;
            if (val <= 1) return 1;
            return val - val % 5 + 5
        },
        setChart(option){
            var myChart = echarts.init(this.$refs.echarts);
            myChart.clear();
            var y1 = {},y2 = {};
            //y1.data = [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3];
            y1.data = option.data1;
            y1.min = 0;
            y1.max = this.fiveMultiple(Math.max.apply(0,y1.data));
            y1.min = y1.min == y1.max ? 0 : y1.min;
            y1.interval = Number(((y1.max - y1.min) / 5).toFixed(3));
            //y2.data = [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2];
            y2.data = option.data2;
            y2.min = 0;
            y2.max = this.fiveMultiple(Math.max.apply(0,y2.data));
            y2.min = y2.min == y2.max ? 0 : y2.min;
            y2.interval = Number(((y2.max - y2.min) / 5).toFixed(3));

            var option = {
                tooltip: {
                    trigger: 'axis',
                },
                legend: {
                    data:[option.title1, option.title2],
                    textStyle:{
                        color:"#fff"
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        data: option.xAxis,
                        axisPointer: {
                            type: 'shadow'
                        },
                        axisLine: {
                            lineStyle: {
                                color: "#fff",
                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: option.title1,
                        min: y1.min,
                        max: y1.max,
                        interval: y1.interval,
                        axisLine: {
                            lineStyle: {
                                color: "#fff",
                            }
                        }
                    },
                    {
                        type: 'value',
                        name: option.title2,
                        min: y2.min,
                        max: y2.max,
                        interval: y2.interval,
                        axisLine: {
                            lineStyle: {
                                color: "#fff",
                            }
                        }
                    }
                ],
                series: [
                    {
                        name:option.title1,
                        type:'bar',
                        color: ["#5ab1ef"],
                        data: y1.data
                    },
                    {
                        name: option.title2,
                        type: 'line',
                        yAxisIndex: 1,
                        color: ['#2ec7c9'],
                        data: y2.data
                    }
                ]
            };
            myChart.setOption(option);
        },
        resize() {
            var myChart = echarts.init(this.$refs.echarts);
            myChart.resize()
        },
    }
}
</script>

<style lang="less">
.chart {
    width: 90%;
    height: 400px;
    margin: 30px auto;
}
</style>