import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../../../services/user.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  
  
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
    confirmacion: 0
  }

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  saveNewUser(){
    delete this.user.id;
    this.user.confirmacion=0;
  //    delete this.user.nacimieno;
    this.userService.getUsers().subscribe(
      res => console.log(res),
      err => console.log(err)
    );
    console.log(this.user),
   this.userService.addUser(this.user).subscribe(
    res => console.log(res),
    err => console.log(err) 
   );

  }

}
