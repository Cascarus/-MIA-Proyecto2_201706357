import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
@Component({
  selector: 'app-denuncias-usuarios',
  templateUrl: './denuncias-usuarios.component.html',
  styleUrls: ['./denuncias-usuarios.component.css']
})
export class DenunciasUsuariosComponent implements OnInit {

  constructor(private productoService: ProductoService) { }
  denuncias:any=[];
  ngOnInit(): void {
      this.getDenuncias();
      console.log(this.denuncias);
  }
  temp:any={
    estado: 0,
    idProducto: 0
  }

  temp2:any={
    email: '',
    nombrep: '',
    nombreU2: '',
    apellido2: ''
  }

  getDenuncias(){
      this.productoService.getDenuncia().subscribe(
        res=> {this.denuncias=res; console.log(res);
        },
        err=> console.log(err)
      );
  }

  updateDenuncias(e, idP, email,nombrep,nombreU2,apellido2){
  this.temp.estado=e;
  this.temp.idProducto=idP;

  this.temp2.email=email;
  this.temp2.nombrep=nombrep;
  this.temp2.nombreU2=nombreU2;
  this.temp2.apellido2=apellido2;  

   this.productoService.updateDenuncia(this.temp).subscribe(
    res=> {alert('Se actualizo la visualizacion del producto'); console.log(res);
      if(e==1){
        this.productoService.sendEmail(this.temp2).subscribe(
          res=>  console.log(res),
          err=> console.log(err)
          
        );
      }
    },
    err=> console.log(err)
   );
  }

}
