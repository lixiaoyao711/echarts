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
            this.chart = this.$charts.init(this.$refs.chart);
            let initOption = {};
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
            let dataOption = {};
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
