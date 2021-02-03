import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { Boleiro } from 'src/app/shared/models/boleiro';
import { BoleiroService } from 'src/app/shared/services/boleiro.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-create-boleiro',
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit, AfterViewInit {

  @ViewChild('NomeBoleiro') nomeBoleiro!: MatInput;

  partidaId: string = "";

  boleiro!: Boleiro;

  boleiroForm!: FormGroup;

  posicoes: any[] = [
    { value: 'ATAQUE' },
    { value: 'DEFESA' },
    { value: 'GOLEIRO' }
  ];

  constructor(
    private fb: FormBuilder,
    private boleiroService: BoleiroService,
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
      this.boleiroForm = this.fb.group({
        nome: ['', [Validators.required]],
        posicao: ['', [Validators.required]],
        partidaId: ['', [Validators.required]],
        ativo: ['', [Validators.required]]
      });

      this.setValuesDefaults(true);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.nomeBoleiro.focus(), 0
    });
  }

  save = () => {
    if (this.boleiroForm.dirty && this.boleiroForm.valid) {
      this.boleiro = Object.assign({}, this.boleiro, this.boleiroForm.value);

      this.boleiroService.create(this.boleiro)
        .subscribe(
          success => {
            this.boleiroService.boleiros.push(this.boleiro as Boleiro);
            this.boleiroService.boleiros = this.boleiroService.BoleiroUtils.orderBoleiros(this.boleiroService.boleiros);
            this.setValuesDefaults(false);
            this.nomeBoleiro.focus();
          },
          fail => {
            this.nomeBoleiro.focus();
            this.snackBarService.error('Ops, ocorreu erro!', '');
          }
        );
    } else {
      this.nomeBoleiro.focus();
    }
  }

  setValuesDefaults = (first: boolean) => {
    this.boleiroForm.patchValue(
      first ?
        {
          partidaId: this.partidaId,
          posicao: 'ATAQUE',
          nome: '',
          ativo: true
        } :
        {
          partidaId: this.partidaId,
          nome: '',
          ativo: true
        });
  }

}
