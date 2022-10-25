import React from "react"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"
import { path, pathOr } from "ramda"

import { init, getGames, deleteGame, getLog, getReplay, restoreGame } from "./kirvesActions"
import { check, view, SvgImage } from "../shared/images"
import translate from "../shared/translate"
import RenderGame from "./renderGame"
import KirvesGames from "./KirvesGames"

const KirvesContainer = props => (
  <div className="container">
    <h1>Kirves</h1>
    <div className="row">
      <div className="col-md-3 col-xs-3">
        <button onClick={() => props.init()} className="btn btn-primary">
          Aloita uusi peli
        </button>
      </div>
      <div className="col-md-3 col-xs-3">
        <SvgImage name="refresh" width="20" height="20" onClick={() => props.getGames()} />
      </div>
    </div>
    <KirvesGames
      games={props.games}
      user={props.user}
      getLog={props.getLog}
      deleteGame={props.deleteGame}
    />
    {props.logVisible && (
      <div>
        <h2>
          Loki (peli: {props.logId.gameId} käsi: {props.logId.handId})
        </h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Pelaaja</th>
              <th>Toiminto</th>
              <th>Lisätieto</th>
              <th>Näytä tilanne</th>
              <th>Palauta tilanne</th>
            </tr>
          </thead>
          <tbody>
            {props.logItems.map((item, index) => (
              <tr key={`log-item-${index}`}>
                <td>{item.user.nickname}</td>
                <td>{translate(item.input.action)}</td>
                <td>
                  {(() => {
                    switch (item.input.action) {
                      case "PLAY_CARD":
                      case "DISCARD":
                        return `index=${item.input.index}`
                      case "ACE_OR_TWO_DECISION":
                        return item.input.keepExtraCard ? "Pidetty" : "Hylätty"
                      case "SPEAK":
                        return translate(item.input.speak)
                      case "SPEAK_SUIT":
                        return translate(item.input.suit)
                      default:
                        return ""
                    }
                  })()}
                </td>
                <td>
                  <img
                    src={view}
                    width="20"
                    height="20"
                    onClick={() =>
                      props.getReplay({
                        gameId: props.logId.gameId,
                        handId: props.logId.handId,
                        index,
                      })
                    }
                  />
                </td>
                <td>
                  {props.selectedLogIndex == index && (
                    <img
                      src={check}
                      width="20"
                      height="20"
                      onClick={() =>
                        props.restoreGame({
                          gameId: props.logId.gameId,
                          handId: props.logId.handId,
                          index,
                        })
                      }
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
    {props.replay && (
      <div id="kirves-container" className="container">
        <RenderGame
          game={props.replay}
          isReplay={true}
          action={() => {}}
          showAllCards={() => {}}
          cardsVisible={true}
        />
      </div>
    )}
    {!props.user.email && <Navigate to="/" />}
    {!props.gamesFetched && props.getGames() && null}
  </div>
)

const mapStateToProps = state => ({
  user: path(["user"], state),
  error: path(["user", "error"], state),
  games: path(["kirves", "games"], state),
  logItems: pathOr([], ["kirves", "logItems"], state),
  logVisible: path(["kirves", "logVisible"], state),
  logId: path(["kirves", "logId"], state),
  replay: path(["kirves", "replay"], state),
  selectedLogIndex: pathOr(0, ["kirves", "selectedLogIndex"], state),
  gamesFetched: pathOr(false, ["kirves", "gamesFetched"], state),
})

const mapDispatchToProps = dispatch => ({
  init: () => dispatch(init()),
  deleteGame: gameId => dispatch(deleteGame(gameId)),
  getLog: params => dispatch(getLog(params)),
  getReplay: params => dispatch(getReplay(params)),
  restoreGame: params => dispatch(restoreGame(params)),
  setCurrentGameId: gameId => dispatch(setCurrentGameId(gameId)),
  getGames: () => dispatch(getGames()),
})

export default connect(mapStateToProps, mapDispatchToProps)(KirvesContainer)
