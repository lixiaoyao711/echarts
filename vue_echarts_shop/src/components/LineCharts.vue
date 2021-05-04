<template>
    <div class="com-content">
        <div class="titile" :style="comStyle">
            <span>{{ showTitle }}</span
            ><span class="icon" @click="isShow = !isShow">V</span>
            <div class="select" v-show="isShow">
                <div v-for="(item, index) in selectType" :key="index" @click="changeType(item.key)">
                    {{ item.text }}
                </div>
            </div>
        </div>
        <div class="com-chart" ref="chart"></div>
    </div>
</template>
<script>
export default {
    name: 'LineCharts',
    //组件传值
    props: {},
    //注册组件
    components: {},
    //计算属性
    computed: {
        selectType() {
            if (!this.allData) {
                return [];
            } else {
                return this.allData.type;
            }
        },
        showTitle() {
            if (!this.allData) {
                return '';
            } else {
                return this.allData[this.showType].title;
            }
        },
        // 设置给标题的样式
        comStyle() {
            return {
                fontSize: this.titleFontSize + 'px',
            };
        },
    },
    //数据
    data() {
        return {
            chart: null,
            allData: [],
            isShow: false,
            showType: 'map',
            titleFontSize: 0,
        };
    },
    //创建完成
    created() {},

    //挂载完成
    mounted() {
        this.initChart();
        this.getData();
        window.addEventListener('resize', this.resizeFunc);
        this.resizeFunc();
    },
    destroyed() {
        window.removeEventListener('resize', this.resizeFunc);
    },
    //监听
    watch: {},
    //方法
    methods: {
        initChart() {
            this.chart = this.$charts.init(this.$refs.chart, 'chalk');
            let initOption = {
                grid: {
                    left: '3%',
                    top: '35%',
                    right: '4%',
                    buttom: '1%',
                    containLabel: true,
                },
                tooltip: {
                    trigger: 'axis',
                },
                legend: {
                    left: 20,
                    top: '15%',
                    icon: 'circle',
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                },
                yAxis: {
                    type: 'value',
                },
            };
            this.chart.setOption(initOption);
        },
        async getData() {
            const { data: res } = await this.$http.get('trend');
            this.allData = res;
            console.log(this.allData);
            this.updataChart();
        },
        updataChart() {
            const color1 = [
                'rgba(11,168,44,0.5)',
                'rgba(44,110,255,0.5)',
                'rgba(22,242,217,0.5)',
                'rgba(254,33,30,0.5)',
                'rgba(250,105,0,0.5)',
            ];
            const color2 = [
                'rgba(11,168,44,0)',
                'rgba(44,110,255,0)',
                'rgba(22,242,217,0)',
                'rgba(254,33,30,0)',
                'rgba(250,105,0,0)',
            ];
            // x的数据
            let timeArr = this.allData.common.month;
            // y的数据
<<<<<<< HEAD
            let valueArr = this.allData[this.showType].data;
            let seriesArr = valueArr.map((item, index) => {
=======
            let valueArr = this.allData.map.data;
            let seriesArr = valueArr.map(item => {
>>>>>>> 96eb8ea0f52a6d3d1c4cbfc644b525ee99b84d5b
                return {
                    name: item.name,
                    type: 'line',
                    data: item.data,
<<<<<<< HEAD
                    stack: this.showType,
                    areaStyle: {
                        color: new this.$charts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: color1[index],
                            },
                            {
                                offset: 1,
                                color: color2[index],
                            },
                        ]),
                    },
                };
            });
            // 图例的数据
            let legenArr = valueArr.map(item => {
=======
                    stack: 'map',
                    areaStyle: {},
                };
            });
            //图里的数据
            const legendArr = valueArr.map(item => {
>>>>>>> 96eb8ea0f52a6d3d1c4cbfc644b525ee99b84d5b
                return item.name;
            });
            let dataOption = {
                xAxis: {
                    data: timeArr,
                },
                legend: {
<<<<<<< HEAD
                    data: legenArr,
=======
                    data: legendArr,
>>>>>>> 96eb8ea0f52a6d3d1c4cbfc644b525ee99b84d5b
                },
                series: seriesArr,
            };
            this.chart.setOption(dataOption);
        },
        resizeFunc() {
            this.titleFontSize = (this.$refs.chart.offsetWidth / 100) * 3.6;
            let updataOption = {
                legend: {
                    itemWidth: this.titleFontSize,
                    itemHeight: this.titleFontSize,
                    itemGap: this.titleFontSize,
                    textStyle: {
                        fontSize: this.titleFontSize / 2,
                    },
                },
            };
            this.chart.setOption(updataOption);
            this.chart.resize();
        },
        changeType(val) {
            this.showType = val;
            this.updataChart();
            this.isShow = false;
        },
    },
};
</script>
<style lang="less" scoped>
.box {
}
.select {
    background: #222333;
}
.titile {
    position: absolute;
    left: 20px;
    z-index: 2;
    color: #fff;
    top: 20px;
    .icon {
        margin-left: 10px;
        cursor: pointer;
    }
}
</style>
