import { Injectable } from '@angular/core';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http:HttpClient) { }

  // add User 

  public addUser(user:User)
  {
    return this.http.post(`${baseUrl}/user/`,user);
  }

  public getUserByname(user:User)
  {
    return this.http.get(`${baseUrl}/user/${user.username}`);
  }
}
