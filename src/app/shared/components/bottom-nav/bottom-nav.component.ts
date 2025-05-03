import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss']
})
export class BottomNavComponent implements OnInit {
  @Input() activeTab: string = 'dashboard';
  @Output() tabChange = new EventEmitter<string>();
  isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Verificar estado de autenticación
    this.isAuthenticated = this.authService.isAuthenticated();
  }

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
      case 'logout':
        this.logout();
        break;
      case 'insights':
        this.router.navigate(['/insights']);
        break;
      case 'alertas':
        // Ruta para alertas cuando exista
        break;
      case 'ajustes':
        // Ruta para ajustes cuando exista
        break;
    }
  }

  /**
   * Cierra la sesión del usuario y navega a la pantalla de login
   */
  logout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
    this.router.navigate(['/auth/login']);
  }
}
