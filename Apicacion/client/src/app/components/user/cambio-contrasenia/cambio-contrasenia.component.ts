import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service'

@Component({
  selector: 'app-cambio-contrasenia',
  templateUrl: './cambio-contrasenia.component.html',
  styleUrls: ['./cambio-contrasenia.component.css']
})
export class CambioContraseniaComponent implements OnInit {
  temp={
    pass:'',
    token:''
  }
  
  constructor(private active:ActivatedRoute,private userService: UserService) { }

  ngOnInit(): void {
    const parm=this.active.snapshot.params;
    this.temp.token=parm.id;
  }

  cambiarContrasenia(){
    this.userService.updatePass(this.temp).subscribe(
      res=>{console.log(res); alert('Contraseña Cambiada')},
      err=>console.log(err)
    );
  }

}
