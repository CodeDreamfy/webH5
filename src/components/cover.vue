<template>
  <transition name="dialog-fade">
    <div class="coverWrapper">
      <div class="cover-main">
        <slot name="dialog"></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {

    };
  },
};
</script>

