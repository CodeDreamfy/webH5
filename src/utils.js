import Vue from 'vue';
import { mapState, mapGetters } from 'vuex';

function configVueUtils(store) {
  const utils = {};
  utils.install = () => {
    Vue.mixin({
      computed: {

      },
    });
  };
}

export default configVueUtils;

