<template>
  <div class="shortcut w">
    <!-- 右侧栏目-->
    <div class="right-bar">
      <div class="title">
        <span>优汇快报</span>
        <a href="javascript:;">更多 ></a>
      </div>
      <div class="news">
        <a href="javascript:;"><span>[热门]</span>备战开学季 全员半价购数码</a>
        <a href="javascript:;"><span>[特惠]</span>备战开学季 全员半价购数码</a>
        <a href="javascript:;"><span>[公告]</span>备战开学季 全员半价购数码</a>
        <a href="javascript:;"><span>[特惠]</span>备战开学季 全员半价购数码</a>
        <a href="javascript:;"><span>[特惠]</span>备战开学季 全员半价购数码</a>
      </div>
      <div class="icons clearfix">
        <div>
          <a href="javascript:;"><span>话费</span></a>
        </div>
        <div>
          <a href="javascript:;"><span>机票</span></a>
        </div>
        <div>
          <a href="javascript:;"><span>电影票</span></a>
        </div>
        <div>
          <a href="javascript:;"><span>游戏</span></a>
        </div>
        <div>
          <a href="javascript:;"><span>彩票</span></a>
        </div>
        <div>
          <a href="javascript:;"><span>加油站</span></a>
        </div>
        <div>
          <a href="javascript:;"><span>酒店</span></a>
        </div>
        <div>
          <a href="javascript:;"><span>火车票</span></a>
        </div>
        <div>
          <a href="javascript:;"><span>众筹</span></a>
        </div>
        <div>
          <a href="javascript:;"><span>理财</span></a>
        </div>
        <div>
          <a href="javascript:;"><span>礼品卡</span></a>
        </div>
        <div>
          <a href="javascript:;"><span>白条</span></a>
        </div>
      </div>
      <div class="ads"></div>
    </div>

    <!-- 轮播 -->
    <div class="wcarousel">
      <Carousel :carouselList="carouselList" :refName="'shortcutCarousel'" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState({
      carouselList: (state) => {
        return state.home.carouselList;
      },
    }),
  },
  mounted() {
    this.$store.dispatch('shortcutCarousel');
  },
};
</script>

<style lang="less" scoped>
.shortcut {
  height: 508px;

  .wcarousel {
    height: 477px;
    width: 728px;
    float: right;

    img {
      height: 477px;
    }
  }

  .right-bar {
    height: 477px;
    width: 249px;
    float: right;
    border: 1px solid #ddd;

    .title {
      padding: 12px 12px;
      font-weight: 700;
      border-bottom: 1px solid #ddd;
      font-size: 14px;

      a {
        float: right;
        line-height: 16px;
        font-weight: normal;
        font-size: 12px;
        color: #333;
      }
    }

    .news {
      padding: 12px 0 2px 18px;

      a {
        display: block;
        color: #333;
        font-size: 12px;
        margin-bottom: 14px;

        span {
          font-weight: bold;
        }
      }
    }

    .icons {
      div {
        float: left;
        border-left: 1px solid #ddd;
        border-top: 1px solid #ddd;
        background-clip: content-box;

        &:nth-child(1) {
          background-image: url(./images/icons.png);
          border-left: none;
        }

        &:nth-child(2) {
          background-image: url(./images/icons.png);
          background-position: -66px 0px;
        }

        &:nth-child(3) {
          background-image: url(./images/icons.png);
          background-position: -130px 0px;
        }

        &:nth-child(4) {
          background-image: url(./images/icons.png);
          background-position: -191px 0px;
        }

        &:nth-child(5) {
          background-image: url(./images/icons.png);
          background-position: 0px -72px;
          border-left: none;
        }

        &:nth-child(6) {
          background-image: url(./images/icons.png);
          background-position: -66px -72px;
        }

        &:nth-child(7) {
          background-image: url(./images/icons.png);
          background-position: -130px -72px;
        }

        &:nth-child(8) {
          background-image: url(./images/icons.png);
          background-position: -191px -72px;
        }

        &:nth-child(9) {
          background-image: url(./images/icons.png);
          background-position: 0px -144px;
          border-bottom: 1px solid #ddd;
          border-left: none;
        }

        &:nth-child(10) {
          background-image: url(./images/icons.png);
          background-position: -66px -144px;
          border-bottom: 1px solid #ddd;
        }

        &:nth-child(11) {
          background-image: url(./images/icons.png);
          background-position: -130px -144px;
          border-bottom: 1px solid #ddd;
        }

        &:nth-child(12) {
          background-image: url(./images/icons.png);
          background-position: -191px -144px;
          border-bottom: 1px solid #ddd;
        }

        a {
          display: block;
          width: 61px;
          height: 65px;
          text-align: center;

          span {
            position: relative;
            font-size: 12px;
            top: 40px;
            color: #333;
          }
        }
      }
    }

    .ads {
      width: 100%;
      height: 99px;
      background-image: url(./images/ad1.png);
      background-repeat: no-repeat;
      background-position: bottom right;
      background-size: auto 90px;
    }
  }
}
</style>