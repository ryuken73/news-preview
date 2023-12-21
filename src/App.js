import './App.css';
import TinderCards from './Components/TinderCards';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  font-size: calc(11px + 2vmin);
  overflow: hidden;
  color: white;
`

function App() {
  return (
    <div className="App">
      <Container>
        <TinderCards></TinderCards>
      </Container>
    </div>
  );
}

export default App;
