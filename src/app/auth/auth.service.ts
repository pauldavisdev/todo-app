import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(userName: string, password: string) {
    console.log(`
      username is ${userName} and password is ${password}
    `);
    return this.http
      .post(
        API_URL + 'authentication/request',
        {
          userName,
          password
        },
        {
          responseType: 'text'
        }
      )
      .pipe(
        tap(res => this.setSession(res)),
        shareReplay()
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    this.router.navigateByUrl('/');
  }

  isLoggedIn(): boolean {
    // console.log('moment()', moment());
    // console.log('getExpiration', this.getExpiration());
    return moment().isBefore(this.getExpiration());
  }

  private setSession(token: string) {
    const jwtHelper = new JwtHelperService();

    const decodedToken = token;
    const expirationDate = jwtHelper.getTokenExpirationDate(token);
    const isExpired = jwtHelper.isTokenExpired(token);

    console.log(`
      Decoded token: ${decodedToken}
      Expiration Date: ${expirationDate}
      isExpired: ${isExpired}
    `);

    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate.toString());
    this.getExpiration();
  }

  private getExpiration() {
    const expiration = localStorage.getItem('expirationDate');
    return moment(expiration);
  }
}
