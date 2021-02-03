import { Boleiro } from "./boleiro";

export interface Team {
  partidaId: string;
  time: number;
  boleiros: Boleiro[];
}
