import { Skill, SkillProps } from "@/services/skills/Skill"
import { View, ViewProps } from "react-native"
import { Typography } from "../typography/Typography"

interface SkillContainerProps extends ViewProps {
  skill: Skill | SkillProps
}

export function SkillContainer({
  skill,
  className,
  ...rest
}: SkillContainerProps) {
  const Icon = skill.icon
  return (
    <View
      className={
        "w-full border-sm border-primary-foreground rounded " + className
      }
      {...rest}
    >
      <View className="flex-row px-2 py-1 items-center justify-between bg-primary-foreground">
        <Typography color="primary">
          {skill.name} {skill.isPassive && "- Passivo"}
        </Typography>
        <Icon className="w-6 h-6 fill-primary" />
      </View>
      <View className="p-2">
        <Typography variant="small" align="justify">
          {skill.description}
        </Typography>
      </View>
    </View>
  )
}
