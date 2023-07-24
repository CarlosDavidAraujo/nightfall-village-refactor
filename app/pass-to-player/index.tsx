import { Button } from "@/components/button/Button"
import { Typography } from "@/components/typography/Typography"
import { Stack, useLocalSearchParams, useRouter } from "expo-router"
import { View } from "react-native"
import { useGameStore } from "../game-store"

export default function PassToPlayer() {
  const router = useRouter()
  const game = useGameStore((state) => state.game)
  const playerName = game.getCurrentPlayer().getName()
  const params = useLocalSearchParams()
  // @ts-ignore
  const { lastPage } = params

  const handleNextPage = () => {
    if (lastPage === "/votation") {
      // @ts-ignore
      return router.replace(lastPage)
    }
    // @ts-ignore
    router.replace("/show-role")
  }

  return (
    <>
      <Stack.Screen options={{ headerTitle: "", headerBackVisible: false }} />
      <View className="flex-1 bg-primary justify-between items-center p-2">
        <View />
        <Typography variant="header">Passe para {playerName}</Typography>
        <Button
          title="Clique quando estiver pronto"
          className="w-full"
          onPress={handleNextPage}
        />
      </View>
    </>
  )
}
