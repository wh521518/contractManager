<template>
  <el-container>
    <!-- 侧边栏 -->
    <el-aside width="205px">
      <el-menu
        :default-openeds="['1','2','3']"
        router
        background-color="#304156"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="border: 2px solid rgba(255, 255, 255, 0)"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message" />合同模板
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1" :route="{name:'ContractTplList',query:{id:0}}">系统模板</el-menu-item>
            <el-menu-item index="1-2" :route="{name:'ContractTplList',query:{id:userId}}">我的模板</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu" />用户中心
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1" :route="{name: 'UserInfo', query: {id:userId}}">基本信息</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting" />我的合同
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1" :route="{name: 'ContractList', query: {id:userId}}">合同管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container style="height: 100vh">
      <!-- Header -->
      <el-header class="header">
        <breadcrumb class="breadcrumb-container" />
        <div class="avatar">
          <el-avatar :src="avatar" />
          <span>{{ username }}</span>
        </div>
        <div class="exit" @click="exit">
          <i class="el-icon-setting icon" />
          <span>退出</span>
        </div>
      </el-header>
      <!-- 内容区 -->
      <el-main>
        <router-view />
      </el-main>
      <!-- 底部 -->
      <el-footer>合同管理系统</el-footer>
    </el-container>
  </el-container>
</template>


<script>
import Breadcrumb from '@/components/Breadcrumb';
export default {
  components: {
    Breadcrumb
  },
  data() {
    return {
      userId: '',
      username: '',
      avatar: ''
    };
  },
  created() {
    console.log('---------createper---------');
    // console.log(this.getUserId();
    console.log(this.$store.state.token);
    console.log('---------createper---------');
    this.userId = this.getUserId();
    axios
      .get('/api/v1/user', {
        params: {
          userId: this.userId
        }
      })
      .then(
        res => {
          if (!res.data.code) {
            // console.log(res.data.code);
            // console.log("res----------- :", res);
            // console.log(res.data.data.username);
            this.avatar = res.data.data.avatar;
            this.username = res.data.data.username;

            this.$storage.set('username', this.username);
            this.$storage.set('avatar', this.avatar);

            this.$store.commit('addAvatar', res.data.data.avatar);
          }
        },
        err => {
          console.log(err);
        }
      );
    console.log('---------createper3---------');
  },
  methods: {
    // 退出登陆
    exit() {
      this.$store.commit('addToken', {});
      this.$store.commit('addUserLogin', false);
      this.$router.push({ path: '/' });

      this.$storage.clearAll();
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.userId = this.getUserId();
    this.username = this.$storage.get('username');
    console.log(this.$store.state.token);
    next();
  }
};
</script>


<style lang="scss">
html,
body {
  padding: 0;
  margin: 0;
}
.el-header,
.el-footer {
  background-color: #ffffff;
  color: #333;
  line-height: 60px;
}

.el-footer {
  background-color: #ffffff;
}

.el-aside {
  background-color: #304156;
  color: #ffffff;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.header {
  position: relative;
  // .breadcrumb {
  //   position: absolute;
  //   top: 23px;
  //   .el-breadcrumb {
  //     font-size: 15px;
  //   }
  // }
  .breadcrumb-container {
    margin-top: 5px;
    float: left;
  }

  .avatar {
    position: absolute;
    display: flex;
    width: 180px;
    height: 45px;
    line-height: 45px;
    top: 8px;
    right: 170px;
    span {
      margin-left: 10px;
    }
    &:hover {
      cursor: pointer;
    }
  }
  .exit {
    position: absolute;
    right: 80px;
    &:hover {
      cursor: pointer;
    }
    span {
      margin-left: 10px;
    }
  }
}
</style>
