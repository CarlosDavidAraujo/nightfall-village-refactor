import { Button } from "@/components/button/Button"
import { Typography } from "@/components/typography/Typography"
import { Stack, useLocalSearchParams, useRouter } from "expo-router"
import { ScrollView, View } from "react-native"
import { useGameStore } from "../game-store"

export default function NightEndPage() {
  const router = useRouter()
  const game = useGameStore((state) => state.game)
  const resetGame = useGameStore((state) => state.resetGame)
  const winnerTeamMessage = game.getVictoryManager().getWinnerTeam()?.message
  const turnMessages = game?.getMessages()
  //@ts-ignore
  const { lastPage } = useLocalSearchParams()

  const handleNextPage = () => {
    game?.clearMessages()
    if (lastPage === "/votation") {
      //@ts-ignore
      return router.replace("/pass-to-player")
    }
    //@ts-ignore
    router.replace("/clock")
  }

  const handleRestartGame = () => {
    resetGame()
    //@ts-ignore
    router.push("/players")
  }

  return (
    <>
      <Stack.Screen options={{ headerTitle: "", headerBackVisible: false }} />
      <View className="flex-1 p-2 bg-primary">
        {winnerTeamMessage ? (
          <>
            <Typography variant="header">{winnerTeamMessage}</Typography>
            <ScrollView contentContainerStyle={{ marginTop: 30 }}>
              {game.getPlayers().map((player, index) => (
                <Typography key={index}>
                  {`${player.getName()}: ${player.getRole().getName()}`}
                </Typography>
              ))}
            </ScrollView>
            <Button
              className="w-full"
              title="Jogar novamente"
              onPress={handleRestartGame}
            />
          </>
        ) : (
          <>
            {turnMessages?.map((message, index) => (
              <Typography key={index} variant="title">
                {message}
              </Typography>
            ))}
            <Button
              className="w-full mt-auto"
              title={
                lastPage === "/votation" ? "Anoitecer" : "Iniciar discussão"
              }
              onPress={handleNextPage}
              inverted
            />
          </>
        )}
      </View>
    </>
  )
}
