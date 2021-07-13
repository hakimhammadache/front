import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  formdata: FormGroup;

  constructor(private appservice: AuthService, private router: Router) {
    this.formdata = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    })
  }
  ngOnInit() {}
  onLogin() {
    if (this.formdata.value['username'] !== null && this.formdata.value['password'] !== null) {
      const personne = this.appservice.login(this.formdata.value)

      if (!personne) {
        alert("Username ou password incorrect")
      }
    } else {
      alert("Verifiez les champs !")
 
  }
}
}
