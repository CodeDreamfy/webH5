import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
/* eslint-disable */
const store = new Vuex.Store({
  state: {
    lockStatus: 1,
    onlineStatue: false
  },
  mutations: {
    getOnlineStatus(state) {
      state.onlineStatue = !!OJS.device.onlineStatus;
    },
    infoSucc(state, message) {
      OJS.app.toast(message)
    },
    getLockStatus(state) {
      console.log("状态改变了");
      state.lockStatus = 1;
    }
  },
  actions: {
    bindReady() {
      console.log('ojs已经准备就绪了');
    },
    inQuire({state, commit}) {
      commit('getOnlineStatus');
      if(!state.onlineStatue){
        OJS.app.toast("设备不在线，无法更改状态");
        return false;
      }
      OJS.device.sendNotify({
        cmd: 8,
        content: "查询开锁状态"
      });

    },
    changeLockState({state, commit, dispatch}) {
      commit('getOnlineStatus');
      if(!state.onlineStatue){
        OJS.app.toast("设备不在线，无法更改状态");
        return false;
      }
      if(!state.lockStatus){
        OJS.app.toast("锁已经是打开的状态");
        return false;
      }else {
        OJS.device.sendNotify({
          cmd: 1,
          content: String(OJS.userId)
        });
      }

    },
    deviceChangeData({state,getters,commit}, data) {
      if(!data.sta){
        OJS.app.toast("开锁成功!")
      }
      switch(data.cmd){
        case 2: commit('infoSucc', "修改键盘成功");break;
        case 3: commit('infoSucc', '键盘密码:'+data.content);break;
        case 4: commit('infoSucc', '修改绑定密码成功');break;
        case 5: commit('infoSucc', '绑定密码:'+data.content);break;
        case 6: commit('infoSucc', '门磁ID:'+data.content);break;
        case 7: commit('infoSucc', "恢复默认密码成功");break;
        case 8: commit('getLockStatus');break;
        default: break;
      }
      if(data.Uid){
        state.lockStatus = Number(data.sta);
        console.log("传感器数据", data)
      }

    },
    modifyPwd({state,getters,commit}, {t, pwd, cb}) {
      if(!state.onlineStatue){
        //OJS.app.toast("设备不在线，无法更改状态");
        return false;
      }
      OJS.device.sendNotify({
        cmd: t,
        content: String(pwd)
      },()=>{}, ()=>{
        cb()
      })
    },
  },
  getters: {
  },
});

export default store;
