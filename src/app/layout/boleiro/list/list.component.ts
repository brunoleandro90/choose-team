import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Boleiro } from 'src/app/shared/models/boleiro';
import { BoleiroService } from 'src/app/shared/services/boleiro.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-list-boleiro',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  partidaId: string = "";

  constructor(
    public boleiroService: BoleiroService,
    private snackBarService: SnackBarService,
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

  delete = (id: string) => {
    this.boleiroService.remove(id)
      .subscribe(
        success => {
          let index = this.boleiroService.boleiros.findIndex(x => x.id == id);
          this.boleiroService.boleiros.splice(index, 1);
          this.snackBarService.success('Boleiro excluído com sucesso!', '');
        },
        fail => {
          this.snackBarService.error('Ops, ocorreu erro!', '');
        }
      );
  }

  get = () => {
    this.boleiroService.getByPartida(this.partidaId)
      .subscribe(res => {
        this.boleiroService.boleiros = this.boleiroService.BoleiroUtils.orderBoleiros(res as Boleiro[]);
      });
  }
}
