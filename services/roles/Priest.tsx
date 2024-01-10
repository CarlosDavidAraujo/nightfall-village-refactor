import { Role } from "./Role"
import { Skill, SkillsInfo } from "../skills/Skill"
/*  @ts-ignore */
import img from "../../assets/images/priest.png"
import { Game } from "../game/Game"
import { Player } from "../player/Player"
import { Werewolf } from "./Werewolf"
import { IconHolyWater } from "@/components/icons/holy-water"
import { IconEmbrassedEnergy } from "@/components/icons/embrassed-energy"

export class Priest extends Role {
  static _name = "Padre"
  static description = "Você pertence ao time da vila."
  static portrait = img
  static skillsInfo: SkillsInfo = {
    first: {
      name: "Água benta",
      description:
        "Você escolhe um jogador. Se for um vampiro ou lobisomem ele morrerá. Se for um aldeão você morrerá. Uso único",
      icon: (props) => <IconHolyWater {...props} />,
      isTarget: true,
      isPassive: false,
      interactWithDeadPlayers: false,
      hasFeedback: false,
      order: "first",
      isDisabled: () => false,
    },
    second: {
      name: "Proteção sagrada",
      description: `A primeira vez que os lobisomens te atacarem você sobreviverá.`,
      icon: (props) => <IconEmbrassedEnergy {...props} />,
      isPassive: true,
      isTarget: false,
      interactWithDeadPlayers: false,
      hasFeedback: false,
      order: "second",
      isDisabled: () => false,
    },
  }

  private holyProtection = true

  constructor(game: Game) {
    super({
      game: game,
      name: Priest._name,
      team: "villagers",
      description: Priest.description,
      portrait: Priest.portrait,
      skills: {
        first: new Skill({
          ...Priest.skillsInfo.first,
          isDisabled: () => this.isSkillDisabled("first"),
        }),
        second: new Skill({
          ...Priest.skillsInfo.second,
        }),
      },
    })
  }

  useHolyWater = (targetPlayer: Player) => {
    const targetPlayerRole = targetPlayer.getRole()
    if (targetPlayerRole instanceof Werewolf) {
      this.disableSkill("first", 10000)
      return targetPlayer.setDeath(0)
    }
    return this.player?.setDeath(0)
  }

  hasActiveHolyProtection = () => this.holyProtection
  disableHolyProtection = () => (this.holyProtection = false)
}
