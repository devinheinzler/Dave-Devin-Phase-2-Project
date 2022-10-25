import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import constants from "./Constants.js"

const teamsUrl = constants.teamsUrl
const playersUrl = constants.playersUrl + "?team_id="


function TeamCard(props) {
    const [team, setTeam] = useState({})
    const [players, setPlayers] = useState([])
    
    const params = useParams()

    console.log(props)

    const favoritePlayers = props.favoritePlayers

    useEffect(
        () => {
            fetch(teamsUrl + "/" + params.teamId).then(res=>res.json()).
                then(team=>{
                    setTeam(team)
                    fetch(playersUrl + params.teamId).then(res=>res.json()).then(players=>{
                        setPlayers(players)
                        console.log(players)
                    })
                })
        }, []
    )

    const isFavorite = (id) => {
        if (favoritePlayers && favoritePlayers.filter(p=>p == id).length > 0) {
            return "UnFavorite"
        } else {
            return " Favorite "
        }
    }

    return ( 
        <div className="card" key={team.id}>
            <h2>{team.name} ({team.short_code})</h2>
            <h3>{team.twitter}</h3>
            <img src={team.logo_path} alt={team.name} />
            <h4>
                Founded in: {team.founded}
            </h4>
            <h4> Roster </h4>
            <ul>
                {players.map(p=>{return <li>{p.name}   <button onClick={() => props.handleFavoriteClick(p.player_id)}>{isFavorite(p.player_id)}</button></li>})}
            </ul>
        </div>
    )
}

export default TeamCard