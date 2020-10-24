import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent} from './components/user/home/home.component';
import { AuthGuard  } from './guard/auth.guard';
import { UserGuard  } from './guard/user.guard';
import { AllGuard  } from './guard/all.guard';
import { ConfirmacionRegistroComponent } from './components/user/confirmacion-registro/confirmacion-registro.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path:'login',
    component: LoginComponent,
    canActivate: [AllGuard]
  },
  {
    path: 'admin/register',
    component: RegisterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'confirmacionUser/:id',
    component: ConfirmacionRegistroComponent
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
