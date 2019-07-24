import Vue from 'vue';
import Vuex from 'vuex';
import storage from 'store';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: storage.get('token'),
    form: {},
    contractTmp: {},
    contractAttrTmp: [],
    isLogin: false,
    userLogin: false,
    avatar: ''
  },
  mutations: {
    addToken(state, data) {
      state.token = data;
    },

    addAvatar(state, data) {
      state.avatar = data;
    },
    addContractTpl(state, data) {
      state.form = data;
    },
    addContractTmp(state, data) {
      state.contractTmp = data;
    },
    addContractAttrTmp(state, data) {
      state.contractAttrTmp = data;
    },
    addUserLogin(state, isLogin) {
      state.userLogin = isLogin;
    }
  }
});
