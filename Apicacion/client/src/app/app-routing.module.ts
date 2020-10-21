import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent} from './components/user/home/home.component';
import { AuthGuard  } from './guard/auth.guard';
import { UserGuard  } from './guard/user.guard';
import { AllGuard  } from './guard/all.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path: 'admin/register',
    component: RegisterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/home',
    component: HomeComponent,
    canActivate: [UserGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
