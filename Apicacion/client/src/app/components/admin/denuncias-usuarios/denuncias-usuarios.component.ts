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
  getDenuncias(){
      this.productoService.getDenuncia().subscribe(
        res=> {this.denuncias=res; console.log(res);
        },
        err=> console.log(err)
      );
  }

  updateDenuncias(e, idP){
   this.temp.estado=e;
   this.temp.idProducto=idP;
   this.productoService.updateDenuncia(this.temp).subscribe(
    res=> {alert('Se actualizo la visualizacion del producto'); console.log(res);
    },
    err=> console.log(err)
   );

  }

}
