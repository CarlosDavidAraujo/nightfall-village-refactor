import { Role, Skill } from "./Role"
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
  static roleImg = seer
  static skills: Skill[] = [
    {
      name: "Visão",
      description: "Você pode ver a função de um jogador.",
      icon: (props) => <IconAllSeeingEye {...props} />,
      isTarget: true,
      hasFeedback: true,
      order: "first",
    },
    {
      name: "Visão Póstuma",
      description: "Você pode ver a função de um jogador que ja foi eliminado.",
      icon: (props) => <IconBleedingEye {...props} />,
      isTarget: true,
      hasFeedback: true,
      order: "second",
    },
  ]

  constructor(game: Game) {
    super(game, Seer._name, Seer.description, Seer.skills, Seer.roleImg)
  }

  useVision = (player: Player) => revealPlayerRole(player)

}
