// 查看合同内容的组件 参数是合同contract对象，内容可以是渲染过的也可以是未渲染过的
<template>
  <div class="ContentView">
    <div class="item">
      <span class="title">{{ title }}</span>
      <div class="content">
        {{ contract.title }}
      </div>
    </div>
    <div class="item">
      <span class="title">{{ description }}</span>
      <div class="content">
        {{ contract.description }}
      </div>
    </div>
    <div class="item">
      <span class="title">{{ content }}</span>
      <div
        class="content"
        v-html="contract.content"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    contract: {
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
  }
};
</script>

<style lang="scss" scoped>
.ContentView {
  text-align: center;
  .item {
    display: flex;
    margin: 0 0 20px 30px;

    .title {
      display: inline-block;
      padding: 0 15px;
      height: 40px;
      width: 100px;
      line-height: 40px;
    }

    .content {
      display: inline-block;
      text-align: left;
      width: 100%;
      padding: 0 15px;
      height: 40px;
      line-height: 40px;
      background-color: #fff;
    }
  }
  .item:last-child .content {
    height: 600px;
    overflow: auto;
  }
}
</style>
