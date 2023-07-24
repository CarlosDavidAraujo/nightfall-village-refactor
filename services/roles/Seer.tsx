import { Role } from "./Role"
import { Skill, SkillsInfo } from "../skills/Skill"
/*  @ts-ignore */
import seer from "../../assets/images/seer.png"
import { IconAllSeeingEye } from "@/components/icons/all-seeing-eye"
import { IconBleedingEye } from "@/components/icons/bleeding-eye"
import { Game } from "../game/Game"
import { Player } from "../player/Player"
import { revealPlayerRole } from "../skills/revealPlayerRole"

export class Seer extends Role {
  static _name = "Vidente"
  static description = "Você pertence ao time da vila"
  static portrait = seer
  static skillsInfo: SkillsInfo = {
    first: {
      name: "Visão",
      description: "Você pode ver a função de um jogador.",
      icon: (props) => <IconAllSeeingEye {...props} />,
      isTarget: true,
      interactWithDeadPlayers: false,
      hasFeedback: true,
      order: "first",
      isDisabled: () => false,
    },
    second: {
      name: "Visão Póstuma",
      description: "Você pode ver a função de um jogador que ja foi eliminado.",
      icon: (props) => <IconBleedingEye {...props} />,
      isTarget: true,
      interactWithDeadPlayers: true,
      hasFeedback: true,
      order: "second",
      isDisabled: () => false,
    },
  }

  constructor(game: Game) {
    super({
      game: game,
      name: Seer._name,
      description: Seer.description,
      portrait: Seer.portrait,
      skills: {
        first: new Skill({
          ...Seer.skillsInfo.first,
          isDisabled: () => this.isSkillDisabled("first"),
        }),
        second: new Skill({
          ...Seer.skillsInfo.second,
          isDisabled: () =>
            this.isSkillDisabled("second") ||
            this.game.getDeadPlayers().length === 0,
        }),
      },
    })
  }

  useVision = (player: Player) => revealPlayerRole(player)
}
