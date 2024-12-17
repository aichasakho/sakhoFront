import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { BienComponent } from './bien/bien.component';
import { ReservationComponent } from './reservation/reservation.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminBiensComponent } from './admin-biens/admin-biens.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ContactComponent } from './contact/contact.component';
import { EditBienComponent } from './admin-biens/edit-bien/edit-bien.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DetailComponent } from './detail/detail.component';
import { LocationComponent } from './location/location.component';
import { VenteComponent } from './vente/vente.component';
import { AccueilComponent } from './accueil/accueil.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    BienComponent,
    ReservationComponent,
    AdminBiensComponent,
    ContactComponent,
    EditBienComponent,
    NavComponent,
    RegisterComponent,
    LoginComponent,
    DetailComponent,
    LocationComponent,
    VenteComponent,
    AccueilComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
