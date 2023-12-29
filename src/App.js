import './App.css';
import React from 'react';
import Slide3D from './Components/Slide3D';
import TinderCards from './Components/TinderCards';
import styled from 'styled-components';
import usePrevious from './hooks/usePrevious';

const Container = styled.div`
  background-color: #111;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  font-size: calc(11px + 2vmin);
  overflow: hidden;
  color: white;
  perspective: 4000px;
`
const ModeSelectBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
`
const Buttons = styled.div`
  position: absolute;
  z-index: 99;
  top: 50px;
  right: 20px;
`

const db = [
  {id: 0, title: '한파', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'},
  {id: 1, title: '겨울', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'},
  {id: 2, title: '원석진', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'},
  {id: 3, title: '무장', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'},
  {id: 4, title: 'AA', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'},
  {id: 5, title: 'BB', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'}
]

function App() {
  const [mode, setMode] = React.useState('slide');
  const [active3DPlayer, setActive3DPlayer] = React.useState(0);
  const containerRef = React.useRef();
  const oldPlayerId = usePrevious(active3DPlayer);
  console.log(active3DPlayer, oldPlayerId);
  const eventByClickBtn = oldPlayerId !== undefined && oldPlayerId !== active3DPlayer;

  const onClickBtn = React.useCallback((event) => {
    const index = event.target.id;
    setActive3DPlayer(parseInt(index));
  }, [])
  const onClickModeSelectBtn = React.useCallback(() => {
    setMode(mode => {
      return mode === 'tinder' ? 'slide' : 'tinder';
    })
  }, [])
  return (
    <div className="App">
      <Buttons>
        {db.map((item, i) => (
          <button key={item.id} id={i} onClick={onClickBtn}>{i}</button>
        ))}
      </Buttons>
      <Container ref={containerRef}>
        {mode === 'tinder' && (
          <TinderCards 
            db={db}
          >
          </TinderCards>
        )}
        {mode === 'slide' && (
          <Slide3D 
            db={db}
            parentRef={containerRef}
            eventByClickBtn={eventByClickBtn}
            active3DPlayerIndex={active3DPlayer}
          >
          </Slide3D>
        )}

        <ModeSelectBtn
          onClick={onClickModeSelectBtn}
        >
          change mode
        </ModeSelectBtn>
      </Container>
    </div>
  );
}

export default App;
