<template>
    <div class="com-content">
        <div class="com-chart" ref="rank_ref"></div>
    </div>
</template>
<script>
export default {
    name: 'Rank',
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
            allData: null,
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
            this.chart = this.$charts.init(this.$refs.rank_ref);
            let initOption = {
                xAxis: {
                    type: 'category',
                },
                yAxis: {
                    type: 'value',
                },
                series: [{ type: 'bar' }],
            };
            this.chart.setOption(initOption);
        },
        async getData() {
            const { data: res } = await this.$http.get('rank');
            this.allData = res;
            this.allData.sort((a, b) => {
                return b.value - a.value;
            });
            console.log(this.allData);
            this.updataChart();
        },
        updataChart() {
            // 所有省份得数组
            let proArr = this.allData.map(item => {
                return item.name;
            });
            // 所有省份对应得销售金额
            let valueArr = this.allData.map(item => {
                return item.value;
            });
            let UpdataOption = {
                xAxis: {
                    data: proArr,
                },
                series: [
                    {
                        data: valueArr,
                    },
                ],
            };
            this.chart.setOption(UpdataOption);
        },
        resizeFun() {},
    },
};
</script>
<style lang="less" scoped>
.box {
}
</style>
