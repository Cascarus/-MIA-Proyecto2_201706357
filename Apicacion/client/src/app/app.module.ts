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
import { ImageService } from './services/image.service';
import { ProductoService } from './services/producto.service';
import { WebSocketService} from './services/web-socket.service';

import { HomeComponent } from './components/user/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ConfirmacionRegistroComponent } from './components/user/confirmacion-registro/confirmacion-registro.component';
import { CambioContraseniaComponent } from './components/user/cambio-contrasenia/cambio-contrasenia.component';
import { CategoriasComponent } from './components/admin/categorias/categorias.component';
import { NewProductoComponent } from './components/user/new-producto/new-producto.component';
import { InicioComponent } from './components/user/inicio/inicio.component';
import { DetalleProductoComponent } from './components/user/detalle-producto/detalle-producto.component';
import { MisProductosComponent } from './components/user/mis-productos/mis-productos.component';
import { ComentariosComponent } from './components/user/comentarios/comentarios.component';
import { DenunciasComponent } from './components/admin/denuncias/denuncias.component';
import { DenunciasUsuariosComponent } from './components/admin/denuncias-usuarios/denuncias-usuarios.component';
import { CarritoComponent } from './components/user/carrito/carrito.component';
import { ChatComponent } from './components/user/chat/chat.component';
import { ReportesComponent } from './components/admin/reportes/reportes.component';
import { ChatsComponent } from './components/user/chats/chats.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    RegisterComponent,
    HomeComponent,
    NotFoundComponent,
    ConfirmacionRegistroComponent,
    CambioContraseniaComponent,
    CategoriasComponent,
    NewProductoComponent,
    InicioComponent,
    DetalleProductoComponent,
    MisProductosComponent,
    ComentariosComponent,
    DenunciasComponent,
    DenunciasUsuariosComponent,
    CarritoComponent,
    ChatComponent,
    ReportesComponent,
    ChatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    UserService,
    ImageService,
    ProductoService,
    WebSocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
