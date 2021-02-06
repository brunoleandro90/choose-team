import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { Match } from '../models/match';
import { LocalStorageUtils } from '../../utils/localstorage';
import { of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private origem: string = 'match';

  public LocalStorage = new LocalStorageUtils();

  constructor() { }

  getAll() : Observable<Match[]>{
    return of(this.LocalStorage.get(this.origem) as Match[] ?? []);
  }

  getById(id: string) : Observable<Match> {
    let matchs = this.LocalStorage.get(this.origem) as Match[] ?? [];
    return of(matchs.filter(x => x.id == id)[0]);
  }

  create(match: Match) : Observable<Match> {
    let matchs = this.LocalStorage.get(this.origem) as Match[] ?? [];
    match.id = Guid.create().toString();
    matchs.push(match);
    this.LocalStorage.create(this.origem, matchs);
    return of(match);
  }

  remove(id: string) : Observable<boolean> {
    let matchs = this.LocalStorage.get(this.origem) as Match[] ?? [];
    let index = matchs.findIndex(x => x.id == id);
    matchs.splice(index, 1);
    this.LocalStorage.create(this.origem, matchs);
    return of(true);
  }
}
