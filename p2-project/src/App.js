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
  const [favoriteTeamId, setFavoriteTeamId] = useState(0)

  useEffect(() => {
    fetch(teamsUrl)
        .then(r => r.json())
        .then(teamsData => setTeams(teamsData))

    fetch(constants.favoritePlayersUrl)
      .then(r=> r.json())
      .then(players => setFavoritePlayers(players))

    fetch(constants.favoriteTeamsUrl)
      .then(r=>r.json())
      .then(favoriteTeams=> {
        if (favoriteTeams)
        {
          setFavoriteTeamId(favoriteTeams[0].team_id)
        }
      })
    
  }, [])

  const favoriteClicked = (id) => {
    console.log("FavoriteClicked: ", id)
    if (favoritePlayers.length > 0) {
      const thisPlayer = favoritePlayers.filter(p=>p.player_id==id)
      if (thisPlayer.length > 0)
      {
        console.log("Remove")
        // remove from database
        const deleteUrl = constants.favoritePlayersUrl + "/" + thisPlayer[0].id
        fetch(deleteUrl, {
          method:'DELETE'
        }).then(res=>res.json()).then(() => {
          const newFavorites = favoritePlayers.filter(p=> { return p.player_id != id})
          console.log(newFavorites)
          setFavoritePlayers(newFavorites)
        }).catch(e => console.log("Delete error: ", e))
      }
      else {
        console.log("Insert")
        const newPlayer = { player_id: id}
        const addPlayerUrl = constants.favoritePlayersUrl
        fetch(addPlayerUrl, {
          method:'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(newPlayer)
        }).then(res=>res.json()).then(newData => {
          console.log(newData)
          newPlayer.id = newData.id
          setFavoritePlayers([...favoritePlayers, newPlayer])
        }).catch(e=>console.log("Post Error", e))
      }
    } else {
      console.log("Insert")
      const newPlayer = { player_id: id}
      const addPlayerUrl = constants.favoritePlayersUrl
      fetch(addPlayerUrl, {
        method:'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(newPlayer)
      }).then(res=>res.json()).then(newData => {
        console.log(newData)
        newPlayer.id = newData.id
        setFavoritePlayers([newPlayer])
      }).catch(e=>console.log("Post Error", e))
    }
  }

  const favoriteTeamClicked = (id) => {
    console.log("Favorite Team ", id)
    setFavoriteTeamId(id);
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
              <TeamCard favoritePlayers={favoritePlayers} handleFavoriteClick={favoriteClicked} handleFavoriteTeamClicked={favoriteTeamClicked}/>
            </Route>
            <Route exact path="/">
              <TeamList teams={teams}/>
            </Route>
          </Switch>
        </div>
        <div className='favorites'>
          <FavoriteTeam favoriteTeam={favoriteTeamId}/>
          <FavoritePlayer favoritePlayers={favoritePlayers}/>
        </div>
      </div>
    </div>
    </Router>
  );
}

export default App;
