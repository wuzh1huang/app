import { reqTrade, reqAddressList } from '@/api'
export default {
  state: {
    addressList: [],
    tradeInfo: {}
  },
  mutations: {
    REQADDRESSLIST(state, addressList) {
      state.addressList = addressList
    },
    GETTRADE(state, tradeInfo) {
      state.tradeInfo = tradeInfo
    },
  },
  actions: {
    async getAddressList({ commit }) {
      let result = await reqAddressList()
      if (result.code == 200) {
        commit('REQADDRESSLIST', result.data)
      }
    },
    async getTrade({ commit }) {
      let result = await reqTrade()
      if (result.code == 200) {
        commit('GETTRADE', result.data)
      }
    },

  },
  getters: {}
}