import { create } from "zustand"

type PlayerStore = {
  players: string[]
  addPlayer: () => void
  removePlayer: (playerIndex: number) => void
  setPlayer: (playerName: string, playerIndex: number) => void
  resetStore: () => void
}

const initialState = {
  players: ["", "", "", "", ""],
}

export const usePlayerStore = create<PlayerStore>()((set) => ({
  ...initialState,
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
  resetStore: () => set(initialState),
}))
