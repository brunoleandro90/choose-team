import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable, of } from 'rxjs';
import { BoleiroUtils } from 'src/app/utils/boleiro-utils';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { Boleiro } from '../models/boleiro';

@Injectable({
  providedIn: 'root'
})
export class BoleiroService {

  private origem: string = 'boleiro';

  boleiros: Boleiro[] = [];


  LocalStorage = new LocalStorageUtils();

  BoleiroUtils = new BoleiroUtils();

  constructor() { }

  getActive() {
    return this.boleiros.filter(x => x.ativo);
  }

  setActive = (boleiro: Boleiro) => {
    this.setStatus(boleiro.id)
      .subscribe(res => {
        boleiro.ativo = !boleiro.ativo
        this.boleiros = this.BoleiroUtils.orderBoleiros(this.boleiros);
      });
  }

  getByPartida(partidaId: string): Observable<Boleiro[]> {
    let boleiros = this.LocalStorage.get(this.origem) as Boleiro[] ?? [];
    return of(boleiros.filter(x => x.partidaId == partidaId));
  }

  create(boleiro: Boleiro): Observable<Boleiro> {
    let boleiros = this.LocalStorage.get(this.origem) as Boleiro[] ?? [];
    boleiro.id = Guid.create().toString();
    boleiros.push(boleiro);
    this.LocalStorage.create(this.origem, boleiros);
    return of(boleiro);
  }

  remove(id: string): Observable<boolean> {
    let boleiros = this.LocalStorage.get(this.origem) as Boleiro[] ?? [];
    let index = boleiros.findIndex(x => x.id == id);
    boleiros.splice(index, 1);
    this.LocalStorage.create(this.origem, boleiros);
    return of(true);
  }

  setStatus(id: string): Observable<Boleiro> {
    let boleiros = this.LocalStorage.get(this.origem) as Boleiro[] ?? [];
    let boleiro = boleiros.find(x => x.id == id)!;
    if (boleiro) {
      let index = boleiros.findIndex(x => x.id == id);
      boleiros.splice(index, 1);
      boleiro.ativo = !boleiro.ativo;
      boleiros.push(boleiro);
      this.LocalStorage.create(this.origem, boleiros);
    }
    return of(boleiro);
  }
}
