import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouteruserComponent } from './ajouteruser/ajouteruser.component';
import { ListeuserComponent } from './listeuser/listeuser.component';

const routes: Routes = [
  { path:'liste_user',component:ListeuserComponent},
  { path:'ajouter_user',component:AjouteruserComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
