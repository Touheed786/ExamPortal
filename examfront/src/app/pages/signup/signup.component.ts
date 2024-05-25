import { Component, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
@Injectable({
 providedIn:'root'
})
export class SignupComponent {
  constructor(private userService:UserServiceService,private snack:MatSnackBar,private router:Router){}
  
  ngOnInit():void{}
   user={
    username :'',
    password :'',
    firstName :'',
    lastName :'',
    email :'',
    phone : ''
  };

  formSubmit()
  {
    if(this.user.username == '' || this.user.username == null)
    {
      this.snack.open("Username is Required!!","close",{
        duration:3000
      })
      return
    }
    // this.userService.getUserByname(this.user).subscribe(
    //   (data)=>{
    //     if(data)
    //     {
    //       alert("Username is Already Exists")
    //       return 
    //     }
    //   }
    // )
    this.userService.addUser(this.user).subscribe(
      (data:any)=>{
        swal.fire("Successfully Done","User Id is "+data.id,'success')
        this.router.navigate(['/login']);
      },
      (error)=>{
        console.log(error)
        this.snack.open("Something went wrong!!","close",{
          duration:3000
        })
      }
      );
  }
  
}
