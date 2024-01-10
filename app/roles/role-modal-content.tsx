import { Image, View } from "react-native"
import { useRoleStore } from "./store"
import { Typography } from "@/components/typography/Typography"
import { SkillContainer } from "@/components/containers/skill-container"

export function RoleModalContent() {
  const modalRole = useRoleStore((state) => state.modalRole)

  return (
    <View className="flex-1 items-center p-2 bg-primary">
      {modalRole && (
        <>
          {/* @ts-ignore */}
          <Typography variant="header">{modalRole.roleType._name}</Typography>
          <View className="my-2 p-2">
            <Image
              //@ts-ignore
              source={modalRole.roleType.portrait}
              className="w-60 h-60"
            />
          </View>
          {/* @ts-ignore */}
          <Typography>{modalRole.roleType.description}</Typography>
          <SkillContainer
            /* @ts-ignore */
            skill={modalRole.roleType.skillsInfo["first"]}
            className="mt-4"
          />
          <SkillContainer
            /* @ts-ignore */
            skill={modalRole.roleType.skillsInfo["second"]}
            className="mt-4"
          />
        </>
      )}
    </View>
  )
}
