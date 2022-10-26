import React, { useEffect, useState } from "react"
import constants from "./Constants.js"

const PlayerCard = (props) => {
    const [name, setName] = useState("")
    const [teamName, setTeamName] = useState("")

    const player = props.player

    console.log("Create Player Card For Id: ", player.player_id)

    const playerUrl = constants.playersUrl + "?player_id=" + player.player_id

    console.log(playerUrl)

    useEffect(
        () => {
            fetch(playerUrl).then(res=>res.json()).
                then(player=>{
                    const singlePlayer = player ? player[0] : {}
                    setName(singlePlayer.name)
                    const teamInfo = constants.teamsUrl + "?id=" + singlePlayer.team_id
                    console.log(teamInfo)
                    fetch(teamInfo).then(res=>res.json()).
                        then(t=>{
                            const singleTeam = t ? t[0] : {}
                            setTeamName(singleTeam.name)}
                            )
                })
        }, []
    )

    return (
        <h2>{name}, {teamName}</h2>
        // <div className="card">
        //     <h2>{playerInfo.name}</h2>
        //     {/* <h3>{playerInfo.team_id}</h3> */}
        // </div>
    )
}

export default PlayerCard