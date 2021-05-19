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
            startValue: 0, //区域缩放的起点值
            endValue: 9, //区域缩放的终点数值
            timerId: null,
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
        clearInterval(this.timerId);
    },
    //监听
    watch: {},
    //方法
    methods: {
        initChart() {
            this.chart = this.$charts.init(this.$refs.rank_ref, 'chalk');
            let titleFontSize = (this.$refs.rank_ref.offsetWidth / 100) * 3.6;

            let initOption = {
                title: {
                    text: '▮地区销售排行',
                    left: 20,
                    top: 20,
                    textStyle: {
                        fontSize: titleFontSize,
                    },
                },
                grid: {
                    top: '40%',
                    left: '5%',
                    right: '5%',
                    bottom: '5%',
                    containLabel: true, //是否包含文字
                },
                tooltip: {
                    show: true,
                },
                xAxis: {
                    type: 'category',
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        type: 'bar',
                        barWidth: titleFontSize,
                        itemStyle: {
                            barBorderRadius: [titleFontSize / 2, titleFontSize / 2, 0, 0],
                        },
                    },
                ],
            };
            this.chart.setOption(initOption);
            this.chart.on('mouseover', () => {
                clearInterval(this.timerId);
            });
            this.chart.on('mouseout', () => {
                this.startInterval();
            });
        },
        async getData() {
            const { data: res } = await this.$http.get('rank');
            this.allData = res;
            this.allData.sort((a, b) => {
                return b.value - a.value;
            });
            console.log(this.allData);
            this.updataChart();
            this.startInterval();
        },
        updataChart() {
            let colorArr = [
                ['#0ba82c', '#4ff778'],
                ['#2e72bf', '#23e5e5'],
                ['#5052ee', '#ab6ee5'],
            ];
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
                dataZoom: {
                    show: false,
                    startValue: this.startValue,
                    endValue: this.endValue,
                },
                series: [
                    {
                        data: valueArr,
                        itemStyle: {
                            color: val => {
                                let color = null;
                                if (val.value > 300) {
                                    color = colorArr[0];
                                } else if (val.value > 200) {
                                    color = colorArr[1];
                                } else {
                                    color = colorArr[2];
                                }
                                return new this.$charts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: color[0],
                                    },
                                    {
                                        offset: 1,
                                        color: color[1],
                                    },
                                ]);
                            },
                        },
                    },
                ],
            };
            this.chart.setOption(UpdataOption);
        },
        resizeFun() {
            let titleFontSize = (this.$refs.rank_ref.offsetWidth / 100) * 3.6;
            let resizeOption = {
                title: {
                    textStyle: {
                        fontSize: titleFontSize,
                    },
                },
                series: [
                    {
                        barWidth: titleFontSize,
                        itemStyle: {
                            barBorderRadius: [titleFontSize / 2, titleFontSize / 2],
                        },
                    },
                ],
            };
            this.chart.setOption(resizeOption);
            this.chart.resize();
        },
        startInterval() {
            this.timerId ? clearInterval(this.timerId) : '';
            this.timerId = setInterval(() => {
                this.startValue++;
                this.endValue++;
                if (this.endValue > this.allData.length - 1) {
                    this.startValue = 0;
                    this.endValue = 9;
                }
                this.updataChart();
            }, 2000);
        },
    },
};
</script>
<style lang="less" scoped></style>
