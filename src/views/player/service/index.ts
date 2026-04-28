import sRequest from "@/service"

export function getSongDetail() {
  return sRequest.get('/api/songDetail')
}

export function getSongLyric(id:number) {
  return sRequest.get("/api/songLyric",{id})
}
