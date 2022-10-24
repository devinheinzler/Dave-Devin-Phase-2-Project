import React, {useState, useEffect} from "react"

const teamsUrl = `http://localhost:3001/teams`


function TeamCard() {

const [teams, setTeams] = useState([])

useEffect(() => {
    fetch(teamsUrl)
        .then(r => r.json())
        .then(teamsData => setTeams(teamsData))
}, [])

    return (
        teams.map(team => 
        <div className="card" key={team.id}>
            <h2>{team.name} ({team.short_code})</h2>
            <h3>{team.twitter}</h3>
            <img src={team.logo_path} alt={team.name} />
            <h4>
                Founded in: {team.founded}
            </h4>
        </div>
    )
)}

export default TeamCard