// 重写axois
import axios from 'axios';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css'

const requests = axios.create({
  // 配置对象
  baseURL: '/mock',
  timeout: 5000,
})
requests.interceptors.request.use((config) => {
  // 顶部的进度条
  nprogress.start()
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