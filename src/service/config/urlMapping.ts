// src/service/urlMapping.ts

export const urlMapping: Record<string, { dev: string; prod: string }> = {
  '/api/banners': {
      dev: '/data/banners.json',
      prod: '/api/banners'
  },
  '/api/top-list': {
      dev: '/data/top-list.json',
      prod: '/api/top-list'
  },
  // ... 其他接口
}

export function getRealUrl(logicUrl: string): string {
  const isProd = import.meta.env.PROD
  const mapping = urlMapping[logicUrl]
  if (mapping) {
      return isProd ? mapping.prod : mapping.dev
  }
  // 没有映射的路径保持原样（比如第三方接口）
  return logicUrl
}