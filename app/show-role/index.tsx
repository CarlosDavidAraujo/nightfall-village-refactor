import { Button } from "@/components/button/Button"
import { Typography } from "@/components/typography/Typography"
import { Stack, useRouter } from "expo-router"
import { View } from "react-native"
import { useGameStore } from "../game-store"

export default function ShowPlayerRolePage() {
  const router = useRouter()
  const game = useGameStore((state) => state.game)
  const playerName = game.getCurrentPlayer().getName()
  return (
    <>
      <Stack.Screen options={{ headerTitle: "", headerBackVisible: false }} />
      <View className="flex-1 bg-primary justify-between items-center p-2">
        <View />
        <Typography variant="header">{playerName}</Typography>
        <Button
          title="Mostrar função"
          className="w-full"
          /*  @ts-ignore */
          onPress={() => router.replace("/player-turn")}
        />
      </View>
    </>
  )
}
