import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { MaterialModule } from '../shared/modules/material.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CronometroComponent } from './cronometro/cronometro.component';

@NgModule({
  declarations: [
    HomeComponent,
    LayoutComponent,
    CronometroComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    LayoutRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ]
})
export class LayoutModule { }
