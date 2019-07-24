<!-- 创建合同第2步,设置属性-->
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
            预览合同
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
export default {
  components: {
    tinymic: Editor
  },
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
    this.tplId = this.$route.query.tplId;
    console.log("this.tplId");
    console.log(this.tplId);

    //获取模板数据
    axios
      .get("/api/v1/contracttplone", {
        params: {
          tplId: this.tplId
        }
      })
      .then(
        res => {
          // console.log("-------res---------");
          console.log(res);
          this.form.tpl = res.data.data;
          this.form.tpl.founder = this.getUserId();
          this.form.tpl.tplId = this.tplId;
          this.form.tpl.tplContent = this.form.tpl.content;
        },
        err => {
          console.log("---------err---------");
          console.log(err);
        }
      );

    // 获取模板属性
    if (this.$store.state.contractAttrTmp.length > 0) {
      console.log(this.$store.state.contractAttrTmp);
      this.form.attr = this.$store.state.contractAttrTmp;
      return;
    }
    this.$axios
      .get("/api/v1/contracttplattr", {
        params: {
          tplId: this.tplId
        }
      })
      .then(
        res => {
          console.log("-------rell---------");
          console.log(res);
          this.form.attr = res.data.data;
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
      // 正则表达式替换生成合同内容， 并将合同内容保存到store中
      let rstr = this.form.tpl.content;
      for (let i = 0; i < this.form.attr.length; i++) {
        let tagRex = RegExp("&lt;%" + this.form.attr[i].posTag + "%&gt;", "ig");
        // console.log(tagRex);
        // console.log(this.form.attr[i].value);
        rstr = rstr.replace(tagRex, this.form.attr[i].attrValue);
      }
      this.form.tpl.content = rstr;

      console.log("-----------1-----------");

      // 数据库存储
      delete this.form.tpl._id;
      delete this.form.tpl._v;
      for (let i = 0; i < this.form.attr.length; i++) {
        delete this.form.attr[i]._id;
        delete this.form.attr[i].tplId;
      }

      console.log("-----------2-----------");
      axios
        .post("/api/v1/contract", {
          form: this.form.tpl
        })
        .then(res => {
          if (res.data.code == 0) {
            console.log("---------3---------");
            console.log(res);
            this.contractId = res.data.data;
            console.log(this.contractId);
            
            return Promise.resolve(
              axios.post("/api/v1/contractattr", {
                contractId: this.contractId,
                attrArr: this.form.attr
              })
            );
          }
        })
        .then(res => {
          if (!res.data.code) {
            console.log("---------4---------");
            console.log(res);

            this.$router.push({
              name: "ContractPreview",
              query: {
                contractId: this.contractId
              }
            });
          }
          // TODO错误处理
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
