import { Image, View } from "react-native"
import { useRoleStore } from "./store"
import { Typography } from "@/components/typography/Typography"
import { SkillProps } from "@/services/skills/Skill"

export function RoleModalContent() {
  const modalRole = useRoleStore((state) => state.modalRole)

  return (
    <View className="flex-1 items-center p-2 bg-primary">
      {/*  @ts-ignore */}
      <Typography variant="header">{modalRole?.roleType._name}</Typography>
      <View className="my-4 p-2 border-md border-dashed border-primary-foreground">
        {/*  @ts-ignore */}
        <Image source={modalRole?.roleType.portrait} className="w-60 h-60" />
      </View>
      {/*  @ts-ignore */}
      <Typography>{modalRole?.roleType.description}</Typography>
      {/*  @ts-ignore */}
      <SkillContainer skill={modalRole?.roleType.skillsInfo["first"]} />
      {/*  @ts-ignore */}
      <SkillContainer skill={modalRole?.roleType.skillsInfo["second"]} />
    </View>
  )
}

function SkillContainer({ skill }: { skill: SkillProps }) {
  const Icon = skill?.icon
  return (
    <View className="mt-4 w-full p-2 border-sm rounded">
      <View className="flex-row items-center justify-between px-2 py-1 bg-primary-foreground rounded">
        <Typography color="primary">{skill?.name}</Typography>
        {Icon && <Icon className="fill-primary w-6 h-6" />}
      </View>

      <Typography variant="small" align="justify">
        {skill?.description}
      </Typography>
    </View>
  )
}
