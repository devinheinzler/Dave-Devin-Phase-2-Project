import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import constants from "./Constants.js"

const PlayerCard = (props) => {
    const [name, setName] = useState("")
    const [teamName, setTeamName] = useState("")

    const player = props.player

    return (
        <>
        <h2>{player.name}, {player.team_name}</h2> <button onClick={
            () => {props.unfavorite(player.player_id, player.name, player.team_name)}
        }>🤍</button>   <Link to={`/playerDetail/${player.player_id}/${player.team_id}`} ><button>Details</button></Link>
        </>
    )
}

export default PlayerCard