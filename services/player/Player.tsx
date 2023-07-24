import { Game } from "../game/Game"
import { Role } from "../roles/Role"

export class Player {
  private id: number
  private name: string
  private role: Role
  private game: Game
  private votes = 0
  private deathMark = {
    turn: -1,
    enabled: true,
  }

  constructor(id: number, name: string, role: Role, game: Game) {
    this.id = id
    this.name = name
    this.role = role
    this.game = game
  }

  getId = () => this.id
  getName = () => this.name
  getRole = () => this.role

  getVotes = () => this.votes
  increaseVotesCount = () => this.votes++

  setDeathMark = (delay: number) => {
    this.deathMark.turn = delay + this.game.getCurrentTurn()
  }
  protect = () => {
    this.deathMark.enabled = false
  }

  remove = () => {
    console.log(this.name, this.deathMark, this.game.getCurrentTurn())
    const removable =
      this.deathMark.enabled &&
      this.deathMark.turn === this.game.getCurrentTurn()

    if (removable) {
      const updateAlivePlayers = this.game
        .getAlivePlayers()
        .filter((player) => player.id !== this.id)

      this.game.setAlivePlayers(updateAlivePlayers)
      this.game.getDeadPlayers().push(this)

      const message =
        this.game.getPhase() === "night"
          ? `${this.name} morreu, deve ficar calado(a) até o final do jogo!`
          : `${this.name} foi linxado(a) pela vila, deve ficar calado(a) até o final do jogo!`
      this.game.addMessage(message)
    }
  }

  resetStatus = () => {
    this.votes = 0
    this.deathMark.turn--
    this.deathMark.enabled = true
  }
}
