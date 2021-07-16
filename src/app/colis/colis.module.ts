import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColisRoutingModule } from './colis-routing.module';
import { ListecolisComponent } from './listecolis/listecolis.component';
import { AjoutercolisComponent } from './ajoutercolis/ajoutercolis.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbAlertModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { DetailcolisComponent } from './detailcolis/detailcolis.component';

@NgModule({
  declarations: [
    ListecolisComponent,
    AjoutercolisComponent,
    DetailcolisComponent
  ],
  imports: [
    CommonModule,
    ColisRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbAlertModule,
    NgbPaginationModule 
    
  ]
})
export class ColisModule { }
