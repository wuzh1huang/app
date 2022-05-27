import Vue from 'vue'
import App from './App.vue'
import router from './router'
import TypeNav from './components/TypeNav'
import Carousel from './components/Carousel'
import Pagination from './components/Pagination'
import store from './store'
import '@/mock/mockServer'
import 'swiper/css/swiper.css'

Vue.component('TypeNav', TypeNav)
Vue.component('Carousel', Carousel)
Vue.component('Pagination', Pagination)

import { MessageBox } from 'element-ui'

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert

import VueLazyload from 'vue-lazyload'
import loadingImg from '@/assets/1.gif'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: loadingImg,
  attempt: 1,
})

import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)
// 表单验证
VeeValidate.Validator.localize('zh_CN', {
  messages: {
    ...zh_CN.messages,
    is: (field) => `${field}必须与密码相同`, // 修改内置规则的 message，让确认密码和密码相同
  },
  attributes: {
    phone: '手机号',
    code: '验证码',
    password: '密码',
    confirm: '确认密码',
    agree: '协议',
  },
})

// 自定义校验规则
VeeValidate.Validator.extend('tongyi', {
  validate: (value) => {
    console.log(value)
    return value
  },
  getMessage: (field) => field + '必须同意',
})

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this // 安装全局事件总线
  },
}).$mount('#app')
