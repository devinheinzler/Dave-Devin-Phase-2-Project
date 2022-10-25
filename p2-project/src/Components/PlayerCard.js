const PlayerCard = (props) => {
    const player = props.player
    return (
        <div className="card" key={player.id}>
            <h2>{player.name}</h2>
            <h3>{player.teamName}</h3>
        </div>
    )
}

export default PlayerCard