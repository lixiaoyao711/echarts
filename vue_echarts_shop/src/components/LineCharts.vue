<template>
    <div class="com-content">
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
    computed: {},
    //数据
    data() {
        return {
            chart: null,
            allData: [],
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
            // console.log(res);
            this.allData = res;
            this.updataChart();
        },
        updataChart() {
            // x的数据
            let timeArr = this.allData.common.month;
            // y的数据
            let valueArr = this.allData.map.data;
            let seriesArr = valueArr.map(item => {
                return {
                    name: item.name,
                    type: 'line',
                    data: item.data,
                    stack: 'map',
                    areaStyle: {},
                };
            });
            //图里的数据
            const legendArr = valueArr.map(item => {
                return item.name;
            });
            let dataOption = {
                xAxis: {
                    data: timeArr,
                },
                legend: {
                    data: legendArr,
                },
                series: seriesArr,
            };
            this.chart.setOption(dataOption);
        },
        resizeFunc() {
            let updataOption = {};
            this.chart.setOption(updataOption);
            this.chart.resize();
        },
    },
};
</script>
<style lang="less" scoped>
.box {
}
</style>
