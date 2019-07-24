<template>
  <div class="ContractTplModify">
    修改合同模板
    <template v-if="hasData">
      <el-col>
        <el-form
          ref="form"
          :model="form"
          label-width="130px"
        >
          <ContractTplEdit :contract-tpl="form" />
          <el-form-item size="large">
            <el-button
              type="primary"
              @click="onSubmit"
            >
              下一步
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </template>
  </div>
</template>

<script>
import ContractTplEdit from "../components/ContractTplEdit";
export default {
  components: {
    ContractTplEdit
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
      hasData: false
    };
  },
  created() {
    this.tplId = this.$route.query.tplId;
    console.log("-----mtpl----");
    console.log(this.tplId);
    this.$axios
      .get("/api/v1/contracttplone", {
        params: {
          tplId: this.tplId
        }
      })
      .then(res => {
        this.founder = this.form.founder;
        console.log(res);
        this.form = res.data.data;
        this.hasData = true;
      });
  },
  methods: {
    //如果模板中没有标志字符串则直接提交
    //如果模板中有标志字符出任则添加完属性后提交
    onSubmit() {
      // console.log("submit!");
      // console.log(this.form.content);
      let tagRex = /&lt;%[1-9]{1}[0-9]{0,2}%&gt;/gi;
      let matchParm = this.form.content.match(tagRex);
      let attrArr = [];
      if (matchParm) {
        for (let i = 0; i < matchParm.length; i++) {
          let key = matchParm[i].substring(5, matchParm[i].length - 5);
          console.log(key);
          attrArr.push(key);
        }

        this.$store.commit("addContractTpl", {});
        this.$store.commit("addContractTpl", this.form);

        // console.log("-----attrArr-----");
        // console.log(attrArr);

        this.$router.push({
          name: "ContractTplAttrModify",
          params: { tagArr: attrArr, tplId: this.tplId }
        });
      } else {
        this.$axios
          .put("/api/v1/contracttpl", { form: this.form })
          .then(res => {
            console.log(res.data);
            if (!res.data.code) {
              this.$router.push({
                name: "ContractTplList",
                query: { id: this.founder }
              });
            }
          });
      }
    },
    cl() {
      console.log(this.form.content);
    }
  }
};
</script>
<style scoped>
.ContractTplModify {
  text-align: left;
}
</style>

