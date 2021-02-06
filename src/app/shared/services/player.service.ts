import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable, of } from 'rxjs';
import { PlayerUtils } from 'src/app/utils/player-utils';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private origem: string = 'player';

  players: Player[] = [];


  LocalStorage = new LocalStorageUtils();

  PlayerUtils = new PlayerUtils();

  constructor() { }

  getActive() {
    return this.players.filter(x => x.selected);
  }

  setActive = (player: Player) => {
    this.setStatus(player.id)
      .subscribe(res => {
        player.selected = !player.selected
        this.players = this.PlayerUtils.orderPlayers(this.players);
      });
  }

  getByMatch(matchId: string): Observable<Player[]> {
    let players = this.LocalStorage.get(this.origem) as Player[] ?? [];
    return of(players.filter(x => x.matchId == matchId));
  }

  create(player: Player): Observable<Player> {
    let players = this.LocalStorage.get(this.origem) as Player[] ?? [];
    player.id = Guid.create().toString();
    players.push(player);
    this.LocalStorage.create(this.origem, players);
    return of(player);
  }

  remove(id: string): Observable<boolean> {
    let players = this.LocalStorage.get(this.origem) as Player[] ?? [];
    let index = players.findIndex(x => x.id == id);
    players.splice(index, 1);
    this.LocalStorage.create(this.origem, players);
    return of(true);
  }

  setStatus(id: string): Observable<Player> {
    let players = this.LocalStorage.get(this.origem) as Player[] ?? [];
    let player = players.find(x => x.id == id)!;
    if (player) {
      let index = players.findIndex(x => x.id == id);
      players.splice(index, 1);
      player.selected = !player.selected;
      players.push(player);
      this.LocalStorage.create(this.origem, players);
    }
    return of(player);
  }
}
