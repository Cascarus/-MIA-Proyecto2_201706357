import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { Categoria } from '../../../models/categoria';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  categoria:Categoria ={
    idCategoria: 0, 
    nombre: '',
  }



  constructor(private productoService: ProductoService, private userService: UserService) { }
  categorias:any=[];
  ngOnInit(): void {
    this.getCategorias()
  }

  getCategorias(){
    this.productoService.getCategorias().subscribe(
      res=>{ this.categorias=res; console.log(this.categorias); },
      err=>console.log(err)
    );
  }

  addCategoria(){
    delete this.categoria.idCategoria;
    this.productoService.addCategoria(this.categoria).subscribe(
      res=>{ alert('Categoria Agregada') },
      err=>{console.log(err); alert('Error al agregar categoria')}
    );
  }

  updateCategoria(){
    this.productoService.updateCategoria(this.categoria).subscribe(
      res=>{ alert('Categoria Modificada'); this.addBitacora(' Se modifico la categoria '+this.categoria.nombre); },
      err=>{console.log(err); alert('Error al agregar categoria')}
    )
  }

  addBitacora(desc:string){
    var BitacoraTemp={
      email:this.userService.getSesion().email,
      descripcion:desc
    }
    this.userService.addBitacora(BitacoraTemp).subscribe(
      res=>{console.log(res);
      },
      err=>console.log(err)
      
    );
  }
}
