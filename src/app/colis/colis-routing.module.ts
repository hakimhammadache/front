import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guard/admin.guard';
import { AgentGuard } from '../guard/agent.guard';
import { AjoutercolisComponent } from './ajoutercolis/ajoutercolis.component';
import { ListecolisComponent } from './listecolis/listecolis.component';

const routes: Routes = [
  { path:'liste_colis',component:ListecolisComponent,canActivate:[AdminGuard]},
  { path:'ajouter_colis',component:AjoutercolisComponent,canActivate:[AgentGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColisRoutingModule { }
