import { Player } from "../player/Player"
import { VictoryManager } from "./victory-manager"

export class Game {
  private players: Player[] = []
  private messages: string[] = []
  private currentPlayerIndex = 0
  private currentTurn = 1
  private phase: "night" | "day" = "night"
  private victoryManager = new VictoryManager(this)

  constructor() {}

  //----------------Jogadores-----------------//
  getPlayers = () => this.players
  setPlayers = (players: Player[]) => (this.players = players)
  getAlivePlayers = () => this.players.filter((player) => !player.isDead())
  getDeadPlayers = () => this.players.filter((player) => player.isDead())
  getCurrentPlayer = () => this.getAlivePlayers()[this.currentPlayerIndex]
  goToNextPlayer = () => this.currentPlayerIndex++
  noNextPlayer = () => this.currentPlayerIndex >= this.getAlivePlayers().length
  restartPlayerOrder = () => {
    this.currentPlayerIndex = 0
  }
  getTauntingPlayer = () =>
    this.getAlivePlayers().find((player) => player.isTauting())

  //-----------------Mensagens------------------//
  getMessages = () => this.messages
  addMessage = (message: string) => this.messages.push(message)
  clearMessages = () => {
    this.messages = []
  }

  //----------------Turnos-----------------//
  getVictoryManager = () => this.victoryManager
  getCurrentTurn = () => this.currentTurn
  getPhase = () => this.phase

  /**
   * Remove possíveis jogadores mortos,
   * reseta os status necessários de cada um restaura a ordem da rodada.
   */
  endNight = () => {
    const alivePlayersBeforeRemotion = this.getAlivePlayers()
    this.players.forEach((player) => {
      player.remove()
      player.resurrect()
      player.resetStatus()
    })
    if (this.getAlivePlayers().length === alivePlayersBeforeRemotion.length) {
      this.addMessage("Ninguém morreu esta noite")
    }
    this.restartPlayerOrder()
    this.phase = "day"
  }

  endDay = () => {
    const alivePlayersBeforeRemotion = this.getAlivePlayers()
    this.players.forEach((player) => {
      player.remove()
      player.resetStatus()
    })
    if (this.getAlivePlayers().length === alivePlayersBeforeRemotion.length) {
      this.addMessage("A vila ficou indecisa")
    }
    this.restartPlayerOrder()
    this.phase = "night"
    this.currentTurn++
  }
}
