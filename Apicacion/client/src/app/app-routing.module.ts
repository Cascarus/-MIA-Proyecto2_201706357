import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent} from './components/user/home/home.component';
import { CategoriasComponent } from './components/admin/categorias/categorias.component';
import { NewProductoComponent } from './components/user/new-producto/new-producto.component';
import { InicioComponent } from './components/user/inicio/inicio.component';
import { MisProductosComponent } from './components/user/mis-productos/mis-productos.component';
import { DetalleProductoComponent } from './components/user/detalle-producto/detalle-producto.component';
import { ComentariosComponent } from './components/user/comentarios/comentarios.component';
import { DenunciasComponent } from './components/admin/denuncias/denuncias.component';
import { DenunciasUsuariosComponent } from './components/admin/denuncias-usuarios/denuncias-usuarios.component';
import { AuthGuard  } from './guard/auth.guard';
import { UserGuard  } from './guard/user.guard';
import { AllGuard  } from './guard/all.guard';
import { ConfirmacionRegistroComponent } from './components/user/confirmacion-registro/confirmacion-registro.component';
import { CambioContraseniaComponent } from './components/user/cambio-contrasenia/cambio-contrasenia.component';
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
    path: 'register',
    component: RegisterComponent,
    canActivate: [AllGuard]
  },
  {
    path: 'confirmacionUser/:id',
    component: ConfirmacionRegistroComponent
  },
  {
    path: 'cambioContrasenia/:id',
    component: CambioContraseniaComponent
  },
  {
    path: 'user/home',
    component: HomeComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'user/newProducto',
    component: NewProductoComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'user/myProductos',
    component: MisProductosComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'user/Inicio',
    component: InicioComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'user/DetalleProducto/:id',
    component: DetalleProductoComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'user/Comentarios/:id',
    component: ComentariosComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'admin/categorias',
    component: CategoriasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/Denuncias',
    component: DenunciasUsuariosComponent,
    canActivate: [AuthGuard]
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
