import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Match } from 'src/app/shared/models/match';
import { MatchService } from 'src/app/shared/services/match.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { CreateComponent } from '../create/create.component';

@Component({
  selector: 'app-list-match',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  matchs: Match[] = [];

  constructor(
    private matchService: MatchService,
    public dialog: MatDialog,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {
    this.matchService.getAll()
      .subscribe(res => {
        this.matchs = res as Match[];
      });
  }

  openAdd() {
    const dialogRef = this.dialog.open(CreateComponent, {
      height: "200px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.matchs.push(result as Match);
      }
    });
  }

  delete(id: string) {
    this.matchService.remove(id)
      .subscribe(
        success => {
          let index = this.matchs.findIndex(x => x.id == id);
          this.matchs.splice(index, 1);
          this.snackBarService.success('Match excluída com sucesso!', '');
        },
        fail => {
          this.snackBarService.error('Ops, ocorreu erro!', '');
        }
      );
  }

}
