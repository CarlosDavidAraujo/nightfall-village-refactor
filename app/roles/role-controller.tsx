import Icon from "@expo/vector-icons/FontAwesome"
import { View } from "react-native"
import { useRoleStore } from "./store"
import { RoleCardProps } from "./role-card"
import { Typography } from "@/components/typography/Typography"

export function RoleController({ role, index }: RoleCardProps) {
  const increaseCount = useRoleStore((state) => state.increaseCount)
  const descreaseCount = useRoleStore((state) => state.decreaseCount)

  return (
    <View className="flex flex-row justify-evenly w-full">
      <Icon name="minus" size={25} onPress={() => descreaseCount(index)} />
      <Typography>{role.count}</Typography>
      <Icon name="plus" size={25} onPress={() => increaseCount(index)} />
    </View>
  )
}
