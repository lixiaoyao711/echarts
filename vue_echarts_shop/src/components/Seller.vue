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
        window.addEventListener('resize', this.resizeFunc);
        this.resizeFunc();
    },
    destroyed() {
        clearInterval(this.timerID);
        window.removeEventListener('resize', this.resizeFunc);
    },
    //监听
    watch: {},
    //方法
    methods: {
        initChart() {
            this.mChart = this.$charts.init(this.$refs.chart, 'chalk');
            // 图标初始化配置
            let initOption = {
                title: {
                    text: '商家销售统计',
                    left: 20,
                    top: 20,
                },
                grid: {
                    top: '20%',
                    left: '3%',
                    right: '6%',
                    bottom: '3%',
                    containLabel: true, //是否包含文字
                },
                xAxis: {
                    type: 'value',
                },
                yAxis: {
                    type: 'category',
                    // data: name,
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        z: 0,
                        type: 'line',
                        lineStyle: {
                            color: '#2d3443',
                        },
                    },
                },
                series: [
                    {
                        type: 'bar',
                        // data: value,
                        label: {
                            show: true,
                            position: 'right',
                            textStyle: {
                                color: '#fff',
                            },
                        },
                        itemStyle: {
                            barBorderRadius: [0, 60, 60, 0],

                            color: new this.$charts.graphic.LinearGradient(0, 0, 1, 0, [
                                { offset: 0, color: '#5052EE' },
                                { offset: 0, color: '#AB6EE5' },
                            ]),
                        },
                    },
                ],
            };
            this.mChart.setOption(initOption);
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
            this.totalPage = this.allData.length % 5 === 0 ? this.allData.length / 5 : this.allData.length / 5 + 1;

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
            // 初始化data
            let dataOptino = {
                yAxis: {
                    data: name,
                },
                series: [
                    {
                        data: value,
                    },
                ],
            };
            this.mChart.setOption(dataOptino);
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
        resizeFunc() {
            const titleFontSize = (this.$refs.chart.offsetWidth / 100) * 3.6;
            console.log(titleFontSize / 2);
            let updataOption = {
                title: {
                    textStyle: {
                        fontSize: titleFontSize,
                    },
                    tooltip: {
                        axisPointer: {
                            lineStyle: {
                                width: titleFontSize,
                            },
                        },
                    },
                    series: [
                        {
                            barWidth: titleFontSize,
                        },
                    ],
                },
            };
            this.mChart.setOption(updataOption);
            this.mChart.resize();
        },
    },
};
</script>
<style lang="less" scoped></style>
