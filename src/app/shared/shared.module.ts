import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav.component';

@NgModule({
  declarations: [
    BottomNavComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BottomNavComponent
  ]
})
export class SharedModule { }
