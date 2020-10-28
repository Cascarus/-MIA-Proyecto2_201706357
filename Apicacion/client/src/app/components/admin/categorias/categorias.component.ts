import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { Categoria } from '../../../models/categoria'
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



  constructor(private productoService: ProductoService) { }
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
      res=>{ alert('Categoria Modificada') },
      err=>{console.log(err); alert('Error al agregar categoria')}
    )
  }
}
