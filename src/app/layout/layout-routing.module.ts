import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CronometroComponent } from './cronometro/cronometro.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'partida',
        pathMatch: 'full'
      },
      {
        path: 'partida',
        loadChildren: () => import('./partida/partida.module').then(m => m.PartidaModule)
      },
      {
        path: 'home/:partidaid',
        component: HomeComponent
      },
      {
        path: 'boleiro/:partidaid',
        loadChildren: () => import('./boleiro/boleiro.module').then(m => m.BoleiroModule)
      },
      {
        path: 'team/:partidaid',
        loadChildren: () => import('./team/team.module').then(m => m.TeamModule)
      },
      {
        path: 'cronometro/:partidaid',
        component: CronometroComponent
      },
      {
        path: '**',
        redirectTo: 'partida'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
