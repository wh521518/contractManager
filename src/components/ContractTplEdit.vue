<template>
  <div class="ContractTplEdit">
    温馨提示：修改模板内容将重新进行属性解析
    <el-form
      :model="contractTpl"
      label-width="80px"
    >
      <el-form-item :label="title">
        <el-input v-model="contractTpl.title" />
      </el-form-item>
      <el-form-item :label="description">
        <el-input v-model="contractTpl.description" />
      </el-form-item>
      <el-form-item :label="content">
        <tinymic
          id="d1"
          v-model="contractTpl.content"
          :init="init"
        />
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import Editor from "@tinymce/tinymce-vue";
import { Stream } from "stream";
export default {
  components: {
    tinymic: Editor
  },
  props: {
    contractTpl: {
      type: Object
    },
    title: {
      type: String,
      default: "模板标题"
    },
    description: {
      type: String,
      default: "模板描述"
    },
    content: {
      type: String,
      default: "模板内容"
    }
  },
  data() {
    return {
      init: {
        language_url: "/public/tinymce/langs/zh_CN.js",
        language: "zh_CN", //语言
        height: 300
      }
    };
  }
};
</script>
