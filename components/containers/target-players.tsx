import { ScrollView } from "react-native"
import { SimpleGrid } from "react-native-super-grid"
import { Button } from "@/components/button/Button"
import { Player } from "@/services/player/Player"
import { Game } from "@/services/game/Game"

type TargetPlayersProps = {
  currentPlayer: Player
  players: Player[]
  selectedPlayer: Player | null
  setSelectedPlayer: (player: Player) => void
}

export function TargetPlayers({
  currentPlayer,
  players,
  selectedPlayer,
  setSelectedPlayer,
}: TargetPlayersProps) {
  return (
    <ScrollView>
      {/*  @ts-ignore */}
      <SimpleGrid
        itemDimension={100}
        maxItemsPerRow={3}
        data={players.filter(
          (player) => player.getId() !== currentPlayer.getId()
        )}
        renderItem={({ item }) => (
          <Button
            title={item.getName()}
            onPress={() => setSelectedPlayer(item)}
            inverted={selectedPlayer?.getName() === item.getName()}
          />
        )}
      />
    </ScrollView>
  )
}
