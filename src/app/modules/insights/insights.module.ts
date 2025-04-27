import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsightsRoutingModule } from './insights-routing.module';
import { InsightsPageComponent } from './insights-page/insights-page.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    InsightsPageComponent
  ],
  imports: [
    CommonModule,
    InsightsRoutingModule,
    SharedModule
  ]
})
export class InsightsModule { }
