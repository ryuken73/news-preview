/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import styled, {keyframes, css} from 'styled-components';
import backImage from '../../assets/images/background.jpg'
import backgroundImage from '../../assets/images/BACK.jpg'
import vBarImage from '../../assets/images/vBar.png';
import RefreshIcon from '@mui/icons-material/Refresh';
import SettingsIcon from '@mui/icons-material/Settings';
import ConfigDialog from './Config/ConfigDialog';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import useLocalStorage from '../../hooks/useLocalStorage';

const spinRandom = keyframes`
  from {
    -webkit-transform: rotateY(0deg) rotateX(${Math.random() * -18}deg) rotateZ(${Math.random() * -18}deg);
    transform: rotateY(0deg) rotateX(${Math.random() * -18}deg) rotateZ(${Math.random() * -18}deg);
  }
  to {
    -webkit-transform: rotateY(-360deg) rotateX(${Math.random() * -18}deg) rotateZ(${Math.random() * -180}deg);
    transform: rotateY(-360deg) rotateX(${Math.random() * -18}deg) rotateZ(${Math.random() * -18}deg);
  }
`
const spin = keyframes`
  from {
    -webkit-transform: rotateY(0deg);
    transform: rotateY(0deg);
  }
  to {
    -webkit-transform: rotateY(-360deg);
    transform: rotateY(-360deg);
  }
`
const spinStyle = css`
  animation-name: ${spin};
  animation-duration: 60s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`
const TopContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 200%;
  perspective: 4000px;
  overflow: hidden;
  min-height: 100vh;
  background-image: url(${backImage});
  background-size: cover;
`
const Container = styled.div`
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin: auto;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-transform: rotateX(-0.1deg) rotateY(0deg);
  transform: rotateX(-0.1deg) rotateY(0deg);
  /* transition: transform 0.6s; */
  width: 100%;
  height: 100%;
  margin-bottom: ${props => props.moveUpward === 0 ? 'auto' : `${props.moveUpward}px`};
`
const ControlContainer = styled.div`
  display: flex;
  width: ${props => `${props.width}px`};
`
const Buttons = styled.div`
  display: ${props => !props.show && 'none'};
  min-width: 100px;
  margin: auto;
  z-index: 9999;
  position: relative;
`
const Button = styled.div`
  margin: 10px;
  margin-top: 20px;
  opacity: ${props => props.onTransition && '0.1'};
  color: ${props => props.isPlaying ? 'yellow' : 'darkslategrey'};
  font-size: ${props => `${props.fontSize}px`};
  font-weight: ${props => props.isPlaying ? 200 : 200};
  /* transform: ${props => props.isPlaying && 'translateX(-3px) scale(1.5)'}; */
  transition: all 0.3s;
  word-break: keep-all;
`
const SpinContainer = styled(Container)`
  width: ${props => `${props.width}px`};
  height: ${props => `${props.height}px`};
  ${props => props.autoRotate && spinStyle};
  animation-play-state: ${props => props.animationPaused ? 'paused':'running'};
  filter: ${props => `brightness(${props.stackOpacity})`};
  /* filter: brightness(0.2); */
  /* margin-bottom: 100px; */
