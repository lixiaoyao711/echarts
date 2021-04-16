<template>
    <div class="com-page"><LineCharts /></div>
</template>
<script>
import LineCharts from '@/components/LineCharts';
export default {
    name: 'LinePage',
    //组件传值
    props: {},
    //注册组件
    components: {
        LineCharts,
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
