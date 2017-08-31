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
        return new Promise((resolve, reject) => {
          if (oToken && (Number(oToken.etime) > +new Date())) {
            resolve(oToken.token);
          } else {
            localStorage.removeItem('oToken');
            that.$axios({
              method: 'get',
              url: '//api.heclouds.com/pp/token?user_id=23709&secret=y937q50ElKG8lwfkazA7OOwaRu9Up0YB',
              data: {},
            })
            .then((res) => {  // eslint-disable-next-line
              localStorage.setItem('otoken', JSON.stringify({
                token: res.data.data.token,
                etime: +new Date() + (res.data.data.timeout * 1000),
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
              stime: new Date(+new Date() - (24 * 3600000)).toISOString(),
              etime: new Date().toISOString(),
              page: 1,
              limit: 20,
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
      getAllSensor(arg) {
        const that = this;
        const asyncPromise = [];
        const pageLimit = Math.ceil(arg.total_count / 20);
        for (let i = 2; i <= pageLimit; i += 1) {
          const ms = that.getSensordata({
            page: i,
          });
          asyncPromise.push(ms);
        }
        return Promise.all(asyncPromise);
      },
      getDataFormat(data) {
        if (data.length === 0) {
          return [];
        }
        const datas = [];
        console.log('Format', data);
        for (let i = 0; i < data.length; i += 1) {
          const d = data[i];
          datas[i] = Object.assign({
            at: d.at,
          }, d.body);
        }
        // let firstdata = +new Date(datas[0].at);
        const rData = [];
        datas.reverse();
        datas.reduce((acc, curr, index) => {
          if (index === 0) {
            rData.push(curr);
            return curr;
          }
          const n = +new Date(curr.at);
          const l = +new Date(acc.at);
          if (Math.abs(l - n) > 3000) {
            rData.push(curr);
          }
          return curr;
        }, 1);
        return rData;
      },
    },
  });
};


export default utils;

