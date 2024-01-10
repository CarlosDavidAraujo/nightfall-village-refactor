import { Role } from "./Role"
import { Skill, SkillsInfo } from "../skills/Skill"
/*  @ts-ignore */
import img from "../../assets/images/tough-guy.png"
import { Game } from "../game/Game"
import { IconMuscleUp } from "@/components/icons/muscle-up"
import { IconSonicShout } from "@/components/icons/sonic-shout"

export class ToughGuy extends Role {
  static _name = "Valentão"
  static description = "Você pertence ao time da vila."
  static portrait = img
  static skillsInfo: SkillsInfo = {
    first: {
      name: "Provocar",
      description:
        "Uma vez por jogo você provoca os lobisomens forçando-os a te matarem. Há 20% de chance de um deles morrer com você.",
      icon: (props) => <IconSonicShout {...props} />,
      isTarget: false,
      isPassive: false,
      interactWithDeadPlayers: false,
      hasFeedback: false,
      order: "first",
      isDisabled: () => false,
    },
    second: {
      name: "Duro na queda",
      description: `Quando atacado durante a noite você sobrevive até o proximo dia.`,
      icon: (props) => <IconMuscleUp {...props} />,
      isTarget: false,
      isPassive: true,
      interactWithDeadPlayers: false,
      hasFeedback: false,
      order: "second",
      isDisabled: () => false,
    },
  }

  constructor(game: Game) {
    super({
      game: game,
      name: ToughGuy._name,
      team: "villagers",
      description: ToughGuy.description,
      portrait: ToughGuy.portrait,
      skills: {
        first: new Skill({
          ...ToughGuy.skillsInfo.first,
          isDisabled: () => this.isSkillDisabled("first"),
        }),
        second: new Skill({
          ...ToughGuy.skillsInfo.second,
        }),
      },
    })
  }

  taunt = () => {
    this.player?.setIsTauting(true)
  }
}
