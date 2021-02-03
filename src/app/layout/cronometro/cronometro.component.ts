import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cronometro',
  templateUrl: './cronometro.component.html'
})
export class CronometroComponent implements OnInit {

  timeLeft: number = 0;

  totalTime: number = 7;

  interval: any;
  value = 0;

  constructor() { }

  ngOnInit(): void {
    this.setTimeLeft();
  }

  get time() {
    return new Date(0, 0, 0, 0, 0, this.timeLeft)
  }

  setTimeLeft() {
    this.timeLeft = this.totalTime * 60
  }

  playTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.value += (100 / (this.totalTime * 60));
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }
}
