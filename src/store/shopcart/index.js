import { reqCartList } from '@/api';

export default {
  state: {
    cartList: []
  },
  mutations: {
    GETCARTLIST(state, cartList) {
      state.cartList = cartList
    }
  },
  actions: {
    async getCartList({ commit }) {
      let result = await reqCartList()
      if (result.code === 200) {
        commit('GETCARTLIST', result.data)
      }
    }
  },
  getters: {
    cartInfoList(state) {
      if (state.cartList[0]) {
        return state.cartList[0].cartInfoList
      } else {
        return []
      }
    }
  }
};