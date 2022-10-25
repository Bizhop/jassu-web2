import React from "react"
import { NavLink } from "react-router-dom"
import { check, del, SvgImage } from "../shared/images"

import { formatString } from "../shared/dateFormat"

const KirvesGames = ({ games, user, getLog, deleteGame }) => (
  <table className="table table-striped">
    <thead>
      <tr>
        <th>Peli</th>
        <th>Pvm</th>
        <th>Pelaajia</th>
        <th>Voi liittyä</th>
        <th />
        <th />
      </tr>
    </thead>
    <tbody>
      {games.map(game => (
        <tr key={`game-${game.id}`}>
          <td>
            <NavLink to={`/kirves/${game.id}`} className="nav-link nav-item">
              {game.id}
            </NavLink>
          </td>
          <td>{formatString(game.createdAt)}</td>
          <td>{game.players}</td>
          <td>{game.canJoin && <img src={check} width="10" height="10" />}</td>
          <td>
            {user.email === game.admin.email && (
              <SvgImage
                name="log"
                width="30"
                height="30"
                onClick={() => getLog({ gameId: game.id, handId: game.lastHandId })}
              />
            )}
          </td>
          <td>
            {user.email === game.admin.email && (
              <img src={del} width="10" height="10" onClick={() => deleteGame(game.id)} />
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)

export default KirvesGames
