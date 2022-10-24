import React, { useEffect, useState } from "react"
import TeamCard from "./TeamCard"

const teamsUrl = `http://localhost:3001/teams`

function TeamList () {

const [teams, setTeams] = useState([])

useEffect(() => {
    fetch(teamsUrl)
        .then(r => r.json())
        .then(teamsData => setTeams(teamsData))
}, [])

    return (
        teams.map(team => 
            <div className="card-list" key={team.id}>
                <li>{team.name} ({team.short_code})</li>
            </div>
            )
    )
}

export default TeamList