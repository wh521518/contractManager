<template>
  <!-- // TODO 完善表单验证 -->
  <el-col style="text-align: left">
    <el-form ref="form" :model="form" label-width="80px">
      <div v-for="(item, index) in form.attr" :key="item.id">
        <el-row>属性{{ index+1 }}</el-row>
        <el-form-item label="位置标签">
          <el-input v-model="form.attr[index].posTag" readonly />
        </el-form-item>
        <el-form-item label="属性标题">
          <el-input v-model="form.attr[index].attrName" />
        </el-form-item>
        <el-form-item label="属性单位">
          <el-input v-model="form.attr[index].unit" />
        </el-form-item>
        <el-form-item label="摘要显示">
          <el-switch v-model="form.attr[index].isAbstract" />
        </el-form-item>
        <el-form-item label="摘要排序">
          <el-input v-model.number="form.attr[index].sort" />
        </el-form-item>
        <el-divider></el-divider>
      </div>
      <el-form-item size="large">
        <el-button type="primary" @click="onSubmit">更新</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</template>

<script>
import tinymce from "vue-tinymce-editor";
import { Promise } from "q";
export default {
  components: {
    tinymce
  },
  props: {
    tagArr: {
      type: Array
    },
    tplId: {
      type: String
    }
  },
  data() {
    return {
      form: {
        attr: []
      }
    };
  },
  created() {
    // Object.assign(this.form, this.tagArr)
    for (let i = 0; i < this.tagArr.length; i++) {
      let o = {};
      o.posTag = this.tagArr[i];
      o.attrName = "";
      o.unit = "";
      o.isAbstract = false;
      o.sort = 999;
      this.form.attr.push(o);
    }
    console.log("-----mtpl2----");
    console.log(this.tplId);
    this.$axios
      .delete("/api/v1/contractattrmany", {
        params: {
          tplId: this.tplId
        }
      })
      .then(res => {
        console.log(res);
      });
  },
  methods: {
    onSubmit() {
      let _self = this;
      console.log("submit!");
      console.log(this.form.attr);
      this.$axios
        .put("/api/v1/contracttpl", { form: this.$store.state.form })
        .then(res => {
          if (!res.data.code) {
            console.log("---------res---------");
            console.log(res);
            console.log(this.tplId);
            console.log("---------res2---------");
            return Promise.resolve(
              axios.post("/api/v1/contracttplattr", {
                attrArr: this.form.attr,
                tplId: res.data.data //模板id
              })
            );
          }
        })
        .then(res => {
          // console.log('---------res2---------');
          // console.log(res);
          // assert(!res.data.code);
          if (!res.data.code) {
            this.$router.push({
              name: "ContractTplList",
              query: { id: this.$store.state.form.founder }
            });
          }
        })
        .catch(err => {
          //TODO 完善错误处理
          console.log(err);
        });
    }
  }
};
</script>
