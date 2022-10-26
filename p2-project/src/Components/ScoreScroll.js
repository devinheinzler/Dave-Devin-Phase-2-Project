import React, {useEffect, useState} from 'react';
import constants from "./Constants.js"

const ScoreScroll = () => {
    const [scores, setScores] = useState([])
    const [scoreCalls, setScoreCalls] = useState(0)
    const [teamCalls, setTeamCalls] = useState(0)

    let teamNames = {}

    // const getTeamName = (id) => {
    //   let homeTeamName = ""
    //   if (homeTeam in teamNames) {
    //     homeTeamName = teamNames[homeTeam]
    //   }
    //   else {
    //     const teamInfoUrl = constants.externalUrl + "teams/" + homeTeam + `?api_token=${process.env.REACT_APP_API_TOKEN}`
    //     fetch(teamInfoUrl).then(res=>res.json()).then(info=>{
    //       homeTeamName = info.data.name
    //       console.log(teamNames, " added ", info.data.name)
    //     })
    //   }
    // }

    // useEffect(
    //     () => {
    //       const url = `${constants.externalUrl}${constants.livescores}?api_token=${process.env.REACT_APP_API_TOKEN}`
    //       console.log(url)
    //       let interval
    //       if (scoreCalls < 3)
    //       {
    //         interval = setInterval(
    //             () => {
    //                 fetch(url).then(res=>
    //                     {
    //                         setScoreCalls(scoreCalls + 1)
    //                         return res.json()
    //                     }).then(
    //                     scores => {
    //                         console.log("Scores", scoreCalls, scores.data)
    //                         let scoreData = scores.data
    //                         scoreData.forEach(s => {
    //                           const homeTeam = s.localteam_id.toString()
    //                           const visitingTeam = s.visitorteam_id.toString()





    //                         setScores(scores.data)
    //                     }
    //                 ).catch(e=>console.log(e))
    //             }, scoreCalls > 1 ? 300000 : 300
    //         )
    //       } else if (scoreCalls > 0) {
    //         clearInterval(interval)
    //       }

    //       return () => clearInterval(interval)
    //     }, [scores, scoreCalls]
    //   )

      const getScoreText = () => {
        return "SOME LONG TEXT THAT CAN SCROLL IN THE STRING WHILE WE'WRESDlkjfsdjlkfds"
        // let text = ""
        // scores.forEach(s => {
        //   let homeTeam = s.localteam_id.toString()
        //   let homeTeamName = homeTeam
        //   if (homeTeam in teamNames) {
        //     homeTeamName = teamNames[homeTeam]
        //   }
        //   else {
        //     const teamInfoUrl = constants.externalUrl + "teams/" + homeTeam + `?api_token=${process.env.REACT_APP_API_TOKEN}`
        //     fetch(teamInfoUrl).then(res=>res.json()).then(info=>{
        //       teamNames[homeTeam] = info.data.name
        //       console.log(teamNames, " added ", info.data.name)
        //     })
        //   }
        //   let visitingTeam = s.visitorteam_id
        //   let homeScore = s.scores.localteam_score
        //   let visitorScore = s.scores.visitorteam_score
        //   let status = s.time.status
        //   let minute = s.time.minute
        //   let ts = minute ? `${minute}\'` : `(${status})`
        //   text += `    ${homeTeam}:${homeScore} - ${visitingTeam}:${visitorScore} ${ts}  `
        // })
        // return text
      }

      return (
        <marquee behavior="scroll" direction="left">{getScoreText()}</marquee>
      )

}

export default ScoreScroll