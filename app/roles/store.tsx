import { Game } from "@/services/game/Game"
import { Assassin } from "@/services/roles/Assassin"
import { Doctor } from "@/services/roles/Doctor"
import { Gunslinger } from "@/services/roles/Gunslinger"
import { Hunter } from "@/services/roles/Hunter"
import { Priest } from "@/services/roles/Priest"
import { Role } from "@/services/roles/Role"
import { Seer } from "@/services/roles/Seer"
import { Templar } from "@/services/roles/Templar"
import { ToughGuy } from "@/services/roles/ToughGuy"
import { Villager } from "@/services/roles/Villager"
import { Werewolf } from "@/services/roles/Werewolf"
import { Witch } from "@/services/roles/Witch"
import { create } from "zustand"

interface RoleConstructor {
  new (game: Game): Role
}

export type RoleProps = {
  name?: string
  count: number
  roleType: RoleConstructor
}

type RoleStoreInitialState = {
  selectedRoles: RoleProps[]
  nonSelectedRoles: RoleProps[]
  modalRole: RoleProps | null
}

type RoleStore = {
  selectedRoles: RoleProps[]
  nonSelectedRoles: RoleProps[]
  modalRole: RoleProps | null
  setModalRole: (roleType: RoleConstructor) => void
  clearModalRole: () => void
  increaseCount: (roleIndex: number) => void
  decreaseCount: (roleIndex: number) => void
  addToSelectedRoles: (roleIndex: number) => void
  resetStore: () => void
}

const initialState: RoleStoreInitialState = {
  selectedRoles: [
    { roleType: Villager, count: 3 },
    { roleType: Seer, count: 1 },
    { roleType: Werewolf, count: 1 },
  ],
  nonSelectedRoles: [
    { roleType: Templar, count: 1 },
    { roleType: Hunter, count: 1 },
    { roleType: Doctor, count: 1 },
    { roleType: Gunslinger, count: 1 },
    { roleType: Witch, count: 1 },
    { roleType: Priest, count: 1 },
    { roleType: ToughGuy, count: 1 },
    { roleType: Assassin, count: 1 },
  ],
  modalRole: null,
}

export const useRoleStore = create<RoleStore>((set) => ({
  ...initialState,

  setModalRole: (roleType) =>
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

  increaseCount: (roleIndex) =>
    set((state) => {
      const { selectedRoles } = state
      const updatedSelectedRoles = [...selectedRoles]
      updatedSelectedRoles[roleIndex] = {
        ...selectedRoles[roleIndex],
        count: selectedRoles[roleIndex].count + 1,
      }
      return { selectedRoles: updatedSelectedRoles }
    }),

  decreaseCount: (roleIndex) =>
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

  addToSelectedRoles: (roleIndex) =>
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

  resetStore: () => set(initialState),
}))
