import { HttpClient } from '@angular/common/http';
import { HtmlParser } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  // current user which is logged in
  public getCurrentUser() {
    return this.http.get(`${baseUrl}/current-user`);
  }

  // generate token method
  public generateToken(loginData: any) {
    console.log(loginData);
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  // login user function will set token in localStorage
  public loginUser(token: any) {
    localStorage.setItem('token', token);
    // this.loginStatusSubject.next(true);
    return true;
  }

  // function to check logged in or nor
  public isLoggedIn() {
    //token will be in string form thats wht tokenStr
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  // logout function:remove token from localStorage

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['login'])
    return true;
  }

  // get token function which returns token
  public getToken() {
    return localStorage.getItem('token');
  }

  // function to set userdetails
  public setUserDetails(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // getUser
  public getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  // get user role
  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority; // considering single row
    // to consider multiple roles => return user.authorities;
  }
}
