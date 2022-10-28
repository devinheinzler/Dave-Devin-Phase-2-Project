import { Header, Segment } from "semantic-ui-react"

const FavoriteTeam = (props) => {
    const teams = props.team

    const getTeamCard = () => {
        if (teams.length == 1) {
            const team = teams[0]
            return (
                <>
            <h2>{team.name} ({team.short_code})</h2>
            <h3>{team.twitter}</h3>
            <img src={team.logo_path} alt={team.name} />
            <h4>
                Founded in: {team.founded}
            </h4>
            </>)
        } else {
            return (<h1>No Team Favorited</h1>)
        }
    }
    return (
        <div className='bordered'>
            <h4>Favorite Team:</h4>
            {getTeamCard()}
        </div>
    )
}

export default FavoriteTeam