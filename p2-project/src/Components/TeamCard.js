import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const teamsUrl = `http://localhost:3001/teams`


function TeamCard({teamIn}) {
    const [team, setTeam] = useState({})
    
    const params = useParams()

    console.log(params)

    useEffect(
        () => {
            fetch(teamsUrl + "/" + params.teamId).then(res=>res.json()).then(team=>setTeam(team))
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
        </div>
    )
}

export default TeamCard