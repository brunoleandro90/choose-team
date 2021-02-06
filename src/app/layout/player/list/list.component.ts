import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from 'src/app/shared/models/player';
import { PlayerService } from 'src/app/shared/services/player.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-list-player',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  matchId: string = "";

  constructor(
    public playerService: PlayerService,
    private snackBarService: SnackBarService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.matchId = this.route.snapshot.params.matchid;
  }

  ngOnInit(): void {
    if (!this.matchId) {
      this.router.navigate(['/match']);
    } else {
      this.get();
    }
  }

  delete = (id: string) => {
    this.playerService.remove(id)
      .subscribe(
        success => {
          let index = this.playerService.players.findIndex(x => x.id == id);
          this.playerService.players.splice(index, 1);
          this.snackBarService.success('Player excluído com sucesso!', '');
        },
        fail => {
          this.snackBarService.error('Ops, ocorreu erro!', '');
        }
      );
  }

  get = () => {
    this.playerService.getByMatch(this.matchId)
      .subscribe(res => {
        this.playerService.players = this.playerService.PlayerUtils.orderPlayers(res as Player[]);
      });
  }
}
