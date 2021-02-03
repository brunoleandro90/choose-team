import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  pageTitle: string = "";

  constructor(
    private location: Location,
    private router: Router,
    public titleService: Title
  ) { }

  get title() {
    if (this.router.url.toLowerCase().startsWith('/partida'))
      return 'MINHAS PELADAS';
    else if (this.router.url.toLowerCase().startsWith('/boleiro'))
      return 'BOLEIROS';
    else if (this.router.url.toLowerCase().startsWith('/team'))
      return 'TIRAR TIME';
    else if (this.router.url.toLowerCase().startsWith('/home'))
      return 'MENU PRINCIPAL';
    else if (this.router.url.toLowerCase().startsWith('/cronometro'))
      return 'CRONÔMETRO';
    else
      return '';
  }

  toBack() {
    this.location.back();
  }

  showBack() {
    return (this.router.url != "/") && (this.router.url != "/partida");
  }
}
