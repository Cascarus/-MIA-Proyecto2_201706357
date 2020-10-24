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
    document.getElementById('Register').style.display="true";
  }

  userV(){
    document.getElementById('Register').style.display="none";
  }

  allV(){
    document.getElementById('singOut').style.display="none";
    document.getElementById('Register').style.display="none";
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
