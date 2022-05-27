import Vue from 'vue';
import VueRouter from 'vue-router';
import { getToken } from '@/utils/token'
import store from '@/store'
Vue.use(VueRouter)

// 重写push和replace
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function (path, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, path, resolve, reject)
  } else {
    originPush.call(this, path, () => { }, () => { })
  }
}
VueRouter.prototype.replace = function (path, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, path, resolve, reject)
  } else {
    originReplace.call(this, path, () => { }, () => { })
  }
}

// import Home from '@/pages/Home'
// import Login from '@/pages/Login'
// import Search from '@/pages/Search'
// import Detail from '@/pages/Detail'
// import Register from '@/pages/Register'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'
const Home = () => import('@/pages/Home')
const Login = () => import('@/pages/Login')
const Search = () => import('@/pages/Search')
const Detail = () => import('@/pages/Detail')
const Register = () => import('@/pages/Register')
const AddCartSuccess = () => import('@/pages/AddCartSuccess')
const ShopCart = () => import('@/pages/ShopCart')
const Trade = () => import('@/pages/Trade')
const Pay = () => import('@/pages/Pay')
const PaySuccess = () => import('@/pages/PaySuccess')
const Center = () => import('@/pages/Center')

const router = new VueRouter({
  routes: [
    {
      path: '/home',
      component: Home,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/detail/:skuId',
      component: Detail,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/addcartsuccess',
      component: AddCartSuccess,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/shopcart',
      component: ShopCart,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/trade',
      component: Trade,
      meta: {
        showFooter: true,
        from: '/shopcart'
      }
    },
    {
      path: '/pay',
      component: Pay,
      meta: {
        showFooter: true,
        from: '/trade'
      }
    },
    {
      path: '/paysuccess',
      component: PaySuccess,
      meta: {
        showFooter: true,
        from: '/pay'
      }
    },
    {
      path: '/center',
      component: Center,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/login',
      component: Login,
      meta: {
        showFooter: false
      }
    },
    {
      path: '/register',
      component: Register,
      meta: {
        showFooter: false
      }
    },
    // 重定向
    {
      path: '/',
      redirect: '/home'
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if (getToken()) {
    store.dispatch('getUserInfo');
    if (to.path == '/login' || to.path == '/register') {
      next('/')
    } else {
      if (to.meta.from) {
        if (to.meta.from == from.path) {
          next()
        } else {
          next(false)
        }
      } else {
        next()
      }
    }
  } else {
    if (to.path == '/trade' || to.path == '/pay' || to.path == '/paysuccess' || to.path == '/center') {
      alert('请登录！')
      next(false)
    } else {
      next()
    }
  }
})

export default router