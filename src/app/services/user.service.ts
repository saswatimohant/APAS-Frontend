import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseUrl from './helper';
import { User } from './User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  // add user

  public addUser(user: any) {
    return this.http.post(`${baseUrl}/user/`, user);
  }

  //get all users
  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}/user/listAll`);
  }
}
