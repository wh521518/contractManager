<template>
  <el-container>
    <!-- Header -->
    <el-header>Header</el-header>

    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <!--  -->
        <el-menu
          :default-openeds="['1', '3']"
          router
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message" />合同模板
            </template>
            <el-menu-item-group>
              <el-menu-item index="/contracttpl/list">
                系统模板
              </el-menu-item>
              <el-menu-item
                index="/contracttpl/create"
              >
                自定义模板
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu" />导航二
            </template>
            <el-menu-item-group>
              <template
                slot="title"
              >
                分组一
              </template>
              <el-menu-item index="2-1">
                选项1
              </el-menu-item>
              <el-menu-item index="2-2">
                选项2
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">
                选项3
              </el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <template
                slot="title"
              >
                选项4
              </template>
              <el-menu-item index="2-4-1">
                选项4-1
              </el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting" />导航三
            </template>
            <el-menu-item-group>
              <template
                slot="title"
              >
                分组一
              </template>
              <el-menu-item index="3-1">
                选项1
              </el-menu-item>
              <el-menu-item index="3-2">
                选项2
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="3-3">
                选项3
              </el-menu-item>
            </el-menu-item-group>
            <el-submenu index="3-4">
              <template
                slot="title"
              >
                选项4
              </template>
              <el-menu-item index="3-4-1">
                选项4-1
              </el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container style="height: 100vh">
        <!-- 内容区 -->
        <el-main>
          <router-view />
        </el-main>
        <!-- 底部 -->
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<style>
html,
body {
  padding: 0;
  margin: 0;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #304156;
  color: #bfcbd9;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>

<script>
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: Array(20).fill(item)
    };
  }
};
</script>
