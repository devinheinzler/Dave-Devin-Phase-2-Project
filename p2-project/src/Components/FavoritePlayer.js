import React, { useEffect } from "react"
import PlayerCard from "./PlayerCard"

const FavoritePlayer = (props) => {
    const players = props.favoritePlayers
    console.log(players)
    return (
        <div className='bordered'>
        <ul>
            {players.map(p => {return <li><PlayerCard player={p}/></li>})}
        </ul>
        <iframe src={`https://www.google.com/search?igu=1&ei=&q=${players[0].name} AND ${players[0].teamName}`}></iframe>
        </div>
    )
}

export default FavoritePlayer