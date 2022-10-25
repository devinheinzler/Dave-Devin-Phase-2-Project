import logo from './logo.svg';
import React, {useEffect, useState} from 'react';
import './App.css';
import ScoreScroll from './Components/ScoreScroll.js';
import CountryContainer from './Components/CountryContainer.js';
import ConstantComponent from './Components/ConstantComponent.js';
import constants from "./Components/Constants.js"
import TeamList from './Components/TeamList.js';
import TeamCard from './Components/TeamCard.js';
import FavoritePlayer from './Components/FavoritePlayer.js';
import FavoriteTeam from './Components/FavoriteTeam.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const teamsUrl = `http://localhost:3001/teams`

function App() {

  const [teams, setTeams] = useState([])
  const [favoritePlayers, setFavoritePlayers] = useState([])
  const [teamClickedVal, setTeamClickedVal] = useState(0)

  useEffect(() => {
    fetch(teamsUrl)
        .then(r => r.json())
        .then(teamsData => setTeams(teamsData))

    fetch(constants.favoritePlayersUrl)
      .then(r=> r.json())
      .then(players => setFavoritePlayers(players.map(p=>p.id)))
  }, [])

  const teamClicked = () => {
    setTeamClickedVal(teamClickedVal + 1)
  }

  const favoriteClicked = (id) => {
    console.log("favoriteClicked: ", id)
    console.log(favoritePlayers)
    if (favoritePlayers.length > 0) {
      if (favoritePlayers.filter(p=>p==id).length > 0)
        setFavoritePlayers(favoritePlayers.filter(p=>p != id))
      else
        setFavoritePlayers([...favoritePlayers, id])
    } else {
      setFavoritePlayers([id])
    }
  }

  return (
    <Router>
    <div className="App">
      <div>
        <ScoreScroll teams={teams}/>
      </div>
      <div className='side-by-side'>
      {/* <CountryContainer/> */}
        <div className='favorites'>
          <Switch>
            <Route path="/team/:teamId">
              <TeamCard favoritePlayers={favoritePlayers} handleFavoriteClick={favoriteClicked}/>
            </Route>
            <Route exact path="/">
              <TeamList teams={teams} teamClicked={teamClicked}/>
            </Route>
          </Switch>
        </div>
        <div className='favorites'>
          <FavoriteTeam/>
          <FavoritePlayer favoritePlayers={favoritePlayers}/>
        </div>
      </div>
    </div>
    </Router>
  );
}

export default App;
