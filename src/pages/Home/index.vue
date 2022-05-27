<template>
  <div>
    <TypeNav />
    <Shortcut />
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="(floor,index) in floorList" :key="index" :floor='floor' />
    <Brand />
  </div>
</template>

<script>
import Shortcut from './Shortcut';
import Recommend from './Recommend';
import Rank from './Rank';
import Like from './Like';
import Floor from './Floor';
import Brand from './Brand';
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
  components: {
    Shortcut,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    this.$store.dispatch('floorList');
  },
};
</script>

<style lang="less" scoped>
</style>