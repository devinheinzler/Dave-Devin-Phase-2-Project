import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const teamsUrl = `http://localhost:3001/teams`
const playersUrl = "http://localhost:3001/players?team_id="


function TeamCard({teamIn}) {
    const [team, setTeam] = useState({})
    const [players, setPlayers] = useState([])
    
    const params = useParams()

    console.log(params)

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
                {players.map(p=>{return <li>{p.name}</li>})}
            </ul>
        </div>
    )
}

export default TeamCard