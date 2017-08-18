<template>
  <div class="setting">
    <div class="label-wrap bind-pwd">
      <div class="title" :class="toggleVisable.bindState?'active':''" @click.self="toggleHandler('bindState')">
        绑定密码
        <i></i>
      </div>
      <transition name="pwdfade">
        <div class="modify-wrap" v-show="toggleVisable.bindState">
          <label for="new-bind-pwd" class="input-item">
            <span>新密码</span>
            <input type="password" min="12" max=12 max-length=12 placeholder="请输入新密码" v-model="bindPwd[0]" id="new-bind-pwd">
          </label>
          <label for="re-bind-pwd" class="input-item">
            <span>确认密码</span>
            <input type="password" min="12" max=12 max-length=12 placeholder="请再次输入新密码" v-model="bindPwd[1]" id="re-bind-pwd">
          </label>
          <a href="javascript:;" class="bindPassBtn" @touchend.self="handlerPwd(4, 'bindPwd')">确认</a>
        </div>
      </transition>
    </div>
    <div class="label-wrap modify-pwd">
      <div class="title" :class="toggleVisable.keywordState?'active':''" @click.self="toggleHandler('keywordState')">
        键盘密码
        <i></i>
      </div>
      <transition name="pwdfade">
        <div class="modify-wrap" v-show="toggleVisable.keywordState">
          <label for="new-keyword-pwd" class="input-item">
            <span>新密码</span>
            <input type="password" min="12" max=12 max-length=12 placeholder="请输入新密码" v-model="keywordPwd[0]" id="new-keyword-pwd">
          </label>
          <label for="re-keyword-pwd" class="input-item">
            <span>确认密码</span>
            <input type="password" min="12" max=12 max-length=12 placeholder="请再次输入新密码" v-model="keywordPwd[1]" id="re-keyword-pwd">
          </label>
          <a href="javascript:;" class="keywordPassBtn"   @touchend.self="handlerPwd(2, 'keywordPwd')">确认</a>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        toggleVisable: {
          bindState: false,
          keywordState: false,
        },
        bindPwd: [],
        keywordPwd: [],
      };
    },
    methods: {
      toggleHandler(type) {
        this.toggleVisable[type] ? this.toggleVisable[type] = false : this.toggleVisable[type] = true; 	// eslint-disable-line
      },
      handlerPwd(type, pwd) {
        if (this.validator(pwd)) {
          this.$store.dispatch('modifyPwd', {
            t: type,
            pwd: this[pwd][0],
          });
        } else {
          console.log('不符合修改密码的要求');
        }
      },
      validator(type) {
        if (this[type][0].length > 12 || this[type][0].length < 6) {
          return false;
        }
        if (this[type][0] !== this[type][1]) {
          return false;
        }
        const va = new RegExp(/^[0-9]+$/g);
        if (!va.test(this[type][0])) {
          return false;
        }
        return true;
      },
    },
  };
</script>
