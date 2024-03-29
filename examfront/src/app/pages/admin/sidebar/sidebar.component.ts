import { Component, Input } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private loginService:LoginService,private router:Router){}

  ngOnInit(){
    
  }

  logout()
  {
    this.loginService.logOut();
    this.loginService.loginStatusSubject.next(true);
    this.router.navigate(["/login"])
  }

}
