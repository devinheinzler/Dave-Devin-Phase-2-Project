import React, {useEffect, useState} from 'react';
import './App.css';
import ScoreScroll from './Components/ScoreScroll.js';
import PlayerDetail from './Components/PlayerDetail.js'
import constants from "./Components/Constants.js"
import TeamList from './Components/TeamList.js';
import TeamCard from './Components/TeamCard.js';
import FavoritePlayer from './Components/FavoritePlayer.js';
import FavoriteTeam from './Components/FavoriteTeam.js';
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom'

const teamsUrl = `http://localhost:3001/teams`

function App() {

  const [teams, setTeams] = useState([])
  const [favoritePlayers, setFavoritePlayers] = useState([])
  const [favoriteTeamId, setFavoriteTeamId] = useState(-1)
  const [shortTeams, setShortTeams] = useState([])

  useEffect(() => {
    fetch(constants.shortTeamsUrl).then(r=>r.json()).then(short_teams=>setShortTeams(short_teams))

    fetch(teamsUrl)
        .then(r => r.json())
        .then(teamsData => 
          {
            setTeams(teamsData)
            fetch(constants.favoritePlayersUrl)
              .then(r=> r.json())
              .then(players => {
                setFavoritePlayers(players)
              })
          })



    fetch(constants.favoriteTeamsUrl)
      .then(r=>r.json())
      .then(favoriteTeams=> {
        if (favoriteTeams)
        {
          setFavoriteTeamId(favoriteTeams[0].team_id)
        }
      })
    
  }, [])

  const favoriteClicked = (id, name, teamName, teamId) => {
    if (favoritePlayers.length > 0 && favoritePlayers.filter(p=>p.player_id==id).length > 0) {
      const thisPlayer = favoritePlayers.filter(p=>p.player_id==id)
      if (thisPlayer.length > 0)
      {
        // remove from database
        const deleteUrl = constants.favoritePlayersUrl + "/" + thisPlayer[0].id
        fetch(deleteUrl, {
          method:'DELETE'
        }).then(res=>res.json()).then(() => {
          const newFavorites = favoritePlayers.filter(p=> { return p.player_id != id})
          setFavoritePlayers(newFavorites)
        }).catch(e => console.log("Delete error: ", e))
      }
    } else {
      if (favoritePlayers.length > 4) {
        alert("May only Favorite 5 Players")
      } else {
        const newPlayer = { player_id: id, name: name, team_name: teamName, team_id: teamId}
        const addPlayerUrl = constants.favoritePlayersUrl
        fetch(addPlayerUrl, {
          method:'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(newPlayer)
        }).then(res=>res.json()).then(newData => {
          setFavoritePlayers([...favoritePlayers, newPlayer])
        }).catch(e=>console.log("Post Error", e))
      }
    }
  }

  const favoriteTeamClicked = (id) => {
    if (id == favoriteTeamId)
      return
    console.log("Favorite Team ", id)
    const newFavoriteTeam = { team_id: id}
    if (favoriteTeamId == -1) {
      fetch(constants.favoriteTeamsUrl, {
        method: 'POST',
        headers : {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(newFavoriteTeam)
      }).then(res=>res.json()).then(() => setFavoriteTeamId(id))
    } else {
      const patchUrl = constants.favoriteTeamsUrl + "/1"
      newFavoriteTeam.id = 1
      fetch(patchUrl, {
        method: 'PATCH',
        headers : {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(newFavoriteTeam)
      }).then(res=>res.json()).then(() => setFavoriteTeamId(id))
    }
  }

  const getFavoriteTeam = () => {
    if (favoriteTeamId > 0)
      return teams.filter(t => t.id == favoriteTeamId)
    else
      return []
  }

  return (
    <Router>
    <div className="App">
      <div>
        <ScoreScroll teams={shortTeams}/>
      </div>
      <div className='side-by-side'>
      {/* <CountryContainer/> */}
        <div className='favorites'>
          <Switch>
            <Route path="/team/:teamId">
              <TeamCard favoritePlayers={favoritePlayers} favoriteTeamId={favoriteTeamId} handleFavoriteClick={favoriteClicked} handleFavoriteTeamClicked={favoriteTeamClicked}/>
            </Route>
            <Route path='/playerDetail/:playerId/:teamId'>
              <PlayerDetail teams={teams}/>
            </Route>
            <Route exact path="/">
              <TeamList teams={teams}/>
            </Route>
          </Switch>
        </div>
        <div className='favorites'>
          <FavoriteTeam favoriteTeam={favoriteTeamId} team={getFavoriteTeam()}/>
          <FavoritePlayer favoritePlayers={favoritePlayers} unfavorite={favoriteClicked}/>
        </div>
      </div>
    </div>
    </Router>
  );
}

export default App;
