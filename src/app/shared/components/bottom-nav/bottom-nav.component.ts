import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss']
})
export class BottomNavComponent {
  @Input() activeTab: string = 'dashboard';
  @Output() tabChange = new EventEmitter<string>();

  constructor(private router: Router) {}

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.tabChange.emit(tab);

    // Navegar a la ruta correspondiente
    switch (tab) {
      case 'dashboard':
        this.router.navigate(['/']);
        break;
      case 'login':
        this.router.navigate(['/auth/login']);
        break;
      case 'register':
        this.router.navigate(['/auth/register']);
        break;
      case 'about':
        this.router.navigate(['/about']);
        break;
      case 'alertas':
        // Ruta para alertas cuando exista
        break;
      case 'ajustes':
        // Ruta para ajustes cuando exista
        break;
    }
  }
}
