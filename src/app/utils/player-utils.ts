import { Player } from "../shared/models/player";

export class PlayerUtils {

  orderPlayers = (players: Player[]) => {
    return players.sort((a, b) => a.name.localeCompare(b.name));
  }

}