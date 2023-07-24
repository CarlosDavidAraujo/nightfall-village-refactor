import { Typography } from "@/components/typography/Typography"
import { Stack } from "expo-router"
import { View } from "react-native"
import { Button } from "@/components/button/Button"
import { TargetPlayers } from "../../components/containers/target-players"
import { useVotation } from "./useVotation"

export default function Votation() {
  const { state, game, handlePlayerVote, handleNavigation } = useVotation()
  return (
    <>
      <Stack.Screen options={{ headerTitle: "", headerBackVisible: false }} />
      <View className="flex-1 items-center py-2 bg-primary">
        <Typography variant="header">
          {game.getCurrentPlayer().getName()} vote em um jogador
        </Typography>

        <TargetPlayers
          selectedPlayer={state.selectedPlayer}
          setSelectedPlayer={state.setSelectedPlayer}
          currentPlayer={game.getCurrentPlayer()}
          players={game.getAlivePlayers()}
        />

        <View className="flex-row w-full px-2 gap-2 justify-between">
          <Button
            title="Abster-se"
            className="flex-1"
            onPress={handleNavigation}
          />
          <Button
            title="Confirmar"
            className="flex-1"
            inverted
            disabled={!state.selectedPlayer}
            onPress={handlePlayerVote}
          />
        </View>
      </View>
    </>
  )
}
