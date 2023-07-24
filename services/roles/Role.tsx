import { Game } from "../game/Game"
import { Player } from "../player/Player"

type SkillOrder = "first" | "second"

export type Skill = {
  name: string
  description: string
  icon: (props?: React.SVGProps<SVGSVGElement>) => JSX.Element
  isTarget: boolean
  hasFeedback: boolean
  order: SkillOrder
}

export class Role {
  protected player: Player | null = null
  protected game: Game
  private name: string
  private description: string
  private skills: Skill[]
  private roleImg: any

  constructor(
    game: Game,
    name: string,
    description: string,
    skills: Skill[],
    roleImg: string
  ) {
    this.game = game
    this.name = name
    this.description = description
    this.skills = skills
    this.roleImg = roleImg
  }

  getName = () => this.name
  getRoleImg = () => this.roleImg
  getSkill = (skillOrder: SkillOrder) => {
    if (skillOrder === "first") {
      return this.skills[0]
    }
    return this.skills[1]
  }

  setPlayer = (player: Player) => (this.player = player)

  isSkillDisabled = () => false
}
