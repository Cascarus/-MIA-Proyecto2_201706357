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
import { HomeComponent } from './components/user/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    RegisterComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
