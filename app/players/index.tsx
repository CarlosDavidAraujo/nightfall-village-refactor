import { Stack, useRouter } from "expo-router"
import { View, ScrollView } from "react-native"
import { SimpleGrid } from "react-native-super-grid"
import { PlayerCard } from "./player-card"
import { ButtonAddPlayer } from "./button-add-player"
import { usePlayerStore } from "./store"
import { Button } from "@/components/button/Button"

export default function PlayersSelectionPage() {
  const players = usePlayerStore((state) => state.players)
  const router = useRouter()

  return (
    <>
      <Stack.Screen
        options={{ headerTitle: "Escreva os nomes do jogadores" }}
      />
      <View className="flex-1 bg-primary">
        <ScrollView>
          {/*  @ts-ignore */}
          <SimpleGrid
            maxItemsPerRow={3}
            itemDimension={130}
            data={[...players, "_add"]}
            renderItem={({ item, index }) => {
              if (item === "_add") {
                return <ButtonAddPlayer />
              }
              return <PlayerCard index={index} />
            }}
          />
        </ScrollView>
        <View className="p-2">
          <Button
            title="Confirmar"
            inverted
            /*  @ts-ignore */
            onPress={() => router.push("/roles")}
            disabled={players.some((player) => player === "")}
          />
        </View>
      </View>
    </>
  )
}
