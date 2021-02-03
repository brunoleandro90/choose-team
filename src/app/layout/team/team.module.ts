import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail/detail.component';
import { TeamRoutingModule } from './team-routing.module';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CreateComponent } from './create/create.component';
import { ResultComponent } from './result/result.component';



@NgModule({
  declarations: [DetailComponent, CreateComponent, ResultComponent],
  imports: [
    CommonModule,
    TeamRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ]
})
export class TeamModule { }
