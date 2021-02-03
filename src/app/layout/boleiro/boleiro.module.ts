import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BoleiroRoutingModule } from './boleiro-routing.module';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    BoleiroRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ]
})
export class BoleiroModule { }
