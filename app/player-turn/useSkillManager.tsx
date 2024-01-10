import { Role } from "@/services/roles/Role"
import { Seer } from "@/services/roles/Seer"
import { Villager } from "@/services/roles/Villager"
import { usePlayerTurnStore } from "./store"
import { Werewolf } from "@/services/roles/Werewolf"
import { Templar } from "@/services/roles/Templar"
import { Hunter } from "@/services/roles/Hunter"
import { Doctor } from "@/services/roles/Doctor"
import { Gunslinger } from "@/services/roles/Gunslinger"
import { Witch } from "@/services/roles/Witch"
import { Priest } from "@/services/roles/Priest"
import { ToughGuy } from "@/services/roles/ToughGuy"
import { Assassin } from "@/services/roles/Assassin"
import { first } from "lodash"

type roleSkills = {
  first: (role: any) => void
  second: (role: any) => void
}

export const useSkillManager = (role: Role) => {
  const selectedPlayer = usePlayerTurnStore((state) => state.selectedPlayer)
  const setFeedbackMessage = usePlayerTurnStore(
    (state) => state.setFeedbackMessage
  )

  const roles: Record<string, roleSkills> = {
    Villager: {
      first: (role: Villager) => role.pray(selectedPlayer!),
      second: (role: Villager) => setFeedbackMessage(role.snoop()),
    },
    Seer: {
      first: (role: Seer) =>
        setFeedbackMessage(role.useVision(selectedPlayer!)),
      second: (role: Seer) =>
        setFeedbackMessage(role.useVision(selectedPlayer!)),
    },
    Werewolf: {
      first: (role: Werewolf) => {
        role.eat(selectedPlayer!)
      },
      second: (role: Werewolf) => role.transmute(),
    },
    Templar: {
      first: (role: Templar) => role.sacrifice(selectedPlayer!),
      second: (role: Templar) => role.judge(selectedPlayer!),
    },
    Hunter: {
      first: (role: Hunter) => role.silverShot(selectedPlayer!),
      second: (role: Hunter) => role.leadShot(selectedPlayer!),
    },
    Doctor: {
      first: (role: Doctor) => role.protect(selectedPlayer!),
      second: (role: Doctor) => role.reanimate(selectedPlayer!),
    },
    Gunslinger: {
      first: (role: Gunslinger) => role.shot(selectedPlayer!),
      second: () => null,
    },
    Witch: {
      first: (role: Witch) => role.protect(selectedPlayer!),
      second: (role: Witch) => role.poison(selectedPlayer!),
    },
    Priest: {
      first: (role: Priest) => role.useHolyWater(selectedPlayer!),
      second: () => null,
    },
    ToughGuy: {
      first: (role: ToughGuy) => role.taunt(),
      second: () => null,
    },
    Assassin: {
      first: (role: Assassin) => role.kill(selectedPlayer!),
      second: (role: Assassin) => role.kidnap(selectedPlayer!),
    },
  }
  const roleName = role.constructor.name
  return roles[roleName]
}
