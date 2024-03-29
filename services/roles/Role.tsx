import { Game } from "../game/Game"
import { Player } from "../player/Player"
import { SkillOrder, Skills } from "../skills/Skill"

type team = "villagers" | "werewolves"

type RoleConstructorProps = {
  game: Game
  name: string
  team: team
  description: string
  skills: Skills
  portrait: string
}

type FakeName = {
  name: string
  duration: number
}

export class Role {
  protected player: Player | null = null
  protected game: Game
  private name: string
  private team: team
  private fakeName: FakeName
  private description: string
  private skills: Skills
  private portrait: any
  private skillDisabler = {
    first: {
      duration: 0,
      disableActionRegisteredTurn: 0,
    },
    second: {
      duration: 0,
      disableActionRegisteredTurn: 0,
    },
  }

  constructor(params: RoleConstructorProps) {
    this.game = params.game
    this.name = params.name
    this.team = params.team
    this.description = params.description
    this.skills = params.skills
    this.portrait = params.portrait
    this.fakeName = {
      name: params.name,
      duration: 0,
    }
  }

  getName = () => this.name
  getPortrait = () => this.portrait
  setPlayer = (player: Player) => (this.player = player)
  getTeam = () => this.team

  //---------------------NOME FALSO--------------------------//
  getFakeName = () =>
    this.hasActiveFakeName() ? this.fakeName.name : this.name
  hasActiveFakeName = () => this.fakeName.duration >= this.game.getCurrentTurn()
  setFakeNameDuration = (fakeName: string, duration: number) => {
    this.fakeName.name = fakeName
    this.fakeName.duration = duration + this.game.getCurrentTurn()
  }

  //------------------------HABILIDADES-----------------------//

  getSkill = (skillOrder: SkillOrder) => {
    return this.skills[skillOrder]
  }

  /**
   * Checa se a habilidade está bloqueada
   * @param skillOrder A habilidade a ser checada
   * @returns
   */
  isSkillDisabled = (skillOrder: SkillOrder) => {
    const currentTurn = this.game.getCurrentTurn()
    const { duration, disableActionRegisteredTurn } =
      this.skillDisabler[skillOrder]
    return (
      duration >= currentTurn && disableActionRegisteredTurn !== currentTurn
    )
  }

  /**
   * Desabilita uma habilidade por um tempo determinado
   * @param skillOrder A habilidade que será bloqueada
   * @param duration a duração em turnos pela qual permanecerá bloqueada
   */
  disableSkill = (skillOrder: SkillOrder, duration: number) => {
    const curretTurn = this.game.getCurrentTurn()
    const currentDuration = this.skillDisabler[skillOrder].duration
    const newDuration = duration + curretTurn
    if (newDuration > currentDuration) {
      this.skillDisabler[skillOrder].duration = duration + curretTurn
      this.skillDisabler[skillOrder].disableActionRegisteredTurn = curretTurn
    }
  }

  /**
   * Verifica se o jogador não pode ser alvejado por uma habilidade
   * @param targetPlayer O jogador alvo
   * @param chosenSkill A habilidade escolhida
   * @returns
   */
  hasInvalidTargetOn = (targetPlayer: Player, chosenSkill?: SkillOrder) => false
}
