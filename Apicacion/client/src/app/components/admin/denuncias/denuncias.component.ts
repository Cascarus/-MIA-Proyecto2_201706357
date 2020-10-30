import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';

@Component({
  selector: 'app-denuncias',
  templateUrl: './denuncias.component.html',
  styleUrls: ['./denuncias.component.css']
})
export class DenunciasComponent implements OnInit {

  constructor(private productoService: ProductoService) { }
  denuncias:any=[];
  ngOnInit(): void {
      this.getDenuncias();
      console.log(this.denuncias);
  }

  getDenuncias(){
      this.productoService.getDenuncia().subscribe(
        res=> {this.denuncias=res; console.log(res);
        },
        err=> console.log(err)
      );
  }

}
