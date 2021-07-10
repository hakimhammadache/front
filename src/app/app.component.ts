import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fronted';
  user: object;
  username: string;
  poste: string;
  isLogged:boolean;
  userLogged:string;
  constructor(private userAuth:AuthService,private router: Router) {
    this.user = userAuth.isAuth()
    this.username = this.user["username"];
    this.poste = this.user["poste"];
    this.userAuth.isLogged.subscribe((isLogged)=>{
      this.isLogged=isLogged;
      
    })
    this.userAuth.userLogged.subscribe((userLogged) => {
      this.userLogged = userLogged;

    })

  }
  isAuth() {
    if (this.user) {
      return true
    } else {
      return false
    }
  }
  isAdmin() {
    if (this.user['poste'] === "admin") {
      return true
    } else {
      return false
    }
  }
  isAgent() {
    if (this.user['poste'] === "agent") {
      return true
    } else {
      return false
    }
  }
  logout() {
    this.userAuth.logout();
    this.router.navigate(['/']);
  }
     
}

