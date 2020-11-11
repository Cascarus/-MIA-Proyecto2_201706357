import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service'
import { ImageService } from '../../../services/image.service'
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  file: File;
  constructor(private userService: UserService, private imageService: ImageService,private router:Router) {  }
  user: any;
  paises: any = [];

  user2:User ={
    id: 0, 
    nombre: '',
    apellido: '',
    pass: '',
    email: '',
    nacimieno: new Date(),
    credito: 0,
    idTipo_U: 2,
    token: '',
    confirmacion: 0,
    pathI: '',
    idPais: 0,
    rol:0,
  }
  ngOnInit(): void {
    this.getPaises();
    this.user=this.userService.getSesion();
    this.userService.getOneUser(this.user.id).subscribe(
      res => {
        this.user2=res;
        console.log(res)},
      err => console.log(err) 
     );     
  }




  getPaises(){
    this.userService.getPaises().subscribe(
      res => {
        console.log(res);
        this.paises = res;
      },
      err => console.log(err)
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

  update(){
    var pathImage:string = '';
    if(this.file!=null){
     
        //Sube la imagen
    this.imageService.create(this.file).subscribe(
      res => {console.log(res);
        var tempI:any=res; 
        
        this.user2.pathI=tempI.text;
        
        this.update2();
      },
      err => console.log(err)
      
    );
    
    }else{
      this.update2();
    }
  }

  update2(){
    this.user2.id=this.user.id;
    delete this.user2.token;
    delete this.user2.confirmacion;
    delete this.user2.credito;
    delete this.user2.email;
    delete this.user2.rol;
    
      console.log(this.user2);
      this.userService.updateUsuer(this.user2).subscribe(
        res => console.log(res),
        err => console.log(err)
      );
  }

}
