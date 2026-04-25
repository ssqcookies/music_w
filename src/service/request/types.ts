import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios"

//针对AxiosRequestConfig配置进行扩展，支持传入单次请求拦截器
/**
 * 拦截器类型定义
 * 分为：请求成功/失败、响应成功/失败
 */
export interface SInterceptor<T = AxiosResponse> {
  // 请求拦截器
  requestSuccessFn?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestFailureFn?: (err: any) => any
  // 响应拦截器
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any
}
// 自定义请求配置：泛型 T 是响应数据类型
export interface SRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: SInterceptor<T>
}

