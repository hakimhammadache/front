import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColisRoutingModule } from './colis-routing.module';
import { ListecolisComponent } from './listecolis/listecolis.component';
import { AjoutercolisComponent } from './ajoutercolis/ajoutercolis.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListecolisComponent,
    AjoutercolisComponent
  ],
  imports: [
    CommonModule,
    ColisRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    
  ]
})
export class ColisModule { }
