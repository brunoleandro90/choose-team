import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './modules/material.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false }),
    MaterialModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class SharedModule { }
