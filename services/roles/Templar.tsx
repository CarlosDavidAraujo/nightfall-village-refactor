import { Role } from "./Role"
import { Skill, SkillsInfo } from "../skills/Skill"
/*  @ts-ignore */
import img from "../../assets/images/templar.png"
import { Game } from "../game/Game"
import { Player } from "../player/Player"
import { IconTemplarShield } from "@/components/icons/templar-shield"
import { IconInjustice } from "@/components/icons/injustice"

export class Templar extends Role {
  static _name = "Templário"
  static description =
    "Você pertence ao time da vila. Seu objetivo é descobrir os lobisomens e proteger os aldeões."
  static portrait = img
  static skillsInfo: SkillsInfo = {
    first: {
      name: "Sacrifício",
      description:
        "Você pode escolher um jogador. Se ele morreria esta noite, você morre no lugar dele.",
      icon: (props) => <IconTemplarShield {...props} />,
      isTarget: true,
      isPassive: false,
      interactWithDeadPlayers: false,
      hasFeedback: false,
      order: "first",
      isDisabled: () => false,
    },
    second: {
      name: "Julgamento",
      description: `Você pode escolher um jogador. Se for um lobisomem a função dele será revelada e julgamento é bloqueado permanentemente. Se for um aldeão, você não poderá usar julgamento por 2 rodadas.`,
      icon: (props) => <IconInjustice {...props} />,
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
      name: Templar._name,
      team: "villagers",
      description: Templar.description,
      portrait: Templar.portrait,
      skills: {
        first: new Skill({
          ...Templar.skillsInfo.first,
          isDisabled: () => this.isSkillDisabled("first"),
        }),
        second: new Skill({
          ...Templar.skillsInfo.second,
          isDisabled: () => this.isSkillDisabled("second"),
        }),
      },
    })
  }

  sacrifice = (targetPlayer: Player) => {
    targetPlayer.setTemplarProtector(this.player)
  }

  judge = (targetPlayer: Player) => {
    if (targetPlayer.getRole().getTeam() === "villagers") {
      return this.disableSkill("second", 2)
    }
    this.game.addMessage(
      `${targetPlayer.getName()} é um(a) ${targetPlayer.getRole().getName()}`
    )
    this.disableSkill("second", 10000)
  }
}
