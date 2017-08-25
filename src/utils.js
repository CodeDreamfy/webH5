import Vue from 'vue';
import axios from 'axios';

const utils = {};
utils.install = () => {
  Vue.prototype.$axios = axios;
  Vue.mixin({
    methods: {
      getToken() {
        const that = this;
        that.$axios({
          method: 'get',
          url: 'http://api.heclouds.com/pp/token?user_id=23709&secret=y937q50ElKG8lwfkazA7OOwaRu9Up0YB',
          data: {},
        })
        .then((res) => {
          console.log(res);
          // resolve(res);
        })
        .catch((err) => {
          console.log(err);
          // reject(err);
        });
        // return new Promise((resolve, reject) => {

        // });
      },
    },
  });
};


export default utils;

