import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path:'',component:AuthComponent},
  { path:'login',component:AuthComponent},
  { path: 'colis', loadChildren: ()=>import('./colis/colis.module').then(m=>m.ColisModule) },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
