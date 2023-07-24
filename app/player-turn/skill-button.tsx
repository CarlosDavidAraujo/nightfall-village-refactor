import { Typography } from "@/components/typography/Typography"
import { Skill } from "@/services/roles/Role"
import { TouchableOpacityProps } from "react-native"
import { TouchableOpacity, View } from "react-native"

interface SkillButtonProps extends TouchableOpacityProps {
  skill: Skill
}

export function SkillButton({ skill, ...rest }: SkillButtonProps) {
  const Icon = skill.icon
  return (
    <TouchableOpacity
      className="mt-4 w-full p-2 rounded border-sm border-primary-foreground"
      {...rest}
    >
      <View className="flex-row items-center justify-between px-2 py-1 bg-primary-foreground rounded">
        <Typography color="primary">{skill.name}</Typography>
        <Icon className="w-6 h-6 fill-primary" />
      </View>
      <Typography variant="small" align="justify">
        {skill.description}
      </Typography>
    </TouchableOpacity>
  )
}
