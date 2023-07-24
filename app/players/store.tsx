import { create } from "zustand"

type PlayerStore = {
  players: string[]
  addPlayer: () => void
  removePlayer: (playerIndex: number) => void
  setPlayer: (playerName: string, playerIndex: number) => void
}

export const usePlayerStore = create<PlayerStore>()((set) => ({
  players: ["", "", "", "", ""],
  addPlayer: () => set((state) => ({ players: [...state.players, ""] })),
  removePlayer: (playerIndex: number) =>
    set((state) => ({
      players: state.players.filter((_, index) => playerIndex !== index),
    })),
  setPlayer: (playerName: string, playerIndex: number) =>
    set((state) => {
      const updatedPlayers = [...state.players]
      updatedPlayers[playerIndex] = playerName
      return { players: updatedPlayers }
    }),
}))
