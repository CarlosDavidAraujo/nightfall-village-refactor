import { Role } from "./Role"
import { Skill, SkillsInfo } from "../skills/Skill"
/*  @ts-ignore */
import img from "../../assets/images/witch.png"
import { Game } from "../game/Game"
import { Player } from "../player/Player"
import { IconHealthPotion } from "@/components/icons/health-potion"
import { IconPoisonBottle } from "@/components/icons/poison-bottle"

export class Witch extends Role {
  static _name = "Bruxa"
  static description =
    "Você pertence ao time da vila. Seu objetivo é proteger os aldeões e eliminar as ameaças."
  static portrait = img
  static skillsInfo: SkillsInfo = {
    first: {
      name: "Poção de cura",
      description:
        "Você pode impedir um jogador de ser morto durante a noite. Uso único.",
      icon: (props) => <IconHealthPotion {...props} />,
      isTarget: true,
      isPassive: false,
      interactWithDeadPlayers: false,
      hasFeedback: false,
      order: "first",
      isDisabled: () => false,
    },
    second: {
      name: "Poção de veneno",
      description: "Você pode eliminar um jogador. Uso único.",
      icon: (props) => <IconPoisonBottle {...props} />,
      isTarget: true,
      isPassive: false,
      interactWithDeadPlayers: false,
      hasFeedback: false,
      order: "second",
      isDisabled: () => false,
    },
  }

  constructor(game: Game) {
    super({
      game: game,
      name: Witch._name,
      team: "villagers",
      description: Witch.description,
      portrait: Witch.portrait,
      skills: {
        first: new Skill({
          ...Witch.skillsInfo.first,
          isDisabled: () => this.isSkillDisabled("first"),
        }),
        second: new Skill({
          ...Witch.skillsInfo.second,
          isDisabled: () => this.isSkillDisabled("second"),
        }),
      },
    })
  }

  protect = (targetPlayer: Player) => {
    targetPlayer.preventDeath()
    this.disableSkill("first", 10000)
  }

  poison = (targetPlayer: Player) => {
    targetPlayer.setDeath(0)
    this.disableSkill("second", 10000)
  }
}
