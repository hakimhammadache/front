import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentGuard } from '../guard/agent.guard';
import { AuthGuard } from '../guard/auth.guard';
import { AjoutercolisComponent } from './ajoutercolis/ajoutercolis.component';
import { DetailcolisComponent } from './detailcolis/detailcolis.component';
import { ListecolisComponent } from './listecolis/listecolis.component';

const routes: Routes = [
  { path: 'liste_colis', component: ListecolisComponent, canActivate: [AuthGuard]},
  { path: 'ajouter_colis', component: AjoutercolisComponent, canActivate: [AgentGuard]},
  { path: 'detail_colis/:id', component: DetailcolisComponent, canActivate: [AgentGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColisRoutingModule { }
