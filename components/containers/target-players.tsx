import { ScrollView, View } from "react-native"
import { SimpleGrid } from "react-native-super-grid"
import { Button } from "@/components/button/Button"
import { Player } from "@/services/player/Player"
import { IconFlatPawPrint } from "../icons/flat-paw-print"
import { SkillOrder } from "@/services/skills/Skill"
import { ReactNode } from "react"
import { Typography } from "../typography/Typography"
import { usePathname } from "expo-router"
import { Werewolf } from "@/services/roles/Werewolf"

type TargetPlayersProps = {
  currentPlayer: Player
  players: Player[]
  selectedPlayer: Player | null
  setSelectedPlayer: (player: Player) => void
  chosenSkill?: SkillOrder
}

export function TargetPlayers({
  currentPlayer,
  players,
  selectedPlayer,
  setSelectedPlayer,
  chosenSkill,
}: TargetPlayersProps) {
  const path = usePathname()

  const showWerewolfVotes = (targetPlayer: Player) =>
    path !== "/votation" &&
    currentPlayer.getRole() instanceof Werewolf &&
    !(targetPlayer.getRole() instanceof Werewolf)

  const bothPlayersBelongToWerewolfTeam = (targetPlayer: Player) =>
    currentPlayer.getRole() instanceof Werewolf &&
    targetPlayer.getRole() instanceof Werewolf

  return (
    <ScrollView contentContainerStyle={{ paddingTop: 10 }}>
      {/*  @ts-ignore */}
      <SimpleGrid
        itemDimension={100}
        maxItemsPerRow={3}
        data={players.filter(
          (player) => player.getId() !== currentPlayer.getId()
        )}
        renderItem={({ item }) => (
          <View className="relative">
            {bothPlayersBelongToWerewolfTeam(item) && (
              <RoundedIconContainer>
                <IconFlatPawPrint className="fill-primary" />
              </RoundedIconContainer>
            )}

            {showWerewolfVotes(item) && (
              <RoundedIconContainer>
                <View className="relative -top-1">
                  <Typography color="primary">{item.getVotes()}</Typography>
                </View>
              </RoundedIconContainer>
            )}

            <Button
              title={item.getName()}
              onPress={() => setSelectedPlayer(item)}
              inverted={selectedPlayer?.getName() === item.getName()}
              disabled={
                bothPlayersBelongToWerewolfTeam(item) ||
                currentPlayer.getRole().hasInvalidTargetOn(item, chosenSkill)
              }
            />
          </View>
        )}
      />
    </ScrollView>
  )
}

const RoundedIconContainer = ({ children }: { children: ReactNode }) => {
  return (
    <View
      className={`absolute bottom-full left-1/2 w-7 h-7 p-0.5 
                  -translate-x-3.5 z-50 translate-y-3.5 
                  flex items-center justify-center 
                  rounded-full border-sm 
                  border-primary bg-primary-foreground`}
    >
      {children}
    </View>
  )
}
