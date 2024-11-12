import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isLoggedIn().subscribe(status => this.isLoggedIn = status);
  }

  displayDirectorList() {
    const timestamp = new Date().getTime(); // Get the current timestamp
    this.router.navigate(['/list-directors'], { queryParams: { data: new Date()} });
  }

  onLogin() {
    this.authService.login();
    this.router.navigate(['/']);
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
