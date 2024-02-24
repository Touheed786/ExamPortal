import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  username = ""
  isLogIn = false;
  constructor(private login:LoginService,private router:Router){
  }
  ngOnInit()
  {
    this.LogedIn();
    this.getUsername();
    
    this.login.loginStatusSubject.asObservable().subscribe((_data)=>{
      this.LogedIn();
      this.getUsername();
    })
  }
  
  logout()
  {
    this.login.logOut();
    // this.login.loginStatusSubject.next(false);
    this.LogedIn();
    // window.location.reload();
  }

  LogedIn()
  {
    this.isLogIn = this.login.isLogedIn()
  }

  getUsername(){
    if(this.isLogIn)
      this.username = this.login.getUser().username;
  }

  profile(){
    this.login.getUserRole()=='ADMIN'?this.router.navigate(["/admin/profile"]):this.router.navigate(["/user-dashboard/profile"])
  }
}
