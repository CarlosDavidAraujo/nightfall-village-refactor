export type SkillOrder = "first" | "second"
type SkillIcon = (props?: React.SVGProps<SVGSVGElement>) => JSX.Element

export interface SkillProps {
  name: string
  description: string
  icon: SkillIcon
  isTarget: boolean
  isPassive: boolean
  interactWithDeadPlayers: boolean
  hasFeedback: boolean
  order: SkillOrder
  isDisabled: () => boolean
}

export class Skill implements SkillProps {
  name: string
  description: string
  icon: SkillIcon
  isTarget: boolean
  isPassive: boolean
  interactWithDeadPlayers: boolean
  hasFeedback: boolean
  order: SkillOrder
  isDisabled: () => boolean

  constructor(skill: SkillProps) {
    this.name = skill.name
    this.description = skill.description
    this.icon = skill.icon
    this.isTarget = skill.isTarget
    this.isPassive = skill.isPassive
    this.interactWithDeadPlayers = skill.interactWithDeadPlayers
    this.hasFeedback = skill.hasFeedback
    this.order = skill.order
    this.isDisabled = skill.isDisabled
  }
}

export type SkillsInfo = {
  first: SkillProps
  second: SkillProps
}

export type Skills = {
  first: Skill
  second: Skill
}
