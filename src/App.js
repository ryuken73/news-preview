import './App.css';
import React from 'react';
import Slide3D from './Components/Slide3D';
import TinderCards from './Components/TinderCards';
import styled from 'styled-components';

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
const db = [
  {id: 9, title: '한파', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'},
  {id: 8, title: '겨울', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'},
  {id: 7, title: '원석진', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'},
  {id: 6, title: '무장', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'},
  {id: 4, title: 'AA', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'},
  // {id: 5, title: 'BB', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'}
]

function App() {
  const [mode, setMode] = React.useState('slide');
  const containerRef = React.useRef();

  const onClickModeSelectBtn = React.useCallback(() => {
    setMode(mode => {
      return mode === 'tinder' ? 'slide' : 'tinder';
    })
  }, [])
  return (
    <div className="App">
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
