// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MovieService } from '../service/movie.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router, private service: MovieService) {}

  onLogin() {
    this.service.loginUser(this.username, this.password).subscribe(
      (response) => {

        this.authService.setUserId(response.user.userId);
        this.authService.login();
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Error updating review:', error);
        this.errorMessage = error.error.message || 'Invalid login credentials';
      }
    )
  }
}
