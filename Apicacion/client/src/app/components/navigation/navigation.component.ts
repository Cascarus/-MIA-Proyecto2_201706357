import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
   
  constructor(private userService: UserService,private router:Router) {   }
  
  visibility(){
    let sesion = this.userService.getSesion();
      
      if(sesion==null){
        this.allV();
      }else{
        document.getElementById('singOut').style.display="true";
        if(sesion.rol== 1){
          this.adminV();
        }else{
          this.userV();
        }
      }
  }

  adminV(){
    document.getElementById('Perfil_U').style.display="none";
    document.getElementById('Categorias_A').style.display="true";
    document.getElementById('newProducto_U').style.display="none";
    document.getElementById('Inicio_U').style.display="none";
    document.getElementById('MyProductos_U').style.display="none";
  }

  userV(){
    document.getElementById('Perfil_U').style.display="true";
    document.getElementById('newProducto_U').style.display="true";
    document.getElementById('Categorias_A').style.display="none";
    document.getElementById('Inicio_U').style.display="true";
    document.getElementById('MyProductos_U').style.display="true";
  }

  allV(){
    document.getElementById('singOut').style.display="none";
    document.getElementById('Categorias_A').style.display="none";
    document.getElementById('Perfil_U').style.display="none";
    document.getElementById('newProducto_U').style.display="none";
    document.getElementById('Inicio_U').style.display="none";
    document.getElementById('MyProductos_U').style.display="none";
  }

  ngOnInit(): void {
    this.visibility();
  }

  SingOut(){
    console.log('Cerro sesion');
    this.userService.limpiarSesion();
    this.router.navigate(['login']);
  }

}
