import { Game } from "@/services/game/Game"
import { create } from "zustand"

type GameStore = {
  game: Game
  //setGame: (game: Game) => void
  resetGame: () => void
}

export const useGameStore = create<GameStore>()((set) => ({
  game: new Game(),
  //setGame: (game: Game) => set(() => ({ game: game })),
  resetGame: () => set(() => ({ game: new Game() })),
}))
