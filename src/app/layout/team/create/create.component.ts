import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Player } from 'src/app/shared/models/player';
import { Team } from 'src/app/shared/models/team';
import { PlayerService } from 'src/app/shared/services/player.service';
import { TeamService } from 'src/app/shared/services/team.service';
import { ResultComponent } from '../result/result.component';

@Component({
  selector: 'app-create-team',
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit {

  matchId: string = "";

  constructor(
    public playerService: PlayerService,
    public teamService: TeamService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) {
    this.matchId = this.route.snapshot.params.matchid;
  }

  ngOnInit(): void {
    this.teamService.getByMatch(this.matchId)
      .subscribe(res => {
        this.teamService.teams = res as Team[];
        if (this.teamService.teams.length == 0) {
          this.setTeams();
        }
      });
  }

  tirarTeam() {
    this.setTeams();
    
    let playersActives = this.shuffle(this.playerService.getActive());

    for (let indexTeam = 0; indexTeam < this.teamService.teams.length; indexTeam++) {
      let team = {} as Team;
      team.players = [] as Player[];

      team.matchId = this.matchId;
      team.team = indexTeam + 1;

      for (let indexPlayer = 0; indexPlayer < this.teamService.quantityPerTeam; indexPlayer++) {
        let player: Player = playersActives[(indexTeam * this.teamService.quantityPerTeam) + indexPlayer];
        if (player)
          team.players.push(player);
      }
      this.teamService.teams[indexTeam] = team;
    };

    this.teamService.create(this.teamService.teams)
      .subscribe(res => {
        const dialogRef = this.dialog.open(ResultComponent, {
          data: this.teamService.teams,
          width: "80vh",
          maxHeight: '70vh'
        });
      });
  }

  getTeam(team: number) {
    let teams = this.teamService.teams.filter(x => (x.team == team) || (team == 0));

    const dialogRef = this.dialog.open(ResultComponent, {
      data: teams,
      width: "80vh",
      maxHeight: '70vh'
    });
  }

  shuffle = (players: Player[]) => {
    let length = players.length;
    let player: Player;
    let index: number;

    while (length) {
      index = Math.floor(Math.random() * length--);

      player = players[length];
      players[length] = players[index];
      players[index] = player;
    }

    return players;
  }

  incrementQuantityPerTeam(add: boolean) {
    if (add)
      this.teamService.quantityPerTeam++;
    else
      this.teamService.quantityPerTeam--;

    this.setTeams();
  }

  setTeams() {
    let qtde = Math.ceil(this.playerService.getActive().length / this.teamService.quantityPerTeam);
    this.teamService.teams = new Array<Team>(qtde);
  }
}
