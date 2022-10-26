import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import constants from "./Constants.js"

const teamsUrl = constants.teamsUrl
const playersUrl = constants.playersUrl + "?team_id="


function TeamCard(props) {
    const [team, setTeam] = useState({})
    const [players, setPlayers] = useState([])
    const [filterTerm, setFilter] = useState("")

    const params = useParams()

    const favoritePlayers = props.favoritePlayers
    const favoriteTeamId = props.favoriteTeamId

    useEffect(
        () => {
            fetch(teamsUrl + "/" + params.teamId).then(res=>res.json()).
                then(team=>{
                    setTeam(team)
                    fetch(playersUrl + params.teamId).then(res=>res.json()).then(players=>{
                        setPlayers(players)
                    })
                })
        }, []
    )

    const isFavorite = (id) => {
        if (favoritePlayers && favoritePlayers.filter(p=>p.player_id == id).length > 0) {
            return "🤍"
        } else {
            return "❤️"
        }
    }

    const getPlayers = () => {
        if (filterTerm == "")
            return players
        else
            return players.filter(p => p.name.includes(filterTerm))
    }

    const handleOnChange = (e) => {
        setFilter(e.target.value)
    }

    const isFavoriteTeam = (id) => {
        if (favoriteTeamId == id) {
            return "🤍"
        } else {
            return "❤️"
        }
    }

    return ( 
        <div className="card" key={team.id}>
            <div className="side-by-side"><h2>{team.name} ({team.short_code})</h2><button onClick={() => props.handleFavoriteTeamClicked(team.id)}>{isFavoriteTeam(team.id)}</button></div>
            <h3>{team.twitter}</h3>
            <img src={team.logo_path} alt={team.name} />
            <h4>
                Founded in: {team.founded}
            </h4>
            <h4> Roster </h4>
            <form>
                <label for="filter">Filter Players: </label>
                <input name="filter" onChange={handleOnChange}></input>
            </form>
            <br></br>
            <th>
                {getPlayers().map(p=>{
                    return <tr><td>{p.name}</td><td><button onClick={() => props.handleFavoriteClick(p.player_id)}>{isFavorite(p.player_id)}</button></td></tr>})}
            </th>
            <br/>
            <Link to="/">Back To Teams</Link>
        </div>
    )
}

export default TeamCard