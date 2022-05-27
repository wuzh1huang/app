<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.showFooter"></Footer>
  </div>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 获取三级联动数据
    this.$store.dispatch('categoryList');
  },
};
</script>

<style lang="less">
.w {
  width: 1190px;
  margin: 0 auto;
}

a {
  text-decoration: none;
}
</style>
