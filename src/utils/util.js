const sd = require('silly-datetime');

export default {
  install(Vue, options) {
    Vue.prototype.getUserId = function () {
      return JSON.parse(window.atob(this.$store.state.token.split('.')[1])).userId;
    };

    Vue.prototype.getMobile = function () {
      return JSON.parse(window.atob(this.$store.state.token.split('.')[1])).mobile;
    };

    Vue.prototype.formatTime = function (timeStamp, formatStr = 'YYYY-MM-DD HH:mm') {
      return sd.format(new Date(timeStamp), formatStr);
    };
  }
};
