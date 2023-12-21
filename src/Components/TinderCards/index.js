import React from 'react';
import TinderCard from 'react-tinder-card';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 10%;
  width: 70vw;
  height: 300px;
  display: flex;
  justify-content: center;
`
const CustomTinderCard = styled(TinderCard)`
  /* top: ${props => props.top + 'px'}; */
`
const Title = styled.div`
  background: darkslategrey;
  color: white;
  padding: 10px;
  /* margin-bottom: 5px; */
  border-radius: 22px 22px 0 0;
  border: 1px solid black;
  width: 20vw;  
  font-size: 1.2em;
  font-weight: bold;
  box-sizing: border-box;
  box-shadow: 0px 3px 17px -3px rgba(0,0,0,0.36); -webkit-box-shadow: 0px 3px 17px -3px rgba(0,0,0,0.36); -moz-box-shadow: 0px 3px 17px -3px rgba(0,0,0,0.36);
`
const Item = styled.video`
  /* width: 70vw; */
  height: 70vh;
  max-height: 70vh;
  border-radius: 0 22px 22px 22px;
  overflow: hidden;
  -webkit-transform: translateZ(0);
  /* box-shadow: 0 19px 51px 0 rgba(0,0,0,0.16), 0 14px 19px 0 rgba(0,0,0,0.07); */
  box-shadow: 0px 3px 17px -3px rgba(0,0,0,0.36); -webkit-box-shadow: 0px 3px 17px -3px rgba(0,0,0,0.36); -moz-box-shadow: 0px 3px 17px -3px rgba(0,0,0,0.36);
`
const RestoreButton = styled.button`
  position: absolute;
  right: -100px;
  bottom: 20px;
`
const NextButton = styled.div`
  position: absolute;
  right: -40%;
  top: 0px;
  width: 40%;
  height: 100%;
`

const db = [
  {id: 0, title: '한파', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'},
  {id: 1, title: '겨울', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'},
  {id: 2, title: '원석진', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'},
  {id: 3, title: '무장', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'},
]

const dbReversed = db.reverse();

const TinderCards = (props) => {
  const tinderRef = React.useRef([]);
  const itemsRef = React.useRef([]);
  const onSwipe = React.useCallback((id) => {
    return (dir) => {
      try {
        console.log('onSwipe:', id, dir)
        const currentPlayer = itemsRef.current[id];
        const nextPlayer = itemsRef.current[id+1];
        currentPlayer?.pause();
        nextPlayer?.play();
      } catch (err) {
        console.log(err);
      }
    }
  }, [])
  const onCardLeftScreen = React.useCallback((id) => {
    return (dir) => {
    console.log('onCardLeftScreen:', dir, id, id+1, itemsRef.current[1])
    }
  }, [])
  const onSwipeRequirementFulfilled = React.useCallback((dir) => {
    console.log('onSwipeFulfilled:', dir)
  }, [])
  const onSwipeRequirementUnFulfilled = React.useCallback((dir) => {
    console.log('onSwipeUnFulfilled:', dir)
  }, [])
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
  const onClickRestore = React.useCallback((id) => {
    return () => {
      console.log('restore prev:', id)
      const prevTinder = tinderRef.current[id-1];
      prevTinder?.restoreCard([]);
    }
  }, [])
  const onClickNext = React.useCallback((id) => {
    return () => {
      console.log('swipe next:', id)
      const currentTinder = tinderRef.current[id];
      currentTinder?.swipe('down');
    }
  }, [])
  return (
    <Container>
      {dbReversed.map((item, i) => (
        <CustomTinderCard
          key={item.id}
          className='swipe' 
          swipeRequirementType='velocity'
          onSwipe={onSwipe(item.id)}
          onCardLeftScreen={onCardLeftScreen(item.id)}
          onSwipeRequirementFulfilled={onSwipeRequirementFulfilled}
          onSwipeRequirementUnfulfilled={onSwipeRequirementUnFulfilled}
          ref={el => tinderRef.current[item.id] = el}
          top={i*60}
        >
          <Title>{item.title}</Title>
          <Item
            onClick={onClickPlay(item.id)}
            className='pressable'
            src={item.src}
            ref={el => itemsRef.current[item.id] = el}
          >
          </Item>
          <NextButton
            onClick={onClickNext(item.id)}
            className='pressable'
          ></NextButton>
          <RestoreButton
            onClick={onClickRestore(item.id)}
            className='pressable'
          >restore</RestoreButton>
        </CustomTinderCard>
      ))}
    </Container>
  )
}

export default React.memo(TinderCards);