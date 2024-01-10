import { Role } from "./Role"
import { Skill, SkillsInfo } from "../skills/Skill"
/*  @ts-ignore */
import img from "../../assets/images/assassin.png"
import { Game } from "../game/Game"
import { Player } from "../player/Player"
import { IconRobber } from "@/components/icons/robber"
import { IconDaggerRose } from "@/components/icons/dagger-rose"

export class Assassin extends Role {
  static _name = "Assassino"
  static description =
    "Você joga sozinho. Seu objetivo é eliminar todos os jogadores."
  static portrait = img
  static skillsInfo: SkillsInfo = {
    first: {
      name: "Assassinato",
      description: "Toda noite você escolhe um jogador para eliminar.",
      icon: (props) => <IconDaggerRose {...props} />,
      isTarget: true,
      isPassive: false,
      interactWithDeadPlayers: false,
      hasFeedback: false,
      order: "first",
      isDisabled: () => false,
    },
    second: {
      name: "Sequestro",
      description: `Uma vez por jogo você pode sequestrar um jogador impedindo-o de usar habilidades por 2 turnos.`,
      icon: (props) => <IconRobber {...props} />,
      isPassive: false,
      isTarget: true,
      interactWithDeadPlayers: false,
      hasFeedback: false,
      order: "second",
      isDisabled: () => false,
    },
  }

  constructor(game: Game) {
    super({
      game: game,
      name: Assassin._name,
      team: "villagers",
      description: Assassin.description,
      portrait: Assassin.portrait,
      skills: {
        first: new Skill({
          ...Assassin.skillsInfo.first,
          isDisabled: () => this.isSkillDisabled("first"),
        }),
        second: new Skill({
          ...Assassin.skillsInfo.second,
          isDisabled: () => this.isSkillDisabled("second"),
        }),
      },
    })
  }

  kill = (targetPlayer: Player) => {
    targetPlayer.setDeath(0)
  }

  kidnap = (targetPlayer: Player) => {
    targetPlayer.getRole().disableSkill("first", 2)
    targetPlayer.getRole().disableSkill("second", 2)
    this.disableSkill("second", 10000)
  }
}
