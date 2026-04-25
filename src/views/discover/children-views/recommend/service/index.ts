import sRequest from "@/service"

export function getTopBanners(){
  return sRequest.get( '/banner')
}