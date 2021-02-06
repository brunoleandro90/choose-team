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
        redirectTo: 'match',
        pathMatch: 'full'
      },
      {
        path: 'match',
        loadChildren: () => import('./match/match.module').then(m => m.MatchModule)
      },
      {
        path: 'home/:matchid',
        component: HomeComponent
      },
      {
        path: 'player/:matchid',
        loadChildren: () => import('./player/player.module').then(m => m.PlayerModule)
      },
      {
        path: 'team/:matchid',
        loadChildren: () => import('./team/team.module').then(m => m.TeamModule)
      },
      {
        path: 'cronometro/:matchid',
        component: CronometroComponent
      },
      {
        path: '**',
        redirectTo: 'match'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
