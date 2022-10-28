import React from "react"
import { Grid, Box } from "@mui/material"
import CheckIcon from "@mui/icons-material/Check"

import { SvgImage } from "../shared/images"

const BackCard = ({ lastCard }) => {
  if (lastCard) {
    setTimeout(() => {
      const element = document.getElementsByClassName("last-card")[0]
      if (element) {
        element.classList.remove("last-card")
      }
    }, 1500)
    return (
      <SvgImage
        name="back"
        className="card-back last-card"
        onClick={event => hideForSeconds(event, 1.5)}
      />
    )
  } else {
    return <SvgImage name="back" className="card-back" />
  }
}

const hideForSeconds = (event, time) => {
  const element = event.target
  element.classList.add("hidden")
  setTimeout(() => {
    element.classList.remove("hidden")
  }, time * 1000)
}

const Cards = ({
  scale,
  cards,
  gameId,
  action,
  actionName,
  roundsWon,
  cardsVisible,
  numOfPlayedRounds,
  firstCardSuit,
}) => {
  const s = scale || 1
  return (
    <Grid container spacing={1}>
      {cards.map((card, i) => (
        <Grid item md={s} key={`card-${card}`} sx={{ position: "relative" }}>
          <SvgImage name={card} onClick={() => action({ gameId, action: actionName, index: i })} />
          {roundsWon.includes(i) &&
            (cardsVisible ? <CheckIcon /> : <BackCard lastCard={numOfPlayedRounds - 1 == i} />)}
        </Grid>
      ))}
      {firstCardSuit && (
        <Grid item md>
          <Box display="flex" justifyContent="center">
            <SvgImage name={`Suit${firstCardSuit}`} className="opaque50" />
          </Box>
        </Grid>
      )}
    </Grid>
  )
}

export default Cards
