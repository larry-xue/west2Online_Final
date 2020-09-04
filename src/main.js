import Vue from 'vue';
import ElementUI from 'element-ui';
import axios from 'axios';
import vuescroll from 'vuescroll';
import './theme/index.css';
import App from './App.vue';
import router from './router';
import Storage from './storage/storage';
import store from './store';

Vue.use(ElementUI);

Vue.prototype.$storage = Storage;

Vue.prototype.$http = axios;
axios.defaults.baseURL = 'http://39.97.113.252:8080/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'form-data';
axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

// 请求拦截器;
axios.interceptors.request.use((config) => {
  let token = Storage.localGet('token');
  const axiosConfig = config;
  if (token) {
    token = `${'JWT '}${token}`;
    axiosConfig.headers.Authorization = token;
  } else {
    token = `${'JWT '}${Storage.localGet('refresh_token')}`;
    axiosConfig.headers.Authorization = token;
  }
  return axiosConfig;
}, (err) => {
  console.log(err);
});

axios.interceptors.response.use((res) => res, (
  (err) => {
    console.log('err', err.response); // 修改后
    if (err.response.status === 401) {
      router.push('account');
    }
  }
));

Vue.use(vuescroll, {
  ops: {
    vuescroll: {
      mode: 'native',
      sizeStrategy: 'percent',
      detectResize: true,
    },
    scrollPanel: {
      scrollingY: true,
      scrollingX: false,
      speed: 10,
      easing: 'easeInOutQuart',
      verticalNativeBarPos: 'right',
      maxHeight: undefined,
      maxWidth: undefined,
    },
    rail: {
      background: '#01a99a',
      opacity: 0,
      size: '6px',
      gutterOfSide: '2px',
    },
    bar: {
      showDelay: 500,
      onlyShowBarOnScroll: true,
      keepShow: false,
      background: '#c1c1c1',
      opacity: 1,
      hoverStyle: false,
      specifyBorderRadius: false,
      minSize: false,
      size: '6px',
      disable: false,
    },
  }, // 在这里设置全局默认配置
  name: 'vue-scroll', // 在这里自定义组件名字，默认是vueScroll
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
