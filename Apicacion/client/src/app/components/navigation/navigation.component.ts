import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  usuario:any;
  nombre:'';
  apellido:'';
  constructor(private userService: UserService,private router:Router) {   }
  navVar:'none'
  visibility(){
    let sesion = this.userService.getSesion();
    this.usuario=sesion;
      if(sesion==null){
        this.poner('','');
        this.allV();
      }else{
        document.getElementById('singOut').style.display="true";
        if(sesion.rol== 1){
          this.adminV();
          this.poner('','');
        }else{
          this.userV();
          this.poner(sesion.nombre,sesion.apellido);
        }
      }
  }

  probando(){
    if (this.usuario!=null) {
        
      if(this.usuario.rol== 1){
        this.router.navigate(['admin/categorias']);
      }else if(this.usuario.rol==2){ 
        this.router.navigate(['user/home']);
      }
  }
}
  poner(name:any,lastname:any){
    this.nombre=name;
    this.apellido=lastname;
  }
  adminV(){
    document.getElementById('Perfil_U').style.display="none";
    document.getElementById('Categorias_A').style.display="true";
    document.getElementById('Denuncia_A').style.display="true";
    document.getElementById('Reportes_A').style.display="true";
    document.getElementById('newProducto_U').style.display="none";
    document.getElementById('Inicio_U').style.display="none";
    document.getElementById('MyProductos_U').style.display="none";
    document.getElementById('Carrito_U').style.display="none";
    document.getElementById('Chats_U').style.display="none";
    
  }

  userV(){
    document.getElementById('Perfil_U').style.display="true";
    document.getElementById('newProducto_U').style.display="true";
    document.getElementById('Inicio_U').style.display="true";
    document.getElementById('MyProductos_U').style.display="true";
    document.getElementById('Carrito_U').style.display="true";
    document.getElementById('Denuncia_A').style.display="none";
    document.getElementById('Categorias_A').style.display="none";
    document.getElementById('Reportes_A').style.display="none";
    document.getElementById('Chats_U').style.display="true";
  }

  allV(){
    document.getElementById('singOut').style.display="none";
    document.getElementById('Categorias_A').style.display="none";
    document.getElementById('Perfil_U').style.display="none";
    document.getElementById('newProducto_U').style.display="none";
    document.getElementById('Inicio_U').style.display="none";
    document.getElementById('MyProductos_U').style.display="none";
    document.getElementById('Categorias_A').style.display="none";
    document.getElementById('Denuncia_A').style.display="none";
    document.getElementById('Carrito_U').style.display="none";
    document.getElementById('Reportes_A').style.display="none";
    document.getElementById('Chats_U').style.display="none";
  }

  ngOnInit(): void {
    this.visibility();
  }

  SingOut(){
    console.log('Cerro sesion');
    this.userService.limpiarSesion();
    this.router.navigate(['login']);
    document.location.href="login"
  }

}
