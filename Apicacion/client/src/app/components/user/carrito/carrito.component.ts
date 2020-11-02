import { formatDate } from '@angular/common';
import { IfStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ProductoService } from '../../../services/producto.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  constructor(private productoService: ProductoService, private userService: UserService) { }

  carrito:any=[];
  user:User;
  totalC:number=0;
  tempCompra:any={
    idUsuario: this.userService.getSesion().id,
    fecha: '',
    total:0,
    correoComprador:'',
    productos:[]
}
  ngOnInit(): void {
    this.getCarrito();
  }

  getCarrito(){
    this.productoService.getCarrito(this.userService.getSesion().id).subscribe(
      res=>{this.carrito=res,console.log(res); this.getTotal();
      },
      err=> console.log(err)
    );
  }

  deleteOneProduct(idCarrito){
    this.productoService.deleteOneProduct(idCarrito).subscribe(
      res=> {  this.getCarrito(); console.log(res);
      },
      err=> console.log(err)
      
    );
  }

  deleteAllCarrito(){
    this.productoService.deleteAllCarrito(this.userService.getSesion().id).subscribe(
      res=>{ alert('Carrito Limpio'); this.getCarrito();console.log(res);;
      },
      err=>{console.log(err);
      }
    );
  }

  comprar(){
    this.userService.getOneUser(this.userService.getSesion().id).subscribe(//Obtenemos el credito actual
      res=> {this.user=res; console.log(res);
        if (this.user.credito>=this.getTotal()) {
          alert('Si puede comprar');
          //Agregamos el detalle
          var tempDate = new Date();
          this.tempCompra.fecha=tempDate.toLocaleString();
          this.tempCompra.total=this.totalC;
          this.tempCompra.productos=this.carrito;
          this.tempCompra.correoComprador=this.user.email;
          this.productoService.addCompra(this.tempCompra).subscribe(
            res=>{console.log(res);
                //Enviamos los correos a los usuarios
                this.productoService.sendEmailCOmpra(this.tempCompra).subscribe(
                  res=>{ console.log(res);;
                  },
                  err=> console.log(err)
                );
                //Limpiamos el carrito
                this.deleteAllCarrito();
            },
            err=>{console.log(err);
            }
          );
        }else{
          alert('No tiene los creditos suficientes');
        }
      },
      err=>{console.log(err);
      }
    );
    
  }

  getTotal():number{
    var total:number=0;
    this.carrito.forEach(element => {
      total=total+element.SUBTOTAL;
    });
    this.totalC=total;
    return total;
  }

}
