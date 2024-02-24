import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  constructor( private login: LoginService,private router:Router) { }
  currentUser:any;
  ngOnInit(){
    this.getUser();
  }

  getUser()
  {
    this.currentUser = this.login.getUser();
    // or
    // this.login.getCurrentUser().subscribe((user:any)=>{
    //   this.currentUser = user;
    //   console.log(this.currentUser.firstName)
    // })
    // console.log(this.currentUser)
  }
}
