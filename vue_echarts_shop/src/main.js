import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import * as echarts from 'echarts';
import axios from 'axios';
import chalk from '../public/static/theme/chalk.js';

import SocktService from './utils/socket_service';
SocktService.Instance.connect();

import './assets/css/global.css';

chalk;

Vue.prototype.$charts = echarts;
Vue.prototype.$http = axios;
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
