// home小仓库
import { reqCategoryList, reqShortcutCarousel, reqFloorList } from '@/api'
export default {
  state: {
    // 三级联动数据
    categoryList: [],
    carouselList: [],
    floorList: [],
  },
  mutations: {
    // 修改state
    CATEGORYLIST(state, categoryList) {
      state.categoryList = categoryList
    },
    SHORTCUTCAROUSEL(state, carouselList) {
      state.carouselList = carouselList
    },
    REQFLOORLIST(state, floorList) {
      state.floorList = floorList
    },
  },
  actions: {
    // 发送请求
    async categoryList({ commit }) {
      let result = await reqCategoryList()
      if (result.code === 200) {
        commit('CATEGORYLIST', result.data)
      }
    },
    async shortcutCarousel({ commit }) {
      let result = await reqShortcutCarousel()
      if (result.code === 200) {
        commit('SHORTCUTCAROUSEL', result.data)
      }
    },
    async floorList({ commit }) {
      let result = await reqFloorList()
      if (result.code === 200) {
        commit('REQFLOORLIST', result.data)
      }
    },
  },
  getters: {}
}