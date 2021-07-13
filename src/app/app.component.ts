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
  user: Object;
  name: string;
  role: string;
  isLogged: boolean;
  station: string;
  constructor(private userAuth: AuthService, private router: Router) {
    this.user = userAuth.isAuth()
    console.log(this.user)
    this.name = this.user["name"];
    console.log(this.name)
    this.role = this.user["role"];
    this.userAuth.isLogged.subscribe((isLogged) => {
      this.isLogged = isLogged;
    })
    this.userAuth.userLogged.subscribe((userLogged) => {
      this.station = userLogged['station'];
      this.role = userLogged['role']
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
    if (this.role === "admin") {
      return true
    } else {
      return false
    }
  }
  isAgent() {
    if (this.role === "agent") {
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