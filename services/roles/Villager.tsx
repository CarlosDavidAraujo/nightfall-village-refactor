import { Role } from "./Role"
/*  @ts-ignore */
import villager from "../../assets/images/villager.png"
import { IconPrayerBeads } from "@/components/icons/prayer-beads"
import { IconLockSpy } from "@/components/icons/lock-spy"
import { findWerewolf } from "../skills/findWerewolf"
import { Game } from "../game/Game"
import { Player } from "../player/Player"
import { Skill, SkillsInfo } from "../skills/Skill"

export class Villager extends Role {
  static _name: string = "Aldeão"
  static description: string = "Você pertence ao time da vila"
  static portrait = villager
  static skillsInfo: SkillsInfo = {
    first: {
      name: "Oração",
      description:
        "Você tem 5% de chance de proteger um jogador de ser morto esta noite.",
      icon: (props) => <IconPrayerBeads {...props} />,
      isTarget: true,
      interactWithDeadPlayers: false,
      hasFeedback: false,
      order: "first",
      isDisabled: () => false,
    },
    second: {
      name: "Curiosidade",
      description: "Você tem 5% de chance de descobrir um lobisomem.",
      icon: (props) => <IconLockSpy {...props} />,
      isTarget: false,
      interactWithDeadPlayers: false,
      hasFeedback: true,
      order: "second",
      isDisabled: () => false,
    },
  }

  constructor(game: Game) {
    super({
      game: game,
      name: Villager._name,
      team: "villagers",
      description: Villager.description,
      portrait: Villager.portrait,
      skills: {
        first: new Skill({
          ...Villager.skillsInfo.first,
          isDisabled: () => this.isSkillDisabled("first"),
        }),
        second: new Skill({
          ...Villager.skillsInfo.second,
          isDisabled: () => this.isSkillDisabled("second"),
        }),
      },
    })
  }

  pray = (targetPlayer: Player) => {
    const chance = 0.05
    const randomNumber = Math.random()
    if (randomNumber <= chance) {
      targetPlayer.protect()
    }
  }

  snoop = () => {
    const chance = 0.05
    const randomNumber = Math.random()
    const inChanceRange = randomNumber <= chance
    const werewolfPlayer = findWerewolf(this.game.getAlivePlayers())
    if (
      !inChanceRange ||
      !werewolfPlayer ||
      werewolfPlayer.getRole().hasActiveFakeName()
    ) {
      return "Ninguém foi encontrado."
    }
    return `${werewolfPlayer.getName()} é um lobisomem entre nós!`
  }
}
