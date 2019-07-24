<template>
  <div class="ContractTplCreate">
    预览合同
    <el-col>
      <contract-content
        :contract="form"
        title="合同标题"
        description="合同描述"
        content="合同内容"
      />

      <el-form
        ref="form"
        :model="form"
        label-width="130px"
      >
        <el-form-item size="large">
          <el-button
            type="primary"
            @click="modify"
          >
            修改
          </el-button>
          <el-button
            type="primary"
            @click="getPDF"
          >
            下载PDF
          </el-button>
          <el-button
            type="primary"
            @click="shareMini"
          >
            邀请签约
          </el-button>
          <el-button
            type="primary"
            @click="save"
          >
            保存
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>

<script>
import ContractContent from "../components/ContractContent.vue";
import { Promise } from "q";
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
      tplId: "",
      contractId: ""
    };
  },
  created() {
    this.contractId = this.$route.query.contractId;
    this.$axios
      .get("/api/v1/contractone", {
        params: {
          contractId: this.contractId
        }
      })
      .then(
        res => {
          console.log("-------rell---------");
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
    modify() {
      //跳转到合同管理
      this.$router.push({
        name: "AttrEdit",
        query: {
          contractId: this.contractId
        }
      });
    },
    getPDF() {},
    shareMini() {},
    save() {
      let id = this.getUserId();
      this.$router.push({
        name: "ContractList",
        query: {
          id
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
