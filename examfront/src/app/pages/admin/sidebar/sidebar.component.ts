import { Component, Input } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private loginService:LoginService,private router:Router,public breakpointObserver: BreakpointObserver){}

  isMenuOpen = true;

  ngOnInit(){
    
  }

  logout()
  {
    this.loginService.logOut();
    this.loginService.loginStatusSubject.next(true);
    this.router.navigate(["/login"])
  }

 
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  isSmallScreen() {
    return this.breakpointObserver.isMatched('(max-width: 900px)');
  }

}
