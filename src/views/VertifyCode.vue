<template>
  <div class="ContractTplCreate">
    <el-col :span="18" :gutter="10">
      <el-form ref="vcodeForm" label-width="80px" :model="vcodeForm" :rules="vcodeRules">
        <el-form-item label="手机号">
          <el-col :span="12">
            <el-input ref="mobile" v-model="vcodeForm.mobile" disabled name="mobile" />
          </el-col>
        </el-form-item>

        <el-form-item label="验证码">
          <el-col :span="10">
            <el-input ref="vcode" v-model="vcodeForm.vcode" name="vcode" />
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="getVcode">{{vcodeTitle}}</el-button>
          </el-col>
        </el-form-item>

        <el-form-item size="large">
          <router-link :to="{name: 'PhoneBind', params:{userId: userId} }">
            <el-button type="primary" @click="onSubmit">下一步</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>

<script>
import { validVcode } from '@/utils/validate';
export default {
  data() {
    const validateVcode = (rule, value, callback) => {
      if (!validVcode(value)) {
        callback(new Error('验证码为6位数字'));
      } else {
        callback();
      }
    };
    return {
      userId: '',
      vcodeTitle: '发送验证码',
      vcodeForm: {
        mobile: this.getMobile(),
        vcode: ''
      },
      timeDown: '',
      vcodeRules: {
        vcode: [
          {
            required: true,
            trigger: 'blur',
            validator: validateVcode
          }
        ]
      }
    };
  },
  created() {},
  methods: {
    getVcode() {
      if (this.vcodeTitle !== '发送验证码') {
        this.$message.error('请勿重复发送');
      } else {
        axios
          .post('/api/v1/vcode', {
            mobile: this.vcodeForm.mobile
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
    },
    onSubmit() {
      this.$refs.vcodeForm.validateField('vcode', error => {
        if (!error) {
        } else {
          this.$message.error('手机号错误');
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.ContractTplCreate {
  text-align: left;
}
</style>
