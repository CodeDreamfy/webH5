// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import store from './store/vuex';
import router from './router';
import utils from './utils';


Vue.config.productionTip = false;

/* eslint-disable no-new */
Vue.use(utils);
new Vue({
  store,
  router: router(store),
  template: '<App/>',
  components: { App },
}).$mount('#app');
