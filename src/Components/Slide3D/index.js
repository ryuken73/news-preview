import React from 'react';
import styled, {keyframes, css} from 'styled-components';

const spin = keyframes`
  from {
    -webkit-transform: rotateY(0deg);
    transform: rotateY(0deg);
  }
  to {
    -webkit-transform: rotateY(360deg);
    transform: rotateY(360deg);
  }
`
const spinStyle = css`
  animation-name: ${spin};
  animation-duration: 60s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`
const Container = styled.div`
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin: auto;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-transform: rotateX(0deg);
  transform: rotateX(0deg);
  width: 100%;
  height: 100%;
`
const SpinContainer = styled(Container)`
  width: ${props => `${props.width}px`};
  height: ${props => `${props.height}px`};
  ${props => props.autoRotate && spinStyle};
  animation-play-state: ${props => props.animationPaused ? 'paused':'running'};
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

function Slide3D(props) {
  const {db} = props;
  const [autoRotate, setAutoRotate] = React.useState(false);
  const [animationPaused, setAnimationPaused] = React.useState(false);
  const dragRef = React.useRef(null);
  const itemsRef = React.useRef([]);
  const timerRef = React.useRef();
  const startXY = React.useRef({x:0, y:0});
  const destXY = React.useRef({x:0, y:0});
  const targetXY = React.useRef({x:0, y:0});

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
          currentPlayer.style.transition = '0.5s';
          currentPlayer.style.transform += 'scale(2.0)';
          currentPlayer?.play();
          setAnimationPaused(true)
        } else {
          currentPlayer.style.transform = currentPlayer.style.transform.replace(/scale(.*)/, '');
          currentPlayer?.pause();
          setAnimationPaused(false)
        }
      } catch(err) {
        console.log(err)
      }
    }
  }, [])

  const applyTransform = React.useCallback(() => {
    if(targetXY.current.y > 180) targetXY.current.y = 180;
    if(targetXY.current.y < 0) targetXY.current.y = 0;
    const ty = targetXY.current.y
    const tx = targetXY.current.x
    dragRef.current.style.transform = `rotateX(${-ty}deg) rotateY(${tx}deg)`;
  }, [])

  React.useEffect(() => {
    document.onpointerdown = (e) => {
      clearInterval(timerRef.current);
      e = e || window.event; 
      startXY.current.x = e.clientX;
      startXY.current.y = e.clientY;
      document.onpointermove = (e) => {
        e = e || window.event;
        const nX = e.clientX;
        const nY = e.clientY;
        destXY.current.x = nX - startXY.current.x;
        destXY.current.y = nY - startXY.current.y;
        targetXY.current.x += destXY.current.x * 0.1;
        targetXY.current.y += destXY.current.y * 0.1;
        applyTransform()
        startXY.current.x = nX;
        startXY.current.y = nY;
      }
      document.onpointerup = (e) => {
        timerRef.current = setInterval(() => {
          destXY.current.x *= 0.95;
          destXY.current.y *= 0.95;
          targetXY.current.x += destXY.current.x * 0.1;
          targetXY.current.y += destXY.current.y * 0.1;
          applyTransform();
          setAnimationPaused(true);
          if(Math.abs(destXY.current.x) < 0.5 && Math.abs(destXY.current.y) < 0.5) {
            clearInterval(timerRef.current);
            setAnimationPaused(false);
          }
        }, 17)
        document.onpointermove = document.onpointerup = null
      }
    }
    return () => {
      clearInterval(timerRef.current);
      document.onpointerdown = null;
    }
  }, [applyTransform])

  const onPointerDown = React.useCallback((e) => {
    clearInterval(timerRef.current);
    e = e || window.event; 
    startXY.current.x = e.clientX;
    startXY.current.y = e.clientY;
  }, [])


  const onPointerMove = React.useCallback((e) => {
    e = e || window.event;
    const nX = e.clientX;
    const nY = e.clientY;
    destXY.current.x = nX - startXY.current.x;
    destXY.current.y = nY - startXY.current.y;
    targetXY.current.x += destXY.current.x * 0.1;
    targetXY.current.y += destXY.current.y * 0.1;
    applyTransform()
    startXY.current.x = nX;
    startXY.current.y = nY;
  }, [applyTransform])

  const onPointerUp = React.useCallback((e) => {
    timerRef.current = setInterval(() => {
      destXY.current.x *= 0.95;
      destXY.current.y *= 0.95;
      targetXY.current.x += destXY.current.x * 0.1;
      targetXY.current.y += destXY.current.y * 0.1;
      applyTransform();
      setAnimationPaused(true);
      if(Math.abs(destXY.current.x) < 0.5 && Math.abs(destXY.current.y) < 0.5) {
        clearInterval(timerRef.current);
        setAnimationPaused(false);
      }
    }, 17)
  }, [applyTransform])

  return (
    <Container
      ref={dragRef}
      // onPointerDown={onPointerDown}
      // onPointerMove={onPointerMove}
      // onPointerUp={onPointerUp}
    > 
      <SpinContainer 
        autoRotate={autoRotate}
        animationPaused={animationPaused}
        width={imgWidth} 
        height={imgHeight}
      >
        {db.map((item, i) => (
          <Item
            key={item.id}
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
  )
}

export default Slide3D;
