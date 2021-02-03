import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  success(message: string, action: string, duration: number = 5000) {
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  error(message: string, action: string, duration: number = 5000) {
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}
