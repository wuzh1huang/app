import { reqSearchList } from '@/api';

export default {
  state: {
    searchList: {}

  },
  mutations: {
    SEARCHLIST(state, searchList) {
      state.searchList = searchList
    }
  },
  actions: {
    async searchList({ commit }, parameter = {}) {
      let result = await reqSearchList(parameter)
      if (result.code === 200) {
        commit('SEARCHLIST', result.data)
      }
    }
  },
  getters: {
    attrsList(state) {
      return state.searchList.attrsList
    },
    goodsList(state) {
      return state.searchList.goodsList
    },
    trademarkList(state) {
      return state.searchList.trademarkList
    }
  }
};