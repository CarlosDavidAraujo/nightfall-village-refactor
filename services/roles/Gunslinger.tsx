import { Role } from "./Role"
import { Skill, SkillsInfo } from "../skills/Skill"
/*  @ts-ignore */
import img from "../../assets/images/gunslinger.png"
import { Game } from "../game/Game"
import { Player } from "../player/Player"
import { IconCrossedPistols } from "@/components/icons/crossed-pistols"
import { IconGunshot } from "@/components/icons/gunshot"

export class Gunslinger extends Role {
  static _name = "Pistoleiro"
  static description =
    "Seu objetivo é ajudar os aldeões eliminando os lobisomens."
  static portrait = img
  static skillsInfo: SkillsInfo = {
    first: {
      name: "Atirar",
      description: "Duas vezes por jogo você pode eliminar um jogador.",
      icon: (props) => <IconGunshot {...props} />,
      isTarget: true,
      isPassive: false,
      interactWithDeadPlayers: false,
      hasFeedback: false,
      order: "first",
      isDisabled: () => false,
    },
    second: {
      name: "Indiscreto",
      description: `Seus tiros são barulhentos e sua função será revelada após o primeiro tiro.`,
      icon: (props) => <IconCrossedPistols {...props} />,
      isPassive: true,
      isTarget: false,
      interactWithDeadPlayers: false,
      hasFeedback: false,
      order: "second",
      isDisabled: () => false,
    },
  }

  private bulletCount = 2

  constructor(game: Game) {
    super({
      game: game,
      name: Gunslinger._name,
      team: "villagers",
      description: Gunslinger.description,
      portrait: Gunslinger.portrait,
      skills: {
        first: new Skill({
          ...Gunslinger.skillsInfo.first,
          isDisabled: () => this.isSkillDisabled("first"),
        }),
        second: new Skill({
          ...Gunslinger.skillsInfo.second,
        }),
      },
    })
  }

  /**Elimina um jogador */
  shot = (targetPlayer: Player) => {
    targetPlayer.setDeath(0)
    this.bulletCount--
    if (this.bulletCount === 0) {
      this.disableSkill("first", 10000)
    }
    if (this.bulletCount === 1) {
      this.game.addMessage(`${this.player?.getName()} é um pistoleiro!`)
    }
  }
}
