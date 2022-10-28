import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom'
import {Image, List} from "semantic-ui-react"

function League(props) {

    const [showList, setShowList] = useState(false)

function handleClick() {
    setShowList(!showList)
}


    const getLeagueTeams = () => {return props.leagueTeams.map(team => 
        
            
                <List.Item>
                    <List.Content>
                        <List.Header><Link to={`/team/${team.id}`}>{team.name} {`(${team.short_code})`}</Link></List.Header>
                    </List.Content>
                </List.Item>
        
        )
    }
    return (
        <div onClick={handleClick}>
            <h3>{props.league.name}</h3>
            {
                showList ? <List animated verticalAlign='middle'> {getLeagueTeams() } </List> : null 
            }
        </div>   
    )

}

export default League