import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Partida } from 'src/app/shared/models/partida';
import { PartidaService } from 'src/app/shared/services/partida.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { CreateComponent } from '../create/create.component';

@Component({
  selector: 'app-list-partida',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  partidas: Partida[] = [];

  constructor(
    private partidaService: PartidaService,
    public dialog: MatDialog,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {
    this.partidaService.getAll()
      .subscribe(res => {
        this.partidas = res as Partida[];
      });
  }

  openAdd() {
    const dialogRef = this.dialog.open(CreateComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.partidas.push(result as Partida);
      }
    });
  }

  delete(id: string) {
    this.partidaService.remove(id)
      .subscribe(
        success => {
          let index = this.partidas.findIndex(x => x.id == id);
          this.partidas.splice(index, 1);
          this.snackBarService.success('Partida excluída com sucesso!', '');
        },
        fail => {
          this.snackBarService.error('Ops, ocorreu erro!', '');
        }
      );
  }

}
