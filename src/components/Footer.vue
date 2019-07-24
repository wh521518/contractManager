<template>
  <div>
    <footer id="footer">
      <div>
        <router-link to>
          <span>关于我们</span>
        </router-link>
        <router-link to>
          <span>帮助中心</span>
        </router-link>
        <router-link to>
          <span>公司简介</span>
        </router-link>
      </div>
      <div class="vline"></div>
      <div>
        <span>
          <i class="el-icon-phone"></i>
          800-400-8000
        </span>
        <span>公司邮箱：1234@QQ.com</span>
        <span>服务时间：周一值周日(09:00~21:00)</span>
        <span>地址：浙江省杭州市余杭区XXXXXXX大厦</span>
      </div>
      <div class="vline"></div>
      <div>
        <img :src="qrCode" alt width="120px" height="120px" />
        <span>小程序码</span>
      </div>
    </footer>
    <div id="copyright">浙江XXXX版权所有</div>
  </div>
</template>
<script>
export default {
  props: {
    qrCode: {
      type: String
    }
  }
};
</script>
<style lang="scss" scoped>
div {
  margin-top: 10px;
}
#footer {
  width: 1190px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  height: 200px;
  background-color: #383b42;
  color: white;

  .vline {
    width: 1px;
    height: 170px;
    background-color: #fff;
    margin-top: 15px;
  }

  div:first-child {
    width: 400px;
    display: flex;
    justify-content: space-between;
    a {
      width: 120px;
      text-align: center;
      line-height: 200px;
      color: white;
      text-decoration: none;
    }
  }

  div:nth-child(3) {
    width: 400px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-left: 40px;
    i {
      display: inline;
    }
    span {
      display: block;
      line-height: 30px;
    }
  }

  div:last-child {
    width: 390px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span {
      height: 30px;
      line-height: 30px;
      font-size: 14px;
    }
  }
}

#copyright {
  height: 40px;
  line-height: 40px;
  width: 1190px;
  margin: 0 auto;
  text-align: center;
  color: white;
  background-color: black;
}
</style>
