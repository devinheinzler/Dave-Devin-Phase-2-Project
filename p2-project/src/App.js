import logo from './logo.svg';
import React, {useEffect, useState} from 'react';
import './App.css';
import ScoreScroll from './Components/ScoreScroll';
import CountryContainer from './Components/CountryContainer';
import constants from "./Components/Constants.js"
import TeamList from './Components/TeamList';

const teamsUrl = `http://localhost:3001/teams`

function App() {

  const [teams, setTeams] = useState([])

  useEffect(() => {
    fetch(teamsUrl)
        .then(r => r.json())
        .then(teamsData => setTeams(teamsData))
  }, [])

  return (
    <div className="App">
      <ScoreScroll teams={teams}/>
      <CountryContainer/>
      <TeamList teams={teams}/>
    </div>
  );
}

export default App;
