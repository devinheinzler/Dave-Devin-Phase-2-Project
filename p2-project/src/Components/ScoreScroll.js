import React, {useEffect, useState} from 'react';
import constants from "./Constants.js"

const ScoreScroll = (props) => {
    const [scores, setScores] = useState([])
    const [scoreCalls, setScoreCalls] = useState(0)

    const teams = props.teams

    useEffect(
        () => {
          const url = `${constants.externalUrl}${constants.livescores}?api_token=${process.env.REACT_APP_API_TOKEN}`
          console.log(url)
          let interval
          interval = setInterval(
              () => {
                  fetch(url).then(res=>
                      {
                          setScoreCalls(scoreCalls + 1)
                          return res.json()
                      }).then(
                      scores => {
                          setScores(scores.data)
                      }
                  ).catch(e=>console.log(e))
              }, scoreCalls > 1 ? 300000 : 300
          )

          return () => clearInterval(interval)
        }, [scores, scoreCalls]
      )

      const getScoreText = () => {
        if (scores.length == 0) return "Call To Live Scores Failed"
        let text = ""
        scores.forEach(s => {
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
          text += `***     ${homeTeamName}(${homeCountry}):${homeScore} - ${visitingTeam}(${visitingCountry}):${visitorScore} ${ts}     ***`
        })
        return text
      }

      return (
        <marquee behavior="scroll" direction="left">{getScoreText()}</marquee>
      )

}

export default ScoreScroll