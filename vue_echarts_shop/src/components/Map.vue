<template>
    <div class="com-content" @dblclick="backMap">
        <div class="com-chart" ref="map_ref"></div>
    </div>
</template>
<script>
import axios from 'axios';
import { getProvinceMapInfo } from '../utils/map_utils';
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
            mapData: {}, //省份地图矢量数据
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
        async initChart() {
            this.chart = this.$charts.init(this.$refs.map_ref, 'chalk');
            // 由于地图数据不是在koa2的后台,所以不能使用$http
            const res = await axios.get('http://localhost:8889/static/map/china.json');
            console.log(res);
            this.$charts.registerMap('china', res.data);
            let initOption = {
                title: {
                    text: '商家分布▮',
                    left: 20,
                    top: 20,
                },
                geo: {
                    type: 'map',
                    map: 'china',
                    top: '5%',
                    bottom: '5%',
                    itemStyle: {
                        areaColor: '#2e72bf',
                        borderColor: '#333',
                    },
                },
                legend: {
                    left: '5%',
                    bottom: '5%',
                    orient: 'vertical',
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
            // 涟漪效果
            const seriesArr = this.allData.map(item => {
                // 如果想在地图中显示散点数据,所以我们需要给散点的图表增加一个配置中,coordinateSystem:'geo'
                return {
                    type: 'effectScatter',
                    rippleEffect: {
                        scale: 5,
                        brushType: 'stroke',
                    },
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
            // 地图单机时间
            this.chart.on('click', async age => {
                // age.name是中文
                let mapInfo = getProvinceMapInfo(age.name);
                // 获取矢量数据
                // 判断当前点击得省份地图数据,在mapdata中是否存在
                if (!this.mapData[mapInfo.key]) {
                    let res = await axios.get(`http://localhost:8889${mapInfo.path}`);
                    this.mapData[mapInfo.key] = res.data;
                    this.$charts.registerMap(mapInfo.key, res.data);
                }
                let changeOption = {
                    geo: {
                        map: mapInfo.key,
                    },
                };
                this.chart.setOption(changeOption);
            });
        },
        resizeFun() {
            let titleFontSize = (this.$refs.map_ref.offsetWidth / 100) * 3.6;
            let updataOption = {
                title: {
                    textStyle: {
                        fontSize: titleFontSize,
                    },
                },
                legend: {
                    itemWidth: titleFontSize / 2,
                    itemHeight: titleFontSize / 2,
                    itemGap: titleFontSize / 2,
                    textStyle: {
                        fontSize: titleFontSize / 2,
                    },
                },
            };
            this.chart.setOption(updataOption);
            this.chart.resize();
        },
        // 双击回到中国地图
        backMap() {
            let backOption = {
                geo: {
                    map: 'china',
                },
            };
            this.chart.setOption(backOption);
        },
    },
};
</script>
<style lang="less" scoped>
.box {
}
</style>
