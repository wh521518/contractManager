<template>
  <div class="ContractTplCreate">
    <el-col>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="合同标题">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="合同描述">
          <el-input v-model="form.description" />
        </el-form-item>
        <el-form-item label="合同内容">
          <tinymic id="d1" v-model="form.content" :init="init" />
        </el-form-item>

        <el-form-item size="large">
          <el-button type="primary" @click="onSubmit">下一步</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';
export default {
  components: {
    tinymic: Editor
  },
  data() {
    return {
      form: {
        title: '',
        description: '',
        content: ''
      },
      init: {
        language_url: '/public/tinymce/langs/zh_CN.js',
        language: 'zh_CN', //语言
        height: 300
      },
      founder: 0
    };
  },
  created() {
    this.founder = this.$route.query.id;
    if (this.$store.state.form) {
      this.form = this.$store.state.form;
      // console.log(this.form.content);
    }
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
          // attrMap.set(key)
          console.log(key);
          attrArr.push(key);
        }

        this.form.founder = this.founder;
        this.$store.commit('addContractTpl', this.form);

        this.$router.push({
          name: 'ContractTplAttrCreate',
          params: { tagArr: attrArr }
        });
      } else {
        // this.$store.commit('addContractTpl', this.form);
        // console.log(this.form.founder);
        this.form.founder = this.founder;
        axios.post('/api/v1/contracttpl', { form: this.form }).then(res => {
          console.log(res.data);
          if (!res.data.code) {
            this.$router.push({
              name: 'ContractTplList',
              query: { id: this.founder }
            });
          }
        });
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.founder = to.query.id;
    next();
  }
};
</script>

<style lang="scss" scoped>
.ContractTplCreate {
  text-align: left;
}
</style>
