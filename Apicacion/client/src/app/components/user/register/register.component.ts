import { Component, OnInit, ɵConsole } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../../../services/user.service';
import { ImageService  } from '../../../services/image.service';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  photoSelected: string | ArrayBuffer;
  file: File;
  paises: any = [];
  user:User ={
    id: 0, 
    nombre: '',
    apellido: '',
    pass: '',
    email: '',
    nacimieno: new Date(),
    credito: 10000,
    idTipo_U: 2,
    token: '',
    confirmacion: 0,
    pathI: '',
    idPais:0,
  }

  constructor(private userService: UserService, private imageService: ImageService) {   }

  ngOnInit(): void {
    this.getPaises();
    
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

  saveNewUser(){
    delete this.user.id;
    this.user.confirmacion=0;
    var pathImage:string = '';
  //    delete this.user.nacimieno;
    if(this.file!=null){
     
        //Sube la imagen
    this.imageService.create(this.file).subscribe(
      res => {console.log(res);
        var tempI:any=res; 
      
        this.user.pathI=tempI.text;
        this.saveNewUser2();
      },
      err => console.log(err)
      
    );
    
    }else{
      //Si no la imagen por dejecto
      this.user.pathI='uploads/bc78c17a-5f2d-4ca4-a500-1d760e2333e6.png';
      this.saveNewUser2();
    }
  


  }
//Optiene la lista de paises
getPaises(){
  this.userService.getPaises().subscribe(
    res => {
      //console.log(res);
      this.paises = res;
    },
    err => console.log(err)
  );
}

//Crea al usuario
  saveNewUser2(){
    console.log(this.user);
    this.userService.addUser(this.user).subscribe(
      res => {console.log(res);
        var tempU:any=res;
        this.user.token=tempU.token;
        if(tempU.text=='Creado'){
          //Se crea al usuario envia el correo
          alert('Usuario creado, confirme con su correo electronico');
          this.userService.sendEmail(this.user).subscribe(
            res => console.log(res),
            err => console.log(err)
          );
        }else{
          alert('Este correo electronico ya existe');
        }
      },
      err => console.log(err) 
    );
  }

}
