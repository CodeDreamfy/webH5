import Vue from 'vue';
import axios from 'axios';

const utils = {};
utils.install = () => {
  Vue.prototype.$axios = axios;
  Vue.mixin({
    methods: {
      getToken() {
        const that = this;
        const oToken = (localStorage.getItem('otoken') && JSON.parse(localStorage.getItem('otoken'))) || null;
        let ntime = +new Date();
        return new Promise((resolve, reject) => {
          if (oToken && ntime < oToken.etime) {
            resolve(oToken.token);
          } else {
            that.$axios({
              method: 'get',
              url: '//api.heclouds.com/pp/token?user_id=23709&secret=y937q50ElKG8lwfkazA7OOwaRu9Up0YB',
              data: {},
            })
            .then((res) => {  // eslint-disable-next-line
              ntime = +new Date();
              localStorage.setItem('otoken', JSON.stringify({
                token: res.data.data.token,
                etime: ntime + 2333000,
              }));
              resolve(res.data.data.token);
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
        let argument = args;
        return new Promise((resolve, reject) => {
          tokenPromise.then((res) => {
            if (!argument) { argument = {}; }
            oArg = Object.assign({
              token: res,
              stime: new Date().toISOString(),
              etime: new Date(+new Date() + (24 * 3600000)).toISOString(),
              page: 1,
              limit: 12,
              proid: 92352,
            }, args);
            that.$axios({
              method: 'get',
              url: `//api.heclouds.com/pp/device/${OJS.device.id}/sensordata?token=${oArg.token}&product_id=${oArg.proid}&begin=${oArg.stime}&end=${oArg.etime}&page=${oArg.page}&pre_page=${oArg.limit}`,
              data: {},
            })
            .then((datas) => {  // eslint-disable-next-line
              resolve(datas);
            })
            .catch((err) => { // eslint-disable-next-line
              reject(err);
            });
          }).then((errs) => {
            console.log(errs);
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
            at: d.at,
          }, d.body);
        }
        let firstdata = +new Date(datas[0].at);
        datas.reduce((acc, curr, index) => {
          const n = +new Date(curr.at);
          if (n - firstdata < 6000) {
            datas.splice(index, 1);
          } else {
            firstdata = new Date(curr.at);
          }
          return curr;
        });
        return datas;
      },
    },
  });
};


export default utils;

