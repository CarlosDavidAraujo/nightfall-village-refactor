import { View, TouchableOpacity } from "react-native"
import Icon from "@expo/vector-icons/FontAwesome"
import { usePlayerStore } from "./store"
import { CardDecoration } from "./card-decoration"

export function ButtonAddPlayer() {
  const addPlayer = usePlayerStore((state) => state.addPlayer)

  return (
    <TouchableOpacity
      onPress={addPlayer}
      className="bg-primary border-primary-foreground border-md relative aspect-[2/1]"
    >
      <CardDecoration tr tl br bl />
      <View className="flex-1 self-center p-2 justify-center">
        <Icon name="plus" size={50} className="self-center" />
      </View>
    </TouchableOpacity>
  )
}
