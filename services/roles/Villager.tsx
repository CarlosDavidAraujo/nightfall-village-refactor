import { Role, Skill } from "./Role"
/*  @ts-ignore */
import villager from "../../assets/images/villager.png"
import { IconPrayerBeads } from "@/components/icons/prayer-beads"
import { IconLockSpy } from "@/components/icons/lock-spy"
import { findWerewolf } from "../skills/findWerewolf"
import { Game } from "../game/Game"
import { Player } from "../player/Player"

export class Villager extends Role {
  static _name: string = "Aldeão"
  static description: string = "Você pertence ao time da vila"
  static roleImg = villager
  static skills: Skill[] = [
    {
      name: "Oração",
      description:
        "Você tem 5% de chance de proteger um jogador de ser morto esta noite.",
      icon: (props) => <IconPrayerBeads {...props} />,
      isTarget: true,
      hasFeedback: false,
      order: "first",
    },
    {
      name: "Curiosidade",
      description: "Você tem 5% de chance de descobrir um lobisomem.",
      icon: (props) => <IconLockSpy {...props} />,
      isTarget: false,
      hasFeedback: true,
      order: "second",
    },
  ]

  constructor(game: Game) {
    super(
      game,
      Villager._name,
      Villager.description,
      Villager.skills,
      Villager.roleImg
    )
  }

  pray = (targetPlayer: Player) => {
    targetPlayer.protect()
  }

  snoop = () => {
    const werewolf = findWerewolf(this.game.getAlivePlayers())
    if (!werewolf) {
      return
    }
    return werewolf
  }
}
