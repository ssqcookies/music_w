import { memo, ReactNode, useEffect, useRef, useState } from "react";
import { BarControl, BarOperator, BarPlayerInfo, PlayerBarWrapper } from "./style";
import { formatTime, getImageSize } from "@/utils/format";
import { Link } from "react-router-dom";
import { message, Slider } from "antd";
import { useAppDispatch, useAppSelector } from "@/store";
import { shallowEqual } from "react-redux";
import { changeLyricIndexAction, changeMusicAction, changePlayModeAction } from "../store/player";

interface IProps {
  children?:ReactNode
}

const AppPlayBar = ({}:IProps)=>{
  
  const [isPlaying, setIsPlaying] = useState(false) //是否播放
  const [progress,setProgress] = useState(0) //播放进度
  const [currentTime,setCurrentTime] = useState(0) //播放当前时间节点
  const [duration,setDuration] = useState(0) //歌曲总时长
  const [isSliding, setIsSliding] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)

  const  picUrl = "https://s4.music.126.net/style/web2/img/default/default_album.jpg"

  const {currentSong ,lyrics,lyricIndex ,playMode} = useAppSelector((state)=>({
    currentSong:state.player.currentSong,
    lyrics:state.player.lyrics,
    lyricIndex:state.player.lyricIndex,
    playMode:state.player.playMode
  }),shallowEqual)

  const dispatch = useAppDispatch()


    /** 组件内的副作用操作 */
    useEffect(() => {
      audioRef.current!.src = `/songs/testMusic.mp3`
      setDuration(currentSong.dt)
    }, [currentSong])

    
// 切换 上一曲下一曲
function handleChangeMusic(isNext = true) {
  dispatch(changeMusicAction(isNext))
}

async function handlePlayBtnClick(){
  if (!audioRef.current) return;
  if(isPlaying){
    audioRef.current?.pause()
     // 2.改变isPlaying的状态
    setIsPlaying(!isPlaying)
    return
  }
  try {
    // 确保 src 已设置（可能是之前设置好了）
    if (!audioRef.current.src) {
      // 等待元数据加载
      await new Promise((resolve) => {
        audioRef.current!.oncanplaythrough = resolve;
      });
    }
    await audioRef.current.play();
  } catch (err) {
    console.error('播放失败，请再试一次', err);
    // 提示用户再次点击
  }
 // 2.改变isPlaying的状态
 setIsPlaying(!isPlaying)
}

//slider 事件
function handleSliderChanging(value:number){
   // 0.设置当前是处于拖拽状态
   setIsSliding(true)
   // 1.设置progress
   setProgress(value)
   // 2.获取value对应位置的时间（当前位置在进度条的百分比）
   const currentTime = (value / 100) * duration
   setCurrentTime(currentTime)
}

function handleSliderChanged(value:number){
    // 1.获取点击位置的时间
    const currentTime = (value / 100) * duration
    // 2.设置当前播放的时间
    audioRef.current!.currentTime = currentTime / 1000
    // 3.currentTime/progress
    setCurrentTime(currentTime)
    setProgress(value)
    setIsSliding(false)
}

// 切换歌曲播放模式
function handleChangePlayMode(){
  let newPlayMode = playMode + 1
    if (newPlayMode > 2) newPlayMode = 0
    dispatch(changePlayModeAction(newPlayMode))
}

//  音乐播放的进度处理
function handleTimeUpdate(){
   // 1.获取当前的播放时间
   const currentTime = audioRef.current!.currentTime * 1000
   // 2.计算当前歌曲进度
   if (!isSliding) {
     const progress = (currentTime / duration) * 100
     setProgress(progress)
     setCurrentTime(currentTime)
   }
   // 3.根据当前的时间匹配对应的歌词
   let left = 0, right = lyrics.length - 1, index =  lyrics.length - 1;
   while (left <= right) {
     const mid = (left + right) >> 1;
     if (lyrics[mid].time <= currentTime) {
       index = mid;
       left = mid + 1;
     } else {
       right = mid - 1;
     }
   }
   // index 即为最后一个时间 <= currentTime 的索引，不存在则为 -1


    // 4.匹配上对应的歌词的index
    if (lyricIndex === index || index === -1) return
    dispatch(changeLyricIndexAction(index))

    // 5.展示对应的歌词
    if(isPlaying){
      message.open({
        content: lyrics[index].text,
        key: 'lyric',
        duration: 0
      })
    }
   
}
function handleTimeEnded(){
  if (playMode === 2) {
    audioRef.current!.currentTime = 0
    audioRef.current?.play()
  } else {
    handleChangeMusic(true)
  }
}


  return  <PlayerBarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <BarControl isPlaying={isPlaying}>
        <button
            className="btn sprite_playbar prev"
            onClick={() => handleChangeMusic(false)}
          ></button>
          <button
            className="btn sprite_playbar play"
            onClick={handlePlayBtnClick}
          ></button>
          <button
            className="btn sprite_playbar next"
            onClick={() => handleChangeMusic()}
          ></button>
        </BarControl>
        <BarPlayerInfo>
        <Link to="/player">
            <img
              className="image"
              src={getImageSize(currentSong?.al?.picUrl||picUrl, 50)}
              alt=""
            />
          </Link>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong?.name||""}</span>
              <span className="singer-name">{currentSong?.ar?.[0]?.name||""}</span>
            </div>
            <div className="progress">
              {/* Slider组件 */}
              <Slider
                step={0.5}
                value={progress}
                tooltip={{ formatter: null }}
                onChange={handleSliderChanging}
                onChangeComplete={handleSliderChanged}
              />
              <div className="time">
                <span className="current">{formatTime(currentTime)}</span>
                <span className="divider">/</span>
                <span className="duration">{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </BarPlayerInfo>
        <BarOperator playMode={playMode}>
        <div className="left">
            <button className="btn sprite_pip pip"></button>
            <button className="btn sprite_playbar favor"></button>
            <button className="btn sprite_playbar share"></button>
          </div>
          <div className="right sprite_playbar">
            <button className="btn sprite_playbar volume"></button>
            <button
              className="btn sprite_playbar loop"
              onClick={handleChangePlayMode}
            ></button>
            {/* <div className="tip">单曲循环</div> */}
            <button className="btn sprite_playbar playlist"></button>
          </div>
          <button className="btn audio-quality"></button>
        </BarOperator>
      </div>
      <audio ref={audioRef}  onTimeUpdate={handleTimeUpdate}
        onEnded={handleTimeEnded}/>
  </PlayerBarWrapper>
}

export default memo(AppPlayBar)