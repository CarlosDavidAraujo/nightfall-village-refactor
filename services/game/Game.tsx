import { Player } from "../player/Player"

export class Game {
  private alivePlayers: Player[] = []
  private deadPlayers: Player[] = []
  private messages: string[] = []
  private currentPlayerIndex = 0
  private currentTurn = 1
  private phase: "night" | "day" = "night"

  constructor() {}

  //----------------Jogadores-----------------//

  getAlivePlayers = () => this.alivePlayers
  setAlivePlayers = (players: Player[]) => (this.alivePlayers = players)
  getDeadPlayers = () => this.deadPlayers
  getCurrentPlayer = () => this.alivePlayers[this.currentPlayerIndex]
  goToNextPlayer = () => this.currentPlayerIndex++
  noNextPlayer = () => this.currentPlayerIndex >= this.alivePlayers.length
  restartPlayerOrder = () => {
    this.currentPlayerIndex = 0
  }

  //-----------------Mensagens------------------//
  getMessages = () => this.messages
  addMessage = (message: string) => this.messages.push(message)
  clearMessages = () => {
    this.messages = []
  }

  //----------------Turnos-----------------//

  getCurrentTurn = () => this.currentTurn
  getPhase = () => this.phase

  /**
   * Remove possíveis jogadores mortos,
   * reseta os status necessários de cada um restaura a ordem da rodada.
   */
  endNight = () => {
    this.alivePlayers.forEach((player) => {
      player.remove()
      player.resetStatus()
    })
    this.restartPlayerOrder()
    this.phase = "day"
  }

  endDay = () => {
    this.alivePlayers.forEach((player) => {
      player.remove()
      player.resetStatus()
    })
    this.restartPlayerOrder()
    this.phase = "night"
    this.currentTurn++
  }
}
