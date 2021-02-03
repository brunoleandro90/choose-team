import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  partidaId: string = '';

  constructor(
    private route: ActivatedRoute,
  ) { 
    this.partidaId = this.route.snapshot.params.partidaid;
  }

  ngOnInit(): void {
  }

}
