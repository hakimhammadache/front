import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogged:BehaviorSubject<boolean>;
  userLogged: BehaviorSubject<string>;
  constructor(private authS:UserService,private router:Router) {
    this.isLogged = new BehaviorSubject(false) 
    this.userLogged = new BehaviorSubject('')
    console.log(this.isLogged)
   if(this.isAuth()){
     if (JSON.parse(localStorage.getItem('user'))['poste'] === 'admin') {
       this.router.navigate(['/colis/liste_colis'])
     } else {
       this.router.navigate(['/colis/ajouter_colis'])
     }
   }else{
     this.router.navigate(['/'])
   }
   }
  login({ username, password }) {
     this.authS.getUser(username, password );
    return this.router.navigate(['/colis/ajouter_colis'])
    }
  isAuth() {
    let user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      const userL = localStorage.getItem('user')
      this.isLogged.next(true)
      
      this.userLogged.next(JSON.parse(userL)['lieu'])
      return (user)
    } else {
      return false
    }
  }
  logout() {
    localStorage.removeItem('user')
    this.isLogged.next(false);
    this.userLogged.next('');
  }
  }

