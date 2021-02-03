import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { Team } from '../models/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private origem: string = 'team';

  quantityPerTeam: number = 5;

  teams: Array<Team> = [];

  LocalStorage = new LocalStorageUtils();

  constructor() { }

  getByPartida(partidaId: string): Observable<Team[]> {
    let teams = this.LocalStorage.get(this.origem) as Team[] ?? [];
    return of(teams.filter(x => x.partidaId == partidaId));
  }

  create(teams: Team[]): Observable<Team[]> {
    let teamsDB = this.LocalStorage.get(this.origem) as Team[] ?? [];
    teamsDB = teamsDB.filter(x => x.partidaId != teams[0].partidaId);
    for (let index = 0; index < teams.length; index++) {
      teamsDB.push(teams[index]);
    }
    this.LocalStorage.remove(this.origem)
    this.LocalStorage.create(this.origem, teamsDB);
    return of(teams);
  }

  remove(partidaId: string) {
    let teamsDB = this.LocalStorage.get(this.origem) as Team[] ?? [];
    teamsDB = teamsDB.filter(x => x.partidaId != partidaId);
    this.LocalStorage.remove(this.origem)
    this.LocalStorage.create(this.origem, teamsDB);
    return of(true);
  }
}
