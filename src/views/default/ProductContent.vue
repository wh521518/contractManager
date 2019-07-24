<template>
  <div id="ProductContent">
    <div class="useFul">
      <h2>小程序</h2>
      <video
        src="https://v.youku.com/v_show/id_XNDI4NTc2MTIyMA==.html?spm=a2h0k.11417342.soresults.dtitle"
      ></video>
    </div>
    <div class="useFul">
      <h2>网站</h2>
      <video
        src="https://v.youku.com/v_show/id_XNDI4NTc2MTIyMA==.html?spm=a2h0k.11417342.soresults.dtitle"
      ></video>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#ProductContent {
  width: 1190px;
  margin: 0 auto;
  margin-top: 10px;
  background-color: #fff;
  .useFul {
    h2 {
      height: 50px;
      display: block;
    }
    width: 100%;
    height: 750px;
    video {
      margin: 50px auto;
      width: 1024px;
      height: 576px;
      background-color: green;
    }
  }
}
</style>