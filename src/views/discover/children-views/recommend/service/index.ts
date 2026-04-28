import sRequest from "@/service"

export function getTopBanners(){
  return sRequest.get( '/api/banners')
}


export function getHotRecommend(){
  return sRequest.get( '/api/personalizedRecommend')
}


export function getNewAlbumList(){
  return sRequest.get('/api/newAlbumList')
}
export function getTopList(){
  return sRequest.get('/api/topList')
}

export function getRankingList(id:any){
  return sRequest.get('/api/rankingList',{id})
}


export function getArtistsList(){
  return sRequest.get('/api/artistsList')
}