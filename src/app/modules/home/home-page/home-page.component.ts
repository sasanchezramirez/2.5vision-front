import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  onTabChange(tab: string): void {
    console.log('Tab changed to:', tab);
    // Aquí se puede implementar la lógica de cambio de pestaña
  }
}
