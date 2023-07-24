import { ScrollView } from "react-native"
import { SimpleGrid } from "react-native-super-grid"
import { Button } from "@/components/button/Button"
import { Player } from "@/services/player/Player"
import { Game } from "@/services/game/Game"

type TargetPlayersProps = {
  selectedPlayer: Player | null
  setSelectedPlayer: (player: Player) => void
  game: Game
}

export function TargetPlayers({
  game,
  selectedPlayer,
  setSelectedPlayer,
}: TargetPlayersProps) {
  const players = game!.getAlivePlayers()
  const currentPlayerId = game!.getCurrentPlayer().getId()

  return (
    <ScrollView>
      {/*  @ts-ignore */}
      <SimpleGrid
        itemDimension={100}
        maxItemsPerRow={3}
        data={players.filter((player) => player.getId() !== currentPlayerId)}
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
