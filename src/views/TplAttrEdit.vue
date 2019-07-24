<!-- 属性修改-->
<template>
  <div class="ContractTplCreate">
    编辑合同属性
    <el-col>
      <el-form
        ref="form"
        :model="form"
        label-width="130px"
      >
        <el-form-item label="属性标签">
          <el-input
            v-model="form.posTag"
            disabled
          />
        </el-form-item>
        <el-form-item label="属性名称">
          <el-input v-model="form.attrName" />
        </el-form-item>
        <el-form-item label="摘要显示">
          <el-switch v-model="form.isAbstract" />
        </el-form-item>
        <el-form-item label="摘要排序">
          <el-input v-model="form.sort" />
        </el-form-item>
        <el-form-item label="属性单位">
          <el-input v-model="form.unit" />
        </el-form-item>
        <el-form-item size="large">
          <el-button
            type="primary"
            @click="onSubmit"
          >
            确认修改
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    // TODO 表单验证
    return {
      form: {},
      attrId: ""
    };
  },
  created() {
    this.attrId = this.$route.query.attrId;
    console.log("this.attrId");
    console.log(this.attrId);

    //获取模板数据
    this.$axios
      .get("/api/v1/contracttplattrone", {
        params: {
          attrId: this.attrId
        }
      })
      .then(
        res => {
          if (!res.data.code) {
            // console.log("-------res---------");
            // console.log(res);
            this.form = res.data.data;
          }
        },
        err => {
          console.log("---------err---------");
          console.log(err);
        }
      );
  },
  methods: {
    onSubmit() {
      this.$axios
        .put("/api/v1/contracttplattr", {
          form: this.form,
          attrId: this.attrId
        })
        .then(res => {
          if (res.data.code == 0) {
            // console.log(res);
            this.$router.back();
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
