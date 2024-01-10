import { Stack, useRouter } from "expo-router"
import { ScrollView, View } from "react-native"
import { SimpleGrid } from "react-native-super-grid"
import { RoleCard } from "./role-card"
import { useRoleStore } from "./store"
import { Button } from "@/components/button/Button"
import { CustomModal } from "@/components/modal"
import { RoleModalContent } from "./role-modal-content"
import { usePlayerStore } from "../players/store"
import { Player } from "@/services/player/Player"
import { useGameStore } from "../game-store"
import { Typography } from "@/components/typography/Typography"
import { shuffle } from "lodash"
import { Role } from "@/services/roles/Role"

export default function RoleSelectionPage() {
  const router = useRouter()
  const game = useGameStore((state) => state.game)
  const playersNames = usePlayerStore((state) => state.players)
  const selectedRoles = useRoleStore((state) => state.selectedRoles)
  const nonSelectedRoles = useRoleStore((state) => state.nonSelectedRoles)
  const modalRole = useRoleStore((state) => state.modalRole)
  const clearModalRole = useRoleStore((state) => state.clearModalRole)

  const selectedRolesCount = () =>
    selectedRoles.reduce((sum, role) => {
      return sum + role.count
    }, 0)

  const linkPlayersToRoles = () => {
    const roles: Role[] = []
    const players: Player[] = []

    selectedRoles.forEach((role) => {
      const especializedRoles = Array.from(
        { length: role.count },
        //@ts-ignore
        () => new role.roleType(game)
      )
      roles.push(...especializedRoles)
    })
    const shuffledRoles = shuffle(roles)

    playersNames.forEach((playerName, index) => {
      const player = new Player(index, playerName, shuffledRoles[index], game)
      shuffledRoles[index].setPlayer(player)
      players.push(player)
    })

    return players
  }

  const handleStartGame = () => {
    const players = linkPlayersToRoles()
    game.setPlayers(players)
    // @ts-ignore
    router.push("/pass-to-player")
  }

  return (
    <>
      <Stack.Screen options={{ headerTitle: "Selecione os papéis" }} />

      <View className="flex-1 bg-primary">
        <ScrollView>
          <View className="px-2">
            <Typography variant="title">
              Selecionados {`${selectedRolesCount()}/${playersNames.length}`}
            </Typography>
          </View>

          {/*  @ts-ignore */}
          <SimpleGrid
            maxItemsPerRow={3}
            itemDimension={120}
            data={selectedRoles}
            renderItem={({ item, index }) => (
              <RoleCard role={item} index={index} />
            )}
          />

          <View className="px-2">
            <Typography variant="title">Não Selecionados</Typography>
          </View>

          {/*  @ts-ignore */}
          <SimpleGrid
            maxItemsPerRow={3}
            itemDimension={120}
            data={nonSelectedRoles}
            renderItem={({ item, index }) => (
              <RoleCard key={item.roleType.name} role={item} index={index} />
            )}
          />
        </ScrollView>

        <View className="p-2">
          <Button
            disabled={
              selectedRolesCount() !== playersNames.length ||
              playersNames.length === 0
            }
            title="Confirmar"
            inverted
            onPress={handleStartGame}
          />
        </View>
      </View>

      <CustomModal
        isVisible={modalRole !== null}
        onSwipeComplete={clearModalRole}
      >
        <RoleModalContent />
      </CustomModal>
    </>
  )
}
