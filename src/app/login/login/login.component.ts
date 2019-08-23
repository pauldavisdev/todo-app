import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFailed = false;

  constructor(private authService: AuthService,
    private router: Router) {}

  ngOnInit() {
  }

  login(formValues) {
    if (formValues.userName && formValues.password) {
      this.authService
        .login(formValues.userName, formValues.password)
        .subscribe(res => {
          console.log(res);
          console.log('User is logged in');
          this.router.navigate(['todo']);
        },
        error => {
          console.log(error);
          this.loginFailed = true;
        });
    }
  }

  logout() {
    this.authService.logout();
  }

}
