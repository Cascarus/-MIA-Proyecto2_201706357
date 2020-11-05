import { Component, HostBinding, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { UserService } from '../../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  @HostBinding('class') classes = 'row'; //Para ordenar cada clase en una fila
  constructor(private productoService: ProductoService, private userService: UserService,private router:Router) { }
  productos:any=[];
  categorias:any=[];
  palabraslst:any=[];
  precios:any=[{id:'DESC',texto:'Descendente'},{id:'ASC',texto:'Ascendente'}];
  
  //Variables de busqueda
  palabraR:any='';
  idCategoria:any='';
  idOrderBY:any='';
  tempC:any={
    idUsuario:0,
    idProducto:0,
    cantidad:0
  }
  ngOnInit(): void {
    this.getCategorias();
    this.productoService.getProducto(this.userService.getSesion().id).subscribe(
      res=> {this.productos=res; console.log(this.productos);
        this.convertListPalabras();
      },
      err=> console.log(err)
    );
  }

  convertListPalabras(){
    this.productos.forEach(element => {
      element.PALABRAS=element.PALABRAS.split(';');
    });
  }

  getCategorias(){
    this.productoService.getCategorias().subscribe(
      res=>{ this.categorias=res; console.log(this.categorias); },
      err=>console.log(err)
    );
  }

  buscador(){
    var objeto:any={  sql: '', otro: '' }
    if(this.idOrderBY!='' && this.idCategoria=='' && this.palabraR==''){
      var sql = 'SELECT P.idProducto, P.nombre, P.detalle, P.precio, P.estado, P.pathI, P.idCategoria, C.nombre AS nombreCa, P.idUsuario, P.palabras FROM producto P INNER JOIN categoria C ON (C.idCategoria=P.idCategoria)'
                + 'WHERE P.estado=0 AND P.idUsuario!='+this.userService.getSesion().id+' ORDER BY P.precio '+this.idOrderBY;
        objeto.sql=sql;
        this.productoService.getFiltro(objeto).subscribe(
        res=> {this.productos=res; console.log(this.productos); this.convertListPalabras();},
        err=> console.log(err)
      ); 
    }

    if(this.idOrderBY=='' && this.idCategoria!='' && this.palabraR==''){
      var sql = 'SELECT P.idProducto, P.nombre, P.detalle, P.precio, P.estado, P.pathI, P.idCategoria, C.nombre AS nombreCa, P.idUsuario, P.palabras FROM producto P INNER JOIN categoria C ON (C.idCategoria=P.idCategoria)'
                + 'WHERE P.estado=0 AND P.idUsuario!='+this.userService.getSesion().id+' AND P.idCategoria='+this.idCategoria;
        objeto.sql=sql;
        this.productoService.getFiltro(objeto).subscribe(
        res=> {this.productos=res; console.log(this.productos); this.convertListPalabras();},
        err=> console.log(err)
      ); 
    }
    console.log(this.palabraR);
    if(this.idOrderBY=='' && this.idCategoria=='' && this.palabraR!=''){
      var sql = 'SELECT P.idProducto, P.nombre, P.detalle, P.precio, P.estado, P.pathI, P.idCategoria, C.nombre AS nombreCa, P.idUsuario, P.palabras FROM producto P INNER JOIN categoria C ON (C.idCategoria=P.idCategoria)'
                + 'WHERE P.estado=0 AND P.idUsuario!='+this.userService.getSesion().id+' AND (P.palabras LIKE \'%'+this.palabraR+'\' OR P.palabras LIKE \'%'+this.palabraR+'%\' OR P.palabras LIKE \''+this.palabraR+'%\')';
        objeto.sql=sql;
        this.productoService.getFiltro(objeto).subscribe(
        res=> {this.productos=res; console.log(this.productos); this.convertListPalabras();},
        err=> console.log(err)
      ); 
    }
  }

  detalleProducto(id:any){
    this.router.navigate(['user/DetalleProducto/'+id]);
  }

  prueba(idP){
    this.tempC.idProducto=idP;
    console.log(this.tempC);
  }

  addToCar(){
    this.tempC.idUsuario=Number(this.userService.getSesion().id);
    this.tempC.cantidad= Number(this.tempC.cantidad);
    console.log(this.tempC)
    this.productoService.addCarrito(this.tempC).subscribe(
      res=> {alert('Producto añadido'); console.log(res); this.addBitacora(' Se añadio el este producto '+this.tempC.idProducto+' al carrito');
      },
      err => console.log(err)
      
    );
    
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
