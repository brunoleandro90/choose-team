import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Match } from 'src/app/shared/models/match';
import { MatchService } from 'src/app/shared/services/match.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-create-match',
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit {

  match!: Match;

  matchForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private matchService: MatchService,
    private snackBarService: SnackBarService,
    public dialogRef: MatDialogRef<CreateComponent>,
  ) { }

  ngOnInit(): void {
    this.matchForm = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  save() {
    if (this.matchForm.dirty && this.matchForm.valid) {
      this.match = Object.assign({}, this.match, this.matchForm.value);

      this.matchService.create(this.match)
        .subscribe(
          success => {
            this.snackBarService.success('Match cadastrada com sucesso!', '');
            this.dialogRef.close(this.match);
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
