import { Player } from "../player/Player"

export const revealPlayerRole = (player: Player) => {
  return `${player.getName()} é um ${player.getRole().getFakeName()}`
}
