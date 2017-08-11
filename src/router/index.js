import Vue from 'vue';
import Router from 'vue-router';
import index from '@/components/index';
import setting from '@/components/setting';

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
  },
];


function configRouters() {
  const router = new Router({
    routes,
  });
  router.beforeEach((to, from, next) => {
    // to and from are Route Object,next() must be called to resolve the hook
    next();
  });
  return router;
}

export default configRouters;
