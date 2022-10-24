import React, {useEffect, useState} from 'react';
import constants from "./Constants.js"

const ScoreScroll = () => {
    const [scores, setScores] = useState([])
    const [scoreCalls, setScoreCalls] = useState(0)

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
    //                         console.log("Scores", scoreCalls, scores)
    //                         setScores(scores)
    //                     }
    //                 ).catch(e=>console.log(e))
    //             }, scoreCalls > 0 ? 300000 : 300
    //         )
    //       } else if (scoreCalls > 0) {
    //         clearInterval(interval)
    //       }

    //       return () => clearInterval(interval)
    //     }, [scores, scoreCalls]
    //   )

      const getScoreText = () => {
        return "SOME LONG TEXT THAT CAN SCROLL IN THE STRING WHILE WE'WRESDlkjfsdjlkfds"
      }

      return (
        <marquee behavior="scroll" direction="left">{getScoreText()}</marquee>
      )

}

export default ScoreScroll