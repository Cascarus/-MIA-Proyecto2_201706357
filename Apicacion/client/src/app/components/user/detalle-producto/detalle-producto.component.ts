import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../../services/producto.service';
import { Producto } from '../../../models/producto';
import { UserService } from '../../../services/user.service';
@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {

  constructor(private active:ActivatedRoute,private productoService: ProductoService,private router:Router,private userService: UserService) { }
  id:string='';
  producto:Producto={
    idProducto: 0,
    nombre: '',
    detalle: '',
    precio: '',
    estado: 0,
    pathI: '',
    idCategoria: 0,
    idUsuario: 0,
    palabras: '',
    nombreCA: '',
  };
   tempL:any={
    Megusta: 0,
    NoMegusta: 0
    };
  
    tempChat:any={
      idChat:0,
      ID1:0,
      ID2:0
    }
  ngOnInit(): void {
    const parm=this.active.snapshot.params;
    this.id=parm.id;
    this.productoService.getDetalleProducto(this.id).subscribe(
      res=> { this.producto=res; console.log(this.producto); this.getAllLikes(); },
      err=> console.log(err)
    );
  }

  getAllLikes(){
    this.productoService.getAllLikes(this.id).subscribe(
      res=> { this.tempL=res; console.log(this.tempL); },
      err=> console.log(err)
      
    );
  }

  addLike(estado2:string){
    var idP:number = Number(this.id);
    var temp={
      estado:estado2,
      idProducto:  Number(this.id),
      idUsuario: this.userService.getSesion().id
    }
    this.productoService.addLike(temp).subscribe(
      res=>{console.log(res);this.getAllLikes(); this.addBitacora(' Esta usuario le dio una reaccion al producto '+this.producto.nombre);},
      err=> console.log(err)
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

  comentario(id:any){
    this.router.navigate(['user/Comentarios/'+id]);
  }

  chat(id:any){
    //this.router.navigate(['user/Chat/'+id]);
    var tempChat={
      ID1:id,
      ID2:this.userService.getSesion().id
    }
    this.userService.startChat(tempChat).subscribe(
      res=>{this.tempChat=res; console.log(this.tempChat);  this.router.navigate(['user/Chat/'+this.tempChat[0].IDCHAT]);
      },
      err=>{console.log(err);
      }
    );
  }
}
