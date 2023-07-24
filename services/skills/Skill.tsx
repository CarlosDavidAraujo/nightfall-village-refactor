export type SkillOrder = "first" | "second"
type SkillIcon = (props?: React.SVGProps<SVGSVGElement>) => JSX.Element

interface _Skill {
  name: string
  description: string
  icon: SkillIcon
  isTarget: boolean
  hasFeedback: boolean
  order: SkillOrder
  isDisabled: () => boolean
}

export class Skill implements _Skill {
  name: string
  description: string
  icon: SkillIcon
  isTarget: boolean
  hasFeedback: boolean
  order: SkillOrder
  isDisabled = () => false

  constructor(skill: _Skill) {
    this.name = skill.name
    this.description = skill.description
    this.icon = skill.icon
    this.isTarget = skill.isTarget
    this.hasFeedback = skill.hasFeedback
    this.order = skill.order
  }
}
