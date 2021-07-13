import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from './IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users:IUser[]=[];
  constructor(
    private http: HttpClient
  ) { }
  urlLogin = 'http://localhost:3000/auth';
  urlListUsers = 'http://localhost:3000/user'
  getUser(username: string, password: string) {
    const user = {email:username,password:password}
    console.log(this.http.post(this.urlLogin, user).subscribe(m => { return m }));
    const tocken = this.http.post(this.urlLogin, user).subscribe(m=>{return m})
    return tocken
  }
  listeUsers(){
    const liste = this.http.get<IUser[]>(this.urlListUsers)
    console.log(liste)
    return liste
  }
}
