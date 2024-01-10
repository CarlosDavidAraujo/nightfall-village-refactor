import { IconFeather } from "@/components/icons/feather"
import { View, TouchableOpacity, TextInput } from "react-native"
import Icon from "@expo/vector-icons/Entypo"
import { usePlayerStore } from "./store"
import { CardDecoration } from "./card-decoration"

export function PlayerCard({ index }: { index: number }) {
  const removePlayer = usePlayerStore((state) => state.removePlayer)
  const setPlayer = usePlayerStore((state) => state.setPlayer)
  const players = usePlayerStore((state) => state.players)

  return (
    <View className="bg-primary border-primary-foreground border-md relative aspect-[2/1]">
      <CardDecoration tl bl br />
      <View className="absolute top-0 right-0">
        <Icon
          name="squared-cross"
          size={20}
          onPress={() => removePlayer(index)}
        />
      </View>
      <View className="flex-1 items-center p-2 ">
        <IconFeather className="fill-primary-foreground w-10 aspect-square" />
        <TextInput
          value={players[index]}
          className="border-b-1 border-primary-foreground text-center text-lg"
          style={{ fontFamily: "Balthazar_400Regular" }}
          placeholder="Digite um nome"
          onChangeText={(text) => setPlayer(text, index)}
        />
      </View>
    </View>
  )
}
