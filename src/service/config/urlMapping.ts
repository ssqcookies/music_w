// src/service/urlMapping.ts

export const urlMapping: Record<string, { dev: string; prod: string }> = {
  '/api/banners': {
    dev: '/data/banners.json',
    prod: '/api/banners'
  },
  '/api/personalizedRecommend': {
    dev: '/data/personalizedRecommend.json',
    prod: '/api/personalizedRecommend'
  },
  '/api/newAlbumList': {
    dev: '/data/newAlbum.json',
    prod: '/api/newAlbum'
  },

  '/api/topList': {
    dev: '/data/topList.json',
    prod: '/api/topList'
  },
  '/api/rankingList': {
    dev: '/data/rankingList.json',
    prod: '/api/rankingList'
  },
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