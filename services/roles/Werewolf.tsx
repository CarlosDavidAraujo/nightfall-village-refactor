import { Role, Skill } from "./Role"
/*  @ts-ignore */
import werewolf from "../../assets/images/werewolf.png"
import { IconFangs } from "@/components/icons/fangs"
import { IconDespair } from "@/components/icons/despair"
import { Game } from "../game/Game"
import { Player } from "../player/Player"

export class Werewolf extends Role {
  static _name: string = "Lobisomem"
  static description: string =
    "Você pertence ao time dos lobisomens. Seu objetivo é eliminar todos os habitantes da vila."
  static roleImg = werewolf
  static skills: Skill[] = [
    {
      name: "Faminto",
      description: "Escolha um jogador que morrerá esta noite.",
      icon: (props) => <IconFangs {...props} />,
      isTarget: true,
      hasFeedback: false,
      order: "first",
    },
    {
      name: "Transmutação",
      description:
        "Outros jogadores te verão como aldeão até o final da próxima rodada. Não pode usar 'Faminto' enquanto transmutado.",
      icon: (props) => <IconDespair {...props} />,
      isTarget: false,
      hasFeedback: false,
      order: "second",
    },
  ]

  constructor(game: Game) {
    super(
      game,
      Werewolf._name,
      Werewolf.description,
      Werewolf.skills,
      Werewolf.roleImg
    )
  }

  eat = (targetPlayer: Player) => {
    targetPlayer.increaseVotesCount()
  }
}
