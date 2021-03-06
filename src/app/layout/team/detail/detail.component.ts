import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from 'src/app/shared/models/player';
import { PlayerService } from 'src/app/shared/services/player.service';
import { TeamService } from 'src/app/shared/services/team.service';

@Component({
  selector: 'app-detail-team',
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {

  matchId: string = "";

  countPresents: number = 0;

  numberOfTeams!: Array<number>;

  constructor(
    public playerService: PlayerService,
    public teamService: TeamService,
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

  tirarTeam() {
    let playersPresentes = this.playerService.players.filter(x => x.selected);
  }

  get = () => {
    this.playerService.getByMatch(this.matchId)
      .subscribe(res => {
        this.playerService.players = this.playerService.PlayerUtils.orderPlayers(res as Player[]);
        this.setCountPresents();
      });
  }

  setCountPresents() {
    this.countPresents = this.playerService.players.filter(x => x.selected).length;
  }
}
