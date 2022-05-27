import { reqVerificationCode, reqUserInfo } from '@/api';
import { removeToken } from '@/utils/token';

export default {
  state: {
    code: '',
    userInfo: {}
  },
  mutations: {
    GETVERIFICATIONCODE(state, code) {
      state.code = code
    },
    GETUSERINFO(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    async getVerificationCode({ commit }, phone) {
      let result = await reqVerificationCode(phone)
      if (result.code == 200) {
        commit('GETVERIFICATIONCODE', result.data)
        return 'ok'
      } else {
        return Promise.reject(new Error('faild'))
      }
    },
    async getUserInfo({ commit }) {
      let result = await reqUserInfo()
      if (result.code == 200) {
        commit('GETUSERINFO', result.data)
      } else {
        removeToken()
      }
    }
  },
  getters: {

  }
};