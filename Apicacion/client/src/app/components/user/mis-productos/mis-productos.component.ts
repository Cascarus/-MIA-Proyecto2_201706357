import { Component, HostBinding, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-mis-productos',
  templateUrl: './mis-productos.component.html',
  styleUrls: ['./mis-productos.component.css']
})
export class MisProductosComponent implements OnInit {

  @HostBinding('class') classes = 'row';
  constructor(private productoService: ProductoService, private userService: UserService) { }
  productos:any=[];
  ngOnInit(): void {
    this.productoService.getMyProducto(this.userService.getSesion().id).subscribe(
      res=> {this.productos=res; console.log(this.productos);
      },
      err=> console.log(err)
      
    );
  }

}
