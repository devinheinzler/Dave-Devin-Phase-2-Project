import React, { useEffect, useState } from "react"
import TeamCard from "./TeamCard"
import './TeamList.css'

const teamsUrl = `http://localhost:3001/teams`

function TeamList () {

const [teams, setTeams] = useState([])

const [clickedTeam, setClickedTeam] = useState({})

function handleClick(team) {
    console.log(team)
    setClickedTeam(team)
}

useEffect(() => {
    fetch(teamsUrl)
        .then(r => r.json())
        .then(teamsData => setTeams(teamsData))
}, [])

    return (
        <div> 
            {teams.map(team => 
                <div className="card-list" key={team.id}>
                    <ul>
                        <li onClick={() => handleClick(team)}>{team.name} ({team.short_code})</li>
                    </ul>
                </div>
                )
            }
            {
                clickedTeam.name ? 
                <TeamCard team={clickedTeam}/> : null
                
            }
        </div>
    )
}

export default TeamList