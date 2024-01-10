import { SkillContainer } from "@/components/containers/skill-container"
import { Skill } from "@/services/skills/Skill"
import { TouchableOpacityProps } from "react-native"
import { TouchableOpacity } from "react-native"

interface SkillButtonProps extends TouchableOpacityProps {
  skill: Skill
}

export function SkillButton({ skill, ...rest }: SkillButtonProps) {
  const disabledStyle = skill.isDisabled() ? "opacity-70" : ""
  return (
    <TouchableOpacity
      className={`w-full ${disabledStyle}`}
      disabled={skill.isDisabled() || skill.isPassive}
      {...rest}
    >
      <SkillContainer skill={skill} />
    </TouchableOpacity>
  )
}
