import React from "react"

import KirvesGames from "../components/kirves/KirvesGames"

const games = [
  {
    id: 1,
    admin: {
      email: "ville.piispa@gmail.com",
      jwt: null,
      nickname: "Ville",
    },
    players: 1,
    lastHandId: null,
    canJoin: true,
    createdAt: "2022-08-30 06:20:29",
    updatedAt: "2022-08-30 06:20:29",
  },
]

const admin = {
  email: "ville.piispa@gmail.com",
  nickname: "Ville",
}

const user = {
  email: "user@example.com",
  nickname: "User",
}

const getLog = params => alert("Get log, params: " + JSON.stringify(params))

const deleteGame = id => alert("Delete game id: " + id)

export default {
  title: "KirvesGames",
  component: KirvesGames,
}

export const asAdmin = () => (
  <KirvesGames games={games} user={admin} getLog={getLog} deleteGame={deleteGame} />
)
export const asUser = () => <KirvesGames games={games} user={user} />
