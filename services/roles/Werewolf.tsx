import { Role } from "./Role"
/*  @ts-ignore */
import werewolf from "../../assets/images/werewolf.png"
import { IconFangs } from "@/components/icons/fangs"
import { IconDespair } from "@/components/icons/despair"
import { Game } from "../game/Game"
import { Player } from "../player/Player"
import { Skill, SkillsInfo } from "../skills/Skill"

export class Werewolf extends Role {
  static _name: string = "Lobisomem"
  static description: string =
    "Você pertence ao time dos lobisomens. Seu objetivo é eliminar todos os habitantes da vila."
  static portrait = werewolf
  static skillsInfo: SkillsInfo = {
    first: {
      name: "Faminto",
      description:
        "Escolha um jogador que morrerá esta noite. Você pode ver os votos dos outros lobisomens. Se a votação empatar a vítima sera aleatória",
      icon: (props) => <IconFangs {...props} />,
      isTarget: true,
      isPassive: false,
      interactWithDeadPlayers: false,
      hasFeedback: false,
      order: "first",
      isDisabled: () => false,
    },
    second: {
      name: "Transmutação",
      description:
        "Outros jogadores te verão como aldeão até o final da próxima rodada, mas suas habilidades são desabilitadas por um turno.",
      icon: (props) => <IconDespair {...props} />,
      isTarget: false,
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
      name: Werewolf._name,
      team: "werewolves",
      description: Werewolf.description,
      portrait: Werewolf.portrait,
      skills: {
        first: new Skill({
          ...Werewolf.skillsInfo.first,
          isDisabled: () => this.isSkillDisabled("first"),
        }),
        second: new Skill({
          ...Werewolf.skillsInfo.second,
          isDisabled: () => this.isSkillDisabled("second"),
        }),
      },
    })
  }

  eat = (targetPlayer: Player) => {
    targetPlayer.increaseVotesCount()
  }

  transmute = () => {
    this.setFakeNameDuration("Aldeão", 1)
    this.disableSkill("first", 1)
    this.disableSkill("second", 1)
  }
}
