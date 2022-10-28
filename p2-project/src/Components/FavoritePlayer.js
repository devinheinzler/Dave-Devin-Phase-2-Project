import React, { useEffect } from "react"
import PlayerCard from "./PlayerCard.js"

const FavoritePlayer = (props) => {
    const players = props.favoritePlayers

    console.log(players)

    const onClick = () => {
        console.log("Player Clicked")
        // window.history.pushState(null, "", "/playerDetail/10")
    }
        
    return (
        <div className='bordered'>
            <h4>Favorite Players: </h4>
        <ul>
            {players.map(p => {return <li onClick={onClick}><PlayerCard player={p} unfavorite={props.unfavorite}/></li>})}
        </ul>
        {/* <iframe src={`https://www.google.com/search?igu=1&ei=&q=${players[0].name} AND ${players[0].teamName}`}></iframe> */}
        </div>
    )
}

export default FavoritePlayer