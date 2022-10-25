import logo from './logo.svg';
import React, {useEffect, useState} from 'react';
import './App.css';
import ScoreScroll from './Components/ScoreScroll';
import CountryContainer from './Components/CountryContainer';
import constants from "./Components/Constants.js"
import TeamList from './Components/TeamList';
import FavoritePlayer from './Components/FavoritePlayer';
import FavoriteTeam from './Components/FavoriteTeam';

const teamsUrl = `http://localhost:3001/teams`

function App() {

  const [teams, setTeams] = useState([])
  const [favoritePlayers, setFavoritePlayers] = useState([])

  useEffect(() => {
    fetch(teamsUrl)
        .then(r => r.json())
        .then(teamsData => setTeams(teamsData))

    fetch(constants.favoritePlayersUrl)
      .then(r=> r.json())
      .then(players => setFavoritePlayers(players))
  }, [])

  return (
    <div className="App">
      <div>
        <ScoreScroll teams={teams}/>
      </div>
      <div className='side-by-side'>
      {/* <CountryContainer/> */}
        <div className='favorites'>
        <TeamList teams={teams}/>
        </div>
        <div className='favorites'>
          <FavoriteTeam/>
          <FavoritePlayer favoritePlayers={favoritePlayers}/>
        </div>
      </div>
    </div>
  );
}

export default App;
