import { Image, TouchableOpacity, View } from "react-native"
import Icon from "@expo/vector-icons/FontAwesome"
import { RoleController } from "./role-controller"
import { RoleProps, useRoleStore } from "./store"
import { Typography } from "@/components/typography/Typography"

export type RoleCardProps = {
  role: RoleProps
  index: number
}

export function RoleCard({ role, index }: RoleCardProps) {
  const setModalRole = useRoleStore((state) => state.setModalRole)
  const selectedRoles = useRoleStore((state) => state.selectedRoles)
  const addToSelectedRoles = useRoleStore((state) => state.addToSelectedRoles)
  const isSelected = selectedRoles.includes(role)
  return (
    <View className="relative items-center justify-evenly rounded border-md p-2 border-primary-foreground">
      <TouchableOpacity
        className="p-1 border-sm border-dashed border-primary-foreground"
        onPress={() => setModalRole(role.roleType)}
      >
        {/*  @ts-ignore */}
        <Image source={role.roleType.portrait} className="w-20 h-20  " />
      </TouchableOpacity>
      {/*  @ts-ignore */}
      <Typography>{role.roleType._name}</Typography>
      {isSelected ? (
        <RoleController role={role} index={index} />
      ) : (
        <Icon
          name="plus-circle"
          size={30}
          onPress={() => addToSelectedRoles(index)}
        />
      )}
    </View>
  )
}
