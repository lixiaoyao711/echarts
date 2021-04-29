import Vue from 'vue';
import VueRouter from 'vue-router';
import SellerPage from '../views/SellerPage.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        // meta: {
        //     title: '七彩优童',
        // },
        redirect: '/sellerpage',
    },
    {
        path: '/sellerpage',
        component: SellerPage,
    },
    {
        path: '/linepage',
        component: () => import('../views/LinePage.vue'),
    },
    {
        path: '/mappage',
        component: () => import('../views/MapPage.vue'),
    },
];

const router = new VueRouter({
    routes,
});

export default router;
