import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.scss']
})
export class AcercaDeComponent {
  constructor(private router: Router) {}

  onTabChange(tab: string): void {
    if (tab !== 'about') {
      if (tab === 'dashboard') {
        this.router.navigate(['/']);
      } else if (tab === 'login') {
        this.router.navigate(['/auth/login']);
      } else if (tab === 'register') {
        this.router.navigate(['/auth/register']);
      } else {
        this.router.navigate(['/', tab]);
      }
    }
  }
}
