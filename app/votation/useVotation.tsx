import { useRouter } from "expo-router"
import { useGameStore } from "../game-store"
import { useVotationStore } from "./store"

export const useVotation = () => {
  const router = useRouter()
  const game = useGameStore((state) => state.game)
  const state = useVotationStore()

  //-----------------Main functions--------------------//
  const handlePlayerVote = () => {
    state.selectedPlayer?.increaseVotesCount()
    handleNavigation()
  }

  const handleNavigation = () => {
    state.clearSelectedPlayer()
    game.goToNextPlayer()
    if (game.noNextPlayer()) {
      const mostVotedPlayer = state.getMostVotedPlayer(game.getAlivePlayers())
      if (mostVotedPlayer) {
        mostVotedPlayer.setDeath(0)
      }
      game.endDay()
      return navigateToTurnMessages()
    }
    navigateToNextPlayer()
  }

  //----------------Aux functions-----------------//

  const navigateToNextPlayer = () => {
    //@ts-ignore
    router.replace({
      pathname: "/pass-to-player",
      params: { lastPage: "/votation" },
    })
  }

  const navigateToTurnMessages = () => {
    //@ts-ignore
    router.replace({
      pathname: "/turn-messages",
      params: { lastPage: "/votation" },
    })
  }

  return { state, game, handlePlayerVote, handleNavigation }
}
