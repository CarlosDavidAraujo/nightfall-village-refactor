import { Button } from "@/components/button/Button"
import { ImageBackground, View } from "react-native"
import { Stack, useRouter } from "expo-router"
import { Typography } from "@/components/typography/Typography"
//@ts-ignore
import splashImg from "../assets/images/splash.png"

export function Home() {
  const router = useRouter()

  const handleStartGame = () => {
    /*  @ts-ignore */
    router.push("/players")
  }

  return (
    <>
      <Stack.Screen options={{ header: () => null }} />
      <ImageBackground source={splashImg} className="flex-1">
        <View className="flex-1 flex-col justify-around items-center">
          <Typography variant="header" color="primary">
            Nightfall Village
          </Typography>
          <Button title="Iniciar novo jogo" onPress={handleStartGame} />
        </View>
      </ImageBackground>
    </>
  )
}
