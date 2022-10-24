import logo from './logo.svg';
import React, {useEffect} from 'react';
import './App.css';
import ScoreScroll from './Components/ScoreScroll';
import CountryContainer from './Components/CountryContainer';
import constants from "./Components/Constants.js"

function App() {

  useEffect(
    () => {
      const url = `${constants.externalUrl}${constants.livescores}?api_token=${process.env.api_token}`
      console.log(url)

    }, []
  )

  return (
    <div className="App">
      <ScoreScroll/>
      <CountryContainer/>
    </div>
  );
}

export default App;
