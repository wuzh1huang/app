// 统一接口管理
import requests from './requests';
import mockRequests from './mockRequests'

// 三级联动数据接口
export const reqCategoryList = () => requests.get('/product/getBaseCategoryList')

// Shortcut轮播图接口
export const reqShortcutCarousel = () => mockRequests.get('/banner')
export const reqFloorList = () => mockRequests.get('/floor')

// 搜索页面接口
export const reqSearchList = (parameter) => requests({
  url: '/list',
  method: 'post',
  data: parameter,
})

// 商品详情页接口
export const reqGoodsDetail = (skuId) => requests.get(`/item/${skuId}`)

// 添加到购物车接口
export const reqAddToCart = (skuId, skuNum) => requests({
  url: `/cart/addToCart/${skuId}/${skuNum}`,
  method: 'post'
})

// 获取购物车列表接口
export const reqCartList = () => requests.get('/cart/cartList')

// 切换购物车中商品选中状态
export const reqChangeCheck = (skuId, isChecked) => requests.get(`/cart/checkCart/${skuId}/${isChecked}`)

// 删除购物车中商品
export const reqDeleteCart = (skuId) => requests.delete(`/cart/deleteCart/${skuId}`)

// 获取验证码
export const reqVerificationCode = (phone) => requests.get(`/user/passport/sendCode/${phone}`)

// 注册
export const reqRegister = (data) => requests({
  url: '/user/passport/register',
  data,
  method: 'post'
})

// 登录
export const reqLogin = (data) => requests({
  url: '/user/passport/login',
  data,
  method: 'post'
})
// 获取用户信息
export const reqUserInfo = () => requests.get('/user/passport/auth/getUserInfo')
// 退出登录
export const reqLogout = () => requests.get('/user/passport/logout')
// 获取订单交易页信息
export const reqTrade = () => requests.get('/order/auth/trade')
// 获取地址
export const reqAddressList = () => requests.get('/user/userAddress/auth/findUserAddressList')
// 提交订单
export const reqsubmitOrder = (tradeNo, data) => requests({
  url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
  data,
  method: 'post'
})
// 获取支付状态
export const reqPayment = (orderId) => requests.get(`/payment/weixin/createNative/${orderId}`)
// 查询订单支付状态
export const reqPayStatus = (orderId) => requests.get(`/payment/weixin/queryPayStatus/${orderId}`)
// 获取订单列表
export const reqOrderList = (page, limit) => requests.get(`/order/auth/${page}/${limit}`)