`
const VideoContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  transform-style: preserve-3d;
  /* outline: 4px rgba(255,255,255,0.6) solid; */
  /* outline-offset: -2px; */
  border-radius: 10px;
  transform-origin: ${props => props.scaleOrigin === 300 ? 'center center':`center ${props.scaleOrigin}px`};
`
const Backface = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  /* background: black; */
  background-image: url(${backgroundImage});
  background-size: cover;
  opacity: 1;
  border-radius: 10px;
  backface-visibility: hidden;
  transform: rotateY( 180deg );
  /* -webkit-box-shadow: 0 0 8px #fff; */
  /* box-shadow: 0 0 8px #fff; */
  -webkit-box-reflect: below 10px
    linear-gradient(transparent, transparent, #0005);
`
const VideoTitle = styled.div`
  position: absolute;
  top: 0px;
  background: white;
  color: #595959;
  opacity: 1;
  letter-spacing: -1px;
  font-size: ${props => `${props.titleFontSize}px` || '20px'};
  font-weight: ${props => props.titleFontWeight || 100};
  opacity: ${props => props.titleOpacity === undefined ? 0.7 : props.titleOpacity};
  padding: 5px;
  box-sizing: border-box;
  backface-visibility: hidden;
  width: ${props => props.titleType === 'fullWidth' ? '100%' : 'auto'};
  padding-left: ${props => props.titleType === 'fullWidth' ? '20px' : '30px'};
  padding-right: ${props => props.titleType === 'center' && '30px'};
  min-width: ${props => props.titleType === 'center' && '30%'};
  text-align: ${props => props.titleType === 'fullWidth' ? 'left':'center'};
  border-top-left-radius: ${props => props.titleType === 'fullWidth' && '10px'};
  border-top-right-radius: ${props => props.titleType === 'fullWidth' && '10px'};
  border-bottom-left-radius: ${props => props.titleType === 'center' && '10px'};
  border-bottom-right-radius: ${props => props.titleType === 'center' && '10px'};
  left: ${props => props.titleType === 'center' && '50%'};
  transform: ${props => props.titleType === 'center' && 'translate(-50%, 0)'};
`
const TitleContainer = styled.div`
  position: absolute;
  top: 0px;
  background: transparent;
  color: white;
  opacity: 1;
  width: 100%;
  z-index: ${props => props.zIndex};
`
const TransparentTitle = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: left;
  padding-left: 20px;
  font-weight: 100;
  font-size: ${props => `${props.titleFontSize}px` || '20px'};
  font-weight: ${props => props.titleFontWeight || 100};
`
const StyledHr = styled.hr`
  margin-top: 0px;
  width: 95%;
`
const LogContainer = styled.div`
  margin: auto;
`
const LogoText = styled.div`
  font-size: 100px;
  font-weight: bold;
`
const ItemMirror = styled.video`
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  position: absolute;
  backface-visibility: hidden;
  object-fit: cover;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  line-height: 200px;
  font-size: 50px;
  text-align: center;
  -webkit-box-shadow: 0 0 1px #fff;
  box-shadow: 0 0 1px #fff;
  box-sizing: border-box;
  /* outline: 4px rgba(255,255,255,0.6) solid; */
  /* outline-offset: -2px; */
  /* transform: translateY(350px) scale(1, -1); */
  transform: ${props => `translateY(${props.gap}px) scale(1, -1)`};
  mask-image: linear-gradient(transparent, transparent, #0007); 
  z-index: -100;
`
const Item = styled.video`
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  position: absolute;
  object-fit: cover;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  line-height: 200px;
  font-size: 50px;
  text-align: center;
  -webkit-box-shadow: ${props => props.isActive ? '0 0 2px #fffd': '0 0 1px #fff'};
  box-shadow: ${props => props.isActive ? '0 0 2px #fffd': '0 0 1px #fff'};
  /* box-shadow: 0 0 1px #fff; */
  /* -webkit-box-shadow: 0 0 15px #fffd; */
  /* box-shadow: 0 0 15px #fffd; */
  box-sizing: border-box;
  outline: 4px rgba(255,255,255,0.6) solid;
  outline-offset: -2px;
  /* -webkit-box-reflect: below 10px
    linear-gradient(transparent, transparent, #0005); */
  &:hover {
    -webkit-box-shadow: 0 0 15px #fffd;
    box-shadow: 0 0 15px #fffd;
    /* -webkit-box-reflect: below 10px
      linear-gradient(transparent, transparent, #0007); */
  }
`
const Ground = styled.div`
  width: ${props => `${props.width}px`};
  height: ${props => `${props.height}px`};
  position: absolute;
  top: 100%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%) rotateX(90deg);
  transform: translate(-50%, -50%) rotateX(90deg);
  /* background: -webkit-radial-gradient(
    center center,
    farthest-side,
    #9993,
    transparent
  ); */
`
const CustomRefreshIcon = styled(RefreshIcon)`
  position: absolute;
  bottom: -100px;
  right: 100px;
  margin: 10px;
  z-index: 9999;
  opacity: 0.1;
`
const CustomSettingIcon = styled(SettingsIcon)`
  position: absolute;
  bottom: -100px;
  right: 30px;
  margin: 10px;
  z-index: 9999;
  opacity: 0.1;
`
const CustomPlayIcon = styled(PlayCircleFilledIcon)`
  display: ${props => !props.show && 'none !important'};
  position: absolute;
  bottom: 40%;
  right: 10px;
  margin: 5px;
  z-index: 9999;
  opacity: 0.2;
`
const CustomPauseIcon = styled(PauseCircleFilledIcon)`
  display: ${props => !props.show && 'none !important'};
  position: absolute;
  bottom: 40%;
  right: 10px;
  margin: 5px;
  z-index: 9999;
  opacity: 0.2;
`
const BottomDummy = styled.div`
  height: 300px;
`
const StyledSpan = styled.span`
  margin-right: 10px;
`
const BarImage = styled.img`
  height: 20px;
`
// const radius = 800; // how big of the radius
const rotateSpeed = 60; // unit: seconds/360 degrees
const imgWidth = 640; // width of images (unit: px)
const imgHeight = 360; // height of images (unit: px)
const CLASS_FOR_POINTER_EVENT_FREE = 'buttonClass';
const INITIAL_CONFIG = {
  radius: 600,
  autoRotate: true,
  autoRotateInSetting: true,
  moveUpward: 0,
  scaleOrigin: 300,
  startWithStacked: true,
  stackOpacity: 1,
  degreeOfLast: 10,
  videoScale: 2,
  idleVideoWidth: 640,
  greyForDoneItem: true,
  useTitleBar: true,
  buttonFontSize: 30,
  buttonWidth: 200,
  autoPlay: false,
  seekZeroOnPlayEnd: false,
  titleType: 'fullWidth',
  titleFontSize: 25,
  titleFontWeight: 500,
  titleOpacity: 1,
  animationTime: 0.6
}

const makePlayerFront = (element, degree) => {
  element.style.transform = `rotateX(0deg) rotateY(${degree * -1}deg)`
}
const removeTransition = element => {
  element.style.transition = 'none';
}

// const AUTO_PLAY = true;
const USE_STATIC_TY = false;
const TY = 10;
const ANIMATION_SECONDS = 0.6;
const PAUSE_INITIAL_ANIMATION = false;

function Slide3D(props) {
  const {db, parentRef} = props;
  // const [autoRotateCurrent, setAutoRotateCurrent] = React.useState(true);
  const [storedValue, saveToLocalStorage] = useLocalStorage('slide3D', INITIAL_CONFIG);
  const [animationPaused, setAnimationPaused] = React.useState(false);
  const [activeIdState, setActiveIdState] = React.useState(null);
  const [currentPlayingId, setCurrentPlayingId] = React.useState(null);
  const [currentScaledUpId, setCurrentScaledUpId] = React.useState(null);
  const [onTransition, setOnTransition] = React.useState(false);
  const [underTransition, setUnderTransition] = React.useState(false);
  const [mirrorErr, setMirrorErr] = React.useState(false);

  const [configDialogOpen, setConfigDialogOpen] = React.useState(false);
  const [config, setConfig] = React.useState(INITIAL_CONFIG);

  const dragRef = React.useRef(null);
  const spinRef = React.useRef(null);
  const videoContaiersRef = React.useRef([])
  const videoTitleRef = React.useRef([]);
  const itemsRef = React.useRef([]);
  const itemMirrorsRef = React.useRef([]);
  const buttonsRef = React.useRef([]);
  const timerRef = React.useRef();
  const eventTimerRef = React.useRef(null);
  const startXY = React.useRef({x:0, y:0});
  const destXY = React.useRef({x:0, y:0});
  const targetXY = React.useRef({x:0, y:0});
  // console.log(startXY, destXY, targetXY)
  console.log('##', config)

  const ANIMATION_SECONDS = config.animationTime;
  const ANIMATION_MILLI_SECONDS = config.animationTime * 1000;

  const toggleDialogOpen = React.useCallback(() => {
    setConfigDialogOpen(configDialogOpen => !configDialogOpen);
  }, [])

  const reloadPage = React.useCallback(() => {
    window.location.reload();
  }, [])

  const updateConfig = React.useCallback((key, value) => {
    setConfig(config => {
      const newConfig = {
        ...config,
        [key]: value
      }
      saveToLocalStorage(newConfig);
      return newConfig;
    })
  }, [saveToLocalStorage])

  const setAutoRotate = React.useCallback((autoRotate) => {
    if(!config.autoRotateInSetting){
      // if autoRotate is disable by setting, skip action
      return;
    }
    console.log('### enable autoRotate')
    setConfig(config => {
      return {
        ...config,
        autoRotate
      }
    })
  }, [config.autoRotateInSetting])

  // initialize config from localStorage
  React.useEffect(() => {
    setConfig(storedValue)
  }, [storedValue])

  const onPlay = React.useCallback((event) => {
    console.log('event: play start',event.target.id)
    const id = event.target.id;
    setCurrentPlayingId(id)
  }, [])
  
  const onPause = React.useCallback((event) => {
    console.log('event: play paused', event.target.id);
    setCurrentPlayingId(null)
  }, [])
  
  const onEnded = React.useCallback((event) => {
    console.log('event: play end',event.target.id)
    const playEndPlayerId = event.target.id;
    if(config.autoPlay){
      const nextId = parseInt(playEndPlayerId) + 1;
      if(nextId === db.length) {
        console.log('end reached');
      } else {
        console.log('event:',playEndPlayerId, nextId, itemsRef.current)
        setTimeout(() => {
          buttonsRef.current[nextId].click();
        }, 700)
      }
    }
    setCurrentPlayingId(null)
  }, [config.autoPlay, db.length])

  const runInitialAnimation = React.useCallback(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('event: end')
        resolve(true)
      }, ANIMATION_MILLI_SECONDS + 800)
      console.log('event: start')
      spinRef.current.style.filter = 'none';
      videoContaiersRef.current.forEach((videoContainerRef,i) => {
        console.log('apply animation', videoContainerRef)
        if(videoContainerRef === null) return;
        videoContainerRef.style.transform = `rotateY(${i * (360/db.length)}deg) translateZ(${config.radius}px)`;
        videoContainerRef.style.transition = `transform ${ANIMATION_SECONDS}s`;
        videoContainerRef.style.transitionDelay = `${(db.length - i)/4}s`
      })
    })
  }, [ANIMATION_SECONDS, ANIMATION_MILLI_SECONDS, db, config.radius])

  const unFoldPlayer = React.useCallback(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('event: end')
        setAutoRotate(false);
        resolve(true)
      }, ANIMATION_MILLI_SECONDS + 800)
      console.log('event: start')
      spinRef.current.style.filter = `brightness(${config.stackOpacity})`;
      videoContaiersRef.current.forEach((videoContainerRef,i) => {
        console.log('remove animation', videoContainerRef)
        if(videoContainerRef === null) return;
        videoContainerRef.style.transform = `none`;
        videoContainerRef.style.transition = `transform ${ANIMATION_SECONDS}s`;
        videoContainerRef.style.transitionDelay = `${(db.length - i)/4}s`
      })
    })
  }, [config.stackOpacity])

  React.useEffect(() => {
    console.log('db.length=', db.length, videoContaiersRef.current);
    setTimeout(() =>{
      console.log('apply animation', config.startWithStacked)
      if(config.startWithStacked) {
        setAutoRotate(false);
        return;
      }
      runInitialAnimation();
    }, 1000)
    itemsRef.current.forEach((itemRef, i) => {
      if(itemRef === null) return;
      itemRef.addEventListener('play', onPlay);
      itemRef.addEventListener('pause', onPause);
      itemRef.addEventListener('ended', onEnded);
      itemRef.addEventListener('canplay', () => {
        const mediaStream = itemRef.captureStream(0);
        itemMirrorsRef.current[i].srcObject = mediaStream;
        itemMirrorsRef.current[i].play()
        .then(() => {
          console.log('auto play done');
        })
        .catch((err) => {
          console.log('play error:', err)
          setMirrorErr(true);
        })
        console.log(itemMirrorsRef.current[i], mediaStream)
      });
    })
    return () => {
      itemsRef.current.forEach((itemRef) => {
        if(itemRef === null) return;
        itemRef.removeEventListener('play', onPlay );
        itemRef.removeEventListener('pause', onPause );
        itemRef.removeEventListener('ended', onEnded );
      })
    }
  }, [
    config.autoPlay, 
    config.startWithStacked, 
    config.radius, 
    db, 
    itemsRef, 
    onEnded, 
    onPause, 
    onPlay, 
    runInitialAnimation
  ])

  const mirrorPlayer = React.useCallback(() => {
    setMirrorErr(false);
    itemsRef.current.forEach((itemRef, i) => {
      if(itemRef === null) return;
      const mediaStream = itemRef.captureStream(0);
      itemMirrorsRef.current[i].srcObject = mediaStream;
      itemMirrorsRef.current[i].play()
      .then(() => {
        console.log('auto play done');
      })
      .catch((err) => {
        console.log('play error:', err)
        setMirrorErr(true);
      })
      console.log(itemMirrorsRef.current[i], mediaStream)
    });
  }, []);

  console.log('current playing Id = ', currentPlayingId)

  const stopPlayerById = React.useCallback((playerId) => {
    const player = itemsRef.current[playerId];
    const videoContainer = videoContaiersRef.current[playerId]
    videoContainer.style.transform = videoContainer.style.transform.replace(/scale(.*)/, '');
    player?.pause();
  }, [])

  // const restorePlayer = React.useCallback((event) => {
  //   const container = dragRef.current;
  //   setActiveIdState(null);
  //   const ty = USE_STATIC_TY ? TY : targetXY.current.y;
  //   const tx = (event.target.id * (360/db.length) * -1);
  //   container.style.transform = `rotateX(${-ty}deg) rotateY(${tx}deg)`;
  //   const currentPlayer = event.target;
  //   const videoContainer = videoContaiersRef.current[event.target.id]
  //   const resumeAnimation = (e) => {
  //     setAnimationPaused(false)
  //     videoContainer.removeEventListener('transitionend', resumeAnimation);
  //   }
  //   videoContainer.addEventListener('transitionend', resumeAnimation);
  //   videoContainer.style.transform = videoContainer.style.transform.replace(/scale(.*)/, '');
  //   // setTimeout(() => {
  //     // setAnimationPaused(false)
  //     setAutoRotate(true)
  //     removeTransition(container);
  //   // }, config.animationTime * 110)
  //   if(config.seekZeroOnPlayEnd){
  //     currentPlayer.currentTime = 0;
  //   }
  //   currentPlayer.removeEventListener('ended', restorePlayer);
  //   if(config.autoPlay){
  //     const currentId = currentPlayer.id;
  //     if(currentId < db.length - 1){
  //       const nextId = parseInt(currentId) + 1;
  //       console.log(currentId, nextId, itemsRef.current)
  //       setTimeout(() => {
  //         buttonsRef.current[nextId].click();
  //       // }, parseInt(config.animationTime*100*1.5))
  //       }, 700)
  //     }
  //   }
  // }, [config.autoPlay, config.seekZeroOnPlayEnd, db.length, setAutoRotate])

  // const playerHandler = React.useCallback((id) => {
  //   return () => {
  //     try {
  //       const currentPlayer = itemsRef.current[id];
  //       const videoContainer = videoContaiersRef.current[id];
  //       const isPaused = currentPlayer?.paused;
  //       if(isPaused){
  //         // console.log('playerHandler:', isPaused, id)
  //         if(currentPlayingId !== null){
  //           // other player is running
  //           console.log('other player is now playing. stop first!');
  //           stopPlayerById(currentPlayingId);
  //         }
  //         currentPlayer.addEventListener('ended', restorePlayer, {once: true})
  //         videoContainer.style.transition = `${ANIMATION_SECONDS}s`;
  //         videoContainer.style.transform += 'scale(2.0)';
  //         setAnimationPaused(true)
  //         void spinRef.current.offsetWidth;
  //         setAutoRotate(false)
  //         currentPlayer?.play();
  //         setCurrentPlayingId(id);
  //       } else {
  //         stopPlayerById(id);
  //         setAnimationPaused(false)
  //         setAutoRotate(true)
  //       }
  //       setOnTransition(false);
  //     } catch(err) {
  //       console.log(err)
  //     }
  //   }
  // }, [ANIMATION_SECONDS, currentPlayingId, restorePlayer, setAutoRotate, stopPlayerById])

  // const onClickButton = React.useCallback((event) => {
  //   if(onTransition){
  //     return;
  //   }
  //   const clickedPlayerId = event.target.id;
  //   const container = dragRef.current;
  //   const currentPlayer = itemsRef.current[clickedPlayerId];
  //   const videoContainer = videoContaiersRef.current[clickedPlayerId]
  //   const isPaused = currentPlayer?.paused;
  //   setOnTransition(true);

  //   const transitionEndHandler = (e) => {
  //     setActiveIdState(clickedPlayerId);
  //     const transitionType = e.target.getAttribute('transitionType');
  //     if(transitionType === 'rotate'){
  //       console.log('transitionEnd:', e.target.tagName, e.target.getAttribute('transitionType'));
  //       playerHandler(clickedPlayerId)()
  //       setAutoRotate(false)
  //       console.log('remove transitionend (in handler)')
  //       container.removeEventListener('transitionend', transitionEndHandler)
  //     }
  //     if(transitionType === 'scale'){
  //       console.log('transitionEnd:', e.target.tagName, e.target.getAttribute('transitionType'));
  //     }
  //   }

  //   if(activeIdState === clickedPlayerId && !isPaused){
  //     console.log('### clicked Same player under playing (add transitionend):', activeIdState, clickedPlayerId)
  //     setActiveIdState(null);
  //     const ty = USE_STATIC_TY ? TY : targetXY.current.y;
  //     const tx = (clickedPlayerId * (360/db.length) * -1) - 5;
  //     container.style.transform = `rotateX(${-ty}deg) rotateY(${tx}deg)`;
  //     videoContainer.style.transform = videoContainer.style.transform.replace(/scale(.*)/, '');
  //     currentPlayer?.pause();
  //     setAnimationPaused(false)
  //     setAutoRotate(true)
  //     removeTransition(container);
  //     setOnTransition(false);
  //     container.removeEventListener('transitionend', transitionEndHandler)
  //     return;
  //   }
  //   if(activeIdState === clickedPlayerId && isPaused){
  //     console.log('### clicked Same player which inactive (add transitionend):', activeIdState, clickedPlayerId)
  //     container.addEventListener('transitionend', transitionEndHandler);
  //     const tx = clickedPlayerId * (360/db.length) * -1;
  //     const ty = USE_STATIC_TY ? TY : targetXY.current.y;
  //     container.style.transform = `rotateX(${-ty}deg) rotateY(${tx}deg)`;
  //     targetXY.current.y = ty;
  //     targetXY.current.x = tx;
  //     return;
  //   }
  //   console.log('### clicked new player (add transitionend):', activeIdState, clickedPlayerId)
  //   setAutoRotate(false)
  //   container.addEventListener('transitionend', transitionEndHandler);
  //   container.style.transition = `transform ${ANIMATION_SECONDS}s`;
  //   const ty = USE_STATIC_TY ? TY : targetXY.current.y;
  //   const tx = clickedPlayerId * (360/db.length) * -1;
  //   container.style.transform = `rotateX(${-ty}deg) rotateY(${tx}deg)`;
  //   targetXY.current.y = ty;
  //   targetXY.current.x = tx;
  //   return ()  => {
  //     container.removeEventListener('transitionend', transitionEndHandler)
  //   }
  // }, [activeIdState, ANIMATION_SECONDS, db.length, onTransition, playerHandler, setAutoRotate])

  // const toggleAnimationPaused = React.useCallback(() => {
  //   setAnimationPaused(animationPaused => {
  //     return !animationPaused
  //   })
  // }, [])

  const enableAutoRotate = React.useCallback(() => {
    setAutoRotate(true)
  }, [setAutoRotate])

  const disableAutoRotate = React.useCallback(() => {
    setAutoRotate(false)
  }, [setAutoRotate])

  const moveFront = React.useCallback((container, clickedPlayerId, offset=0) => {
    return new Promise((resolve, reject) => {
      // const resolvePromise = (event) => {
      //   const transitionType = event.target.getAttribute('transitionType');
      //   if(transitionType !== 'rotate') return;
      //   console.log('event: remove moveFront:', clickedPlayerId)
      //   container.removeEventListener('transitionend', resolvePromise);
      //   resolve(true)
      // }
      eventTimerRef.current = null;
      eventTimerRef.current = setTimeout(() => {
        console.log('event: remove moveFront:')
        removeTransition(container)
        resolve(true)
      }, ANIMATION_MILLI_SECONDS)
      console.log('event: add moveFront:', clickedPlayerId, offset)
      // container.addEventListener('transitionend', resolvePromise);
      setActiveIdState(clickedPlayerId);
      const ty = USE_STATIC_TY ? TY : targetXY.current.y;
      // if(offset !== 0){
      //   container.style.transition = '0.01s';
      // } else {
      //   container.style.transition = `${ANIMATION_SECONDS}s`;
      // }
      const tx = clickedPlayerId * ((360/db.length) * -1) + offset;
      container.style.transition = `transform ${ANIMATION_SECONDS}s`;
      container.style.transform = `rotateX(${-ty}deg) rotateY(${tx}deg)`;
      targetXY.current.y = ty;
      targetXY.current.x = tx;
    })
  }, [ANIMATION_MILLI_SECONDS, ANIMATION_SECONDS, db.length])

  const scaleUp = React.useCallback((container, targetId) => {
    return new Promise((resolve, reject) => {
      // const resolvePromise = (event) => {
      //   const transitionType = event.target.getAttribute('transitionType');
      //   if(transitionType !== 'scale') return;
      //   setCurrentScaledUpId(targetId)
      //   console.log('event: remove scaleUp:', targetId)
      //   container.removeEventListener('transitionend', resolvePromise);
      //   resolve(true)
      // }
      eventTimerRef.current = null;
      eventTimerRef.current = setTimeout(() => {
        setCurrentScaledUpId(targetId)
        console.log('event: remove scaleUp:', targetId)
        resolve(true)
      }, ANIMATION_MILLI_SECONDS);

      console.log('event: add scaleUp:', targetId)
      // container.addEventListener('transitionend', resolvePromise);
      const isAlreadyScaleUp = /scale(.*)/.test(container.style.transform)
      console.log('event: ',container.style.transform, isAlreadyScaleUp, config, config.videoScale)
      if(isAlreadyScaleUp) return;
      container.style.transition = `${ANIMATION_SECONDS}s`;
      container.style.transform += `scale(${config.videoScale})`;
    })
  }, [ANIMATION_MILLI_SECONDS, ANIMATION_SECONDS, config])

  const scaleDown = React.useCallback((container) => {
    return new Promise((resolve, reject) => {
      // const resolvePromise = (event) => {
      //   const transitionType = event.target.getAttribute('transitionType');
      //   if(transitionType !== 'scale') return;
      //   setCurrentScaledUpId(null)
      //   console.log('event: remove scaleDown:')
      //   container.removeEventListener('transitionend', resolvePromise);
      //   resolve(true)
      // }
      // console.log('event: add scaleDown:')
      eventTimerRef.current = null;
      eventTimerRef.current = setTimeout(() => {
        setCurrentScaledUpId(null)
        console.log('event: remove scaleDown:')
        resolve(true)
      }, ANIMATION_MILLI_SECONDS)
      // container.addEventListener('transitionend', resolvePromise);
      container.style.transition = `${ANIMATION_SECONDS}s`;
      container.style.transform = container.style.transform.replace(/scale(.*)/, '');
    })
  }, [ANIMATION_MILLI_SECONDS, ANIMATION_SECONDS])

  const playById = React.useCallback((player, targetId) => {
    player?.play();
  }, [])

  const pauseById = React.useCallback((player, targetId) => {
    player?.pause();
  }, [])

  const onClickButton = React.useCallback(async (event) => {
    if(underTransition){
      return;
    }
    setUnderTransition(true);
    const targetId = event.target.id;
    const spinContainer = dragRef.current;
    const spinElement = spinRef.current;
    const videoContainer = videoContaiersRef.current[targetId];
    const currentPlayer = itemsRef.current[targetId];
    disableAutoRotate()
    const clickedWhenOtherScaledUp = currentScaledUpId !== null;
    const clickedScaledElement = clickedWhenOtherScaledUp && currentScaledUpId === targetId;
    if(clickedScaledElement){
      console.log('event: Force Quit: clicked already Scaled Up element');
      pauseById(currentPlayer, targetId)
      if(config.greyForDoneItem){
        currentPlayer.style.filter = 'grayscale(1) brightness(30%)';
      }
      await scaleDown(videoContainer);
      // await moveFront(spinContainer, targetId, -2);
      setUnderTransition(false);
      enableAutoRotate();
      const isLastItem = parseInt(targetId) === db.length - 1;
      if(isLastItem){
        const dragRefTransformStr = dragRef.current.style.transform;
        dragRef.current.style.transition = 'transform 1s';
        dragRef.current.style.transform = dragRefTransformStr.replace(/rotateX\(.*?\)/, `rotateX(${config.degreeOfLast * -1}deg)`);
      }
      return;
    }
    if(clickedWhenOtherScaledUp){
      console.log('event: Normal Next: other ScaledUp exists');
      const scaledContainer = videoContaiersRef.current[currentScaledUpId];
      const scaledPlayer = itemsRef.current[currentScaledUpId];
      pauseById(scaledPlayer, currentScaledUpId);
      if(config.greyForDoneItem){
        scaledPlayer.style.filter = 'grayscale(1) brightness(30%)';
      }
      await scaleDown(scaledContainer)
    }
    const spinRefStyle = window.getComputedStyle(spinRef.current);
    console.log('xx', spinRefStyle.filter)
    const isFirstClick = /brightness\(/.test(spinRefStyle.filter);
    if(config.startWithStacked && targetId === '0' && isFirstClick) {
      await runInitialAnimation();
    }
    console.log('event: Move first or Next player');
    await moveFront(spinContainer, targetId);
    playById(currentPlayer, targetId);
    if(config.greyForDoneItem){
      currentPlayer.style.filter = '';
    }
    await scaleUp(videoContainer, targetId);
    setUnderTransition(false);
  }, [
    currentScaledUpId, 
    enableAutoRotate,
    disableAutoRotate, 
    moveFront, 
    pauseById, 
    playById, 
    scaleDown, 
    scaleUp,
    underTransition,
    config
  ])

  const toggleAnimationPaused = React.useCallback(() => {
    setAnimationPaused(animationPaused => {
      return !animationPaused
    })
  }, [])

  const applyTransform = React.useCallback(() => {
    console.log('^^^ applyTransform')
    if(targetXY.current.y > 180) targetXY.current.y = 180;
    if(targetXY.current.y < 0) targetXY.current.y = 0;
    const ty = targetXY.current.y
    const tx = targetXY.current.x
    dragRef.current.style.transform = `rotateX(${-ty}deg) rotateY(${tx}deg)`;
  }, [])

  const startPlayFromFirst = React.useCallback(() => {
    console.log('start play first:',buttonsRef.current);
    buttonsRef.current[0].click();
  }, [])

  const stopPlayerCurrent = React.useCallback(() => {
    stopPlayerById(currentPlayingId)
    setAnimationPaused(false)
    setAutoRotate(true)
  }, [currentPlayingId, setAutoRotate, stopPlayerById])

  React.useEffect(() => {
    parentRef.current.onpointerdown = (e) => {
      clearInterval(timerRef.current);
      e = e || window.event; 
      startXY.current.x = e.clientX;
      startXY.current.y = e.clientY;
      parentRef.current.onpointermove = (e) => {
        const moveElement = document.elementFromPoint(e.clientX, e.clientY);
        const ignoreEvent = moveElement.classList.contains(CLASS_FOR_POINTER_EVENT_FREE);
        if(ignoreEvent) {
          return;
        }
        console.log('move event')
        e = e || window.event;
        const nX = e.clientX;
        const nY = e.clientY;
        destXY.current.x = nX - startXY.current.x;
        destXY.current.y = nY - startXY.current.y;
        targetXY.current.x += destXY.current.x * 0.1;
        targetXY.current.y += destXY.current.y * 0.1;
        console.log('mouse move event')
        applyTransform()
        startXY.current.x = nX;
        startXY.current.y = nY;
      }
      parentRef.current.onpointerup = (e) => {
        const upElement = document.elementFromPoint(e.clientX, e.clientY);
        console.log('upElement:', upElement)
        const ignoreEvent = upElement.classList.contains(CLASS_FOR_POINTER_EVENT_FREE);
        if(ignoreEvent) {
          parentRef.current.onpointermove = parentRef.current.onpointerup = null
          return;
        }
        console.log('up event')
        timerRef.current = setInterval(() => {
          destXY.current.x *= 0.95;
          destXY.current.y *= 0.95;
          targetXY.current.x += destXY.current.x * 0.1;
          targetXY.current.y += destXY.current.y * 0.1;
          console.log('mouse up event')
          applyTransform();
          setAnimationPaused(true);
          if(Math.abs(destXY.current.x) < 0.5 && Math.abs(destXY.current.y) < 0.5) {
            clearInterval(timerRef.current);
            setAnimationPaused(false);
          }
        }, 17)
        parentRef.current.onpointermove = parentRef.current.onpointerup = null
      }
    }
    return () => {
      clearInterval(timerRef.current);
      parentRef.current.onpointerdown = null;
    }
  }, [applyTransform, parentRef])

  const idleVideoHeight = config.idleVideoWidth * (9/16);
  const reflectionGap = idleVideoHeight + 10;

  return (
    <TopContainer>
      <Container
        ref={dragRef}
        transitionType="rotate"
        moveUpward={config.moveUpward}
      > 
        <SpinContainer 
          ref={spinRef}
          stackOpacity={config.stackOpacity}
          autoRotate={config.autoRotate}
          animationPaused={animationPaused}
          width={config.idleVideoWidth} 
          height={idleVideoHeight}
        >
          {db.map((item, i) => (
            <VideoContainer
              key={item.id}
              ref={el => videoContaiersRef.current[i] = el}
              transitionType="scale"
              scaleOrigin={config.scaleOrigin}
            >
              <Item
                crossOrigin="anonymous"
                id={i}
                // className={CLASS_FOR_POINTER_EVENT_FREE}
                // onClick={playerHandler(i)}
                // onClick={onClickButton}
                src={item.src}
                ref={el => itemsRef.current[i] = el}
                itemIndex={i}
                itemLength={db.length}
                radius={config.radius}
                isActive={i === parseInt(activeIdState)}
              >
              </Item>
              <ItemMirror
                playsinline 
                autoplay 
                id={i}
                ref={el => itemMirrorsRef.current[i] = el}
                gap={reflectionGap}
              ></ItemMirror>
              {config.titleType !== 'transparent' && (
                <VideoTitle
                  ref={el => videoTitleRef.current[i] = el}
                  titleFontSize={config.titleFontSize}
                  titleFontWeight={config.titleFontWeight}
                  titleOpacity={config.titleOpacity}
                  titleType={config.titleType}
                >
                  {config.titleType === 'fullWidth' && (
                    <StyledSpan>
                      <BarImage src={vBarImage} />
                    </StyledSpan>
                  )}
                  {item.title}
                </VideoTitle>
              )}
              {config.titleType === 'transparent' && (
                <TitleContainer
                  zIndex={(i*-1) + 100}
                >
                  <TransparentTitle
                    ref={el => videoTitleRef.current[i] = el}
                    titleFontSize={config.titleFontSize}
                    titleFontWeight={config.titleFontWeight}
                    titleOpacity={config.titleOpacity}
                  >
                    {item.title}
                  </TransparentTitle>
                  <StyledHr></StyledHr>
                </TitleContainer>
              )}
              <Backface>
                {/* <LogContainer>
                  <LogoText>SBS</LogoText>
                </LogContainer> */}
              </Backface>
            </VideoContainer>
          ))}
        </SpinContainer>
        <Ground width={config.radius*3} height={config.radius*3}></Ground>
      </Container>
      <ControlContainer width={config.buttonWidth}>
          <Buttons show={config.useTitleBar}>
            {db.map((item, i) => (
              <Button 
                key={item.id} 
                id={i} 
                className={CLASS_FOR_POINTER_EVENT_FREE} 
                fontSize={config.buttonFontSize}
                ref={el => buttonsRef.current[i] = el}
                onClick={onClickButton}
                onTransition={underTransition}
                isPlaying={currentPlayingId == i}
              >
                {item.title}
              </Button>
            ))}
            <CustomRefreshIcon
              fontSize='large'
              className={CLASS_FOR_POINTER_EVENT_FREE}
              onClick={reloadPage}
            ></CustomRefreshIcon>
            <CustomSettingIcon
              fontSize='large'
              className={CLASS_FOR_POINTER_EVENT_FREE}
              onClick={toggleDialogOpen}
            ></CustomSettingIcon>
            {config.startWithStacked && (
              <Button 
                style={{color: 'grey', opacity:0.2, fontSize: '20px'}}
                onClick={unFoldPlayer}
              >Unfold</Button>
            )}
            {mirrorErr && (
              <Button 
                style={{color: 'red', opacity:1, fontSize: '15px'}}
                onClick={mirrorPlayer}
              >
                Turn On Reflect All
              </Button>
            )}
            {/* <Button onClick={toggleAnimationPaused}>{animationPaused ? "Resume Rotate" : "Pause Rotate"}</Button>
            <Button>{onTransition ? 'T':'F'}</Button> */}
          </Buttons>
          {currentPlayingId === null ? (
            <CustomPlayIcon
              fontSize="large"
              onClick={startPlayFromFirst}
              show={!config.useTitleBar}
              className={CLASS_FOR_POINTER_EVENT_FREE}
            ></CustomPlayIcon>
           ):( 
            <CustomPauseIcon
              fontSize="large"
              show={!config.useTitleBar}
              onClick={stopPlayerCurrent}
              className={CLASS_FOR_POINTER_EVENT_FREE}
            ></CustomPauseIcon>
          )}
      </ControlContainer>
      <ConfigDialog
        configDialogOpen={configDialogOpen}
        toggleDialogOpen={toggleDialogOpen}
        config={config}
        setConfig={setConfig}
        updateConfig={updateConfig}
        saveToLocalStorage={saveToLocalStorage}
        defaultConfig={INITIAL_CONFIG}
        runInitialAnimation={runInitialAnimation}
      ></ConfigDialog>
    </TopContainer>
  )
}

export default Slide3D;
