<template>
  <div id="IndexContent">
    <swiper :options="swiperOption" class="swiper">
      <swiper-slide v-for="(item, index) in swiperSrc" :key="index">
        <img :src="item" width="1190px" height="570px" />
      </swiper-slide>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
    <h2>全生态电子合同服务</h2>
    <article>
      <div v-for="item in contentBlock1" :key="item" class="block">
        <img :src="item.icon" />
        <span>{{item.title}}</span>
        <p>{{item.content}}</p>
      </div>

      <div class="block">
        <img :src="contentBlock1[0].icon" alt />
        <span>零秒信息传递</span>
        <p>基于云数据而存在的现货大数据分析系统，趋于零秒信息传输</p>
      </div>
      <div id="block" style="border-bottom: none;"></div>
      <div class="block">
        <img :src="contentBlock1[0].icon" alt />
        <span>零秒传递</span>
        <p>基于云数据而存在的现货大数据分析系统，趋于零秒信息传输</p>
      </div>
    </article>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default {
  components: {
    swiper,
    swiperSlide
  },
  props: {
    content: {
      type: String,
      default: 'fwefwefw'
    }
  },
  data() {
    return {
      swiperOption: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        autoplay: true,
        direction: 'horizontal',
        loop: true,
        speed: 500,
        width: 1190,
        height: 570
      },
      swiperSrc: [
        'http://photocdn.sohu.com/20111207/Img328215620.jpg',
        'http://pic30.nipic.com/20130619/9885883_210838271000_2.jpg',
        'http://pic60.nipic.com/file/20150129/6448355_204110337000_2.jpg'
      ],
      contentBlock1: [
        {
          icon:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563984359156&di=fbef74f1dff397e31e5c072a4d56198d&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fc903a55113c7b8aff23d75858dcd8703212e525b6e66-Ub6i61_fw658',
          title: '高效快捷',
          content: '高效快捷的软件信息系统，精准快捷且安全接单处理'
        },
        {
          icon:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563984359156&di=fbef74f1dff397e31e5c072a4d56198d&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fc903a55113c7b8aff23d75858dcd8703212e525b6e66-Ub6i61_fw658',
          title: '安全保密',
          content:
            '顶级加密技术团队，建立最稳固的安全保障，为客户隐私及交易建立最顶层的保护。'
        },
        {
          icon:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563984359156&di=fbef74f1dff397e31e5c072a4d56198d&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fc903a55113c7b8aff23d75858dcd8703212e525b6e66-Ub6i61_fw658',
          title: '信息分析',
          content:
            '具有可回顾性，能快速有效查询以往订单，形成分析体系，便于查询'
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
#IndexContent {
  width: 1190px;
  margin: 10px auto;
  background-color: white;
}

.swiper {
  width: 1190px;
  height: 570px;
  margin: 0 auto;
  // border: 2px solid black;
}

#block {
  background-image: url('../../../src/assets/contractImg.png');
  width: 396px;
  height: 250px;
}

article {
  width: 1190px;
  margin: 0 auto;
  background-color: white;
  // border: 2px solid black;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .block {
    box-sizing: border-box;
    width: 396px;
    height: 250px;
    border: 1px solid #c1c1c1;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      margin-top: 20px;
      width: 40px;
      height: 40px;
    }
    span {
      margin-top: 10px;
      width: 100%;
      line-height: 2em;
      font-weight: bold;
      font-size: 20px;
    }
    p {
      height: 150px;
      line-height: 1.5em;
      width: 80%;
    }
  }
}
</style>