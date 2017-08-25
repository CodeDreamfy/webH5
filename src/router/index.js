import Vue from 'vue';
import Router from 'vue-router';
import index from '@/components/index';
import setting from '@/components/setting';
import history from '@/components/history';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'index',
    component: index,
  },
  {
    path: '/setting',
    name: 'setting',
    component: setting,
  }, {
    path: '/history',
    name: 'history',
    component: history,
  },
];


function configRouters(store) {
  const router = new Router({
    routes,
  });
  router.beforeEach((to, from, next) => {
    // to and from are Route Object,next() must be called to resolve the hook
    OJS.bindAppReady(() => {
      OJS.bindReady(() => {
        store.commit('getOnlineStatus');
        // store.dispatch('inQuire');
        OJS.device.bindPushData({
          deviceStatusChange(data) {
            store.dispatch('deviceChangeData', data);
          },
        });
      });
    });
    next();
  });
  return router;
}

export default configRouters;
