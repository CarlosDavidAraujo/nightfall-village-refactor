import { Role } from "@/services/roles/Role"
import { Seer } from "@/services/roles/Seer"
import { Villager } from "@/services/roles/Villager"
import { Werewolf } from "@/services/roles/Werewolf"
import { create } from "zustand"

export type RoleProps = {
  name?: string
  count: number
  roleType: typeof Role
}

type RoleStore = {
  selectedRoles: RoleProps[]
  nonSelectedRoles: RoleProps[]
  modalRole: RoleProps | null
  setModalRole: (roleType: typeof Role) => void
  clearModalRole: () => void
  increaseCount: (roleIndex: number) => void
  decreaseCount: (roleIndex: number) => void
  addToSelectedRoles: (roleIndex: number) => void
}

export const useRoleStore = create<RoleStore>((set) => ({
  selectedRoles: [
    { roleType: Villager, count: 3 },
    { roleType: Seer, count: 1 },
    { roleType: Werewolf, count: 1 },
  ],
  nonSelectedRoles: [],
  modalRole: null,

  setModalRole: (roleType: typeof Role) =>
    set((state) => {
      const modalRole =
        state.selectedRoles.find(
          (role) => role.roleType.name === roleType.name
        ) ||
        state.nonSelectedRoles.find(
          (role) => role.roleType.name === roleType.name
        )
      return { modalRole }
    }),

  clearModalRole: () => set(() => ({ modalRole: null })),

  increaseCount: (roleIndex: number) =>
    set((state) => {
      const { selectedRoles } = state
      const updatedSelectedRoles = [...selectedRoles]
      updatedSelectedRoles[roleIndex] = {
        ...selectedRoles[roleIndex],
        count: selectedRoles[roleIndex].count + 1,
      }
      return { selectedRoles: updatedSelectedRoles }
    }),

  decreaseCount: (roleIndex: number) =>
    set((state) => {
      const { selectedRoles, nonSelectedRoles } = state
      const updatedSelectedRoles = [...selectedRoles]
      const updatedNonSelectedRoles = [...nonSelectedRoles]
      updatedSelectedRoles[roleIndex] = {
        ...selectedRoles[roleIndex],
        count: selectedRoles[roleIndex].count - 1,
      }
      if (updatedSelectedRoles[roleIndex].count <= 0) {
        updatedNonSelectedRoles.push(selectedRoles[roleIndex])
        updatedSelectedRoles.splice(roleIndex, 1)
      }
      return {
        selectedRoles: updatedSelectedRoles,
        nonSelectedRoles: updatedNonSelectedRoles,
      }
    }),

  addToSelectedRoles: (roleIndex: number) =>
    set((state) => {
      const updatedNonSelectedRoles = [...state.nonSelectedRoles]
      const updatedSelectedRoles = [...state.selectedRoles]
      const role = state.nonSelectedRoles[roleIndex]
      updatedNonSelectedRoles.splice(roleIndex, 1)
      updatedSelectedRoles.push(role)
      return {
        nonSelectedRoles: updatedNonSelectedRoles,
        selectedRoles: updatedSelectedRoles,
      }
    }),
}))
