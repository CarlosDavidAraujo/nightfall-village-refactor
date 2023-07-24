import { Role } from "@/services/roles/Role"
import { Seer } from "@/services/roles/Seer"
import { Villager } from "@/services/roles/Villager"
import { usePlayerTurnStore } from "./store"
import { Werewolf } from "@/services/roles/Werewolf"

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
      second: (role: Villager) => {
        const discoveredWerewolf = role.snoop()
        if (discoveredWerewolf) {
          setFeedbackMessage(
            `${discoveredWerewolf.getName()} é um(a) lobisomem entre nós`
          )
        }
      },
    },
    Seer: {
      first: (role: Seer) =>
        setFeedbackMessage(role.useVision(selectedPlayer!)),
      second: (role: Seer) => console.log("visao postuma"),
    },
    Werewolf: {
      first: (role: Werewolf) => {
        role.eat(selectedPlayer!)
      },
      second: (role: Werewolf) => console.log("transmutar"),
    },
  }
  const roleName = role.constructor.name
  return roles[roleName]
}
