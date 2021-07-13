import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../user/user.service';
import { Ilogin } from './interfaces/ILogin';
import jwt_decode from 'jwt-decode';
import { IUser } from './interfaces/IUser';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogged: BehaviorSubject<boolean>;
  userLogged: BehaviorSubject<object>;
  constructor(
    private userService: UserService,
    private router: Router,
    private http: HttpClient
  ) {
    this.isLogged = new BehaviorSubject(false)
    this.userLogged = new BehaviorSubject({})

  }
  async login({ username, password }) {
    const login: Ilogin = {
      email: '',
      password: ''
    };
    login.email = username;
    login.password = password;
    const resp = await this.http.post<{ access_token: string }>('http://localhost:3000/auth', login).subscribe(
      (response) => {
         localStorage.setItem('access_token', response.access_token);
        const userL = this.isAuth();
        if (userL['role'] === 'agent') {
          this.router.navigate(['/colis/ajouter_colis'])
        } else if (userL['role'] === 'admin') {
          this.router.navigate(['/colis/liste_colis'])
        }
      });
 
    return resp
  }
  isAuth() {
    let user = this.getToken()
    if (user) {
      const userL = jwt_decode(user);
      this.isLogged.next(true)
      const userLog = { name: userL['name'], station: userL['station'], role :userL['role'] }
      this.userLogged.next(userLog)
      return (userLog)
    } else {
      this.isLogged.next(false)
      this.router.navigate(['/login'])
      return false
    }
  }
  logout() {
    localStorage.removeItem('access_token')
    this.isLogged.next(false);
    this.userLogged.next({});
  }
  public getToken(): string {
    return localStorage.getItem('access_token');
  }
}