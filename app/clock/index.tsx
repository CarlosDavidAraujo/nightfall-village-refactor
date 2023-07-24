import { Typography } from "@/components/typography/Typography"
import { Stack, useRouter } from "expo-router"
import { View } from "react-native"
import { Clock } from "./clock"
import { Button } from "@/components/button/Button"

export default function ClockPage() {
  const router = useRouter()
  return (
    <>
      <Stack.Screen options={{ headerTitle: "", headerBackVisible: false }} />
      <View className="flex-1 items-center justify-between p-2 bg-primary">
        <Typography variant="header">Tempo para discussão</Typography>
        <Clock />
        <View className="w-full">
          <Button
            title="Iniciar votação"
            inverted
            onPress={() =>
              router.replace({ pathname: "/votation", params: "" })
            }
          />
        </View>
      </View>
    </>
  )
}
