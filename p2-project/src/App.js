import logo from './logo.svg';
import './App.css';
import ScoreScroll from './Components/ScoreScroll';
import CountryContainer from './Components/CountryContainer';
import constants from "../Constants"

function App() {
  return (
    <div className="App">
      <ScoreScroll/>
      <CountryContainer/>
    </div>
  );
}

export default App;
