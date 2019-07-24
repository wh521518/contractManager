
<template>
  <el-container ref="homePage">
    <el-header>
      <el-menu
        :default-active="activeIndex"
        class="header"
        mode="horizontal"
        @select="handleSelect"
        router
      >
        <el-menu-item index="1" :route="{path: '/index/content'}">首页</el-menu-item>
        <el-menu-item index="2" :route="{path: '/index/productcontent'}">产品说明</el-menu-item>

        <router-link :to="{name: 'UserLogin'}" style="float: right">
          <el-button>登陆</el-button>
        </router-link>

        <router-link :to="{name: 'Register'}" style="float: right; margin-right:10px">
          <el-button>注册</el-button>
        </router-link>
      </el-menu>
    </el-header>
    <el-main>
      <router-view></router-view>
      <Footer :qrCode="qrCode"></Footer>
    </el-main>
  </el-container>
</template>

<script>
import Footer from '@/components/Footer';
export default {
  components: {
    Footer
  },
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      // 用于固定header 高度
      clientHeight: '',
      qrCode:
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563909308465&di=666ba31097e25e5b9156b5e7ce08bf86&imgtype=0&src=http%3A%2F%2Fimage.thepaper.cn%2Fwww%2Fimage%2F8%2F856%2F505.jpg'
    };
  },
  mounted() {
    // 固定header
    // 获取浏览器可视区域高度
    this.clientHeight = `${document.documentElement.clientHeight}`;
    //document.body.clientWidth;
    //console.log(self.clientHeight);
    window.onresize = function temp() {
      this.clientHeight = `${document.documentElement.clientHeight}`;
    };
  },
  watch: {
    // 如果 `clientHeight` 发生改变，这个函数就会运行
    clientHeight: function() {
      this.changeFixed(this.clientHeight);
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    // 固定高度
    changeFixed(clientHeight) {
      //动态修改样式
      // console.log(clientHeight);
      // console.log(this.$refs.homePage.$el.style.height);
      this.$refs.homePage.$el.style.height = clientHeight - 20 + 'px';
    }
  }
};
</script>
<style lang="scss" scoped>
.el-menu {
  max-width: 1190px;
  margin: 0 auto;
}

.el-main {
  padding-top: 0px;
}
</style>
