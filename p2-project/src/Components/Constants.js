const constants = {
    url: 'localhost:3000',
    teamsHeader: 'teams',
    leaguesHeader: 'leagues',
    externalUrl: 'https://soccer.sportmonks.com/api/v2.0/',
    livescores: 'livescores',
    favoritePlayersUrl: 'http://localhost:3002/favoritePlayers',
    playersUrl: 'http://localhost:3001/players',
    teamsUrl: `http://localhost:3001/teams`,
    shortTeamsUrl: 'http://localhost:3001/short_teams',
    favoriteTeamsUrl: 'http://localhost:3002/favoriteTeams',
    fixtures: 'fixtures/between',
    fixtureToString: (teams, s, fromScroll) => {
        let homeTeamName = s.localteam_id
        let homeCountry = "?"
        const homeTeamDetail = teams.filter(t => t.id == s.localteam_id)
        if (homeTeamDetail.length > 0) {
          homeTeamName = homeTeamDetail[0].name
          homeCountry = homeTeamDetail[0].country          }

        let visitingTeam = s.visitorteam_id
        let visitingCountry = "?"
        const visitingTeamDetail = teams.filter(t => t.id == s.visitorteam_id)
        if (visitingTeamDetail.length > 0){
          visitingTeam = visitingTeamDetail[0].name
          visitingCountry = visitingTeamDetail[0].country
        }

        let homeScore = s.scores.localteam_score
        let visitorScore = s.scores.visitorteam_score
        let status = s.time.status
        let minute = s.time.minute
        let ts = minute ? `${minute}\'` : `(${status})`
        if (fromScroll)
            return `***     ${homeTeamName}(${homeCountry}):${homeScore} - ${visitingTeam}(${visitingCountry}):${visitorScore} ${ts}     ***`
        else
            return `${homeTeamName}:${homeScore} - ${visitingTeam}:${visitorScore} ${ts}`
    }
}

export default constants