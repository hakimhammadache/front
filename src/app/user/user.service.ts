import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient
  ) {}
  urlLogin = 'http://localhost:3000/auth/login';
  getUser(username:string,password:string) {
return {
  username:"hakim",
  password:"123",
  poste:"agent",
  lieu:"tahchat"

}
  }
}
