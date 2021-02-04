import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Partida } from 'src/app/shared/models/partida';
import { PartidaService } from 'src/app/shared/services/partida.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-create-partida',
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit {

  partida!: Partida;

  partidaForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private partidaService: PartidaService,
    private snackBarService: SnackBarService,
    public dialogRef: MatDialogRef<CreateComponent>,
  ) { }

  ngOnInit(): void {
    this.partidaForm = this.fb.group({
      descricao: ['', [Validators.required]]
    });
  }

  save() {
    if (this.partidaForm.dirty && this.partidaForm.valid) {
      this.partida = Object.assign({}, this.partida, this.partidaForm.value);

      this.partidaService.create(this.partida)
        .subscribe(
          success => {
            this.snackBarService.success('Partida cadastrada com sucesso!', '');
            this.dialogRef.close(this.partida);
          },
          fail => {
            this.snackBarService.error('Ops, ocorreu erro!', '');
          }
        );
    }
  }

  close() {

  }

}
