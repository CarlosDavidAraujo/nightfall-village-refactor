import { Player } from "@/services/player/Player"
import { create } from "zustand"

type VotationStore = {
  selectedPlayer: Player | null
  setSelectedPlayer: (player: Player) => void
  clearSelectedPlayer: () => void
  getMostVotedPlayer: (players: Player[]) => Player | null
}

export const useVotationStore = create<VotationStore>()((set) => ({
  selectedPlayer: null,
  setSelectedPlayer: (player: Player) =>
    set(() => ({ selectedPlayer: player })),
  clearSelectedPlayer: () => set(() => ({ selectedPlayer: null })),
  getMostVotedPlayer: (players: Player[]) => {
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
    if (mostVotedPlayers.length === 1) {
      return mostVotedPlayers[0]
    }
    return null
  },
}))
