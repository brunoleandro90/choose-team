import { Boleiro } from "../shared/models/boleiro";

export class BoleiroUtils {

  orderBoleiros = (boleiros: Boleiro[]) => {
    return boleiros.sort((a, b) => a.nome.localeCompare(b.nome));
  }

}