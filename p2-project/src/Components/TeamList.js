import React, { useEffect, useState } from "react"
import TeamCard from "./TeamCard"
import './TeamList.css'

function TeamList (props) {

const [clickedTeam, setClickedTeam] = useState({})

function handleClick(team) {
    console.log(team)
    setClickedTeam(team)
}

const teams = props.teams


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