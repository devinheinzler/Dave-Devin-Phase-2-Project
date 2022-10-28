import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import TeamCard from "./TeamCard.js"
import './TeamList.css'
import League from "./League.js"

const leaguesUrl = `http://localhost:3001/leagues`

function TeamList (props) {

const [clickedTeam, setClickedTeam] = useState({})
const [leagues, setLeagues] = useState([])

function handleClick(team) {
    console.log(team)
    // setClickedTeam(team)
    window.history.pushState({}, "", "/team")
    props.teamClicked()
}

const teams = props.teams

useEffect(() => {
    fetch(leaguesUrl)
        .then(r => r.json())
        .then(leagueData => setLeagues(leagueData))
}, [])

return (
    <div className="leagues"> 
            {
                leagues.map(league => {
                    const leagueTeams = teams.filter(team => team.current_season_id === league.current_season_id)
                    return <League league={league} leagueTeams={leagueTeams} />
                })
            }
            {
                clickedTeam.name ? 
                <TeamCard team={clickedTeam}/> : null  
            }
        </div>
    )
}

export default TeamList