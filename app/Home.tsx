import { Button } from "@/components/button/Button"
import { View } from "react-native"
import { Stack, useRouter } from "expo-router"
import { Typography } from "@/components/typography/Typography"

export function Home() {
  const router = useRouter()

  const handleStartGame = () => {
    /*  @ts-ignore */
    router.push("/players")
  }

  return (
    <>
      <Stack.Screen options={{ header: () => null }} />
      <View className="flex-1 flex-col bg-primary justify-around items-center">
        <Typography variant="header">Nightfall Village</Typography>
        <Button title="Jogar" onPress={handleStartGame} />
      </View>
    </>
  )
}
