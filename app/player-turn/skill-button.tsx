import { Typography } from "@/components/typography/Typography"
import { Skill } from "@/services/skills/Skill"
import { TouchableOpacityProps } from "react-native"
import { TouchableOpacity, View } from "react-native"

interface SkillButtonProps extends TouchableOpacityProps {
  skill: Skill
}

export function SkillButton({ skill, ...rest }: SkillButtonProps) {
  const Icon = skill.icon
  const disabledStyle = skill.isDisabled() ? "opacity-70" : ""

  return (
    <TouchableOpacity
      className={`mt-4 w-full rounded border-sm border-primary-foreground ${disabledStyle}`}
      disabled={skill.isDisabled()}
      {...rest}
    >
      <View className="flex-row px-2 py-1 items-center justify-between bg-primary-foreground">
        <Typography color="primary">{skill.name}</Typography>
        <Icon className="w-6 h-6 fill-primary" />
      </View>
      <View className="p-2">
        <Typography variant="small" align="justify">
          {skill.description}
        </Typography>
      </View>
    </TouchableOpacity>
  )
}
