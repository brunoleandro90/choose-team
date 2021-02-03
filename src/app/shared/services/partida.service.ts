import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { Partida } from '../models/partida';
import { LocalStorageUtils } from '../../utils/localstorage';
import { of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PartidaService {

  private origem: string = 'partida';

  public LocalStorage = new LocalStorageUtils();

  constructor() { }

  getAll() : Observable<Partida[]>{
    return of(this.LocalStorage.get(this.origem) as Partida[] ?? []);
  }

  getById(id: string) : Observable<Partida> {
    let partidas = this.LocalStorage.get(this.origem) as Partida[] ?? [];
    return of(partidas.filter(x => x.id == id)[0]);
  }

  create(partida: Partida) : Observable<Partida> {
    let partidas = this.LocalStorage.get(this.origem) as Partida[] ?? [];
    partida.id = Guid.create().toString();
    partidas.push(partida);
    this.LocalStorage.create(this.origem, partidas);
    return of(partida);
  }

  remove(id: string) : Observable<boolean> {
    let partidas = this.LocalStorage.get(this.origem) as Partida[] ?? [];
    let index = partidas.findIndex(x => x.id == id);
    partidas.splice(index, 1);
    this.LocalStorage.create(this.origem, partidas);
    return of(true);
  }
}
