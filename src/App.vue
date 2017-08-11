<template>
  <div id="app">
    <router-view></router-view>
    <div class="nav-list">
      <router-link :to="{name: 'setting'}">设置</router-link>
      <router-link :to="{name: 'setting'}">开锁记录</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

