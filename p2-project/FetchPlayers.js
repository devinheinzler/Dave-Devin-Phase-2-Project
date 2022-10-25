import fetch from "node-fetch";

const playersUrl = "http://localhost:3001/players"
let count = 0
fetch(playersUrl).
    then(res=>res.json()).
    then(players=>{
        players.forEach(
            p => {
                const detailUrl = `https://soccer.sportmonks.com/api/v2.0/players/${p.player_id}?api_token=Slvr1cCbLDIDz0IUo7Q2fEnIxD9OFiyhhcnssiEjYvWuQni06dZ4x3hrTeq5`
                fetch(detailUrl).
                    then(res=>res.json()).
                    then(player=> {
                            p.id = ++count
                            p.name = player.data.display_name
                            p.team_id = player.data.team_id
                            p.birthdate = player.data.birthdate
                            p.nationality = player.data.nationality
                            p.position_id = player.data.position_id
                            p.image_path = player.data.image_path
                            console.log(JSON.stringify(p), ",")
                    })
            }
        )
    })

