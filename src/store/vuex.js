import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
/* eslint-disable */
const store = new Vuex.Store({
  state: {
    lockStatus: 1,
    onlineStatue: !!OJS.device.onlineStatue || false
  },
  mutations: {
    changeLockState(state, status) {
      console.log("changeLockState：", state.onlineStatue);
      if(!state.onlineStatue){
        OJS.app.toast("设备不在线，无法更改状态");
        return false;
      }
      if(status) {
        // OJS.device.sendNotify({
        //   cmd: 1,
        //   content: OJS.userId
        // },()=>{},()=>{
        //   state.lockStatus = status;
        // });
      }
    },
    inQuire(state) {
      if(!state.onlineStatue){
        OJS.app.toast("设备不在线，无法更改状态");
        return false;
      }
      OJS.device.sendNotify({
        cmd: 8,
        content: "查询开锁状态"
      })
    },
  },
  actions: {
    bindReady() {
      console.log('ojs已经准备就绪了');
    },
    deviceChangeData({state,getters,commit}, data) {
      if(data.cmd == 3) {
        console.log("设备响应上报：查询的密码为:",data.content);
      }
    },
    modifyPwd({state,getters,commit}, {t, pwd}) {
      if(!state.onlineStatue){
        //OJS.app.toast("设备不在线，无法更改状态");
        return false;
      }
      OJS.device.sendNotify({
        cmd: t,
        content: String(pwd)
      })
    },
  },
  getters: {
    onlineStatue() {
      return ;
    },
  },
});

export default store;
