import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginData = {
    username: "",
    password: ""
  }

  constructor(private snakbar: MatSnackBar, private login: LoginService,private router:Router) { }

  ngOnInit() {
  }
  
  formSubmit() {
    if (this.loginData.username.trim() == '' || this.loginData.username == null) {
      this.snakbar.open("Username is required..!", "close", {
        duration: 3000
      }) 
      return 
    }

    if (this.loginData.password.trim() == '' || this.loginData.password == null) {
      this.snakbar.open("password is required..!", "close", {
        duration: 3000
      })
      return
    } 

    this.login.generateToken(this.loginData).subscribe((data) => {
      
      console.log("Success")
      console.log(data)

      // login

      this.login.loginUser(data.token);
      
      this.getCurrUser();
    },    
      (error) => {
        // console.log("error")
        // console.log(error)
        this.snakbar.open("Invalid Details..! try Again", "close", {
          duration: 3000
        })
      }
    )
  }

  getCurrUser(){
    this.login.getCurrentUser().subscribe((user)=>{
      this.login.setUser(user);
      console.log(user);
      console.log(this.login.getUserRole());

      if(this.login.getUserRole()=='ADMIN'){
        this.router.navigate(["/admin"]);
        // window.location.href = "/admin"
        
        // preventing from realoadng
        // next(true) by this its trigger the subject where all its subscribe
        this.login.loginStatusSubject.next(true);

      }else if(this.login.getUserRole()=='NORMAL'){
        this.router.navigate(["/user-dashboard"]);
        // window.location.href = "/user-dashboard"

        // preventing from realoadng 
        // next(true) by this its trigger the subject where all its subscribe
        this.login.loginStatusSubject.next(true);
      }else{
        this.login.logOut();
      }
    })
  }
}