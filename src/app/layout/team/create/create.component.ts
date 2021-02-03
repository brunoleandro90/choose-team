import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Boleiro } from 'src/app/shared/models/boleiro';
import { Team } from 'src/app/shared/models/team';
import { BoleiroService } from 'src/app/shared/services/boleiro.service';
import { TeamService } from 'src/app/shared/services/team.service';
import { ResultComponent } from '../result/result.component';

@Component({
  selector: 'app-create-team',
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit {

  partidaId: string = "";

  constructor(
    public boleiroService: BoleiroService,
    public teamService: TeamService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) {
    this.partidaId = this.route.snapshot.params.partidaid;
  }

  ngOnInit(): void {
    this.teamService.getByPartida(this.partidaId)
      .subscribe(res => {
        debugger;
        this.teamService.teams = res as Team[];
        if (this.teamService.teams.length == 0) {
          this.setTeams();
        }
      });
  }

  tirarTime() {
    let boleirosActives = this.shuffle(this.boleiroService.getActive());

    for (let indexTeam = 0; indexTeam < this.teamService.teams.length; indexTeam++) {
      let team = {} as Team;
      team.boleiros = [] as Boleiro[];

      team.partidaId = this.partidaId;
      team.time = indexTeam + 1;

      for (let indexBoleiro = 0; indexBoleiro < this.teamService.quantityPerTeam; indexBoleiro++) {
        let boleiro: Boleiro = boleirosActives[(indexTeam * this.teamService.quantityPerTeam) + indexBoleiro];
        if (boleiro)
          team.boleiros.push(boleiro);
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
    let teams = this.teamService.teams.filter(x => (x.time == team) || (team == 0));

    const dialogRef = this.dialog.open(ResultComponent, {
      data: teams,
      width: "80vh",
      maxHeight: '70vh'
    });
  }

  shuffle = (boleiros: Boleiro[]) => {
    let length = boleiros.length;
    let boleiro: Boleiro;
    let index: number;

    while (length) {
      index = Math.floor(Math.random() * length--);

      boleiro = boleiros[length];
      boleiros[length] = boleiros[index];
      boleiros[index] = boleiro;
    }

    return boleiros;
  }

  incrementQuantityPerTeam(add: boolean) {
    if (add)
      this.teamService.quantityPerTeam++;
    else
      this.teamService.quantityPerTeam--;

    this.setTeams();
  }

  setTeams() {
    debugger;
    let qtde = Math.ceil(this.boleiroService.getActive().length / this.teamService.quantityPerTeam);
    this.teamService.teams = new Array<Team>(qtde);
  }
}
