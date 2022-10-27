import React, { useEffect, useState } from "react"
import constants from "./Constants.js"

const PlayerCard = (props) => {
    const [name, setName] = useState("")
    const [teamName, setTeamName] = useState("")

    const player = props.player

    return (
        <h2>{player.name}, {player.team_name} <button onClick={
            () => {props.unfavorite(player.player_id, player.name, player.team_name)}
        }>🤍</button></h2>
        // <div className="card">
        //     <h2>{playerInfo.name}</h2>
        //     {/* <h3>{playerInfo.team_id}</h3> */}
        // </div>
    )
}

export default PlayerCard