import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  matchId: string = '';

  constructor(
    private route: ActivatedRoute,
  ) { 
    this.matchId = this.route.snapshot.params.matchid;
  }

  ngOnInit(): void {
  }

}
