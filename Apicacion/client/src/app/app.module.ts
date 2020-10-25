import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule  } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/user/login/login.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RegisterComponent } from './components/user/register/register.component';

import { UserService } from './services/user.service';
import { ImageService } from './services/image.service'
import { HomeComponent } from './components/user/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ConfirmacionRegistroComponent } from './components/user/confirmacion-registro/confirmacion-registro.component';
import { CambioContraseniaComponent } from './components/user/cambio-contrasenia/cambio-contrasenia.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    RegisterComponent,
    HomeComponent,
    NotFoundComponent,
    ConfirmacionRegistroComponent,
    CambioContraseniaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    UserService,
    ImageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
