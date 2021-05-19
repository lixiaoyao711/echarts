<template>
    <div class="com-content">
        <div class="com-chart" ref="chart_ref"></div>
    </div>
</template>
<script>
export default {
    name: 'Hot',
    //组件传值
    props: {},
    //注册组件
    components: {},
    //计算属性
    computed: {},
    //数据
    data() {
        return {
            allData: [],
        };
    },
    //创建完成
    created() {},
    //挂载完成
    mounted() {
        this.initChart();
        this.getData();
        window.addEventListener('resize', this.resizeFun);
        this.resizeFun();
    },
    destroyed() {
        window.removeEventListener('resize', this.resizeFun);
    },
    //监听
    watch: {},
    //方法
    methods: {
        initChart() {
            this.chart = this.$charts.init(this.$refs.chart_ref);
            let initOption = {};
            this.chart.setOption(initOption);
        },
        async getData() {
            const { data: res } = await this.$http.get('');
            this.allData = res;
            this.updateChart();
        },
        updateChart() {
            let dataOption = {};
            this.chart.setOption(dataOption);
        },
    },
};
</script>
<style lang="less" scoped></style>
