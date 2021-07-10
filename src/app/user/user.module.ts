import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ListeuserComponent } from './listeuser/listeuser.component';
import { AjouteruserComponent } from './ajouteruser/ajouteruser.component';


@NgModule({
  declarations: [
    ListeuserComponent,
    AjouteruserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
