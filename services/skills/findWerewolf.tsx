import { Player } from "../player/Player"
import { Werewolf } from "../roles/Werewolf"

export const findWerewolf = (players: Player[]) => {
  const werewolf = players.find(
    (player) => player.getRole() instanceof Werewolf
  )
  return werewolf
}
