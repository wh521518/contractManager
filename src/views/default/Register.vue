<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">注册</h3>
      </div>

      <el-form-item prop="mobile">
        <span class="svg-container">
          <svg-icon icon-class="dianhua" />
        </span>
        <el-input
          ref="mobile"
          v-model="loginForm.mobile"
          placeholder="请输入手机号"
          name="mobile"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="vcode" style="display: inline-block; width: 73%;">
        <span class="svg-container">
          <svg-icon icon-class="yanzhengma" />
        </span>
        <el-input
          ref="vcode"
          v-model="loginForm.vcode"
          type="text"
          placeholder="验证码"
          name="vcode"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>

      <el-form-item style="display: inline-block;">
        <el-button type="primary" @click="geVcode">{{vcodeTitle}}</el-button>
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-form-item prop="repassword">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType2"
          ref="repassword"
          v-model="loginForm.repassword"
          :type="passwordType2"
          placeholder="确认密码"
          name="repassword"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType2 === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >注册</el-button>
    </el-form>
  </div>
</template>

<script>
import { validMobile, validPassword, validVcode } from '@/utils/validate';
import md5 from 'md5';
import { setTimeout, setInterval } from 'timers';
let timeDown;
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validMobile(value)) {
        callback(new Error('请输入正确的手机号'));
      } else {
        callback();
      }
    };

    const validatePassword = (rule, value, callback) => {
      if (!validPassword(value)) {
        callback(new Error('密码为6-20位数字、字母、下划线'));
      } else {
        callback();
      }
    };

    const validateVcode = (rule, value, callback) => {
      if (!validVcode(value)) {
        callback(new Error('验证码为6位数字'));
      } else {
        callback();
      }
    };

    const validateRePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.loginForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    return {
      vcodeTitle: '发送验证码',
      loginForm: {
        mobile: '',
        vcode: '',
        password: '',
        repassword: ''
      },
      loginRules: {
        mobile: [
          {
            required: true,
            trigger: 'blur',
            validator: validateUsername
          }
        ],
        vcode: [
          {
            required: true,
            trigger: 'blur',
            validator: validateVcode
          }
        ],
        password: [
          {
            required: true,
            trigger: 'blur',
            validator: validatePassword
          }
        ],
        repassword: [
          {
            required: true,
            trigger: 'blur',
            validator: validateRePassword
          }
        ]
      },
      loading: false,
      passwordType: 'password',
      passwordType2: 'password',
      redirect: undefined
      // timeDown: ''
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = '';
      } else {
        this.passwordType = 'password';
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          let password = md5(this.loginForm.password);
          this.$axios
            .post('/api/v1/user', {
              mobile: this.loginForm.mobile,
              password,
              vcode: this.loginForm.vcode
            })
            .then(
              res => {
                if (!res.data.code) {
                  this.$message.success('注册成功，请登录！');
                  this.$router.replace({
                    name: 'UserLogin'
                  });
                } else {
                  this.loading = false;
                  this.$message.error(res.data.msg);
                }
              },
              err => {
                console.log(err);
                this.loading = false;
              }
            );
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    geVcode() {
      this.$refs.loginForm.validateField('mobile', error => {
        if (!error) {
          if (this.vcodeTitle !== '发送验证码') {
            this.$message.error('请勿重复发送');
          } else {
            axios
              .post('/api/v1/vcode', {
                mobile: this.loginForm.mobile
              })
              .then(res => {
                console.log('---------发送短信---------');
                if (!res.data.code) {
                  this.$message.success('验证码发送成功，2分钟内有效');
                }
              })
              .catch(err => {
                console.error(err);
              });

            // 倒计数
            let i = 60;
            let _self = this;
            timeDown = window.setInterval(() => {
              i--;
              _self.vcodeTitle = i;
              if (i == 58) {
                console.log(window);
                console.log(timeDown);
                window.clearInterval(timeDown);
                _self.vcodeTitle = '发送验证码';
              }
            }, 1000);
          }
        } else {
          this.$message.error('手机号错误');
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  height: 100vh;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
