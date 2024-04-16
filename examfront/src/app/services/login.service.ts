import { HttpClient, HttpHeaders, JsonpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public  loginStatusSubject = new Subject<boolean>
  

  constructor(private http: HttpClient) { }

  public getCurrentUser() {
    return this.http.get<any>(`${baseUrl}/current-user`)
  }

  // Generate Token

  public generateToken(loginData: any) {

    return this.http.post<any>(`${baseUrl}/generate-token`, loginData);
  }

  // login user: set Token in Local Storage

  public loginUser(token: string) {
    localStorage.setItem('token', token)
    return true;
  }

  // isLogin: USer Login or Not

  public isLogedIn() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr === undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  // Logout: Remove Token from Local Storage
  public logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  // getToken
  public getToken() {
    return localStorage.getItem('token');
  }

  // set UserDetails

  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // get User

  public getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logOut();
      return null;
    }
  }

  // get User Role

  public getUserRole() {
    let user = this.getUser();
    // return user;
    return user.authorities[0].authority;
  }

  public updateUser(user:any){
    return this.http.post(`${baseUrl}/user/update`,user);
  }

  public getProfileUser(username:string){
    return this.http.get(`${baseUrl}/user/${username}`)
  }

}
