<template>
  <div :ref="refName" class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in carouselList" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper';
export default {
  props: ['carouselList', 'refName'],
  watch: {
    carouselList: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          new Swiper(this.$refs[this.refName], {
            autoplay: {
              delay: 2500,
              disableOnInteraction: false,
            },
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          });
        });
      },
      // 轮播图 初始化Swiper
    },
  },
};
</script>

<style lang="scss" scoped>
</style>