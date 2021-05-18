<template>
    <div class="com-content">
        <div class="com-chart" ref="chart_ref"></div>
    </div>
</template>

<script>
export default {
    name: 'Stock',
    // 组件传值
    props: {},
    // 注册组件
    components: {},
    data() {
        return {
            chart: null,
            pieData: [],
            currentIndex: 0,
            timer: null,
        };
    },
    // 计算属性
    computed: {},
    // 监听
    watch: {},
    // 创建完成
    created() {},
    // 挂载完成
    async mounted() {
        await this.getData();
        this.initCharts();
        this.resizeFun();
        window.addEventListener('resize', this.resizeFun);
    },
    destroyed() {
        this.timer && clearInterval(this.timer);
        window.removeEventListener('resize', this.resizeFun);
    },
    // 方法
    methods: {
        async getData() {
            const { data: res } = await this.$http.get('stock');
            this.pieData = res;
            console.log(this.pieData);
            this.startInterval();
        },
        // 初始化饼图
        initCharts() {
            this.chart = this.$charts.init(this.$refs.chart_ref, 'chalk');
            // --------------------给饼图设置渐变颜色--------------------------
            // let colorMap = {
            //     烟雾数: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
            //         { offset: 0, color: '#F77392' },
            //         { offset: 1, color: '#EC3F59' },
            //     ]),
            //     燃气数: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
            //         { offset: 0, color: '#F8DC77' },
            //         { offset: 1, color: '#E5981D' },
            //     ]),
            //     电力数: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
            //         { offset: 0, color: '#56BFFD' },
            //         { offset: 1, color: '#2B8BF9' },
            //     ]),
            //     其他: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
            //         { offset: 0, color: '#53DEC4' },
            //         { offset: 1, color: '#29BA91' },
            //     ]),
            // };
            // let color = this.pieData.map(e => {
            //     console.log(colorMap[e.name]);
            //     return colorMap[e.name];
            // });
            let centerArr = [
                ['10%', '40%'],
                ['48%', '40%'],
                ['82%', '40%'],
                ['34%', '75%'],
                ['66%', '75%'],
            ];
            let colorArr = [
                ['#4ff778', '#0ba82c'],
                ['#e5dd45', '#e8b11c'],
                ['#e8821c', '#e55445'],
                ['#5052ee', '#ab6ee5'],
                ['#23e5e5', '#2e72bf'],
            ];
            let start = this.currentIndex * 5;
            let end = (this.currentIndex + 1) * 5;
            let showData = this.pieData.slice(start, end);
            let seriesArr = showData.map((item, index) => {
                return {
                    type: 'pie',
                    radius: [110, 100],
                    center: centerArr[index],
                    hoverAnimation: false,
                    labelLine: {
                        show: false,
                    },
                    label: {
                        position: 'center',
                        color: colorArr[index][0],
                    },
                    data: [
                        {
                            name: item.name + '\n' + item.sales,
                            value: item.sales,
                            itemStyle: {
                                color: new this.$charts.graphic.LinearGradient(0, 1, 0, 0, [
                                    { offset: 0, color: colorArr[index][0] },
                                    { offset: 1, color: colorArr[index][1] },
                                ]),
                            },
                        },
                        {
                            value: item.stock,
                            itemStyle: {
                                color: '#333843',
                            },
                        },
                    ],
                };
            });
            let option = {
                // color,
                title: {
                    show: true,
                    text: '库存销量分析',
                    subtext: '',
                    textStyle: {
                        fontSize: 16,
                        color: '#ffffff',
                    },
                    subtextStyle: {
                        color: '',
                        fontSize: 16,
                    },
                    top: '20',
                    right: '5%',
                    bottom: '5%',
                    left: '20',
                },
                tooltip: {
                    trigger: 'item',
                },
                legend: {
                    show: false,
                    top: '5%',
                    right: '5%',
                    bottom: '5%',
                    left: '5%',
                    orient: 'horizontal', //图例列表的布局朝向。horizontal横排,vertical竖排
                    icon: 'circle', //'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
                    fontSize: '12',
                    // formatter: '{a|ihohi}',
                    formatter: val => {
                        return val;
                    },
                    textStyle: {},
                },
                series: seriesArr,
            };
            this.chart.setOption(option);
            this.chart.on('mouseover', () => {
                this.timer && clearInterval(this.timer);
            });
            this.chart.on('mouseout', () => {
                this.timer && clearInterval(this.timer);
                this.startInterval();
            });
        },
        startInterval() {
            this.timer && clearInterval(this.timer);
            this.timer = setInterval(() => {
                this.currentIndex++;
                if (this.currentIndex > 1) {
                    this.currentIndex = 0;
                }
                this.initCharts();
            }, 5000);
        },
        resizeFun() {
            const titleFontSize = (this.$refs.chart_ref.offsetWidth / 100) * 3.6;
            let innerRadius = titleFontSize * 2;
            let outterRadius = titleFontSize * 1.12;
            console.log(innerRadius, outterRadius);
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
                            radius: [outterRadius, innerRadius],
                            label: {
                                fontSize: titleFontSize / 2,
                            },
                        },
                        {
                            radius: [outterRadius, innerRadius],
                            label: {
                                fontSize: titleFontSize / 2,
                            },
                        },
                        {
                            radius: [outterRadius, innerRadius],
                            label: {
                                fontSize: titleFontSize / 2,
                            },
                        },
                        {
                            radius: [outterRadius, innerRadius],
                            label: {
                                fontSize: titleFontSize / 2,
                            },
                        },
                        {
                            radius: [outterRadius, innerRadius],
                            label: {
                                fontSize: titleFontSize / 2,
                            },
                        },
                    ],
                },
            };
            this.chart.setOption(updataOption);
            this.chart.resize();
        },
    },
};
</script>

<style scoped lang="less"></style>
