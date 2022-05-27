// home小仓库
import { reqGoodsDetail, reqAddToCart } from '@/api'
import { getUUID } from '@/utils/uuid'
export default {
  state: {
    goodsDetail: {},
    guest_id: getUUID()
  },
  mutations: {
    GETGOODSDETAIL(state, goodsDetail) {
      state.goodsDetail = goodsDetail
    }
  },
  actions: {
    async getGoodsDetail({ commit }, skuId) {
      let result = await reqGoodsDetail(skuId)
      if (result.code === 200) {
        commit('GETGOODSDETAIL', result.data)
      }
    },
    async addShopCart({ commit }, { skuId, skuNum }) {
      let result = await reqAddToCart(skuId, skuNum)
      if (result.code === 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('faild'))
      }
    }
  },
  getters: {
    categoryView(state) {
      return state.goodsDetail.categoryView || {}
    },
    skuInfo(state) {
      return state.goodsDetail.skuInfo || {}
    },
    spuSaleAttrList(state) {
      return state.goodsDetail.spuSaleAttrList || []
    },
    price(state) {
      return state.goodsDetail.price
    },

  }
}