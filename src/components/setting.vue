<template>
  <div class="setting">
    <a href="javascript:;" class="bindPass bindtoItem">绑定密码</a>
    <a href="javascript:;" class="bindKeyPass bindtoItem">键盘密码</a>
    <cover></cover>
  </div>
</template>

<script>
  import cover from './cover';

  export default {
    data() {
      return {

      };
    },
    components: {
      cover,
    },
  };
</script>
