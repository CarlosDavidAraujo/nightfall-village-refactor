import { useRouter } from "expo-router"
import { useGameStore } from "../game-store"
import { useSkillManager } from "./useSkillManager"
import { usePlayerTurnStore } from "./store"

export const usePlayerTurn = () => {
  const router = useRouter()
  const game = useGameStore((state) => state.game)
  const role = game.getCurrentPlayer().getRole()
  const useSkill = useSkillManager(role)
  const state = usePlayerTurnStore()

  //-----------------Funções principais----------------//
  const handleSkillUse = (skillOrder: "first" | "second") => {
    useSkill[skillOrder](role)
    state.setShowTargetPlayers(false)
    if (!role.getSkill(skillOrder).hasFeedback) {
      handlePassToNextPlayer()
    }
  }

  const handleSkillChoice = (skillOrder: "first" | "second") => {
    state.setSelectedSkillOrder(skillOrder)
    const skill = role.getSkill(skillOrder)
    if (skill.isTarget) {
      if (skill.interactWithDeadPlayers) {
        state.setUseDeadPlayers(true)
      }
      return state.setShowTargetPlayers(true)
    }
    handleSkillUse(skillOrder)
  }

  const handlePassToNextPlayer = () => {
    game.goToNextPlayer()
    game.clearMessages()
    state.resetPlayerTurnStore()
    if (game.noNextPlayer()) {
      return endNight()
    }
    //@ts-ignore
    router.replace({ pathname: "pass-to-player", params: "" })
  }

  //--------Funções auxiliares--------//
  const endNight = () => {
    const mostVotedPlayer = state.getMostVotedPlayer(game.getAlivePlayers())
    if (mostVotedPlayer) {
      mostVotedPlayer.setDeathMark(0)
    }
    game.endNight()
    //@ts-ignore
    router.replace({ pathname: "turn-messages", params: "" })
  }

  return {
    game,
    role,
    state,
    handleSkillUse,
    handleSkillChoice,
    handlePassToNextPlayer,
  }
}
