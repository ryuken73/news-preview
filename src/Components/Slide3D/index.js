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
  -webkit-transform: rotateX(-10deg);
  transform: rotateX(-10deg);
`
const SpinContainer = styled(Container)`
  width: ${props => `${props.width}px`};
  height: ${props => `${props.height}px`};
  ${props => props.autoRotate && spinStyle};
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
const imgWidth = 450; // width of images (unit: px)
const imgHeight = 280; // height of images (unit: px)

function Slide3D(props) {
  const {db} = props;
  const [autoRotate, setAutoRotate] = React.useState(true);
  const itemsRef = React.useRef([]);
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
        currentPlayer?.play();
      } catch(err) {
        console.log(err)
      }
    }
  }, [])
  return (
    <Container> 
      <SpinContainer 
        autoRotate={autoRotate}
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
