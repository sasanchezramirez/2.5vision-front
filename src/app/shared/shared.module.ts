import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';

@NgModule({
  declarations: [
    BottomNavComponent,
    AppHeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BottomNavComponent,
    AppHeaderComponent
  ]
})
export class SharedModule { }
