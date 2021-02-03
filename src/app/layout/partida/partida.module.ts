import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { PartidaRoutingModule } from './partida-routing.module';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ 
    ListComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    PartidaRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ]
})
export class PartidaModule { }
