import { Player } from "./player";

export interface Team {
  matchId: string;
  team: number;
  players: Player[];
}
