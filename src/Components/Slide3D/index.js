import React from 'react';
import styled, {keyframes, css} from 'styled-components';

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
  perspective: 4000px;
  overflow: hidden;
  min-height: 100vh;
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
  width: 100%;
  height: 100%;
`
const ControlContainer = styled.div`
  display: flex;
  min-width: 150px;
  max-width: 150px;
`
const Buttons = styled.div`
  min-width: 100px;
  margin: auto;
`
const Button = styled.div`
  margin: 10px;
`
const SpinContainer = styled(Container)`
  width: ${props => `${props.width}px`};
  height: ${props => `${props.height}px`};
  ${props => props.autoRotate && spinStyle};
  animation-play-state: ${props => props.animationPaused ? 'paused':'running'};
  /* margin-bottom: 100px; */
`
const Item = styled.video`
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  position: absolute;
  object-fit: cover;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  line-height: 200px;
  font-size: 50px;
  text-align: center;
  -webkit-box-shadow: 0 0 8px #fff;
  box-shadow: 0 0 8px #fff;
  -webkit-box-reflect: below 10px
    linear-gradient(transparent, transparent, #0005);
  &:hover {
    -webkit-box-shadow: 0 0 15px #fffd;
    box-shadow: 0 0 15px #fffd;
    -webkit-box-reflect: below 10px
      linear-gradient(transparent, transparent, #0007);
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
  background: -webkit-radial-gradient(
    center center,
    farthest-side,
    #9993,
    transparent
  );
`
const radius = 600; // how big of the radius
const autoRotate = true; // auto rotate or not
const rotateSpeed = 60; // unit: seconds/360 degrees
const imgWidth = 600; // width of images (unit: px)
const imgHeight = 350; // height of images (unit: px)
const CLASS_FOR_POINTER_EVENT_FREE = 'buttonClass';

const makePlayerFront = (element, degree) => {
  element.style.transform = `rotateX(0deg) rotateY(${degree * -1}deg)`
}
const removeTransition = element => {
  element.style.transition = 'none';
}

function Slide3D(props) {
  const {db, parentRef} = props;
  const [autoRotate, setAutoRotate] = React.useState(false);
  const [animationPaused, setAnimationPaused] = React.useState(false);
  const [activeIdState, setActiveIdState] = React.useState(null);
  const dragRef = React.useRef(null);
  const spinRef = React.useRef(null);
  const itemsRef = React.useRef([]);
  const timerRef = React.useRef();
  const nonRotateRef1 = React.useRef(null);
  const startXY = React.useRef({x:0, y:0});
  const destXY = React.useRef({x:0, y:0});
  const targetXY = React.useRef({x:0, y:0});
  // console.log(startXY, destXY, targetXY)

  React.useEffect(() => {
    itemsRef.current.forEach((itemRef,i) => {
      itemRef.style.transform = `rotateY(${i * (360/db.length)}deg) translateZ(${radius}px)`;
      itemRef.style.transition = `transform 1s`;
      itemRef.style.transitionDelay = `${(db.length - i)/4}s`
    })
  }, [db.length, itemsRef])

  const onClickPlay = React.useCallback((id) => {
    return () => {
      try {
        const currentPlayer = itemsRef.current[id];
        const isPaused = currentPlayer?.paused;
        if(isPaused){
          console.log('onClickPlay:', isPaused, id)
          currentPlayer.addEventListener('ended', () => {
            currentPlayer.style.transform = currentPlayer.style.transform.replace(/scale(.*)/, '');
            currentPlayer.currentTime = 0;
            setAnimationPaused(false)
            setAutoRotate(true)
          }, 'once')
          currentPlayer.style.transition = '0.5s';
          currentPlayer.style.transform += 'scale(2.0)';
          setAnimationPaused(true)
          void spinRef.current.offsetWidth;
          setAutoRotate(false)
          currentPlayer?.play();
        } else {
          currentPlayer.style.transform = currentPlayer.style.transform.replace(/scale(.*)/, '');
          currentPlayer?.pause();
          setAnimationPaused(false)
          setAutoRotate(true)
        }
      } catch(err) {
        console.log(err)
      }
    }
  }, [])

  const onClickButton = React.useCallback((event) => {
    const clickedPlayerId = event.target.id;
    const container = dragRef.current;
    const currentPlayer = itemsRef.current[clickedPlayerId];
    const isPaused = currentPlayer?.paused;

    const transitionEndHandler = (e) => {
      setActiveIdState(clickedPlayerId);
      const isTransitionFromVideo = e.target.tagName === 'VIDEO'
      console.log('transitionEnd:', isTransitionFromVideo)
      if(!isTransitionFromVideo){
        onClickPlay(clickedPlayerId)()
        setAutoRotate(false)
      }
      removeTransition(container);
      container.removeEventListener('transitionend', transitionEndHandler)
    }

    if(activeIdState === clickedPlayerId && !isPaused){
      console.log('### clicked Same player under playing:', activeIdState, clickedPlayerId)
      setActiveIdState(null);
      const ty = 0;
      const tx = (clickedPlayerId * (360/db.length) * -1) - 5;
      container.style.transform = `rotateX(${-ty}deg) rotateY(${tx}deg)`;
      currentPlayer.style.transform = currentPlayer.style.transform.replace(/scale(.*)/, '');
      currentPlayer?.pause();
      setAnimationPaused(false)
      setAutoRotate(true)
      removeTransition(container);
      container.removeEventListener('transitionend', transitionEndHandler)
      return;
    }
    if(activeIdState === clickedPlayerId && isPaused){
      console.log('### clicked Same player which inactive:', activeIdState, clickedPlayerId)
      container.addEventListener('transitionend', transitionEndHandler);
      const ty = 0;
      const tx = clickedPlayerId * (360/db.length) * -1;
      container.style.transform = `rotateX(${-ty}deg) rotateY(${tx}deg)`;
      targetXY.current.y = ty;
      targetXY.current.x = tx;
      return;
    }
    console.log('### clicked new player:', activeIdState, clickedPlayerId)
    setAutoRotate(false)
    container.addEventListener('transitionend', transitionEndHandler);
    container.style.transition = `transform 0.5s`;
    const ty = 0;
    const tx = clickedPlayerId * (360/db.length) * -1;
    container.style.transform = `rotateX(${-ty}deg) rotateY(${tx}deg)`;
    targetXY.current.y = ty;
    targetXY.current.x = tx;
    return ()  => {
      container.removeEventListener('transitionend', transitionEndHandler)
    }
  }, [activeIdState, db.length, onClickPlay])

  const toggleAutoRotate = React.useCallback(() => {
    setAutoRotate(autoRotate => {
      return !autoRotate
    })
  }, [])
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

  return (
    <TopContainer>
      <Container
        ref={dragRef}
      > 
        <SpinContainer 
          ref={spinRef}
          autoRotate={autoRotate}
          animationPaused={animationPaused}
          width={imgWidth} 
          height={imgHeight}
        >
          {db.map((item, i) => (
            <Item
              key={item.id}
              className={CLASS_FOR_POINTER_EVENT_FREE}
              onClick={onClickPlay(item.id)}
              src={item.src}
              ref={el => itemsRef.current[item.id] = el}
              itemIndex={i}
              itemLength={db.length}
              radius={radius}
            >
            </Item>
          ))}
        </SpinContainer>
        <Ground width={radius*3} height={radius*3}></Ground>
      </Container>
      <ControlContainer>
        <Buttons
          ref={nonRotateRef1}
        >
          <Button onClick={toggleAutoRotate}>{autoRotate ? "Stop Rotate" : "Start Rotate"}</Button>
          {db.map((item, i) => (
            <Button key={item.id} id={i} className={CLASS_FOR_POINTER_EVENT_FREE} onClick={onClickButton} >{i}</Button>
          ))}
          <Button onClick={toggleAnimationPaused}>{animationPaused ? "Resume Rotate" : "Pause Rotate"}</Button>
        </Buttons>
      </ControlContainer>
    </TopContainer>
  )
}

export default Slide3D;
