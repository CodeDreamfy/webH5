<template>
  <div class="index">
    <div :class="['lock-status-wrap',{'on':lockstatus}]">{{lockstatus? '门已开': '门已锁'}}</div>
    <a class="lock-btn-wrap" :class="[{'offline': !online},{'lockout':lockstatus}]" @touchstart="tstartstyle" @touchend="tendstyle">
      <i class="icon"></i>
      <input type="button" class="lock-input" :disabled="!online" @click="handlerUnlock">
      <span class="tips" :class="{'hide': !lockstatus}">锁将在{{timeSecMsg}}s后自动锁定</span>
    </a>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'hello',
  data() {
    return {
      timeSecMsg: 5, // 等待秒数
      timeSecStatus: null, // 等待计时器是否在执行
    };
  },
  computed: {
    ...mapState({
      lockstatus: 'lockStatus',
      online: 'onlineStatue',
    }),
    ...mapGetters({

    }),
  },
  methods: {
    handlerUnlock() { // eslint-disable-next-line
      if(this.lockstatus) {
        OJS.app.toast('设备未锁');
      } else {
        this.$store.dispatch('changeLockState', 1);
      }
    },
    handlerCountdown() {
      const that = this;
      if (!this.timeSecStatus) {
        const clean = setInterval(() => {
          if (that.timeSecMsg > 1) {
            that.timeSecMsg -= 1;
            this.timeSecStatus = true;
          } else {
            that.timeSecMsg = 5;
            this.timeSecStatus = null;
            that.$store.dispatch('inQuire');
            clearInterval(clean);
          }
        }, 1000);
      } else {
        return false;
      }
      return true;
    },
    tstartstyle() {
      const elem = document.querySelector('.lock-btn-wrap i');
      elem.className += ' active';
    },
    tendstyle() {
      const elem = document.querySelector('.lock-btn-wrap i');
      elem.className = 'icon';
    },
  },
  watch: {
    lockstatus() { // eslint-disable-next-line
      console.log("状态改变", this.lockstatus, this.timeSecStatus, this.timeSecMsg);
      if (this.lockstatus && !this.timeSecStatus) {
        this.handlerCountdown();
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
