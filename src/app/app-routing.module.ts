import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BienComponent } from './bien/bien.component';
import { AdminBiensComponent } from './admin-biens/admin-biens.component';
import {EditBienComponent} from "./admin-biens/edit-bien/edit-bien.component";
import {DetailComponent} from "./detail/detail.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {LocationComponent} from "./location/location.component";
import {VenteComponent} from "./vente/vente.component";
import {AccueilComponent} from "./accueil/accueil.component";


const routes: Routes = [

  { path: 'acceuil', component: AccueilComponent },
  { path: 'biens', component: BienComponent },
  { path: 'admin/biens', component: AdminBiensComponent },
  { path: 'edit-bien/:id', component: EditBienComponent },
  { path: 'detail/:id', component: DetailComponent },

  { path: 'ventes', component: VenteComponent },
  { path: 'locations', component: LocationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},

  { path: '', redirectTo: '/biens', pathMatch: 'full' },
  { path: '**', redirectTo: '/annonces' }

  // { path: 'biens', component: BienListComponent },

];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
