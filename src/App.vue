<template>
  <div id="app">
    <router-view></router-view>
    <div class="nav-list">
      <router-link :to="{name: 'setting'}" active-class="active">设置</router-link>
      <router-link :to="{name: 'history'}" active-class="active">开锁记录</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {

    };
  },
  methods: {

  },
};
</script>

<style lang="less">
  @import './css/main.less';
</style>
