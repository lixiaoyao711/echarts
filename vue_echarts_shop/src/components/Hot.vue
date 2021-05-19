<template>
    <div class="com-content">
        <div class="com-chart" ref="chart_ref"></div>
        <span class="left" @click="toLeft" :style="spanStyle"><</span>
        <span class="right" @click="toRight" :style="spanStyle">></span>
        <span class="title" :style="spanStyle">{{ catName }}</span>
    </div>
</template>
<script>
export default {
    name: 'Hot',
    //组件传值
    props: {},
    //注册组件
    components: {},
    //数据
    data() {
        return {
            allData: null,
            currentIndex: 0,
            titleFontSize: 0,
        };
    },
    //计算属性
    computed: {
        catName() {
            if (!this.allData) {
                return '';
            } else {
                return this.allData[this.currentIndex].name;
            }
        },
        spanStyle() {
            return {
                fontSize: this.titleFontSize + 'px',
            };
        },
    },
    //创建完成
    created() {},
    //挂载完成
    mounted() {
        this.initChart();
        this.getData();
        this.resizeFun();

        window.addEventListener('resize', this.resizeFun);
    },
    destroyed() {
        window.removeEventListener('resize', this.resizeFun);
    },
    //监听
    watch: {},
    //方法
    methods: {
        initChart() {
            this.chart = this.$charts.init(this.$refs.chart_ref, 'chalk');
            let initOption = {
                title: {
                    text: '▮热销商品占比',
                    left: 20,
                    top: 20,
                },
                legend: {
                    top: '5%',
                    icon: 'circle',
                },
                tooltip: {
                    show: true,
                    formatter: val => {
                        let data = val.data.children;
                        let sum = 0;
                        data.forEach(e => {
                            sum += e.value;
                        });
                        let returnStr = '';
                        data.forEach(e => {
                            returnStr += `${e.name}:${parseInt((e.value / sum) * 100)}% <br/>`;
                        });
                        return returnStr;
                    },
                },
                series: {
                    type: 'pie',
                    label: {
                        show: false,
                    },
                    emphasis: {
                        label: {
                            show: true,
                        },
                    },
                    labelLine: {
                        show: false,
                    },
                },
            };
            this.chart.setOption(initOption);
        },
        async getData() {
            const { data: res } = await this.$http.get('hotproduct');
            this.allData = res;
            this.updateChart();
        },
        updateChart() {
            let legendData = this.allData[this.currentIndex].children.map(item => {
                return item.name;
            });
            let seriesData = this.allData[this.currentIndex].children.map(item => {
                return {
                    name: item.name,
                    value: item.value,
                    children: item.children,
                };
            });
            let dataOption = {
                legend: {
                    data: legendData,
                },
                series: [
                    {
                        data: seriesData,
                    },
                ],
            };
            this.chart.setOption(dataOption);
        },
        resizeFun() {
            this.titleFontSize = (this.$refs.chart_ref.offsetWidth / 100) * 3.6;
            let resizeOption = {
                title: {
                    textStyle: {
                        text: this.titleFontSize,
                    },
                },
                legend: {
                    itemWidth: this.titleFontSize / 2,
                    itemHeight: this.titleFontSize / 2,
                    itemGap: this.titleFontSize / 2,
                },
                series: [
                    {
                        redius: this.titleFontSize * 4.5,
                        center: ['50%', '55%'],
                    },
                ],
            };
            this.chart.setOption(resizeOption);
            this.chart.resize();
        },
        toLeft() {
            this.currentIndex--;
            this.currentIndex < 0 ? (this.currentIndex = this.allData.length - 1) : '';
            this.updateChart();
        },
        toRight() {
            this.currentIndex++;
            this.currentIndex > this.allData.length - 1 ? (this.currentIndex = 0) : '';
            this.updateChart();
        },
    },
};
</script>
<style lang="less" scoped>
.left {
    position: absolute;
    left: 10%;
    top: 50%;
    transform: translateY(-50%);
    color: #fff;
    font-size: 30px;
    cursor: pointer;
}
.right {
    position: absolute;
    right: 10%;
    top: 50%;
    transform: translateY(-50%);
    color: #fff;
    font-size: 30px;
    cursor: pointer;
}
.title {
    position: absolute;
    left: 80%;
    bottom: 20px;
    color: #fff;
}
</style>
