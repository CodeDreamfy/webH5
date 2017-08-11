<template>
  <div class="index">
    <div :class="['lock-status-wrap',{'on':lockStatus}]">{{lockStatus? '门已开': '门已锁'}}</div>
    <a class="lock-btn-wrap animate">
      <i class="icon"></i>
    </a>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      lockStatus: false,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
