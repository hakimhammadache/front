import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { IUser } from '../IUser';
import { UserService } from '../user.service';

@Component({
  selector: 'app-listeuser',
  templateUrl: './listeuser.component.html',
  styleUrls: ['./listeuser.component.scss']
})
export class ListeuserComponent implements OnInit {
  liste_users=[]
  constructor(private userService: UserService) {
    this.getUsers()}

  ngOnInit(): void {
  }
  getUsers(){
    return  this.userService.listeUsers().subscribe((data: IUser[]) => { this.liste_users = data });
  }
}
