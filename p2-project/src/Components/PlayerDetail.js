import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import constants from "./Constants.js"

const PlayerDetail = (props) => {

    const params = useParams()
    const teams = props.teams
    const playersUrl = constants.playersUrl + "/?player_id=" + params.playerId

    const [fixtures, setFixtures] = useState([])
    const [players, setPlayers] = useState([])
    // setPlayerId(params.playerId)

    // const playerId = params.playerId

    useEffect (
        () => {
            const date = new Date()
            console.log("Date", date)
            const curMonth = date.getMonth() + 1;
            const curYear = date.getFullYear();
            const prevMonth = curMonth == 1 ? 12 : (curMonth - 1)
            const nextMonth = curMonth == 12 ? 1 : (curMonth + 1)
            const prevYear = curMonth == 1 ? (curYear - 1) : curYear
            const nextYear = curMonth == 12 ? (curYear + 1) : curYear
            const low = `${prevYear}-${prevMonth}-${date.getDate()}`
            const high = `${nextYear}-${nextMonth}-${date.getDate()}`
            const fixturesUrl = constants.externalUrl + constants.fixtures + "/" + low + "/" + high + "/" + params.teamId
                + `?api_token=${process.env.REACT_APP_API_TOKEN}`
            console.log(fixturesUrl)
            fetch(fixturesUrl).then(res=>res.json()).then(fixtures => {
                setFixtures(fixtures.data)})

            console.log(playersUrl)
            fetch(playersUrl).then(res=>res.json()).then(players=>{
                console.log(players)
                setPlayers(players)
            })
        }, []
    )

    const getPlayerDetails = () => {
        if (players.length > 0)
        {
            return (`<h2>${players[0].name}</h2>`)
        }
        else {
            return null
        }
    }

    return (
        <>
        <div className='bordered'>
        <h2>{players.length > 0 ? players[0].name : ""}</h2>
        <h3>{players.length > 0 ? players[0].birthdate : ""}</h3>
        <ul>
            {fixtures.map(f => <li>{constants.fixtureToString(teams, f)}</li>)}
        </ul>
        </div>
        <Link to="/"><button>🏠️</button></Link>
        </>
    )
}

export default PlayerDetail