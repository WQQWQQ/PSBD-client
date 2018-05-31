import './style/variables.less';

import 'babel-polyfill';
import promise from 'es6-promise';
promise.polyfill();

import './lib/shim/iview-shim';
// import './lib/shim/html5';
// import './lib/shim/es5-shim.js';

import Vue from 'vue';
Vue.config.productionTip = false;

import iView from 'iview';
Vue.use(iView);

import './services/registerComponent';


// import eCharts from 'echarts';
import eCharts from 'echarts/lib/echarts';
import "echarts/lib/chart/graph";
import "echarts/lib/chart/line";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/map";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/visualMap";
import "echarts/lib/component/legendScroll";
Vue.prototype.$eCharts = eCharts;

import {
    $http
}
from './services/getData';
Vue.prototype.$http = $http;

import lazyload from './services/lazyload';
Vue.use(lazyload);

import App from './App';
import router from './router';
// import store from './store';

new Vue({
    el: '#app',
    router,
    // store,
    template: '<App/>',
    components: {
        App
    }
});
