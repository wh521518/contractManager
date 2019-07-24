<template>
  <div class="ContractTplCreate">
    查看模板
    <el-col>
      <el-form
        ref="form"
        :model="form"
        label-width="130px"
      >
        <contract-content :contract="form" />

        <el-form-item size="large">
          <el-button
            type="primary"
            @click="onSubmit"
          >
            返回
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>

<script>
import ContractContent from "../../src/components/ContractContent";
export default {
  components: {
    ContractContent
  },
  data() {
    return {
      form: {
        title: "",
        description: "",
        content: ""
      },
      founder: 0,
      tplId: ""
    };
  },
  created() {
    this.tplId = this.$route.query.tplId;
    console.log(this.tplId);

    this.$axios
      .get("/api/v1/contracttplone", {
        params: {
          tplId: this.tplId
        }
      })
      .then(
        res => {
          // console.log("-------res---------");
          console.log(res);
          this.form = res.data.data;
        },
        err => {
          console.log("---------err---------");
          console.log(err);
        }
      );
  },
  methods: {
    //如果模板中没有标志字符串则直接提交
    //如果模板中有标志字符出任则添加完属性后提交
    onSubmit() {
      this.$router.back();
    }
  }
};
</script>

<style lang="scss" scoped>
.ContractTplCreate {
  text-align: left;
}
</style>
