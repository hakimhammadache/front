import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/user/user.service';
import { ColisService } from '../colis.service';

@Component({
  selector: 'app-listecolis',
  templateUrl: './listecolis.component.html',
  styleUrls: ['./listecolis.component.scss']
})
export class ListecolisComponent implements OnInit {
  liste_colis: any;
  formsearch:FormGroup;
  constructor(private colis: ColisService, private userService: UserService, private authService: AuthService) {
    this.formsearch = new FormGroup({
      station: new FormControl(),
      date: new FormControl()
    })
   }
  ngOnInit() {
    this.getListColi()
  }
  getListColi(){
    return this.colis.getList().subscribe(data => this.liste_colis = data)
  }
  searchList(){
    const result = this.colis.search(this.formsearch.value)
    return result
  }
  isAdmin() {
    if (this.authService.isAuth['role'] === 'admin') {
      return true;
    }
    return false;
  }
}
