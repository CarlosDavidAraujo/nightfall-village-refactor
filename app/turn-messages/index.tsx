import { Button } from "@/components/button/Button"
import { Typography } from "@/components/typography/Typography"
import { Stack, useLocalSearchParams, useRouter } from "expo-router"
import { View } from "react-native"
import { useGameStore } from "../game-store"

export default function NightEndPage() {
  const router = useRouter()
  const game = useGameStore((state) => state.game)

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

  return (
    <>
      <Stack.Screen options={{ headerTitle: "", headerBackVisible: false }} />
      <View className="flex-1 items-center p-2 bg-primary">
        {turnMessages?.map((message) => (
          <Typography variant="header">{message}</Typography>
        ))}

        <View className="w-full mt-auto">
          <Button
            title={lastPage === "/votation" ? "Anoitecer" : "Iniciar discussão"}
            onPress={handleNextPage}
            inverted
          />
        </View>
      </View>
    </>
  )
}
