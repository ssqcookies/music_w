
import axios, { AxiosHeaders } from "axios"
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios"
import type { SRequestConfig, SInterceptor } from './types'
import { getRealUrl } from '../config/urlMapping'
import { getCommonHeaders } from '../config/index'

class SRequest {
  instance: AxiosInstance
  // 实例级别的拦截器
  interceptors?: SInterceptor

  constructor(config: SRequestConfig) {
    //1:创建 axios 实例, request 实例 对应一个 axios实例
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    //2. 实例级拦截器（只对当前实例生效）
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn,
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn,
    )

    // ---------------------------
    // 3. 全局拦截器（所有请求都生效）
    // ---------------------------
    this.instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      console.log("【全局请求拦截】添加公共 header、token 等")
      const originalUrl = config.url || ''
      console.log("originalUrl",originalUrl)
      const realUrl = getRealUrl(originalUrl)   // 从映射表获取真实路径
      console.log("realUrl",realUrl)

      if (realUrl !== originalUrl) {
        config.url = realUrl
        console.log(`[URL 映射] ${originalUrl} → ${realUrl}`)
      }
      // 请求拦截器里设置
      if (!config.headers) {
        config.headers = new AxiosHeaders()
      }
      const commonHeaders = getCommonHeaders();
      // 循环设置 header，避免类型错误
      Object.entries(commonHeaders).forEach(([key, value]) => {
        config.headers!.set(key, value)
      })
      return config
    }, (err) => Promise.reject(err))
    this.instance.interceptors.response.use((res: AxiosResponse) => {
      console.log("【全局响应拦截】统一处理业务状态码、错误提示")
      // 示例：直接返回 data，业务层无需 res.data
      return res.data
    }, err => {
      console.log("【全局响应错误】统一处理错误码")
      return Promise.reject(err)
    })
  }



  // ---------------------------
  // 4. 单次请求拦截器（只对当前请求生效）
  // 在 request 方法上定义泛型 <T>，让调用者可以指定返回数据的类型
  // ---------------------------
  request<T = any>(config: SRequestConfig<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      // 单次请求的成功拦截处理
      if (config.interceptors?.requestSuccessFn) {
        config = config.interceptors?.requestSuccessFn(config as InternalAxiosRequestConfig) as any
      }
      //axios.request<any, T>(config) 里，第一个泛型是「响应体类型」，第二个是「返回的 Promise 类型」，这里我们统一用 T 表示业务数据类型
      this.instance.request<any, T>(config)
        .then(res => {
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors?.responseSuccessFn(res)
          }
          resolve(res)
        }).catch(err => {
          reject(err)
        })
    })
  }

  // 快捷方法封装（get/post/put/delete）
  get<T = any>(url: string, params?: any, config?: SRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "GET", url, params })
  }

  post<T = any>(url: string, data?: any, config?: SRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "POST", url, data })
  }

  put<T = any>(url: string, data?: any, config?: SRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "PUT", url, data })
  }

  delete<T = any>(url: string, config?: SRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "DELETE", url })
  }
}



export default SRequest