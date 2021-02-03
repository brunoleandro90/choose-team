import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Team } from 'src/app/shared/models/team';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html'
})
export class ResultComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ResultComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Team[]
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

}
