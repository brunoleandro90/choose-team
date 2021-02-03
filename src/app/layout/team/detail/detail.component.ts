import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Boleiro } from 'src/app/shared/models/boleiro';
import { BoleiroService } from 'src/app/shared/services/boleiro.service';
import { TeamService } from 'src/app/shared/services/team.service';

@Component({
  selector: 'app-detail-team',
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {

  partidaId: string = "";

  countPresents: number = 0;

  numberOfTeams!: Array<number>;

  constructor(
    public boleiroService: BoleiroService,
    public teamService: TeamService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.partidaId = this.route.snapshot.params.partidaid;
  }

  ngOnInit(): void {
    if (!this.partidaId) {
      this.router.navigate(['/partida']);
    } else {
      this.get();
    }
  }

  tirarTime() {
    let boleirosPresentes = this.boleiroService.boleiros.filter(x => x.ativo);
  }

  get = () => {
    this.boleiroService.getByPartida(this.partidaId)
      .subscribe(res => {
        this.boleiroService.boleiros = this.boleiroService.BoleiroUtils.orderBoleiros(res as Boleiro[]);
        this.setCountPresents();
      });
  }

  setCountPresents() {
    this.countPresents = this.boleiroService.boleiros.filter(x => x.ativo).length;
  }
}
