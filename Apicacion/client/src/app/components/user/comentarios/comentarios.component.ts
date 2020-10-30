import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../../services/producto.service';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {

  constructor(private active:ActivatedRoute,private userService: UserService,private productoService: ProductoService) { }
  id:string='';
  comentarios:any=[];

  temp:any={
    coment: '',
    idProducto: 0,
    idUsuario: this.userService.getSesion().id
  }

  tempDenuncia:any={
    coment: '',
    idProducto: 0,
    idUsuario: this.userService.getSesion().id
  }

  ngOnInit(): void {
    const parm=this.active.snapshot.params;
    this.id=parm.id;
    this.temp.idProducto = Number(this.id);
    this.tempDenuncia.idProducto = Number(this.id);
    this.getComentarios();
  }

  getComentarios(){
    this.productoService.getComentarios(this.id).subscribe(
      res=> { this.comentarios=res; console.log(this.comentarios);
       },
      err=> console.log(err)
      
    );
  }

  Comentar(){
    this.productoService.addComentario(this.temp).subscribe(
      res=>console.log(res),
      err=> console.log(err)
    );
  }

  Denunciar(){
    this.productoService.addDenuncia(this.tempDenuncia).subscribe(
      res=>{console.log(res), alert('Haz Hecho una denuncia');},
      err=> console.log(err)
    );
  }
}
