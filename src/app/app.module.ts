import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { BienComponent } from './bien/bien.component';
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
import { ListeBiensComponent } from './admin-biens/liste-biens/liste-biens.component';
import { ContactButtonComponent } from './contact-button/contact-button.component';

@NgModule({
  declarations: [
    AppComponent,
    BienComponent,
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
    ListeBiensComponent,
    ContactButtonComponent,
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
