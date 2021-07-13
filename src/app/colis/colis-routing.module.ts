import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentGuard } from '../guard/agent.guard';
import { AuthGuard } from '../guard/auth.guard';
import { AjoutercolisComponent } from './ajoutercolis/ajoutercolis.component';
import { ListecolisComponent } from './listecolis/listecolis.component';

const routes: Routes = [
  { path: 'liste_colis', component: ListecolisComponent, canActivate: [AuthGuard]},
  { path: 'ajouter_colis', component: AjoutercolisComponent, canActivate: [AgentGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColisRoutingModule { }
