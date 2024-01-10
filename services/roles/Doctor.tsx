import { Role } from "./Role"
import { Skill, SkillOrder, SkillsInfo } from "../skills/Skill"
/*  @ts-ignore */
import img from "../../assets/images/doctor.png"
import { Game } from "../game/Game"
import { Player } from "../player/Player"
import { IconRemedy } from "@/components/icons/remedy"
import { IconLifeSupport } from "@/components/icons/life-support"

type DoctorHeal = {
  player?: Player
  turn: number
}

export class Doctor extends Role {
  static _name = "Médica"
  static description = "Seu objetivo é manter os aldeões vivos."
  static portrait = img
  static skillsInfo: SkillsInfo = {
    first: {
      name: "Primeiros socorros",
      description:
        "Impede um jogador de morrer esta noite. Não pode selecionar o mesmo alvo em turnos seguidos.",
      icon: (props) => <IconRemedy {...props} />,
      isTarget: true,
      isPassive: false,
      interactWithDeadPlayers: false,
      hasFeedback: false,
      order: "first",
      isDisabled: () => false,
    },
    second: {
      name: "Reanimar",
      description:
        "Uma vez por jogo você pode ressuscitar um jogador eliminado.",
      icon: (props) => <IconLifeSupport {...props} />,
      isTarget: true,
      isPassive: false,
      interactWithDeadPlayers: true,
      hasFeedback: false,
      order: "second",
      isDisabled: () => false,
    },
  }

  private lastHeal: DoctorHeal = {
    player: undefined,
    turn: -1,
  }

  constructor(game: Game) {
    super({
      game: game,
      name: Doctor._name,
      team: "villagers",
      description: Doctor.description,
      portrait: Doctor.portrait,
      skills: {
        first: new Skill({
          ...Doctor.skillsInfo.first,
          isDisabled: () => this.isSkillDisabled("first"),
        }),
        second: new Skill({
          ...Doctor.skillsInfo.second,
          isDisabled: () =>
            this.isSkillDisabled("second") ||
            this.game.getDeadPlayers().length === 0,
        }),
      },
    })
  }

  protect = (targetPlayer: Player) => {
    targetPlayer.preventDeath()
    this.lastHeal.player = targetPlayer
    this.lastHeal.turn = this.game.getCurrentTurn()
  }

  reanimate = (targetPlayer: Player) => {
    targetPlayer.setRessurrect(0)
    this.disableSkill("second", 10000)
  }

  hasInvalidTargetOn = (targetPlayer: Player, chosenSkill?: SkillOrder) => {
    const isTargetTheSame =
      targetPlayer.getId() === this.lastHeal.player?.getId()
    const isConsecutiveTurn =
      this.game.getCurrentTurn() === this.lastHeal.turn + 1
    return isTargetTheSame && isConsecutiveTurn && chosenSkill === "first"
  }
}
