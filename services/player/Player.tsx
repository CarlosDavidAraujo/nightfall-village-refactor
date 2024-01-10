import { delay } from "lodash"
import { Game } from "../game/Game"
import { Role } from "../roles/Role"
import { Priest } from "../roles/Priest"

export class Player {
  private id: number
  private name: string
  private role: Role
  private game: Game
  private votes = 0
  private tauting = false
  private templarProtector: Player | null = null
  private deathMark = {
    ressurrectTurn: -1,
    deathTurn: -1,
    enabled: true,
    isDead: false,
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

  //---------------------------VOTAÇÃO--------------------------------//
  getVotes = () => this.votes
  increaseVotesCount = () => this.votes++

  setIsTauting = (value: boolean) => (this.tauting = value)
  isTauting = () => this.tauting

  //---------------------------REMOÇÃO E PROTEÇÃO--------------------------------//
  isDead = () => this.deathMark.isDead
  setIsDead = (value: boolean) => (this.deathMark.isDead = value)

  /**
   * Define quando o jogador será eliminado
   * @param delay O delay em turnos que levará para que o jogador seja eliminado. Ex: se delay for 0, o jogador morrerá no turno corrente.
   */
  setDeath = (delay: number) => {
    this.deathMark.deathTurn = delay + this.game.getCurrentTurn()
  }

  /**
   * Define quando o jogador será ressucitado
   * @param delay O delay em turnos que levará para que o jogador seja ressucitado. Ex: se delay for 0, o jogador ressucitará no turno corrente.
   */
  setRessurrect = (delay: number) =>
    (this.deathMark.ressurrectTurn = delay + this.game.getCurrentTurn())

  /**
   * Protege o jogador, impedindo-o de morrer durante a noite.
   */
  preventDeath = () => {
    this.deathMark.enabled = false
  }

  setTemplarProtector = (player: Player | null) =>
    (this.templarProtector = player)

  remove = () => {
    const isNight = this.game.getPhase() === "night"
    const hasHolyProtection =
      this.role instanceof Priest &&
      this.role.hasActiveHolyProtection() &&
      isNight

    const removable =
      !hasHolyProtection &&
      this.deathMark.enabled &&
      this.deathMark.deathTurn === this.game.getCurrentTurn()

    if (removable) {
      const playerToRemove = this.templarProtector
        ? this.templarProtector
        : this
      this._remove(playerToRemove)
    }

    if (hasHolyProtection && this.role instanceof Priest) {
      this.role.disableHolyProtection()
    }
    if (this.tauting && isNight) {
      this.tauting = false
      this.setDeath(1)
    }
  }

  private _remove = (player: Player) => {
    player.setIsDead(true)
    const message =
      this.game.getPhase() === "night"
        ? `${player.name} morreu, deve ficar calado(a) até o final do jogo!`
        : `${player.name} foi linxado(a) pela vila, deve ficar calado(a) até o final do jogo!`
    this.game.addMessage(message)
  }

  resurrect = () => {
    const resuscitable =
      this.deathMark.ressurrectTurn === this.game.getCurrentTurn()
    if (resuscitable) {
      this.deathMark.isDead = false
      this.game.addMessage(`${this.name} foi ressucitado.`)
    }
  }

  //------------------------STATUS RESET--------------------------//
  resetStatus = () => {
    this.votes = 0
    this.deathMark.deathTurn--
    this.deathMark.enabled = true
  }
}
