import Vue from 'vue';
import axios from 'axios';

const utils = {};
utils.install = () => {
  Vue.prototype.$axios = axios;
  Vue.mixin({
    methods: {
      getToken() {
        const that = this;
        const oToken = JSON.parse(localStorage.getItem('otoken'));
        let ntime = +new Date();
        return new Promise((resolve, reject) => {
          if (oToken && ntime < oToken.time) {
            resolve(oToken.id);
          } else {
            that.$axios({
              method: 'get',
              url: 'http://api.heclouds.com/pp/token?user_id=23709&secret=y937q50ElKG8lwfkazA7OOwaRu9Up0YB',
              data: {},
            })
            .then((res) => {  // eslint-disable-next-line
              if (oToken.id) {
                localStorage.removeItem('otoken');
              }
              ntime = +new Date();
              localStorage.setItem('otoken', String.stringify({
                token: res.token,
                etime: ntime + (24 * 3600000),
              }));
              resolve(res.token);
            })
            .catch((err) => { // eslint-disable-next-line
              reject(err);
            });
          }
        });
      },
      getSensordata(args) {
        const that = this;
        const tokenPromise = this.getToken();
        let oArg = {};
        tokenPromise.then((res) => {
          oArg = Object.assign({
            token: res,
            stime: new Date(),
            etime: +new Date() + (24 * 3600000),
            page: 1,
            limit: 12,
          }, ...args);
        }).then((err) => {
          throw err;
        });
        return new Promise((resolve, reject) => {
          that.$axios({
            method: 'get',
            url: `http://api.heclouds.com/pp/device/${OJS.device.id}/?token=${oArg.token}&product_id=${92352}&begin=${oArg.stime}&end=${oArg.etime}&page=${oArg.page}&pre_page=${oArg.limit}`,
            data: {},
          })
          .then((res) => {  // eslint-disable-next-line
            resolve(res);
          })
          .catch((err) => { // eslint-disable-next-line
            reject(err);
          });
        });
      },
      getDataFormat(data) {
        if (data.items.length === 0) {
          return [];
        }
        const datas = [];
        for (let i = 0; i < data.items.length; i += 1) {
          const d = data.items[i];
          datas[i] = Object.assign({
            time: d.at,
          }, d.body);
        }
        return datas;
      },
    },
  });
};


export default utils;

