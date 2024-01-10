import { Role } from "./Role"
import { Skill, SkillsInfo } from "../skills/Skill"
/*  @ts-ignore */
import img from "../../assets/images/hunter.png"
import { Game } from "../game/Game"
import { Player } from "../player/Player"
import { IconOnSight } from "@/components/icons/on-sight"
import { IconWolfTrap } from "@/components/icons/wolf-trap"
import { IconSilverBullet } from "@/components/icons/silver-bullet"
import { IconBullet } from "@/components/icons/bullet"

export class Hunter extends Role {
  static _name = "Caçador"
  static description = "Seu objetivo é eliminar e atrasar os lobisomens."
  static portrait = img
  static skillsInfo: SkillsInfo = {
    first: {
      name: "Bala de prata",
      description:
        "Escolha um jogador. Se for um lobisomem ele será eliminado, se não, ele terá as habilidades bloqueadas por um turno. Uso único.",
      icon: (props) => <IconSilverBullet {...props} />,
      isTarget: true,
      isPassive: false,
      interactWithDeadPlayers: false,
      hasFeedback: false,
      order: "first",
      isDisabled: () => false,
    },
    second: {
      name: "Bala de chumbo",
      description: `Escolha um jogador. Se for um lobisomem ele terá as habilidades bloqueadas por um turno, se não, ele será eliminado. Uso único.`,
      icon: (props) => <IconBullet {...props} />,
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
      name: Hunter._name,
      team: "villagers",
      description: Hunter.description,
      portrait: Hunter.portrait,
      skills: {
        first: new Skill({
          ...Hunter.skillsInfo.first,
          isDisabled: () => this.isSkillDisabled("first"),
        }),
        second: new Skill({
          ...Hunter.skillsInfo.second,
          isDisabled: () => this.isSkillDisabled("second"),
        }),
      },
    })
  }

  /**Elimina um jogador */
  silverShot = (targetPlayer: Player) => {
    if (targetPlayer.getRole().getTeam() === "werewolves") {
      targetPlayer.setDeath(0)
    } else {
      targetPlayer.getRole().disableSkill("first", 1)
      targetPlayer.getRole().disableSkill("second", 1)
    }
    this.disableSkill("first", 10000)
  }

  /**Bloqueia as habilidades do alvo por 1 turno */
  leadShot = (targetPlayer: Player) => {
    if (targetPlayer.getRole().getTeam() === "werewolves") {
      targetPlayer.getRole().disableSkill("first", 1)
      targetPlayer.getRole().disableSkill("second", 1)
    } else {
      targetPlayer.setDeath(0)
    }
    this.disableSkill("second", 10000)
  }
}
