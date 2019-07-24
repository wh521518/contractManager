<!--修改已生成的合同的值-->
<template>
  <div class="ContractTplCreate">
    填写合同属性
    <el-col>
      <el-form
        ref="form"
        :model="form"
        label-width="130px"
      >
        <el-form-item label="合同标题">
          <el-input v-model="form.tpl.title" />
        </el-form-item>
        <el-form-item label="合同描述">
          <el-input v-model="form.tpl.description" />
        </el-form-item>
        <el-form-item label="合同属性设置" />

        <div
          v-for="(item, index) in form.attr"
          :key="item.id"
        >
          <el-divider content-position="left" />
          <el-form-item :label="form.attr[index].attrName">
            <el-input v-model="form.attr[index].attrValue">
              <template slot="append">
                {{ form.attr[index].unit }}
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="摘要显示">
            <el-switch
              v-model="form.attr[index].isAbstract"
              disabled
            />
          </el-form-item>
          <el-form-item label="摘要排序">
            {{ form.attr[index].sort }}
          </el-form-item>
        </div>

        <el-form-item size="large">
          <el-button
            type="primary"
            @click="onSubmit"
          >
            保存预览
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
      form: {
        tpl: {
          title: "",
          description: "",
          content: "",
          founder: ""
        },
        attr: []
      },
      founder: 0,
      tplId: "",
      contractId: ""
    };
  },
  created() {
    let contractId = this.$route.query.contractId;
    this.contractId = contractId;
    this.$axios
      .get("/api/v1/contractone", {
        params: {
          contractId
        }
      })
      .then(res => {
        if (!res.data.code) {
          console.log(res.data.data);
          this.form.attr = res.data.data.items;
          delete res.data.data.itesm;
          delete res.data.data._id;
          delete res.data.data.__v;
          delete res.data.data.addTime;

          this.form.tpl = res.data.data;
        }
      });
  },
  methods: {
    onSubmit() {
      // 正则表达式替换生成合同内容， 并将合同内容保存到store中
      let rstr = this.form.tpl.tplContent;
      for (let i = 0; i < this.form.attr.length; i++) {
        let tagRex = RegExp("&lt;%" + this.form.attr[i].posTag + "%&gt;", "ig");
        // console.log(tagRex);
        // console.log(this.form.attr[i].value);
        rstr = rstr.replace(tagRex, this.form.attr[i].attrValue);
      }
      this.form.tpl.content = rstr;

      console.log(this.form.tpl.content);
      console.log(rstr);

      this.$axios
        .put("/api/v1/contract", {
          form: this.form,
          contractId: this.contractId
        })
        .then(res => {
          if (res.data.code == 0) {
            console.log("---------3---------");
            console.log(res);
            this.contractId = res.data.data;
            console.log(this.contractId);
            this.$router.push({
              name: "ContractPreview",
              query: {
                contractId: this.contractId
              }
            });
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
