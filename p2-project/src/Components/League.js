import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom'

function League(props) {

    const [showList, setShowList] = useState(false)

function handleClick() {
    setShowList(!showList)
}




    
    const leagueTeams = props.leagueTeams.map(team => 
        <div className="card-list" key={team.id}>
            <ul>
                <Link to={`/team/${team.id}`}>{team.name} {`(${team.short_code})`}</Link>
                {/* <li onClick={() => handleClick(team)}>{team.name} ({team.short_code})</li> */}
            </ul>
        </div>
        )
    return (
        <div onClick={handleClick}>
            <h3>{props.league.name}</h3>
            {
                showList ? leagueTeams : null 
            }
        </div>   
    )
}

export default League