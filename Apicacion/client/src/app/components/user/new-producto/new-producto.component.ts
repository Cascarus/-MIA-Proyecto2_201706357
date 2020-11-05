import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { Categoria } from '../../../models/categoria'
import { Producto } from '../../../models/producto'
import { UserService } from '../../../services/user.service'
import { ImageService } from '../../../services/image.service'

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-new-producto',
  templateUrl: './new-producto.component.html',
  styleUrls: ['./new-producto.component.css']
})
export class NewProductoComponent implements OnInit {

  
  constructor(private productoService: ProductoService, private userService: UserService,private imageService: ImageService) { }
  categorias:any=[];
  palabrasTemp:any='';
  palabras:any=[];
  file: File;
  producto:Producto={
    idProducto: 0,
    nombre: '',
    detalle: '',
    precio: '',
    estado: 0,
    pathI: '',
    idCategoria: 0,
    idUsuario: this.userService.getSesion().id,
    palabras: '',
  }

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias(){
    this.productoService.getCategorias().subscribe(
      res=>{ this.categorias=res; console.log(this.categorias); },
      err=>console.log(err)
    );
  }

  addProducto(){
    
   /* this.palabras.forEach(element => {
      console.log(element);
    });*/
    if(this.file!=null){
     
        //Sube la imagen
    this.imageService.create(this.file).subscribe(
      res => {console.log(res);
        var tempI:any=res; 
        
        this.producto.pathI=tempI.text;
        
        this.addProducto2();
      },
      err => console.log(err)
      
    );
    
    }else{
      alert('Es necesario que suba una foto para el producto')
    }
  }
  addProducto2(){
    delete this.producto.idProducto;
    this.palabrasTemp=this.palabrasTemp.toLowerCase();
   // this.palabras=this.palabrasTemp.split(';');
    this.producto.palabras=this.palabrasTemp;
    console.log(this.producto);
    if(this.producto.nombre!='' && this.producto.detalle!='' && this.producto.precio!='' && this.producto.idCategoria!=0){
      this.productoService.addProducto(this.producto).subscribe(
        res=>{ console.log(res); this.addBitacora(this.producto.nombre); alert('Producto añadido');},
        err=>console.log(err)
      );
    }else{
      alert('Es necesario ingresar todos los campos');
    }
    
  }

  addBitacora(productoN:string){
    var BitacoraTemp={
      email:this.userService.getSesion().email,
      descripcion:'Este usuario ah aniadido un nuevo producto '+productoN
    }
    this.userService.addBitacora(BitacoraTemp).subscribe(
      res=>{console.log(res);
      },
      err=>console.log(err)
      
    );
  }

  onPhotoSelected(event: HtmlInputEvent): void {
   
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0]; //guarda la imagen
      document.getElementById('NameFIle').innerText=this.file.name;
      
      console.log(this.file);
    }else{
      document.getElementById('NameFIle').innerText='No file chosen';
      this.file=null;
    }
  }
}
