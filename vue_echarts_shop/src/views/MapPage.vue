<template>
    <div class="com-page">
        <Map />
    </div>
</template>
<script>
import Map from '../components/Map';
export default {
    name: 'MapPage',
    //组件传值
    props: {},
    //注册组件
    components: {
        Map,
    },
    //计算属性
    computed: {},
    //数据
    data() {
        return {};
    },
    //创建完成
    created() {},
    //挂载完成
    mounted() {},
    //监听
    watch: {},
    //方法
    methods: {},
};
</script>
<style lang="less" scoped>
.box {
}
</style>
