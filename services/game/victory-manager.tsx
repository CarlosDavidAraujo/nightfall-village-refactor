import { Game } from "./Game"

interface WinCondition {
  team: string
  message: string
  isConditionMet: () => boolean
}

export class VictoryManager {
  private game: Game
  private winConditions: WinCondition[]

  constructor(game: Game) {
    this.game = game
    this.winConditions = [
      {
        team: "villaggers",
        message: "Os aldeões venceram",
        isConditionMet: () =>
          this.game
            .getAlivePlayers()
            .every((player) => player.getRole().getTeam() === "villagers"),
      },
      {
        team: "werewolves",
        message: "Os lobisonmens venceram",
        isConditionMet: () =>
          this.game
            .getAlivePlayers()
            .every((player) => player.getRole().getTeam() === "werewolves"),
      },
    ]
  }

  getWinnerTeam = () => {
    for (const team of this.winConditions) {
      if (team.isConditionMet()) {
        return team
      }
    }
    return null
  }
}
