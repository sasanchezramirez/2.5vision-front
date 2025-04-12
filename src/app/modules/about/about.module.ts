import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AcercaDeComponent } from './acerca-de/acerca-de.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    AcercaDeComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    SharedModule
  ]
})
export class AboutModule { }
