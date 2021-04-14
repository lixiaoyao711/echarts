<template>
    <div class="com-content">
        <div class="com-chart" ref="chart"></div>
    </div>
</template>
<script>
export default {
    name: 'Seller',
    //组件传值
    props: {},
    //注册组件
    components: {},
    //计算属性
    computed: {},
    //数据
    data() {
        return {
            mChart: null,
            allData: [],
            currentPage: 1, //当前第几页
            totalPage: 0, //一共多少也
            timerID: null,
        };
    },
    //创建完成
    created() {},
    //挂载完成
    mounted() {
        this.initChart();

        this.getData();

        // this.updataChart();
    },
    destroyed() {
        clearInterval(this.timerID);
    },
    //监听
    watch: {},
    //方法
    methods: {
        initChart() {
            this.mChart = this.$charts.init(this.$refs.chart);

            this.mChart.on('mouseover', () => {
                clearInterval(this.timerID);
            });
            this.mChart.on('mouseout', () => {
                this.startInterval();
            });
        },
        async getData() {
            const { data: res } = await this.$http.get('seller');
            this.allData = res;
            this.allData.sort((a, b) => {
                return a.value - b.value;
            });
            this.totalPage =
                this.allData.length % 5 === 0
                    ? this.allData.length / 5
                    : this.allData.length / 5 + 1;

            this.updataChart();
            this.startInterval();
        },
        updataChart() {
            const start = (this.currentPage - 1) * 5;
            const end = this.currentPage * 5;
            const showData = this.allData.slice(start, end);
            const name = showData.map(item => {
                return item.name;
            });
            const value = showData.map(item => {
                return item.value;
            });

            let optino = {
                xAxis: {
                    type: 'value',
                },
                yAxis: {
                    type: 'category',
                    data: name,
                },
                series: [
                    {
                        type: 'bar',
                        data: value,
                    },
                ],
            };
            this.mChart.setOption(optino);
        },
        startInterval() {
            this.timerID ? clearInterval(this.timerID) : '';
            this.timerID = setInterval(() => {
                this.currentPage++;
                if (this.currentPage > this.totalPage) {
                    this.currentPage = 1;
                }
                this.updataChart();
            }, 3000);
        },
    },
};
</script>
<style lang="less" scoped></style>
