// 播放量数据显示转换
export function  playCount(count:number){
  if(count>100000){
    return `${Math.floor(count / 10000)}万`
  }else{
    return count
  }
}


//格式化图片路径：支持修改图片大小
export function getImageSize(imageUrl:string,width:number,height:number = width){
  return  imageUrl+`?param=${width}x${height}`
}


//毫秒转换成00:00 格式
export function formatTime(time:number){
  const timeSeconds = time/1000
  const min = Math.floor(timeSeconds / 60)
  const second = Math.floor(timeSeconds) % 60
  const formatMin = String(min).padStart(2,'0')
  const formatSecond = String(second).padStart(2,'0')
  return  `${formatMin}:${formatSecond}`
}