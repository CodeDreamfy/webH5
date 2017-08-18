<template>
  <div class="index">
    <div :class="['lock-status-wrap',{'on':lockStatus}]">{{lockStatus? '门已开': '门已锁'}}</div>
    <a class="lock-btn-wrap" :class="[{'offline': !online},{'lockout':lockStatus}]">
      <i class="icon"></i>
      <input type="button" class="lock-input" :disabled="!online" @click="handlerUnlock">
      <span class="tips" :class="{'hide': !lockStatus}">锁将在{{timeSecMsg}}s后自动锁定</span>
    </a>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      timeSecMsg: 5, // 等待秒数
      timeSecStatus: null, // 等待计时器是否在执行
    };
  },
  computed: {
    ...mapState({
      lockStatus: 'lockStatus',
    }),
    ...mapGetters({
      online: 'onlineStatue',
    }),
  },
  methods: {
    handlerUnlock() { // eslint-disable-next-line
      if(this.lockStatus) {
        this.$store.commit('changeLockState', 0);
      } else {
        this.$store.commit('changeLockState', 1);
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
            that.$store.commit('changeLockState', 0);
            clearInterval(clean);
          }
        }, 1000);
      }
    },
  },
  watch: {
    lockStatus: {
      immediate: true,
      handler(val) { // eslint-disable-next-line
        if(val){
          this.handlerCountdown();
        }
      },
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
