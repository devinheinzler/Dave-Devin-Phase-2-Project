import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import TeamCard from "./TeamCard.js"
import './TeamList.css'

function TeamList (props) {

const [clickedTeam, setClickedTeam] = useState({})

function handleClick(team) {
    console.log(team)
    // setClickedTeam(team)
    window.history.pushState({}, "", "/team")
    props.teamClicked()
}

const teams = props.teams


    return (
        <div> 
            {teams.map(team => 
                <div className="card-list" key={team.id}>
                    <ul>
                        {/* <li onClick={() => handleClick(team)}>{team.name} ({team.short_code})</li> */}
                        <Link to={`/team/${team.id}`}>{team.name} {`(${team.short_code})`}</Link>
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