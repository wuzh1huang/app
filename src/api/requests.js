// 重写axois
import axios from 'axios';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css'
import { getUUID } from '@/utils/uuid'
import { getToken } from '@/utils/token'

const requests = axios.create({
  // 配置对象
  baseURL: '/api',
  timeout: 5000,
})
requests.interceptors.request.use((config) => {
  // 顶部的进度条
  nprogress.start()
  // 添加游客id
  config.headers.userTempId = getUUID()
  // 添加用户token
  if (getToken()) {
    config.headers.token = getToken()
  }
  return config
})
requests.interceptors.response.use((res) => {
  // 顶部的进度条
  nprogress.done()
  return res.data
}, (err) => {
  return Promise.reject(new Error('faile'))
})
export default requests