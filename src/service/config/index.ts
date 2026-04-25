export const BASE_URL = ''
export const TIME_OUT = 10000
 const token = localStorage.getItem("token")
export const getCommonHeaders = () => {
  const requestHeader = {
    Authorization:token? `Bearer ${token}`:'',
    timestamp: Date.now(),
   'Accept-Language':  'zh-CN',
  };
  return requestHeader;
};

/**
 Vite 会自动注入 import.meta.env 环境变量：
import.meta.env.PROD：true 表示当前是生产环境（npm run build）
import.meta.env.DEV：true 表示当前是开发环境（npm run dev）
 */


// if(import.meta.env.PROD){

// }

