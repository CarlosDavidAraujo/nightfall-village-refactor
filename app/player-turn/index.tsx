import { Typography } from "@/components/typography/Typography"
import { Stack } from "expo-router"
import { Image } from "react-native"
import { View } from "react-native"
import { Button } from "@/components/button/Button"
import { SkillButton } from "./skill-button"
import { TargetPlayers } from "@/components/containers/target-players"
import { usePlayerTurn } from "./usePlayerTurn"

export default function PlayerTurnPage() {
  const {
    state,
    game,
    role,
    handlePassToNextPlayer,
    handleSkillChoice,
    handleSkillUse,
  } = usePlayerTurn()

  return (
    <>
      <Stack.Screen options={{ headerTitle: "", headerBackVisible: false }} />
      <View className="flex-1 bg-primary items-center p-2">
        {/*  @ts-ignore */}
        <Typography variant="header">{role.getName()}</Typography>
        <Image source={role.getPortrait()} className="my-4 w-60 h-60" />

        {!state.selectedSkillOrder && (
          <>
            <Typography variant="title">Selecione uma habilidade</Typography>
            <SkillButton
              skill={role.getSkill("first")}
              onPress={() => handleSkillChoice("first")}
            />
            <SkillButton
              skill={role.getSkill("second")}
              onPress={() => handleSkillChoice("second")}
            />
          </>
        )}

        {state.showTargetPlayers && (
          <TargetPlayers
            players={
              state.useDeadPlayers
                ? game.getDeadPlayers()
                : game.getAlivePlayers()
            }
            currentPlayer={game.getCurrentPlayer()}
            selectedPlayer={state.selectedPlayer}
            setSelectedPlayer={state.setSelectedPlayer}
          />
        )}

        {state.feedbackMessage && (
          <Typography>{state.feedbackMessage}</Typography>
        )}

        <View className="w-full mt-auto">
          {state.showTargetPlayers &&
          state.selectedPlayer &&
          !state.feedbackMessage ? (
            <Button
              title="Confirmar"
              onPress={() => handleSkillUse(state.selectedSkillOrder!)}
            />
          ) : (
            <Button title="Passar" onPress={handlePassToNextPlayer} />
          )}
        </View>
      </View>
    </>
  )
}
