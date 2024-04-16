import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserProfile } from 'src/app/userProfile';
import Swal from 'sweetalert2';

import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  constructor( private loginService: LoginService,private router:Router) { }
  @ViewChild(LoginComponent) loginComponent:LoginComponent;
  currUserName:string = "";
  currentUser:any;
  userProfile:UserProfile = new UserProfile;

  ngOnInit(){
    this.getUser();
    this.getUserProfile();
    console.log(this.currentUser)
  }

  getUser()
  {
    this.currUserName = this.loginService.getUser().username;
    this.currentUser = this.loginService.getUser();
  }

  updateUser(){
    this.loginService.updateUser(this.userProfile).subscribe((user:any)=>{
      // this.userProfile = data;
      console.log(user)
      Swal.fire({
        title: "Login",
        text: "need to relogin once password got changed",
        icon: "info",
        backdrop:"static"
        // backdrop : false
      }).then((result)=>{
        this.loginService.logOut();
        this.loginService.loginStatusSubject.next(true);
        this.router.navigate(['/login']);
      });


    },(error)=>{
      console.log(error.error)
    })
  }

  getUserProfile(){
    this.loginService.getProfileUser(this.currUserName).subscribe((data:any)=>{
      this.userProfile = data;
      console.log(this.userProfile)
      console.log("user profile",data)
    },(error)=>{
      console.log(error)
    })
  }
}
