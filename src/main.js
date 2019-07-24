import Vue from 'vue';
import './plugins/axios';

import App from './App.vue';
import router from './router';

import './plugins/element.js';
import '@/icons/index.js'; // icon

import '@/styles/index.scss';

import store from './store';
import storage from 'store';
import VueCookies from 'vue-cookies';
import util from './utils/util';
import ECharts from 'vue-echarts/components/ECharts';

Vue.config.productionTip = false;

Vue.prototype.$storage = storage;
Vue.use(util);
Vue.component('v-chart', ECharts);

//请求
axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.Authorization = `Bearer ${store.state.token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

// 登录路由鉴权

router.beforeEach((to, from, next) => {
  // 判断要去的路由界面是不是要鉴权
  if (to.matched.some(res => res.meta.requireAuth)) {
    // 指向路由配置中的requireAuth: true
    // 查看是否登陆
    let user = storage.get('userLogin');
    if (user === false) {
      // 没登录的做处理
      alert('请先登录');
      next({
        path: '/Login'
      });
    } else {
      // 登陆的正常跳
      next();
    }
  } else {
    // 不需要鉴权的正常跳
    next();
  }
});
