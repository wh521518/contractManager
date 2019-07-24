<template>
  <div class="ContractTplCreate">
    <el-form ref="form" label-width="80px">
      <el-form-item label="手机号">
        <el-input v-model="phone" placeholder="请输入新的手机号码" />
      </el-form-item>

      <el-form-item label="验证码">
        <el-col :span="20">
          <el-input v-model="vcode" />
        </el-col>
        <el-col :span="1">
          <el-button type="primary" @click="getVcode">获取手机验证码</el-button>
        </el-col>
      </el-form-item>

      <el-form-item size="large">
        <router-link :to="{name: 'PhoneBind', params:{userId: userId} }">
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: '',
      phone: '',
      vcode: ''
    };
  },
  created() {},
  methods: {
    getVcode() {
      return '123123';
    },
    onSubmit() {}
  }
};
</script>

<style lang="scss" scoped>
.ContractTplCreate {
  text-align: left;
}
</style>
