import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import constants from "./Constants.js"
import { Header, Button, Icon, Card, Image } from 'semantic-ui-react'

const teamsUrl = constants.teamsUrl
const playersUrl = constants.playersUrl + "?team_id="


function TeamCard(props) {
    const [team, setTeam] = useState({})
    const [players, setPlayers] = useState([])
    const [filterTerm, setFilter] = useState("")

    const params = useParams()

    const favoritePlayers = props.favoritePlayers
    const favoriteTeamId = props.favoriteTeamId

    console.log("In Team Card: favorite Team = ", favoriteTeamId, " teamId = ", team.id)

    useEffect(
        () => {
            fetch(teamsUrl + "/" + params.teamId).then(res=>res.json()).
                then(team=>{
                    setTeam(team)
                    fetch(playersUrl + params.teamId).then(res=>res.json()).then(players=>{
                        setPlayers(players)
                    })
                })
        }, []
    )

    const isFavorite = (id) => {
        if (favoritePlayers && favoritePlayers.filter(p=>p.player_id == id).length > 0) {
            return "🤍"
        } else {
            return "❤️"
        }
    }

    const getPlayers = () => {
        if (filterTerm == "")
            return players
        else
            return players.filter(p => p.name.includes(filterTerm))
    }

    const handleOnChange = (e) => {
        setFilter(e.target.value)
    }

    const isFavoriteTeam = (id) => {
        if (favoriteTeamId == id) {
            return "🤍"
        } else {
            return "❤️"
        }
    }

    return ( 
        
        <div className="card" key={team.id}>

            <Card>
                <Image src={team.logo_path} wrapped ui={false} />
                <Card.Content>
                <Card.Header>{team.name} ({team.short_code})</Card.Header>
                <Card.Meta>
                    <span className='founded'>Founded in: {team.founded}</span>
                </Card.Meta>
                <Card.Meta>
                    {team.twitter}
                </Card.Meta>
                <button onClick={() => props.handleFavoriteTeamClicked(team.id)}>{isFavoriteTeam(team.id)}</button>
                </Card.Content>
                <Card.Content extra>
                <a>
                    <Icon name='user' />
                    {getPlayers().length} players
                </a>
                </Card.Content>
            </Card>
            <h4> Roster: </h4>
            <form>
                <label for="filter">Filter Players: </label>
                <input name="filter" onChange={handleOnChange}></input>
            </form>
            <br></br>
            <th>
                {getPlayers().map(p=>{
                    return <tr><td>{p.name}</td><td>
                        <button animated onClick={() => props.handleFavoriteClick(p.player_id, p.name, team.name)}>{isFavorite(p.player_id)}</button>
                        </td></tr>
                    })}
            </th>
            <br/>
            <Button icon labelPosition='left'>
            <Link to="/">Back To Teams</Link>
                <Icon name='left arrow' />
            </Button>
            {/* <Link to="/">Back To Teams</Link> */}
        </div>
    )
}

export default TeamCard