<template>
  <div class="index">
    <div :class="['lock-status-wrap',{'on':!lockstatus}, {'offline': !online}]">{{lockstatus? '门已锁': '门已开'}}</div>
    <a class="lock-btn-wrap" :class="[{'offline': !online},{'lockout':!lockstatus}]" @touchstart="tstartstyle" @touchend="tendstyle">
      <i class="icon"></i>
      <input type="button" class="lock-input" :disabled="!online" @click="handlerUnlock">
      <span class="tips" v-if="false">锁将在{{timeSecMsg}}s后自动锁定</span>
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
    handlerUnlock() {
      this.$store.dispatch('changeLockState');
    },
    tstartstyle() {
      const elem = document.querySelector('.lock-btn-wrap i');
      elem.className = 'icon active';
    },
    tendstyle() {
      const elem = document.querySelector('.lock-btn-wrap i');
      elem.className = 'icon';
    },
  },
  mounted() {

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
