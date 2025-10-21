import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  now = new Date();

  constructor(private router: Router) {
    setInterval(() => (this.now = new Date()), 1000);
  }

  goHome() {
    this.router.navigate(['/users']);
  }
}
