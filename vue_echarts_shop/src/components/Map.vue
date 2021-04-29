<template>
    <div class="com-content">
        <div class="com-chart" ref="map_ref"></div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'Map',
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
        window.addEventListener('resize', this.screenAdapter);
        this.screenAdapter();
    },
    destroyed() {
        window.removeEventListener('resize', this.screenAdapter);
    },
    //监听
    watch: {},
    //方法
    methods: {
        async initChart() {
            this.chart = this.$charts.init(this.$refs.map_ref);
            // 由于地图数据不是在koa2的后台,所以不能使用$http
            const res = await axios.get('http://localhost:8889/static/map/china.json');
            console.log(res);
            this.$charts.registerMap('china', res.data);
            let initOption = {
                geo: {
                    type: 'map',
                    map: 'china',
                },
            };
            this.chart.setOption(initOption);
        },
        async getData() {
            const { data: res } = await this.$http.get('map');
            this.allData = res;
            this.updateChart();
        },
        updateChart() {
            const legendArr = this.allData.map(item => {
                return item.name;
            });
            const seriesArr = this.allData.map(item => {
                // 如果想在地图中显示散点数据,所以我们需要给散点的图表增加一个配置中,coordinateSystem:'geo'
                return {
                    type: 'effectScatter',
                    name: item.name,
                    data: item.children,
                    coordinateSystem: 'geo',
                };
            });
            const dataOption = {
                legend: {
                    legendArr,
                },
                series: seriesArr,
            };

            this.chart.setOption(dataOption);
        },
        screenAdapter() {},
    },
};
</script>
<style lang="less" scoped>
.box {
}
</style>
