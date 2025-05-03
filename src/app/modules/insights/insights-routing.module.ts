import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsightsPageComponent } from './insights-page/insights-page.component';

const routes: Routes = [
  {
    path: '',
    component: InsightsPageComponent
    // La protección de ruta se implementará a través del componente de navegación
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsightsRoutingModule { }
