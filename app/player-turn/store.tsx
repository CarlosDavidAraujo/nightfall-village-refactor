import { Player } from "@/services/player/Player"
import { create } from "zustand"

type PlayerTurnStore = {
  feedbackMessage: string
  setFeedbackMessage: (message: string) => void
  selectedPlayer: Player | null
  setSelectedPlayer: (player: Player) => void
  showTargetPlayers: boolean
  setShowTargetPlayers: (value: boolean) => void
  selectedSkillOrder?: "first" | "second"
  setSelectedSkillOrder: (order: "first" | "second") => void
  getMostVotedPlayer: (players: Player[]) => Player | null
  resetPlayerTurnStore: () => void
}

const initialState = {
  feedbackMessage: "",
  selectedPlayer: null,
  showTargetPlayers: false,
  selectedSkillOrder: undefined,
}

export const usePlayerTurnStore = create<PlayerTurnStore>()((set) => ({
  ...initialState,
  setFeedbackMessage: (message) => set(() => ({ feedbackMessage: message })),
  setSelectedPlayer: (player) => set(() => ({ selectedPlayer: player })),
  setShowTargetPlayers: (value) => set(() => ({ showTargetPlayers: value })),
  setSelectedSkillOrder: (order) => set({ selectedSkillOrder: order }),
  getMostVotedPlayer: (players) => {
    let mostVotedPlayers: Player[] = []
    let maxCount = 0
    for (const player of players) {
      if (player.getVotes() > maxCount) {
        mostVotedPlayers = [player]
        maxCount = player.getVotes()
      } else if (player.getVotes() === maxCount && player.getVotes() !== 0) {
        mostVotedPlayers.push(player)
      }
    }
    return mostVotedPlayers[0]
  },
  resetPlayerTurnStore: () => set(initialState),
}))
