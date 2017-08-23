import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
/* eslint-disable */
const store = new Vuex.Store({
  state: {
    lockStatus: null,
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
      // 后期需要删除掉主动设置状态
      if(state.lockStatus) {
        state.lockStatus = 0;
      }else {
        OJS.device.sendNotify({
          cmd: 8,
          content: "查询开锁状态"
        });
      }

    },
    changeLockState({state, commit, dispatch}, status) {
      commit('getOnlineStatus');
      if(!state.onlineStatue){
        // OJS.app.toast("设备不在线，无法更改状态");
        return false;
      }
      OJS.device.sendNotify({
        cmd: 1,
        content: String(OJS.userId)
      });
    },
    deviceChangeData({state,getters,commit}, data) {
      console.info("设备上报", data)
      if(data.cmd == 3) {
        console.info("设备响应上报：查询的密码为:",data.content);
      }
      switch(data.cmd){
        case 1: state.lockStatus = 1; break;
        case 2: commit('infoSucc', "修改键盘成功");break;
        case 3: commit('infoSucc', '键盘密码:'+data.content);break;
        case 4: commit('infoSucc', '修改绑定密码成功');break;
        case 5: commit('infoSucc', '绑定密码:'+data.content);break;
        case 6: commit('infoSucc', '门磁ID:'+data.content);break;
        case 7: commit('infoSucc', "恢复默认密码成功");break;
        case 8: commit('getLockStatus');break;
        default: break;
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

  },
});

export default store;
